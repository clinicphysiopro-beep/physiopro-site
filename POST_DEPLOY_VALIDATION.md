# PhysioPro Live Website Release 1.7 Post-Deploy Validation

Run only after Leonardo approves deployment and the Release 1 package is deployed.

## 1. Deployment Identity

Record:

- Deployment date/time.
- Cloudflare deployment ID.
- GitHub commit SHA deployed.
- GitHub branch deployed: `main`.
- Build command shown by Cloudflare.
- Build output directory shown by Cloudflare.
- Confirmation that deployed source includes `release/production-homepage.html`.
- Build status.
- Production URL.

Expected deployment identity:

- Deployment method: GitHub -> Cloudflare Pages.
- Deployed commit should be the Leonardo-approved sanitized Release 1 source commit from `main`.
- Build command: `npm run build`.
- Build output directory: `dist`.
- Not acceptable for Release 1: direct `wrangler pages deploy dist`, dashboard drag/drop, or repository-root deployment.

## 2. Smoke Test URLs

Run:

```bash
curl -I https://physioprotijuana.com/
curl -I https://physioprotijuana.com/first-session
curl -I https://physioprotijuana.com/contact
curl -I https://physioprotijuana.com/ask-leonardo
curl -I https://physioprotijuana.com/knee-pain
curl -I https://physioprotijuana.com/resources
curl -I https://physioprotijuana.com/robots.txt
curl -I https://physioprotijuana.com/sitemap.xml
curl -I https://physioprotijuana.com/404
```

Expected:

- Public pages return 200.
- `robots.txt` returns 200.
- `sitemap.xml` returns 200.
- `404` page returns an intentional page response.

## 3. Redirects

Run:

```bash
curl -I https://physioprotijuana.com/first-session.html
curl -I https://physioprotijuana.com/contact.html
curl -I https://physioprotijuana.com/knee-pain.html
curl -I https://physioprotijuana.com/ask-leonardo.html
```

Expected:

- Each returns 308 to the extensionless route.

Check protected paths:

```bash
curl -I https://physioprotijuana.com/wrangler.toml
curl -I https://physioprotijuana.com/DEPLOYMENT_SECURITY_CHECKLIST.md
curl -I https://physioprotijuana.com/functions/api/lead.js
curl -I https://physioprotijuana.com/node_modules/
```

Expected:

- No raw config, markdown, function source, or package files are served.

## 4. Homepage

Validate desktop and mobile:

- Homepage is the non-Fable production homepage.
- H1 includes `Back to training`.
- No `fable-home.css`, `fable-home-motion.css`, or `fable-home.js` loads.
- `static/website.css` loads.
- `static/website.js` loads.
- Hero image loads from `static/images/v3/gym.jpg`.
- Navigation dropdowns work.
- Sticky WhatsApp CTA appears.
- No critical console errors.

## 5. Condition Pages

Check at least:

- `/knee-pain`
- `/back-pain`
- `/shoulder-pain`
- `/sports-injuries`
- `/return-to-sport`

Validate:

- Page renders.
- Hero image loads.
- Navigation works.
- Primary CTA works.
- FAQ accordions work where present.
- No missing images.
- No console errors.

## 6. Forms

Do not submit a live lead unless Leonardo approves the exact test.

Validate visually and without submission:

- Homepage lead form renders.
- Contact form area renders.
- Ask Leonardo form renders.
- Turnstile widget renders where expected.
- Consent text appears.
- Required fields behave normally.
- No console errors before submission.

If Leonardo separately approves one live test:

- Submit exactly one controlled test lead.
- Record timestamp.
- Confirm Pages Function response.
- Confirm Cloudflare Queue enqueue.
- Confirm `lead_queue_consumer.service` receives it.
- Confirm clinic intake/dashboard result.
- Confirm WhatsApp fallback/handoff behavior.

## 7. WhatsApp

Click without sending a message:

- Header WhatsApp CTA.
- Homepage WhatsApp CTA.
- First-session WhatsApp CTA.
- Contact page WhatsApp CTA.
- One condition-page WhatsApp CTA.

Expected:

- Opens `wa.me/526634875859`.
- Prefill text is present.
- No broken target or blank tab.

## 8. Ask Leonardo

Do not submit a live question unless Leonardo approves.

Validate:

- Page loads.
- Form fields render.
- Turnstile widget renders.
- Emergency/scope copy is visible.
- No console errors.

If Leonardo approves a test:

- Submit one safe non-medical test question.
- Confirm response path.
- Record whether persistence/handoff occurs.

## 9. API / Functions

Run:

```bash
curl -i https://physioprotijuana.com/api/config
curl -i -X OPTIONS https://physioprotijuana.com/api/lead
curl -i -X OPTIONS https://physioprotijuana.com/api/ask
curl -i -X OPTIONS https://physioprotijuana.com/api/assistant
```

Expected:

- `/api/config` returns JSON with `ok: true`.
- OPTIONS requests return expected preflight behavior.
- API responses include their own required headers, because `_headers` does not apply to Pages Functions responses.

## 10. SEO Signals

Validate:

- `https://physioprotijuana.com/sitemap.xml` contains extensionless URLs.
- Sitemap URLs return 200.
- Pages self-canonicalize to extensionless URLs.
- No internal `.html` links on sampled pages.
- JSON-LD parses on sampled pages.
- Homepage, priority pages, condition pages, articles, resources, contact, Ask Leonardo, reviews include OG/Twitter image metadata.
- Known note: legal pages may still have canonical-only metadata until later metadata completion.

## 11. Robots

Run:

```bash
curl https://physioprotijuana.com/robots.txt
```

Expected:

```text
User-agent: *
Allow: /
Sitemap: https://physioprotijuana.com/sitemap.xml
```

## 12. Analytics

Without changing Google settings:

- Confirm GA4 script loads.
- Confirm Meta Pixel script loads if expected.
- Confirm Microsoft Clarity script loads if expected.
- Confirm no obvious blocked script errors caused by CSP.

If Leonardo provides Google/Meta access separately:

- Confirm GA4 realtime page_view.
- Confirm WhatsApp click event.
- Confirm lead form event only if a test lead is approved.
- Confirm Ask event only if a test question is approved.

## 13. Mobile And Desktop

Check:

- Mobile 390px width.
- Tablet width.
- Desktop width.

Validate:

- Header/nav usable.
- Text does not overlap.
- CTAs visible.
- Forms usable.
- Images visible.
- No horizontal overflow.
- No blocked scroll.

## 14. Console And Network

In browser DevTools:

- Console has no critical JavaScript errors.
- Network has no 404s for CSS, JS, images, fonts, or video.
- Turnstile script loads.
- GA/Meta/Clarity scripts load or are blocked only by expected browser/privacy tooling.

## 15. Core Web Vitals / Performance

Run Lighthouse or PageSpeed for:

- Homepage
- First Session
- One condition page
- Ask Leonardo

Record:

- Performance score.
- LCP.
- CLS.
- INP/TBT proxy.
- Main image weight.
- Third-party script impact.

Do not treat performance tuning as part of this deployment unless there is a production-breaking regression.

## 16. Final Validation Decision

Pass if:

- Package is deployed from `dist`.
- Homepage is non-Fable.
- Core pages render.
- APIs respond.
- Protected artifacts are not exposed.
- No critical console/network errors.
- Redirects/canonicals/sitemap are consistent.

Fail and rollback if:

- Repository root is served.
- Fable homepage is served.
- Internal docs/config/source files are public.
- Core pages fail.
- Forms/Ask Leonardo are unusable.
- API config/preflight fails unexpectedly.
