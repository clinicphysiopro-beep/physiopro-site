# PhysioPro Live Website Release 1.7 Deploy Checklist

Status: deployment preparation only
Target: `https://physioprotijuana.com`
Canonical deployment method: GitHub -> Cloudflare Pages production build
Package: Cloudflare Pages builds `dist` from committed source using `npm run build`
Do not deploy without Leonardo approval.

Release 1 sanitized source state: committed locally on branch `release/live-site-r1-sanitized`, not pushed, not deployed. Use the current branch HEAD as the Release 1 push candidate after Leonardo approval. Final sanitized package manifest hash from validation: `1362785d79d7b8e995113f17133eaa25ebfb9a083d9530a0cf3a8e5f34a6e729`.

## 1. Pre-Approval Gate

- Confirm Leonardo has approved Release 1 deployment validation.
- Confirm this is Release 1 / 1.7 deployment validation only.
- Confirm no Release 2 conversion, SEO expansion, Spanish content, legal, or visual redesign work is included.
- Confirm no live Turnstile/Queue test will be run unless Leonardo separately approves that exact test.
- Confirm no Google Search Console, GBP, or GA4 dashboard action is included unless separately approved.

## 2. Cloudflare Pages Dashboard Settings To Confirm

- Project points to the intended `physiopro-site` repository.
- GitHub source is `clinicphysiopro-beep/physiopro-site`.
- Production branch is `main`.
- The sanitized Release 1 source set has been pushed to `main` after Leonardo approval.
- The pushed source includes:
  - `package.json`
  - `scripts/build-cloudflare-pages.mjs`
  - `release/production-homepage.html`
  - `404.html`
  - updated `wrangler.toml` with `pages_build_output_dir = "dist"`
  - updated production HTML, sitemap, redirects, headers, and static assets.
- The pushed source does not include local Fable/cinematic source, gallery media, private/consent-blocked media, generated `dist/`, `node_modules/`, or test-only artifacts.
- Build command is exactly:

```bash
npm run build
```

- Build output directory is exactly:

```text
dist
```

- Root directory is empty/default unless Cloudflare explicitly requires otherwise for the repository checkout.
- Repository root is not published directly. Evidence of a bad configuration is live `/wrangler.toml` serving raw TOML or live Markdown docs returning `200`.
- Build environment does not need Git history access for the homepage source. `dist/index.html` is generated from the tracked project asset `release/production-homepage.html`.
- Custom domain `physioprotijuana.com` is attached.
- `www.physioprotijuana.com` is either configured and redirected to apex, or explicitly documented as intentionally unused.
- Pages Functions are enabled for `/api/*`.
- Queue producer binding exists:
  - Binding: `LEAD_QUEUE`
  - Queue: `physiopro-lead-intake`
- Required Pages environment variables/secrets exist, without exposing values:
  - `TURNSTILE_SECRET_KEY`
  - `TURNSTILE_SITE_KEY`
- Recommended explicit Pages variables exist, unless the release owner deliberately accepts the current code defaults:
  - `CANONICAL_ORIGIN=https://physioprotijuana.com`
  - `ALLOWED_ORIGINS` includes `https://physioprotijuana.com`
  - `WHATSAPP_NUMBER=526634875859`
- Obsolete checklist item: `TURNSTILE_SECRET` is not used by the current code. Do not add it unless the code is changed to read it.

## 3. Local Package Verification Before Deployment

Run from `/home/physioproclinic/physiopro-site`:

```bash
npm run build
git diff --check
```

Confirm:

- `dist/` exists.
- `dist/index.html` is the non-Fable production homepage.
- `release/production-homepage.html` exists in the repository and is not copied directly to `dist`.
- `dist/index.html` contains `Back to training`.
- `dist/index.html` loads `./static/website.js`.
- `dist/index.html` does not reference `fable-home`, `data-hero="photo"`, or `static/images/fable5`.
- `dist/_headers`, `dist/_redirects`, `dist/_routes.json`, `dist/robots.txt`, and `dist/sitemap.xml` exist.
- `dist/404.html` exists.

## 4. Artifact Exclusion Verification

Run:

```bash
find dist \( -name '*.md' -o -name 'wrangler.toml' -o -name 'functions' -o -name 'node_modules' -o -name '.env*' -o -name '.dev.vars*' -o -name '*test.js' \) -print
```

Expected output: no rows.

Run:

```bash
find dist \( -name 'production-homepage.html' -o -name 'release' \) -print
```

Expected output: no rows.

Run:

```bash
rg -n "fable-home|Fable|data-hero=\"photo\"|static/images/fable5|static/images/gallery|website\.turnstile-init\.test" dist
```

Expected output: no rows.

## 5. URL And Metadata Verification

Run:

```bash
rg -n "\.html" dist --glob '*.html' --glob 'sitemap.xml'
```

Expected output: no rows.

Run:

```bash
python3 -m json.tool dist/_routes.json >/dev/null
python3 -m xml.etree.ElementTree dist/sitemap.xml >/dev/null
```

Expected result: both commands exit successfully.

Confirm:

- Sitemap URLs use `https://physioprotijuana.com/...`.
- Sitemap URLs do not end in `.html`.
- Canonical URLs are extensionless.
- JSON-LD parses successfully.
- Homepage and marketing/condition/article/trust pages include OG/Twitter image metadata.
- Known note: legal pages currently have canonical URLs but not full OG/Twitter metadata; this is not a Release 1 deployment blocker, but should be tracked for later metadata completion.

## 6. Cloudflare Compatibility Notes

- Cloudflare Pages supports setting build command and output directory; Release 1 expects `npm run build` and `dist`.
- Release 1.6 removed the prior build-time dependency on `git show 3576873:index.html`; the production homepage source is now a durable tracked release asset.
- `_headers` and `_redirects` must be in the build output directory; Release 1 copies both into `dist`.
- `_routes.json` must be in the build output directory; Release 1 copies it into `dist`.
- `_routes.json` includes only `/api/*`, so static pages should not invoke Functions.
- `_headers` does not apply to Pages Functions responses; API endpoint headers must be validated separately after deployment.
- `_redirects` supports redirect status codes such as `301`, `302`, `303`, `307`, `308`, and proxy `200`. It does not support arbitrary `404` rewrite status tokens.
- Release 1 private-path `_redirects` are defense-in-depth only. The primary protection is publishing `dist`, not repository root.

## 7. Final Go / No-Go

Go only if:

- Leonardo approved deployment.
- The canonical GitHub -> Cloudflare Pages deployment path is confirmed.
- Release 1 source has been pushed to GitHub `main` after Leonardo approval.
- Cloudflare build command is exactly `npm run build`.
- Cloudflare build output directory is exactly `dist`.
- Local package validation passes.
- `dist` contains no private docs/config/functions/source/test artifacts.
- A rollback path is available in Cloudflare before deployment.

No-go if:

- Cloudflare is configured to publish repository root.
- Build command/output directory cannot be confirmed.
- `release/production-homepage.html` is missing from the deployed source checkout.
- Release 1 files are only local and not pushed to GitHub `main`.
- `dist` contains docs/config/functions/test artifacts.
- `dist` contains `release/` or `production-homepage.html`.
- The generated homepage is Fable/cinematic.
