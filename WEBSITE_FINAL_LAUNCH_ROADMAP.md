# WEBSITE_FINAL_LAUNCH_ROADMAP.md

**Prepared:** 2026-06-19  
**Based on:** Final pre-launch audit against PHYSIOPRO_PT_BENCHMARK_GAP_AUDIT_2026-06-18.md and PHYSIOPRO_PT_BENCHMARK_GAP_ROADMAP.md  
**Commit at audit:** cd088a3  
**Decision:** Freeze architecture after one closing session, then move to authority-building.

---

## PHASE 1 — FINAL ARCHITECTURE CLOSE (1 session, ~6 hours)

These are the remaining code-fixable gaps. Complete all of these before domain launch.

| # | Task | Est. Time | Why It Matters |
|---|---|---|---|
| 1 | Add neck-pain.html dedicated condition page | 2–3 hrs | Neck pain is in what-we-treat.html with no linked destination; gap in Pain & Injury nav and in SEO |
| 2 | Add neck pain to Pain & Injury nav dropdown | 10 min | Consistency with other condition pages |
| 3 | Add LocalBusiness schema to all inner pages | 45 min | Local ranking signal; only homepage has it now |
| 4 | Add BreadcrumbList schema to condition and article pages | 45 min | Enables breadcrumb display in Google results; improves CTR |
| 5 | Remove Videos from nav dropdown OR embed 1–2 actual videos | 10 min | Empty hub in nav is a trust damage item; remove it or activate it |
| 6 | Add "No referral required" statement to first-session.html FAQ | 15 min | Removes hidden objection for patients from US/insurance contexts |
| 7 | Build pricing.html standalone page | 1–2 hrs | Converts the pricing objection to a value demonstration; no dedicated page exists |
| 8 | Normalize CTA label on lead form button to "Book on WhatsApp" | 20 min | "Send via WhatsApp" is the only remaining label inconsistency |

**Output of Phase 1:** Architecture complete. All structural, schema, and navigation gaps closed.

---

## PHASE 2 — DOMAIN & TECHNICAL LAUNCH (~1 day when ready)

Complete after Phase 1. Requires domain purchase decision from Leonardo.

| # | Task | Who | Notes |
|---|---|---|---|
| 1 | Purchase custom domain | Leonardo | Domain decision pending; ~$10–15 USD/year |
| 2 | Configure DNS to GitHub Pages | Claude Code | After domain purchase |
| 3 | Update all canonical meta tags to new domain | Claude Code | All 29 pages; update og:url and canonical href |
| 4 | Update schema URLs in JSON-LD to new domain | Claude Code | Homepage and all pages with schema |
| 5 | Update GA4 property to include new domain | Leonardo | GA4 settings → property → data streams |
| 6 | Verify custom domain in GitHub Pages settings | Leonardo | Repo settings → Pages → Custom domain |
| 7 | SSL activates automatically via GitHub Pages HTTPS | Automatic | After DNS propagation |
| 8 | Verify site loads on new domain with green padlock | Claude Code | QA check post-launch |

**Output of Phase 2:** Site live on custom domain with SSL. Canonical domain established.

---

## PHASE 3 — SEARCH CONSOLE & DISCOVERY (~30 minutes, do immediately after Phase 2)

| # | Task | Who | Notes |
|---|---|---|---|
| 1 | Add new domain to Google Search Console | Leonardo | search.google.com/search-console |
| 2 | Verify ownership via HTML tag or DNS record | Claude Code / Leonardo | HTML tag method is simplest |
| 3 | Submit sitemap.xml to Search Console | Leonardo | sitemap.xml already exists and is complete |
| 4 | Check index coverage report after 48–72 hours | Leonardo | Confirms pages are being crawled |

**Output of Phase 3:** Google can crawl and index the site with the correct canonical domain.

---

## PHASE 4 — GOOGLE BUSINESS PROFILE (~1 hour, do in parallel with Phase 2)

| # | Task | Who | Notes |
|---|---|---|---|
| 1 | Claim GBP at business.google.com | Leonardo | Uses clinicphysiopro@gmail.com |
| 2 | Complete all profile fields | Leonardo | Name, address, phone, hours, category (Physical Therapist), website URL |
| 3 | Add clinic photos to GBP | Leonardo | Lobby, gym, treatment room photos from the site |
| 4 | Set primary category: Physical Therapist | Leonardo | Secondary category: Sports Medicine Clinic or Rehabilitation Center |
| 5 | Verify listing via postcard or phone | Leonardo | Required for full GBP features |
| 6 | Add website link after domain is live | Leonardo | Update GBP with custom domain URL |

**Output of Phase 4:** PhysioPro appears in Google Maps and local search results.

