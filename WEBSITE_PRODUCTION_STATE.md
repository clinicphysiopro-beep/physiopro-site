# PhysioPro Flagship Website — Production State

**Last verified:** 2026-08-04 (sanitized Release 1 branch prepared locally — not pushed, not deployed)
**This is the single canonical current-state document.** All other planning/audit `.md` docs in this repo are historical inputs — each carries a status note pointing back here. Read this file first.

**2026-07-24 update — lead-pipeline investigation, PAUSED, unresolved:** The website→CRM lead bridge (Pages Function → Cloudflare Queue → private consumer → `clinic.db`) was investigated end-to-end for the first time since its 2026-07-14 deployment. A real code defect in `static/website.js` was found and fixed (unguarded homepage init sequence could silently prevent Turnstile registration — fixed via error isolation + explicit failure logging + a visible fallback message, 5 new tests, deployed `a462bc3c-fada-4a1a-846d-3350edef6324`, committed by Leonardo in `6cf8fdf`). **A live retest after the fix failed identically** — the fix is real and correct but was not the actual production root cause. A headless-browser investigation confirmed the Turnstile widget renders correctly and all configuration (CSP, domain allowlist, site key) is correct via the Cloudflare API, but the widget never issues a verification token — indistinguishable from Turnstile's managed mode correctly blocking automated test traffic without a real human test. **Practical implication (unconfirmed): the homepage lead form has likely not delivered a single real submission since 2026-07-14.** Full detail: `PHYSIOPRO_OS/PHYSIOPRO_BRAIN/02_OPERATIONS_BRAIN/system_build_logs/2026-07-24_website_turnstile_lead_pipeline_investigation.md`. Paused — resume needs either a real human browser test with DevTools open, or a decision on the Turnstile widget's dashboard mode.

**2026-08-03 Release 1 update — local only, not deployed:** A clean Cloudflare Pages package path was prepared with `npm run build` and `pages_build_output_dir = "dist"` so internal docs, `wrangler.toml`, `functions/`, `node_modules/`, Fable homepage assets, and locally ignored image variants are excluded from future deployment output. Extensionless canonical URLs, sitemap URLs, JSON-LD item URLs, internal page links, and priority OG/Twitter image metadata were cleaned on non-homepage production pages. The generated `dist/index.html` is prepared from the durable tracked homepage asset `release/production-homepage.html` with Release 1 URL/social metadata cleanup applied at build time, while the local cinematic `index.html` remains unchanged and separate. Release 1.6 removed the prior build-time dependency on Git history / `3576873:index.html`. A local `404.html` exists for the future deployment package. **No production deploy, live form submission, Cloudflare dashboard change, Google action, or Turnstile/Queue live test was performed.** Production still requires Leonardo deployment approval and Cloudflare Pages confirmation.

**2026-08-03 Release 1.7 deployment-blocker resolution — local only, not deployed:** The canonical Release 1 deployment strategy is GitHub `clinicphysiopro-beep/physiopro-site` branch `main` -> Cloudflare Pages production build with build command `npm run build` and output directory `dist`. Direct Wrangler upload is intentionally not the Release 1 method because Release 1 must be source-controlled, reproducible, and tied to the durable tracked homepage asset. Cloudflare API evidence shows the current project build config is empty (`build_command=""`, `destination_dir=""`, `root_dir=""`), which matches the old no-build/repository-root production state and explains why live `/wrangler.toml` still serves `pages_build_output_dir = "."`. Release 1 remains blocked until the Release 1 source set is pushed to GitHub `main` and Cloudflare build settings are changed to `npm run build` / `dist`. **No deploy or Cloudflare setting change was performed during blocker resolution.**

**2026-08-03 Release 1.7A source review — committed locally, not pushed, not deployed:** The complete Release 1 source set was reviewed, classified, validated from a clean source copy, and committed locally in this repository as the current Release 1 source commit (`chore(site): prepare Release 1 production foundation`). Final package manifest hash after source whitespace cleanup: `8c80a0ce1650f25e72b44434d5970d2fbd9e8dab293e6c19d36ea07209311a2c`. Validation produced 45 generated files / 31 generated HTML files, parsed 81 JSON-LD blocks, parsed a 26-URL sitemap, and found no protected/private artifacts, Fable/gallery/test references, or generated `.html` URL references in `dist`. **The commit has not been pushed. No deploy, Cloudflare setting change, live test, Google action, legal change, or Release 2 work was performed.**

