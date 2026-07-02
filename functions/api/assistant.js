import {
  answerAssistant,
  ensureAllowedOrigin,
  handleCorsPreflight,
  jsonResponse,
  logAbuse,
  rateLimitRequest,
  readJson,
  validateAssistantPayload,
} from "./_lib/security.js";

export async function onRequestOptions(context) {
  return handleCorsPreflight(context.request, context.env);
}

export async function onRequestPost(context) {
  const origin = context.request.headers.get("Origin") || "";
  const originError = ensureAllowedOrigin(context.request, context.env);
  if (originError) return originError;

  const limited = await rateLimitRequest(context, "assistant");
  if (!limited.success) {
    await logAbuse(context, "rate_limit_assistant", { source: limited.source, retry_after: limited.retryAfter });
    return jsonResponse(
      { ok: false, error: "rate_limited", message: "Too many messages. Please wait a minute and try again." },
      {
        status: 429,
        origin,
        env: context.env,
        headers: { "Retry-After": String(limited.retryAfter || 60) },
      }
    );
  }

  let payload;
  try {
    payload = await readJson(context.request, 6_144);
  } catch (error) {
    await logAbuse(context, "invalid_json_assistant", { message: String(error && error.message) });
    return jsonResponse({ ok: false, error: "invalid_payload" }, { status: 400, origin, env: context.env });
  }

  const validated = validateAssistantPayload(payload);
  if (!validated.ok) {
    await logAbuse(context, "validation_assistant", { error: validated.error });
    return jsonResponse({ ok: false, error: validated.error }, { status: 400, origin, env: context.env });
  }

  const answer = answerAssistant(validated.data.message);
  if (answer.blocked) {
    await logAbuse(context, "assistant_guardrail", { classification: answer.classification });
  }

  return jsonResponse(
    {
      ok: true,
      answer: answer.answer,
      classification: answer.classification,
      blocked: answer.blocked,
      ctaLabel: answer.ctaLabel,
      ctaHref: answer.ctaHref,
    },
    { origin, env: context.env }
  );
}
