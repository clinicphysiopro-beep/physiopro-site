# Setmore → CRM Booking-Attribution: Investigation & Options

**Status: investigation only. Nothing in this document is implemented.**
Written 2026-08-27 as a companion to `FUNNEL_TAXONOMY.md`'s tier-C gap.

## What exists today

There is **no direct Setmore API or webhook integration** in this codebase.
What exists is an indirect bridge:

- `calendar_sync.py` polls Leonardo's Google Calendar every 30 minutes
  (Setmore auto-writes its bookings there) and upserts into `appointments`
  via `upsert_calendar_appointment()`, hardcoding `booking_source='setmore'`.
- **This bridge is currently broken.** The OAuth token expired
  (`invalid_grant`) as of the last documented check (2026-06-27,
  `GOOGLE_CALENDAR_OAUTH_STATUS.md`) and has been failing on every 30-minute
  run since. `ops_health.py` still monitors it as a live check. **Any
  future architecture needs this token re-authorized regardless of which
  path below is chosen** — it's how appointment rows land at all today.
- Linking a booking to a lead currently happens only via
  `attribution_completion.py` / `migrate_attribution_gaps.py`: an exact
  `LOWER(TRIM(patient_name))` match after stripping Setmore's `" for
  <service>"` suffix. Brittle by nature (typos, nicknames, shared names —
  the migration script's own counters track `skipped_no_match` and
  `skipped_ambiguous`).
- **A second, more fundamental blocker, independent of matching method:**
  Setmore-sourced appointments currently have **~0.8% phone-number
  coverage** (`ops_health.py`, `PHYSIOPRO_DECISION_REGISTER.md` Decision
  #7) — Setmore's booking form doesn't require a phone field. Any
  phone-based matching approach is dead on arrival until this is fixed in
  Setmore's own admin settings (Leonardo action, already an open decision
  item, not something this codebase controls).

## What Setmore's platform actually offers (2026)

- **API access** requires a Setmore Pro account and a manual approval
  request to `api@setmore.com` — no self-serve signup, turnaround unknown.
  OAuth 2.0.
- **Webhooks** exist for `appointment.created`/`appointment.updated`, but
  are documented by Setmore as fire-and-forget with **no automatic retry**
  if the receiving endpoint is briefly down.
- **REST polling** is available as an alternative, same API-approval gate.
- **Zapier/Make** offer a lower-friction "New Appointment" trigger without
  the Pro-API approval process — at the cost of adding a third-party SaaS
  as a processor of appointment data (name/phone/time, not clinical notes)
  plus a subscription cost.
- **Custom fields on the public booking form** exist but are always
  visible to the customer — no confirmed mechanism for a silent,
  auto-populated hidden token via a URL parameter. Treat this as
  **unverified**; it would need a direct question to Setmore support, not
  an assumption, before anything is designed around it.

## Candidates compared

| | A. Fix Google-Calendar bridge, match by phone | B. Setmore webhook, match by phone | C. Opaque lead-token in a Setmore note | D. Setmore API polling, match by phone |
|---|---|---|---|---|
| Reliability | High, once phone coverage is fixed | High, real-time | Highest — exact ID, no fuzzy logic | Medium-high — polling window can miss fast cancel/rebook |
| New PHI exposure | None | None | None (token is opaque) | None |
| Complexity | **Low** — reauth token (existing runbook) + Leonardo fixes one Setmore admin setting | Medium — Pro/API approval, new endpoint, retry-on-failure logic (Setmore doesn't retry) | Medium-high — needs a reliable injection point (manual, since URL-param auto-fill is unverified) | Medium — same API gate as B, plus scheduling/dedup |
| Needs Setmore Pro/API approval | No | Yes | No (if injected via the existing calendar-sync free-text path) | Yes |
| Changes the website's public flow | No | No | No, if Leonardo adds the token manually during the WhatsApp handoff | No |

**Explicitly rejected for every candidate:** sending diagnosis, condition,
or any clinical detail into Setmore, GA4, or a UTM/URL parameter. None of
the candidates require it. Every match key considered (phone, exact
booking name, opaque UUID) either already exists in the CRM (phone) or
carries zero clinical meaning by construction (a random token). Any future
proposal that would embed a patient's stated condition into a note field,
analytics event, or URL should be rejected outright regardless of
implementation convenience.

## Recommended path (sequenced, for a future scoped task)

1. **Cheapest, do first:** re-authorize the Google Calendar OAuth token
   (existing runbook, ~10-minute action) and have Leonardo make the phone
   field required in Setmore's own admin settings (Decision Register #7).
   This alone unblocks **Candidate A** using infrastructure that already
   exists — zero new integration surface, zero new PHI exposure — and
   fixes the root cause that would also cripple B and D.
2. **If near-real-time linkage becomes a genuine need**, not just
   reporting: pursue **Candidate B** (Setmore webhook), budgeting for
   unknown Pro-API approval lead time and designing the receiving endpoint
   to be idempotent given Setmore's no-retry behavior.
3. **Candidate C** is the most provably-correct match technically, but is
   operationally the weakest today — it depends on Leonardo reliably
   pasting a token during a live WhatsApp conversation, since the one thing
   that would make it silent (a URL param pre-filling a hidden field) is
   unverified. Worth a direct question to Setmore support before ruling in
   or out.
4. **Candidate D** is a fallback only if B's approval stalls, and
   duplicates B's API gate for less real-time value than the calendar-sync
   job already in place.

## Explicitly not decided or implemented here

- Which candidate to build, or when.
- Whether to pursue the URL-param / hidden-field variant of Candidate C
  (requires confirming with Setmore support first).
- Any change to Setmore's own admin configuration.
- Any change to `calendar_sync.py`, `attribution_completion.py`, or any
  CRM-side code.

Full source citations and file-level detail live in the investigation
record for this task (see session build log).
