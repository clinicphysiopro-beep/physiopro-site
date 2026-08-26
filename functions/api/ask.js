import {
  buildAskWhatsAppUrl,
  ensureAllowedOrigin,
  handleCorsPreflight,
  jsonResponse,
  logAbuse,
  rateLimitRequest,
  readJson,
  validateAskPayload,
  verifyTurnstileToken,
} from "./_lib/security.js";

// Same durable-handoff pattern as functions/api/lead.js: the clinic API has
// no public ingress, so every valid Ask-Leonardo submission is written to
// the same Cloudflare Queue (LEAD_QUEUE) that homepage lead-form submissions
// use. Without this, a visitor who never follows through on the WhatsApp
// redirect leaves zero CRM record behind. The question text is carried in
// the `goal` field (the queue consumer's canonical lead shape has no
// dedicated "question" field) so it still lands as useful context on the
// CRM record.
async function queueTrackedClinicLead(context, ask) {
  const queue = context.env.LEAD_QUEUE;
  if (!queue || typeof queue.send !== "function") {
    throw new Error("lead_queue_not_configured");
  }

  await queue.send({
    idempotency_key: crypto.randomUUID(),
    full_name: ask.full_name,
    phone: ask.phone || null,
    email: ask.email,
    goal: ask.question,
    consent_whatsapp: true,
    utm_source: ask.utm_source || null,
    utm_medium: ask.utm_medium || null,
    utm_campaign: ask.utm_campaign || null,
    utm_content: ask.utm_content || null,
    utm_term: ask.utm_term || null,
    landing_page: ask.landing_page || null,
    whatsapp_entry_source: "website_ask_leonardo_form",
    submitted_at: new Date().toISOString(),
  });
}

export async function onRequestOptions(context) {
  return handleCorsPreflight(context.request, context.env);
}

export async function onRequestPost(context) {
  const origin = context.request.headers.get("Origin") || "";
  const originError = ensureAllowedOrigin(context.request, context.env);
  if (originError) return originError;

  const limited = await rateLimitRequest(context, "ask");
  if (!limited.success) {
    await logAbuse(context, "rate_limit_ask", { source: limited.source, retry_after: limited.retryAfter });
    return jsonResponse(
      { ok: false, error: "rate_limited", message: "Too many attempts. Please wait a moment and try again." },
      {
        status: 429,
        origin,
        env: context.env,
        headers: { "Retry-After": String(limited.retryAfter || 10) },
      }
    );
  }

  let payload;
  try {
    payload = await readJson(context.request, 12_288);
  } catch (error) {
    await logAbuse(context, "invalid_json_ask", { message: String(error && error.message) });
    return jsonResponse({ ok: false, error: "invalid_payload" }, { status: 400, origin, env: context.env });
  }

  const validated = validateAskPayload(payload);
  if (!validated.ok) {
    await logAbuse(context, "validation_ask", { error: validated.error });
    return jsonResponse({ ok: false, error: validated.error }, { status: 400, origin, env: context.env });
  }

  const turnstile = await verifyTurnstileToken({
    token: validated.data.turnstileToken,
    request: context.request,
    env: context.env,
  });
  if (!turnstile.success) {
    await logAbuse(context, "turnstile_ask", { error: turnstile.error });
    return jsonResponse(
      { ok: false, error: "turnstile_failed", message: "Please complete the verification and try again." },
      { status: 400, origin, env: context.env }
    );
  }

  // Same independence guarantee as lead.js: the queue write and the
  // WhatsApp handoff are independent outcomes. A visitor must never be
  // dead-ended just because the queue is unavailable — if the queue write
  // fails, we log it for follow-up and still send the visitor to WhatsApp.
  let crmQueued = true;
  try {
    await queueTrackedClinicLead(context, validated.data);
  } catch (error) {
    crmQueued = false;
    await logAbuse(context, "queue_write_rejected_ask", {
      reason: String(error && error.message ? error.message : error),
    });
  }

  const whatsappUrl = buildAskWhatsAppUrl({
    name: validated.data.full_name,
    email: validated.data.email,
    phone: validated.data.phone,
    question: validated.data.question,
    whatsappNumber: context.env.WHATSAPP_NUMBER || "526634875859",
  });

  return jsonResponse(
    {
      ok: true,
      whatsappUrl,
      crmQueued,
      message: "Thank you. Leonardo will review your question and respond as soon as possible.",
    },
    { origin, env: context.env }
  );
}
