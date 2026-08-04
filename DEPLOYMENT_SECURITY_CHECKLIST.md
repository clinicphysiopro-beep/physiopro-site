# PhysioPro Website Security Deployment Checklist

Target domain: `physioprotijuana.com`

> ⚠️ **STATUS (2026-08-04):** Item 6 under Verification ("no route exposes repository files, internal docs, or non-public directories") was confirmed **FAILING** in production during Phase 0: internal `.md` docs and `wrangler.toml` were publicly served with HTTP 200. Release 1 now has a sanitized local push-candidate branch, `release/live-site-r1-sanitized`, based on `origin/main` and excluding local Fable/cinematic source, gallery media, private/consent-blocked media, generated `dist/`, `node_modules/`, and test-only artifacts. The branch builds a clean `dist` package with `pages_build_output_dir = "dist"`; production remains unverified until Leonardo approves push/deployment and Cloudflare Pages is confirmed to run `npm run build` and publish `dist`. See `WEBSITE_PRODUCTION_STATE.md` for the current authoritative state.

> **Canonical Release 1 deployment strategy:** GitHub `clinicphysiopro-beep/physiopro-site` branch `main` -> Cloudflare Pages production build. Direct Wrangler upload is not the Release 1 deployment method.

## Cloudflare setup

1. Create a Cloudflare Pages project from this repository, or redeploy the existing Pages project from this repository only.
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Do not publish the repository root.
   - Confirm the source checkout includes `release/production-homepage.html`; no build-time Git history lookup is required.
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
   - `TURNSTILE_SECRET_KEY`
4. Add the following Pages project environment variables:
   - `TURNSTILE_SITE_KEY`
   - `CANONICAL_ORIGIN=https://physioprotijuana.com`
   - `ALLOWED_ORIGINS=https://physioprotijuana.com`
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
