# PhysioPro Website — Production State

**Status: SUPERSEDED AS OF 2026-08-28. This file previously self-declared itself "the single canonical current-state document" — that claim was false by the time of this correction (its last real update was 2026-08-04, three-plus weeks before the site's actual current state). Do not treat this file as canonical going forward.**

**Actual canonical sources, in order of authority:**
1. `PHYSIOPRO_OS/PHYSIOPRO_BRAIN/02_OPERATIONS_BRAIN/subsystem_indexes/WEBSITE_SYSTEM_INDEX.md` — top-level pointer, always check first.
2. `PHYSIOPRO_OS/PHYSIOPRO_BRAIN/SESSION_HANDOFF.md` — current operational state.
3. `physiopro-site/FUNNEL_TAXONOMY.md` — canonical GA4 event taxonomy (runtime repo, not mirrored to Vault).
4. `physiopro-site/SETMORE_CRM_ATTRIBUTION_OPTIONS.md` — booking-attribution investigation state.
5. Dated build logs in `PHYSIOPRO_OS/PHYSIOPRO_BRAIN/02_OPERATIONS_BRAIN/system_build_logs/` — search `BUILD_LOG_INDEX.csv` first.
6. `git log` on this repo — the ground truth for what actually shipped. **Multiple independent deploys can land on the same calendar day** — always check commit ancestry (`git merge-base --is-ancestor <ref> origin/main`) rather than trusting a single day-named build log to be exhaustive for that day.

## What was wrong with this file, corrected here

- **The Fable/Release-1 saga this file chronicled through 2026-08-04 (Turnstile lead-pipeline investigation, sanitized-branch preparation, build-config blockers) is resolved and moot.** The site has been live in production on Cloudflare Pages via `GitHub main → Cloudflare Pages` (build command `npm run build`, output `dist`) since Release 1 actually shipped. Wrangler direct-upload is not used.
- **"index.html runs Fable 5, all other pages run the legacy system" is no longer the deployment architecture.** As of 2026-08-26/27: the real deployed homepage source is `release/production-homepage.html` (built by `scripts/build-cloudflare-pages.mjs` into `dist/index.html`) — it now carries the Fable-derived visual layer (founder video, 6-step process, 3-panel gallery, scroll-spine, 9-question FAQ) as the actual production homepage, not a separate excluded system. **Root `index.html` is a stale, unused local file — it is not referenced anywhere in the build pipeline and does not affect production.** Treat it as dead weight, not a second live design system, until someone deliberately cleans it up.
- **The "no fabricated proof" trust-layer fix (Phase 3) described here did happen and is still true today** — no fabricated case studies, ratings, or reviews are present in production as of 2026-08-28 (independently re-verified).
- **Bilingual `/es/` now exists** (it did not as of this file's last update) — see `WEBSITE_SYSTEM_INDEX.md` for current bilingual coverage, which expanded materially on 2026-08-28 beyond the original 3-page pilot.
- **Legal pages remain intentionally non-operative drafts** (`aviso-privacidad.html`, `aviso-medico.html`, `aviso-cookies.html`, `derechos-arco.html`) pending a Leonardo + counsel decision packet — see the latest legal decision packet in `PHYSIOPRO_OS/vault/PHYSIOPRO_VAULT/WEBSITE/` for the exact open fields. This file's Phase 1 "legal-page factual errors" fix was a different, earlier, narrower correction (removing false claims) — it did not resolve the still-open PENDING fields.

## Historical narrative (archival only — do not use for current-state decisions)

The detailed phase-by-phase Fable/Release-1 build narrative this file previously carried (Discovery through Creative Pass 4, the Turnstile investigation, the three Release-1.x branch-preparation entries) remains available in this file's git history (`git log -- WEBSITE_PRODUCTION_STATE.md`) for anyone doing historical/continuity research. It has been removed from the live copy of this file so it can no longer be mistaken for current state — that confusion is exactly what prompted this correction.
