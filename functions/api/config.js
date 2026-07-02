import { jsonResponse, handleCorsPreflight } from "./_lib/security.js";

export async function onRequestOptions(context) {
  return handleCorsPreflight(context.request, context.env);
}

export async function onRequestGet(context) {
  const origin = context.request.headers.get("Origin") || "";
  return jsonResponse(
    {
      ok: true,
      turnstileSiteKey: context.env.TURNSTILE_SITE_KEY || "",
      canonicalOrigin: context.env.CANONICAL_ORIGIN || "https://physioprotijuana.com",
      assistantMessageMaxLength: 320,
    },
    { origin, env: context.env }
  );
}