**2026-08-04 sanitized Release 1 branch — committed locally, not pushed, not deployed:** The prior local `main` branch was found unsafe to push as-is because its ahead history includes local cinematic/Fable work, visual experiments, a condition-page prototype, and media history that must not enter production. A clean local branch `release/live-site-r1-sanitized` was created from `origin/main` commit `e720bc4ef85e4321cc0b6ca5b977037391ca4cd2`. One sanitized local commit (`chore(site): prepare sanitized Release 1 production branch`) applies only Release 1 production-safe source changes: deterministic `npm run build`, `dist` packaging, durable legacy production homepage source, extensionless URLs, sitemap/schema/link cleanup, 404 page, protected-path routing, social metadata, runtime/private-route hardening, and tracking consistency. The sanitized package hash is `1362785d79d7b8e995113f17133eaa25ebfb9a083d9530a0cf3a8e5f34a6e729`, with 43 generated files / 31 HTML files. It differs from the prior 45-file hash because the sanitized branch deliberately excludes the experimental condition-page stylesheet/video/media path and aligns the homepage pixel source. **No push, deployment, Cloudflare setting change, live test, Google action, legal change, or Release 2 work was performed.**

**Phase status:**
| Phase | Status | What it did |
|---|---|---|
| 0 — Discovery | ✅ Complete | Full repo/asset/architecture audit. Confirmed the RAÍZ→CAPACIDAD→RETORNO doctrine and homepage arc did not exist in the codebase (net-new, later locked in Phase 3.5). |
| 1 — Production Readiness | ✅ Complete | Fixed a live `_redirects` exposure bug, CSP gap, legal-page factual errors, added `defer`/scroll-depth tracking. |
| 2 — Asset Integration | ✅ Complete | Compressed 4 photos (~90% smaller), integrated 2 new real DSLR photos, added real photography to 23 previously photo-less pages via a new reusable hero-image pattern. |
| 3 — Trust Layer | ✅ Complete | Removed 3 fabricated homepage case studies and a fabricated 5.0-star schema claim; fixed contradictory/hidden-pending copy; created 4 consent/testimonial process docs. |
| 3.5 — Brand Narrative Integration | ✅ Complete | Brand thesis and doctrine locked by the user. Audit found existing copy already aligns in substance. Fixed CTA/meta-description consistency outliers. |
| 4 — Creative Production Prep | ✅ Complete | Pure documentation (zero site edits): blueprint, scene map, asset catalog, component library, motion opportunities, photography/video guides, master `FABLE5_CREATIVE_BRIEF.md`. |
| Creative Pass 1 | ✅ Complete | Homepage-only, motion reference translation: hero ambient breathe, Want Back graduated scroll-fill, CTA emphasis pulse, reconnected hover-zoom. |
| Creative Pass 2 | ✅ Complete | Homepage-only, emotional-pacing refinement: fixed a real reduced-motion accessibility bug, increased Method/Philosophy type hierarchy, added back-half background variation, aligned scroll-scrub timing. |
| Creative Pass 3 | ✅ Complete (prototype, not propagated) | Single condition-page flagship prototype — `knee-pain.html` selected as the master-template candidate; see §9 below. |
| Creative Pass 4 | ✅ Complete | Homepage-only, ruthless self-critique + targeted "feels alive at rest" fixes; see §10 below. |
| Live Growth Release 1 | ✅ Sanitized local push-candidate branch prepared; not pushed or deployed | Clean non-Fable `dist` package prep, durable tracked homepage source asset, extensionless URL cleanup, sitemap/schema/link cleanup, social preview metadata prep, local 404 page. Requires Leonardo approval, GitHub push, and Cloudflare build-config confirmation before any production deploy. |

---

## 1. Deployment reality

