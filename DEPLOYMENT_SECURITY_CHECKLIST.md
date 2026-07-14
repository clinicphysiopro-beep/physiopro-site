# PhysioPro Website Security Deployment Checklist

Target domain: `physioprotijuana.com`

> ⚠️ **STATUS (2026-07-06):** Item 6 under Verification ("no route exposes repository files, internal docs, or non-public directories") was confirmed **FAILING** in production during the Phase 1 production-readiness pass — `_redirects` was using an unsupported `404` status token and every internal `.md` doc plus `functions/api/*.js` source was publicly served with HTTP 200. Fixed in this pass by switching to `301` redirects (a universally-supported Cloudflare Pages status); re-verify item 6 against production after the next deploy. This file was also found untracked in git (`git status` shows `??`) despite matching the live Cloudflare Pages config — commit it once reviewed so it isn't lost. See `WEBSITE_PRODUCTION_STATE.md` for the current authoritative state.

## Cloudflare setup

1. Create a Cloudflare Pages project from this repository, or redeploy the existing Pages project from this repository only.
2. Bind the custom domains:
   - `physioprotijuana.com`
   - `www.physioprotijuana.com`
3. Set the canonical host policy:
   - choose `https://physioprotijuana.com` as canonical
   - 301 redirect apex to `www` or vice versa, but keep one canonical
4. Enable Always Use HTTPS.
5. Keep TLS mode on `Full (strict)`.
6. Enable Automatic HTTPS Rewrites.
7. Enable Brotli and HTTP/3.

## Turnstile

1. Create a Turnstile widget in Cloudflare.
2. Allow these hostnames:
   - `physioprotijuana.com`
   - `www.physioprotijuana.com`
   - preview hostname if used
3. Add the following Pages project secrets:
   - `TURNSTILE_SECRET`
4. Add the following Pages project environment variables:
   - `TURNSTILE_SITE_KEY`
   - `CANONICAL_ORIGIN=https://physioprotijuana.com`
   - `ALLOWED_ORIGINS=https://physioprotijuana.com,https://physioprotijuana.com`
   - `WHATSAPP_NUMBER=526634875859`

5. Lead delivery goes through the `LEAD_QUEUE` Cloudflare Queue producer binding
   (declared in `wrangler.toml`, not an env var) — every valid submission is
   written durably to the `physiopro-lead-intake` queue. A private pull-consumer
   on the clinic server drains it and creates the CRM lead over loopback.
   `CLINIC_API_BASE_URL` / `physiopro.mx` are obsolete: the FastAPI backend is
   Tailscale-private and was never reachable from Cloudflare's edge directly —
   that's what the queue exists to solve. Confirm instead that the
   `physiopro-lead-intake` queue exists and has an HTTP pull consumer configured
   (`wrangler queues consumer http add physiopro-lead-intake`).

## Rate limiting

Apply Cloudflare WAF rate limiting rules in addition to the in-app limits.

Recommended production rules:

1. `POST /api/lead`
   - threshold: 5 requests / 10 seconds
   - action: Managed Challenge or Block
   - mitigation timeout: 10 minutes
2. `POST /api/ask`
   - threshold: 3 requests / 10 seconds
   - action: Managed Challenge or Block
   - mitigation timeout: 10 minutes
3. `POST /api/assistant`
   - threshold: 20 requests / 60 seconds
   - action: Managed Challenge
   - mitigation timeout: 10 minutes

## Bot protection

1. Enable Bot Fight Mode or Super Bot Fight Mode if available on the zone plan.
2. Add a WAF custom rule for obvious bad bot user agents on `/api/*`.
3. Challenge requests to `/api/*` with a threat score or bot score over your acceptable threshold.

## Logging and privacy

1. Enable Workers Logs for the Pages Functions project.
2. Verify that only hashed identifiers and metadata are logged.
3. Do not add raw form payloads, questions, names, emails, phone numbers, or symptom descriptions to logs.

## Verification

1. Confirm these responses include security headers:
   - `/`
   - `/ask-leonardo.html`
   - `/api/config`
   - `/api/lead`
   - `/api/ask`
   - `/api/assistant`
2. Confirm the homepage lead form refuses submission without Turnstile.
3. Confirm the Ask Leonardo form refuses submission without Turnstile.
4. Confirm repeated spam requests return `429`.
5. Confirm the assistant refuses:
   - emergency advice
   - diagnosis requests
   - pricing manipulation
   - prompt injection and jailbreak attempts
   - off-topic questions
6. Confirm no route exposes repository files, internal docs, or non-public directories.

## Domain launch follow-up

1. Replace legacy `clinicphysiopro-beep.github.io/physiopro-site` canonical URLs with `https://physioprotijuana.com`.
2. Update sitemap URLs to the production domain.
3. Update `robots.txt` sitemap reference.
4. Update Open Graph and JSON-LD URLs to the production domain.
5. Re-verify the production domain in Google Search Console.
