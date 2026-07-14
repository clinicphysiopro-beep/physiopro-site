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

const CLINIC_API_TIMEOUT_MS = 8_000;

function resolveClinicApiBaseUrl(context) {
  const configured =
    String(context.env.CLINIC_API_BASE_URL || context.env.PHYSIOPRO_API_BASE_URL || "").trim();
  if (configured) {
    return configured.replace(/\/+$/, "");
  }

  const hostname = new URL(context.request.url).hostname;
  if (hostname === "127.0.0.1" || hostname === "localhost") {
    return "http://127.0.0.1:8000";
  }

  return "";
}

async function createTrackedClinicLead(context, lead) {
  const clinicApiBaseUrl = resolveClinicApiBaseUrl(context);
  if (!clinicApiBaseUrl) {
    throw new Error("clinic_api_not_configured");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort("clinic_api_timeout"), CLINIC_API_TIMEOUT_MS);

  try {
    const response = await fetch(`${clinicApiBaseUrl}/api/public/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
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
      }),
      signal: controller.signal,
    });

    const body = await response.json().catch(() => ({}));
    if (!response.ok || body.success !== true) {
      const status = response.status || 502;
      throw new Error(`clinic_api_rejected_${status}`);
    }
  } finally {
    clearTimeout(timeout);
  }
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

  // The CRM write and the WhatsApp handoff are independent outcomes: a visitor
  // must never be dead-ended just because the clinic API is unreachable. If the
  // CRM write fails, we still log it for follow-up and still send the visitor to
  // WhatsApp — the conversation itself becomes the fallback record.
  let crmSaved = true;
  try {
    await createTrackedClinicLead(context, validated.data);
  } catch (error) {
    crmSaved = false;
    await logAbuse(context, "clinic_api_lead_rejected", {
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
      crmSaved,
      message: "Done. We’re sending you to WhatsApp to coordinate your first session.",
    },
    { origin, env: context.env }
  );
}