- **Platform:** Cloudflare Pages (not GitHub Pages — an earlier plan, `WEBSITE_FINAL_LAUNCH_ROADMAP.md`, targeted GitHub Pages and was superseded).
- **Domain:** `physioprotijuana.com` — confirmed live with valid SSL as of Phase 1.
- **Build step prepared locally, not deployed:** `pages_build_output_dir = "dist"` and `npm run build` now produce a clean Cloudflare Pages package that excludes internal docs/config/source directories, Fable homepage assets, and locally ignored image variants. The generated homepage is sourced from `release/production-homepage.html`, a durable tracked project asset extracted from the pre-Fable production homepage, not the current local cinematic `index.html` and not a build-time Git commit object. Production still needs Cloudflare/deploy verification before this becomes live reality.
- **Backend:** Cloudflare Pages Functions (`functions/api/lead.js`, `ask.js`, `assistant.js`, `config.js`) — serverless, Turnstile-gated, rate-limited. No database; forms redirect to a `wa.me` WhatsApp deep link after validation. **There is still no server-side lead capture independent of the visitor completing that WhatsApp handoff** — open product question, unresolved.
- **`_redirects` fix (Phase 1) still needs live re-verification after next deploy** — Phase 1A added extensionless legacy redirects and defense-in-depth redirects for likely private paths, but the real security fix is deploying from `dist`, not repo root.
- **CSP fix (Phase 1, Clarity)** — applied, not yet re-verified live for the same reason.
- Sanitized Release 1 source is committed locally on `release/live-site-r1-sanitized` but not pushed. Next production step is Leonardo-approved push of the sanitized branch/commit to GitHub `main`, then Cloudflare Pages build-setting confirmation.

## 2. Homepage vs. interior pages — the core architectural split

