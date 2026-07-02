import { jsonResponse, handleCorsPreflight } from "./_lib/security.js";

const DEFAULT_TURNSTILE_SITE_KEY = "0x4AAAAAADurMtC6m2Acyyau";

export async function onRequestOptions(context) {
  return handleCorsPreflight(context.request, context.env);
}

export async function onRequestGet(context) {
  const origin = context.request.headers.get("Origin") || "";
  return jsonResponse(
    {
      ok: true,
      turnstileSiteKey: context.env.TURNSTILE_SITE_KEY || DEFAULT_TURNSTILE_SITE_KEY,
      canonicalOrigin: context.env.CANONICAL_ORIGIN || "https://physioprotijuana.com",
      assistantMessageMaxLength: 320,
    },
    { origin, env: context.env }
  );
}
