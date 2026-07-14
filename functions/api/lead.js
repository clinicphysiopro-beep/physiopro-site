import {
  buildLeadWhatsAppUrl,
  ensureAllowedOrigin,
  handleCorsPreflight,
  jsonResponse,
  logAbuse,
  rateLimitRequest,
  readJson,
  validateLeadPayload,
  verifyTurnstileToken,
} from "./_lib/security.js";

// The clinic API (FastAPI, /api/public/leads) is bound to a Tailscale-private
// IP with no public ingress — Cloudflare's edge can never reach it directly.
// Instead of proxying, every valid lead is written durably to a Cloudflare
// Queue (LEAD_QUEUE, bound below in wrangler.toml). A private pull-consumer
// running on the clinic server drains the queue on its own schedule and
// creates the lead via the existing canonical /api/public/leads logic over
// loopback. This fully decouples visitor-facing latency/availability from
// clinic-backend reachability.
async function queueTrackedClinicLead(context, lead) {
  const queue = context.env.LEAD_QUEUE;
  if (!queue || typeof queue.send !== "function") {
    throw new Error("lead_queue_not_configured");
  }

  await queue.send({
    idempotency_key: crypto.randomUUID(),
    full_name: lead.full_name,
    phone: lead.phone,
    goal: lead.goal,
    consent_whatsapp: true,
    utm_source: lead.utm_source || null,
    utm_medium: lead.utm_medium || null,
    utm_campaign: lead.utm_campaign || null,
    utm_content: lead.utm_content || null,
    utm_term: lead.utm_term || null,
    landing_page: lead.landing_page || null,
    whatsapp_entry_source: "website_form_cloudflare",
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

  const limited = await rateLimitRequest(context, "lead");
  if (!limited.success) {
    await logAbuse(context, "rate_limit_lead", { source: limited.source, retry_after: limited.retryAfter });
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
    payload = await readJson(context.request, 8_192);
  } catch (error) {
    await logAbuse(context, "invalid_json_lead", { message: String(error && error.message) });
    return jsonResponse({ ok: false, error: "invalid_payload" }, { status: 400, origin, env: context.env });
  }

  const validated = validateLeadPayload(payload);
  if (!validated.ok) {
    await logAbuse(context, "validation_lead", { error: validated.error });
    return jsonResponse({ ok: false, error: validated.error }, { status: 400, origin, env: context.env });
  }

  const turnstile = await verifyTurnstileToken({
    token: validated.data.turnstileToken,
    request: context.request,
    env: context.env,
  });
  if (!turnstile.success) {
    await logAbuse(context, "turnstile_lead", { error: turnstile.error });
    return jsonResponse(
      { ok: false, error: "turnstile_failed", message: "Please complete the verification and try again." },
      { status: 400, origin, env: context.env }
    );
  }

  const sourceTag = [
    validated.data.utm_source,
    validated.data.utm_medium,
    validated.data.utm_campaign,
  ].filter(Boolean).join("/");

  // The queue write and the WhatsApp handoff are independent outcomes: a
  // visitor must never be dead-ended just because the queue is unavailable.
  // If the queue write fails, we still log it for follow-up and still send
  // the visitor to WhatsApp — the conversation itself becomes the fallback
  // record until the lead can be captured in the CRM another way.
  let crmQueued = true;
  try {
    await queueTrackedClinicLead(context, validated.data);
  } catch (error) {
    crmQueued = false;
    await logAbuse(context, "queue_write_rejected", {
      reason: String(error && error.message ? error.message : error),
    });
  }

  const whatsappUrl = buildLeadWhatsAppUrl({
    name: validated.data.full_name,
    phone: validated.data.phone,
    goal: validated.data.goal,
    sourceTag,
    whatsappNumber: context.env.WHATSAPP_NUMBER || "526634875859",
  });

  return jsonResponse(
    {
      ok: true,
      whatsappUrl,
      crmQueued,
      message: "Done. We’re sending you to WhatsApp to coordinate your first session.",
    },
    { origin, env: context.env }
  );
}