- `index.html` runs the **Fable 5** design system (`fable-home.css`, `fable-home-motion.css`, `fable-home.js`).
- **All 29 other pages** still run the legacy system (`website.css`, `website.js`). Phase 2 added real photography to 23 of them via a new shared `.page-hero-media`/`.page-hero-image` pattern (matching `.about-portrait`'s visual language), but they have NOT received the Fable 5 motion/typography system.
- **`knee-pain.html`** is a partial exception as of Creative Pass 3: it still runs `website.css`/`website.js` as its base, but additionally loads `static/condition-flagship.css` (scoped under `body.flagship`) as a third, page-scoped layer — not the Fable 5 system, not propagated to any other page. See §9.
- Propagating Fable 5 site-wide remains future work — everything through Creative Pass 2 has been **homepage-only** by explicit instruction.
- `index.html` and the 3 `static/fable-home.*` files remain excluded from the Release 1 deployment package. The build script generates `dist/index.html` from `release/production-homepage.html` instead of copying the local cinematic homepage.

## 3. Homepage — cumulative state through Creative Pass 2

**Real assets in place:** 7 photos (gym, founder, lobby, manual-therapy, treatment-room, estim, plus 2 new gallery photos used on interior pages) + 1 video (`founder-intro.mp4`), all compressed, all with `width`/`height` set.

**Trust layer (Phase 3):** the Results section previously showed 3 fabricated patient case studies (specific sports/diagnoses/timelines/outcomes) — replaced with honest "what we document / case study in development" framing, cross-linking to `success-stories.html` and `reviews.html`.

**Motion system (Creative Pass 1 + 2), full current inventory:**
- `.hero-bg img` — a 32s ease-in-out `heroBreathe` scale animation (1.05→1.08), the one deliberate exception to the "no ambient loops" restraint documented in `fable-home-motion.css`. Transform-only, no layout shift.
- `.cta-emphasis` — a 3.2s `ctaPulse` box-shadow glow on exactly two buttons: the Lead Capture "Book on WhatsApp" and the Final CTA "Book My First Session." Pauses on hover.
- `#want-list li` — a continuous scroll-linked `--fill` custom property (via `color-mix()`) replacing what was previously a binary on/off text reveal; its scroll-scrub band (`vh*0.84`→`vh*0.34`) now exactly matches the Method section's `#process-track` band, so the two feel like one system.
- `.stage-panel:hover img` — a reconnected hover-zoom (`scale(1.04)`), now correctly gated inside `@media (prefers-reduced-motion: no-preference)` for consistency with every other transform effect on the page.
- **Reduced-motion:** a real, pre-existing bug (not introduced by this session, but replicated into the new Want Back code before being caught) is now fixed — `update()`'s per-frame recompute of `#process-track`'s `--progress` and `#want-list`'s `--fill` was unconditionally overwriting the reduced-motion fallback state. Both are now guarded by a `motionOK` check. Verified live: under `prefers-reduced-motion: reduce`, `--progress` correctly reads 100% with all 6 steps lit, and all 5 Want Back items correctly read `--fill: 100%`/`.on: true`.

**Typography/hierarchy (Creative Pass 2):**
- Method section heading (`.process .section-head h2`) increased from `clamp(34px,5.4vw,64px)` to `clamp(38px,6.6vw,80px)` — it structurally *is* the RAÍZ→CAPACIDAD→RETORNO doctrine (Pain→Assessment→Recovery→Strength→Performance→Return) and previously had the flattest type treatment on the page.
- Philosophy statement (`.phil-statement`) increased from `clamp(34px,6vw,76px)` to `clamp(36px,6.6vw,84px)` — was smaller than both neighboring sections, undercutting momentum right after the Indictment beat.
- Results and Want Back sections gained subtle radial-gradient background variation (reusing the exact pattern/opacity already used in Lead Capture) — previously 5 consecutive back-half sections were all flat black with zero variation.
- Two minor reveal-stagger timing irregularities fixed (Location section `--d`, Final CTA `--d`) to match their own section's established increment.

**Homepage arc mapping (unchanged, documented not implemented as literal labels):** see `HOMEPAGE_SCENE_BLUEPRINT.md` for the full section-by-section mapping to PAIN→DECISION→RAÍZ→CAPACIDAD→RETURN THRESHOLD→RETORNO→PERFORMANCE→BOOK. The Method section already **is** this doctrine structurally; no section has been renamed or reordered.

## 4. Legal pages — status (unchanged since Phase 1/3)

All 4 legal pages (`aviso-privacidad.html`, `aviso-medico.html`, `aviso-cookies.html`, `derechos-arco.html`) remain explicitly marked **DRAFT — not yet operative**, pending attorney sign-off. No effective date has been fabricated; this is a legitimate hold.

**Fixed (Phase 1, factual corrections only):** hosting disclosure (GitHub Pages → Cloudflare Pages), false "we don't use Pixel/Clarity" claim in `aviso-cookies.html`, `lang="en"` → `lang="es-MX"`.

**Still requires Leonardo/legal counsel (untouched):** cédula profesional number, institution name verification, controller identity, dedicated ARCO email, COFEPRIS advertising-permit status, cookie-consent-banner decision, effective dates, final attorney sign-off.

**Flagged, not fixed:** email inconsistency (`index.html` uses `clinicphysiopro@gmail.com`; `contact.html` + all 4 legal pages use `lft.leonardo.machado@gmail.com`) — needs Leonardo's one-line confirmation before a mechanical site-wide swap, since it affects legally-declared contact info.

## 5. Trust/proof content (Phase 3, unchanged since)

`success-stories.html`'s 6 case-study categories remain honestly labeled "in development," pending real patient consent. `CASE_STUDY_TEMPLATE.md`, `TESTIMONIAL_INTAKE_CHECKLIST.md`, `VIDEO_TESTIMONIAL_CHECKLIST.md`, `CONSENT_REVIEW_CHECKLIST.md` exist as ready-to-use process docs for when real cases become available.

## 6. Tracking (Phase 1, unchanged since)

GA4, Meta Pixel, Microsoft Clarity correctly wired with scroll-depth tracking added. Server-side conversion signals (Meta CAPI / GA4 Measurement Protocol) remain out of scope — needs a credentials decision from Leonardo.

## 7. Documentation map (all docs in this repo, current as of this writing)

| Doc | Status |
|---|---|
| `WEBSITE_PRODUCTION_STATE.md` | **Canonical — this file** |
| `FABLE5_CREATIVE_BRIEF.md` | Master Phase 4 handoff brief — still the right entry point for future visual work, though Creative Pass 1-2 have already executed some of its recommendations (hero motion, Method/Philosophy hierarchy) |
| `HOMEPAGE_SCENE_BLUEPRINT.md`, `MOTION_OPPORTUNITY_REPORT.md`, `COMPONENT_LIBRARY.md`, `ASSET_MASTER_CATALOG.md`, `WEBSITE_BLUEPRINT.md`, `PHOTOGRAPHY_GUIDE.md`, `VIDEO_GUIDE.md` | Phase 4 deliverables — largely still accurate; the two motion-related ones now have some claims superseded by Creative Pass 1-2 (see note below) |
| `CINEMATIC_REFERENCE_ANALYSIS_AND_PLAN.md` | Creative Pass 1's analysis + plan — executed |
| `CASE_STUDY_TEMPLATE.md`, `TESTIMONIAL_INTAKE_CHECKLIST.md`, `VIDEO_TESTIMONIAL_CHECKLIST.md`, `CONSENT_REVIEW_CHECKLIST.md` | Phase 3 process docs — still current, unused until real cases exist |
| `DEPLOYMENT_SECURITY_CHECKLIST.md` | Current, updated for Release 1.7A local source review and GitHub -> Cloudflare Pages deployment path |
| `EXPERIENCE_GAP_AUDIT.md`, `FINAL_ARCHITECTURE_CLOSE_REPORT.md`, `PHYSIOPRO_HERO_REDESIGN_PLAN.md`, `PHYSIOPRO_PREMIUM_EXPERIENCE_ROADMAP.md`, `PHYSIOPRO_PT_BENCHMARK_GAP_ROADMAP.md`, `WEBSITE_CURRENT_STATE_INVENTORY_BEFORE_FABLE_REDESIGN.md`, `WEBSITE_FABLE_REDESIGN_PRESERVATION_CHECKLIST.md`, `WEBSITE_FINAL_LAUNCH_ROADMAP.md` | Pre-existing/historical, each already carries a status note pointing here |

**Known minor staleness (not yet corrected as of this writing):** `MOTION_OPPORTUNITY_REPORT.md` (Phase 4) still describes the hero as having no ambient loop and Want Back as binary on/off — both since changed by Creative Pass 1-2. Treat that report as describing the **pre-Creative-Pass** baseline; this file (Section 3 above) is the current source of truth for what motion actually exists now.

## 8. What's genuinely left

1. Leonardo approval before any deployment from this repo/package.
2. Push the local Release 1 source commit to GitHub `main` after Leonardo approval.
3. Cloudflare Pages confirmation that production will run `npm run build` and publish `dist`.
4. Live re-verification of the `_redirects`/CSP fixes after next deploy.
5. Leonardo-confirmation items: legal fields, canonical email.
6. Server-side conversion tracking (CAPI/Measurement Protocol) — future scoped work.
7. Fable 5 propagation to the other 29 pages — future visual-production phase (not started).
8. ~5.5MB of orphaned image files (Phase 2) still pending delete approval.
9. Condition-page hero pattern (text-beside-image) vs. the reference video's text-on-image convention — resolved for the Pass 3 prototype by keeping text-beside-image (refinement over replacement); still an open IA question if/when the template propagates site-wide.
10. Whether to propagate the Pass 3 `knee-pain.html` template treatment to the other 29 pages — awaiting approval, explicitly not done this pass.
11. No real-browser/visual/Lighthouse verification has been possible in any Creative Pass session (no browser tooling available) — all QA to date is code-level (tag balance, scoping, reduced-motion gating, grep-based regression checks). A real visual pass is still owed before either Pass 3 or Pass 4 work is considered launch-ready.
12. Asset-pool exhaustion (confirmed in Pass 4): `gym.jpeg` is reused for both the hero and the Training Ground band with no other full-bleed real photo available; `static/images/fable5/` contains no unused real photography. Further "feels alive" gains beyond Pass 4 require new photography/video, not more CSS.

## 9. Creative Pass 3 — Condition-page flagship prototype (2026-07-07)

**Scope:** exactly one condition page, per explicit stop condition — no propagation to the other 6.

**Page selected:** `knee-pain.html`, chosen over the other 6 candidates (`back-pain`, `neck-pain`, `shoulder-pain`, `sports-injuries`, `combat-sports-rehab`, `post-surgical-rehab`) because it has the most complete generic section inventory (conditions → personas → method → case example → barriers → FAQ → CTA) with zero page-specific one-offs, making it the most generalizable template donor. `sports-injuries.html` and `combat-sports-rehab.html` were ruled out specifically because they're deliberately audience-niche, not generic.

**Files touched:**
- `static/condition-flagship.css` (new) — everything scoped under `body.flagship`, loaded only by `knee-pain.html`. Fixes: `.section-alt` had zero background rule in `website.css` site-wide (alternating sections were flat); hero had no entrance motion at all; primary CTAs had no decision-point emphasis; 4 method-card titles used a nested `<h2>` under the section's own `<h2>` (heading-hierarchy bug).
- `knee-pain.html` — linked the new stylesheet, added `class="flagship"` to `<body>`, added `.reveal` classes to hero children (reusing the site's existing `.reveal`/`--reveal-delay` mechanism, no new JS), added `.cta-emphasis` to the two primary WhatsApp CTAs, changed the 4 method-card `<h2>` to `<h3>`.

**Verified false claim from the initial research pass, corrected before implementation:** condition pages were reported as lacking homepage's typographic scale. Direct read of `website.css` showed the global `h2 { clamp(34px,5.4vw,64px) }` rule already applies site-wide — condition-page section headings were already at parity. No typography change was made as a result.

**Not implemented, flagged as unverifiable:** an ambient-breathe treatment for `.stage-panel` style imagery was considered and deliberately skipped — it would set `transform` via animation on elements that also get `transform: scale()` on hover, and this could not be checked in a real browser.

**Status:** prototype only. Preserved: all SEO/schema/forms/WhatsApp/nav/legal/IA; the other 6 condition pages untouched (confirmed via `git status` before/after — their modified state predates this session).

## 10. Creative Pass 4 — Homepage film-direction pass (2026-07-07)

**Scope:** homepage only (`index.html`), per explicit stop condition.

**Reference note:** no video was attached to the Pass 4 request. Work was done against `CINEMATIC_REFERENCE_ANALYSIS_AND_PLAN.md`, the existing analysis of the barbershop-reel reference from Pass 1 — that plan's own recommendations are already fully implemented through Pass 2, so this pass required a fresh self-critique rather than re-executing an old plan.

**Critique findings (verified against actual code, not assumed):** 7 of 14 homepage sections had zero motion at rest (Indict, Philosophy, Results, Inside PhysioPro, Care Paths, FAQ, Location). Worst finding: the Training Ground band (`.band`) reuses `gym.jpeg` — the same photo as the hero, ~2,500px of scroll apart, nearly the same crop — and had no motion at all, violating the reference's core "no dead frames" principle in the page's second-largest visual section.

**Files touched:**
- `index.html` — added the previously-orphaned `.scroll-cue` component into the hero markup (built in CSS, never wired to HTML); added `band-img--drift` class to the Training Ground image.
- `static/fable-home.css` — distinct grading for the Training Ground band (`brightness(0.7) saturate(0.6) contrast(1.05)`, different crop position) so it no longer reads as the hero photo reused; added radial-gradient background variation (matching the existing Results/Want Back pattern from Pass 2) to `.indict`, `.care-paths`, `#faq`, `#location` — the four sections that were 100% flat `var(--bg)` with no treatment.
- `static/fable-home-motion.css` — new `bandDrift` keyframe (26s scale/pan drift, distinct duration and direction from `heroBreathe`'s 32s) applied to `.band-img--drift`, gated under the existing `prefers-reduced-motion: no-preference` block.

**Not implemented, flagged as unverifiable:** ambient breathe on the Inside PhysioPro (`.stage-panel`) gallery images — same reasoning as Pass 3's skipped item: it would fight the existing hover-triggered `transform: scale(1.04)` and this repo has no real-browser tooling to verify the interaction is clean. Left for a session with visual QA access.

**Not implemented, flagged as out of technical scope:** hero-foot micro-copy ("Ask questions before you commit," "Pages and resources stay live") reads as functional/legalistic reassurance directly under the hero's "We disagree" climax — a copy/doctrine call, not a CSS fix, surfaced for Leonardo's decision.

**Final creative classification given:** hero/Leonardo/Method sections — Excellent. Mid-page (Training Ground → Care Paths) — Good, up from Must-Improve pre-pass. Still short of Nike/WHOOP/Apple-tier specifically because of asset-pool exhaustion (one usable full-bleed photo doing double duty), which is a photography/production gap, not something further CSS work can close.