---

## PHASE 5 — TRUST CONTENT PRODUCTION (ongoing, starts immediately)

These are the highest-impact trust items. None require code. All are blocked on Leonardo providing inputs.

### Priority order:

**5A. Cédula profesional number** (1 hour to locate and publish)
- Where it goes: about-leonardo.html credential block + aviso-medico.html
- Required for RLGS Art. 19 compliance + immediate trust signal for cross-border patients

**5B. First 5 Google reviews** (1–2 weeks of active outreach)
- Message 5–10 existing patients directly via WhatsApp asking for a review
- Create a QR code that links to the Google review page (place in clinic + post on Instagram)
- Once reviews exist: update Google Reviews card on homepage to display count ("★★★★★ · 8 reviews on Google")

**5C. First patient case study** (2–3 hours to write)
- One real anonymized case: condition → approach → outcome
- Format: patient type, presenting complaint, what was found, what was done, measurable result
- Publish to success-stories.html (the framework is already built and waiting)
- One real case transforms success-stories.html from trust-damage to trust-asset

**5D. "What I don't do" commitment statement** (30 minutes for Leonardo to write)
- A short paragraph on about-leonardo.html stating what PhysioPro refuses to be
- Example format: "I don't do open-ended sessions with no plan. I don't hand patients off to assistants. I don't treat pain relief as the finish line."
- This is the highest-differentiation content asset that requires zero production resources

**5E. First embedded video** (when available)
- Embed one clinical or educational video from YouTube on videos.html or directly on a condition page
- Until one video exists: Videos link remains removed from nav (per Phase 1 task 5)
- After first video is live: restore Videos to nav and update videos.html with embed

---

## PHASE 6 — AUTHORITY BUILDING (ongoing, post-launch)

These build Google authority and social trust over time. No single item is a sprint — they are sustained habits.

| Activity | Cadence | Impact |
|---|---|---|
| Publish 1 new educational article | Monthly | SEO long-tail keywords + discoverability |
| Post 3–4x per week on Instagram | Weekly | Social proof + brand presence |
| Ask every discharged patient for a review | Per discharge | Review accumulation on GBP |
| Seek 1 local affiliate partnership | Quarterly | Local authority + referral source |
| Update session and patient counts on homepage | Every 50 sessions | Keeps trust numbers current |

---

## PHASE 7 — BILINGUAL EXPANSION (future, not Phase 1)

Spanish-language content for local Tijuana SEO is a meaningful opportunity but is not an architecture priority for launch. Defer until:
- Custom domain is live and indexed
- GBP is verified
- At least 10 Google reviews exist
- A baseline of Spanish-language search traffic is confirmed in GA4

When ready: Start with a Spanish homepage and the three highest-traffic condition pages (back pain, knee pain, shoulder pain). Do not translate all 29 pages simultaneously.

---

## DECISION TREE: When Is The Site Ready To Launch?

```
Phase 1 complete? (Architecture closed)
  → No → Complete Phase 1 first
  → Yes ↓

Domain purchased?
  → No → Wait for Leonardo's decision; site is launchable on GitHub Pages subdomain in the meantime
  → Yes → Complete Phase 2 + Phase 3

GBP claimed?
  → No → Complete Phase 4 (independent of domain)
  → Yes → Site is launched

Trust content started?
  → Start Phase 5A (cédula) immediately — no dependency
  → Start Phase 5B (reviews) immediately — no dependency
  → Phase 5C, 5D, 5E can follow in order
```

---

## What "Launch Ready" Means

The site does not need to be perfect to launch. It needs to be:

1. Architecturally complete (Phase 1 done)
2. On a custom domain with SSL (Phase 2 done)
3. Indexed by Google (Phase 3 done)
4. Visible in Google Maps (Phase 4 done)

Everything in Phase 5 and beyond improves the site after it is live. Waiting for trust content before launching is backwards — you need the site indexed to start accumulating the authority that makes the trust content findable.

**The site is ready to stop construction and move into authority-building.**

---

## Summary: Remaining Work By Type

| Category | Volume | Estimated Total Time |
|---|---|---|
| Architecture (Phase 1) | 8 tasks | ~6 hours |
| Technical launch (Phase 2) | 8 tasks | ~2 hours |
| Search Console (Phase 3) | 4 tasks | 30 minutes |
| GBP setup (Phase 4) | 6 tasks | ~1 hour |
| Trust content (Phase 5) | 5 items | Weeks (Leonardo-dependent) |
| Authority building (Phase 6) | Ongoing | Indefinite |

**One focused session closes Phase 1. One afternoon closes Phases 2–4. Phase 5 starts immediately in parallel.**
