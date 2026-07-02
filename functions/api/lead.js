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
      message: "Done. We’re sending you to WhatsApp to coordinate your first session.",
    },
    { origin, env: context.env }
  );
}
