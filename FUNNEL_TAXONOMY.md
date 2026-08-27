# Conversion Funnel Taxonomy

Canonical GA4 event names for physioprotijuana.com. Source of truth — if
`static/website.js` and this file disagree, this file is wrong and should be
updated to match, not the other way around silently.

Established 2026-08-27, alongside the attribution-gap remediation work
following the Post-Launch Measurement Baseline. All events below fire only
via `gtag('event', ...)` — no second analytics library, no new tracker.

## Design rules (apply to every event, current and future)

1. **No patient/medical information in any event or its parameters.** Not
   the visitor's name, phone, email, typed question, chat message content,
   or health-category selection. If a value could describe a specific
   person's health situation, it does not go into GA4 — full stop. This
   applies to event names, event params, and the URL parameters GA4
   auto-captures (`page_location` etc. are fine — they're structural, not
   personal).
2. **Micro-conversions are distinct from real conversions.** An `_attempt`
   event fires on client-side submit intent, before the server confirms
   anything. The real conversion event (no `_attempt` suffix) fires only
   after a confirmed successful write. A gap between the two is a technical
   failure signal (broken API, Turnstile failure, network error) — not a UX
   metric.
3. **One event, one meaning.** No event name is reused for two different
   things. No two events double-count the same user action.

## Event reference

| Event | Fires when | Params | Tier |
|---|---|---|---|
| `page_view` | Automatic (GA4) | — | micro |
| `scroll` / `form_start` / outbound `click` | Automatic (GA4 Enhanced Measurement) | GA4-defined | micro |
| `whatsapp_click` | Any `wa.me` link is clicked, anywhere on the site | `cta_location`, `source_page`, `site_language` | micro |
| `phone_click` | Any `tel:` link is clicked, anywhere on the site | `cta_location`, `source_page`, `site_language` | micro |
| `scroll_depth` | Custom 25/50/75/90% thresholds | `event_label` (percent), `value` | micro |
| `chat_open` | Chat widget opened | — | micro |
| `chat_message` | A chat message is sent | — (message content never included) | micro |
| `lead_form_attempt` | Homepage lead form submit button clicked, client-side | — | micro |
| `lead_submit` | Homepage lead form: server confirmed the lead was queued to the CRM | `source`, `utm_medium`, `utm_campaign` | **conversion** |
| `ask_leonardo_attempt` | Ask Leonardo form submit button clicked, client-side | — | micro |
| `ask_leonardo_submit` | Ask Leonardo form: server confirmed the question was queued to the CRM | `source`, `utm_medium`, `utm_campaign` | **conversion** |
| `booking_complete` | *(reserved, not implemented)* | *(TBD — depends on the booking-attribution architecture chosen; see below)* | **conversion** |

Renamed in this pass for consistency (old → new): `whatsapp_cta_click` →
`whatsapp_click`; `lead_form_submit` → `lead_form_attempt`;
`lead_form_success` → `lead_submit`; `ask_leonardo_submit` (old, fired on
client submit) → `ask_leonardo_attempt`; `ask_leonardo_success` →
`ask_leonardo_submit` (new meaning: confirmed conversion, matching this
taxonomy's name for it). GA4 had only just started successfully sending any
hits (the CSP fix landed the same day) — there is effectively no historical
data under the old names to reconcile against, so this was the right time to
settle the naming before real volume accumulates.

## `cta_location` values (whatsapp_click / phone_click)

Derived automatically from DOM position via `classifyCtaLocation()` in
`website.js` — never hand-maintained per page or per link:

| Value | Matches |
|---|---|
| `sticky_fab` | `.sticky-whatsapp` |
| `nav` | `.topbar`, `.nav`, `header` |
| `hero` | `.hero`, `.hero--full` |
| `footer` | `.footer` |
| `form_area` | `.lead-capture`, `[data-lead-form]`, `#ask-form` |
| `body` | Everything else (in-page copy, condition-page CTAs, etc.) |

## Attribution tiers — read this before assuming any number means more than it does

**A. GA4 click-level attribution.** `whatsapp_click` / `phone_click` tell
you a visitor on a given page, in a given zone, in a given language,
clicked a WhatsApp or phone link. This is now fully working (see
`static/website.js`) and requires no further work.

**B. CRM lead attribution.** For the two on-site forms (lead-capture,
Ask Leonardo), UTM parameters and landing page are captured client-side
(`captureAndStoreUtms`/`getStoredUtms`) and carried through
`functions/api/lead.js` / `functions/api/ask.js` into the `LEAD_QUEUE` and
from there into the CRM database schema intact. **This tier genuinely
works end-to-end for the form path.**

For static WhatsApp/phone links, **tier B does not exist and cannot be
retrofitted without changing what the visitor sees.** A `wa.me` or `tel:`
link carries no payload into WhatsApp or the phone dialer — there is no
hidden channel. The only way any attribution signal could reach the CRM
side of a direct WhatsApp click is if the visible pre-filled message itself
carried a reference tag Leonardo could read and copy into the CRM by hand.
That is a genuine option (see below) but it changes what the visitor reads
before sending the message, so it was **deliberately not implemented in
this pass** — it's a product/UX call for Leonardo, not an engineering
default. Until that decision is made: **direct WhatsApp/phone clicks have
tier A attribution only, never tier B.** Do not report a WhatsApp-lead count
by UTM/campaign as if it came from the CRM — it doesn't exist there.

*If Leonardo wants tier B for direct clicks later:* the minimum change is
appending a short, clearly-labeled, non-PHI reference code to the existing
pre-filled message (e.g. a trailing `Ref: WA-BACKPAIN-NAV` line) — visible
to the visitor, honest about what it is, and something Leonardo could
manually key into the CRM. This is the smallest change that would work; it
was not built here because it alters visitor-facing message text, which was
explicitly out of scope for this pass.

**C. Booked-patient attribution.** Does not exist yet for *any* channel,
form or WhatsApp. See the companion investigation
(`SETMORE_CRM_ATTRIBUTION_OPTIONS.md`) for the options considered to close
this gap and the recommended path — not implemented in this pass by design.

## What NOT to conflate

- A `lead_submit` count is **not** a booking count. It's a CRM record.
- A `whatsapp_click` count is **not** a lead count. Most of these clicks
  never reach the CRM (see tier B above).
- `booking_complete` does not exist yet. Nothing in production currently
  fires it or could correctly fire it — see the companion investigation
  doc for why.
