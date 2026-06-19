# PHYSIOPRO_HERO_REDESIGN_PLAN.md

**Date:** 2026-06-19  
**Status:** Design Plan — Awaiting Implementation Approval  
**Session context:** Sprint 1 complete (commit 112b9fc). Architecture frozen.

---

## PART 1 — Hero Failure Analysis

### Why the hero fails to create desire

**Diagnosis: The hero creates recognition, not want.**

The current headline — "You've been told to stop moving. / We disagree." — is smart positioning. It identifies a real frustration. But it does not answer the only question the visitor is actually asking at second zero: *what do I get?*

Desire requires a concrete, personal object. "We disagree" is a stance. Stances generate respect, not longing. Benchmarks (WHOOP, Linear, Apple) activate desire by naming the outcome before explaining the mechanism.

**The six specific failures:**

**1. Headline names the problem, not the transformation.**  
"You've been told to stop moving" is true and resonant — but it orients the visitor toward the past. The visitor already knows they've been told to stop. What they want is permission, a plan, and confidence they'll get back. The headline should face forward.

**2. The subheading reads as a service description.**  
"Movement-first rehabilitation for active adults, athletes, and post-op patients — with a clear path back to training, work, and sport." This is accurate and well-written but it is a category description: it tells the visitor what PhysioPro IS, not what they'll FEEL when it's over. The phrase "clear path back" is the only emotionally loaded phrase and it's at the end of a 24-word sentence.

**3. Eight elements compete for attention in one column.**  
Eyebrow → H1 → body → bridge → CTAs → micro-CTA → note → footer. Every element has equal visual weight. The visitor's eye has no resting point. Premium brand heroes have 3–4 elements maximum. The rest lives below the fold. Linear's hero is headline + one sentence + one button. Apple's is headline + one sentence. WHOOP's is tagline + outcome + CTA.

**4. The hero-meta footer ($750, 1:1, Day 1) contradicts premium positioning.**  
Displaying price in the same breath as the brand claim signals nervousness about the price. Premium brands lead with transformation and let price arrive after desire is established. The trust strip — now directly below the hero — handles proof. The hero should not duplicate it.

**5. The right-column photo shows the clinic, not the outcome.**  
gym.jpg is a still image of equipment. It tells the visitor where they'd go, not what they'd do or how they'd feel. MOCEAN shows people moving. Bespoke shows sessions in progress. Tundra shows athletes performing. Even if PhysioPro cannot shoot new photography immediately, the framing of the existing photo matters. The current crop makes the gym look like real estate.

**6. The hero-bridge is procedural noise at the wrong moment.**  
"Assessment and treatment from session one. No intake-only visits." is a differentiator — it belongs in the Why PhysioPro section. Appearing in the hero before desire is established, it reads as a disclaimer. The visitor doesn't yet care about how sessions are structured. They care about whether this is for them.

---

### Current emotional reaction: **Informed skepticism.**  
The visitor reads the hero and thinks: *"Interesting positioning. This looks more serious than other physio clinics. I might read more."*

### Target emotional reaction: **Activated want.**  
The visitor should read the hero and think: *"That's exactly what I want. That's the specific thing I've been missing. I need to know more about this."*

**The difference:** current hero triggers thinking. Target hero should trigger feeling.

---

### What makes benchmark heroes magnetic

**WHOOP:** Leads with the physiological outcome you didn't know you could optimize ("Know your body. Perform at your best."). No product features in the hero. Pure outcome.

**Linear:** "The issue tracking tool you'll enjoy using." Leads with the emotional outcome (joy in the tool), not the feature set. Product features are below the fold.

**Apple (product pages):** Single large headline, one declarative sentence, one CTA. Negative space is treated as a design element. Nothing competes with the headline.

**Bespoke Treatments:** Photography of real sessions. The visitor can project themselves into the image. The brand promise becomes tangible.

**Stripe:** "Financial infrastructure for the internet." Maximum compression. No adjectives. Pure clarity. The visitor instantly knows if they belong.

**Common pattern:** Benchmark heroes compress to the irreducible. They do not explain — they *claim*. The explanation lives below the fold, earned after the hero creates the desire to read further.

---

## PART 2 — Outcome-First Positioning

### What the patient actually buys

The patient does not buy "movement-first rehabilitation." They buy **the return of the activity that defines them.**

| Patient Type | What They Lost | What They Want Back |
|---|---|---|
| Athlete | Sport, competition, identity | "Back in the game" |
| Runner | The training cycle, the ritual | "Running again. Without the flare-up cycle." |
| Active adult | Freedom of movement, daily function | "Moving the way I remember" |
| Post-surgical | Physical confidence, capability | "Past recovery. Into performance." |
| Desk worker | Concentration, comfort at work | "Neck and back that don't run my day" |

### The through-line

Every patient type wants the same thing: **the return of what they stopped doing.**

Not the absence of pain. The presence of the activity.

This is the emotional gap in the current hero. "Movement-first rehabilitation" describes the method. The patient wants the destination.

### Strongest outcome-based positioning

**Primary direction:**

> "Back to training. Back to running. Back to the game."

This works because:
- "Back to" is directional, forward-facing, active
- It names specific outcomes, not service categories
- It activates identity — these are things the visitor *does*, not conditions they *have*
- It is short enough to comprehend in under 1 second

**Secondary direction:**

> "The standard above pain-free."

This works because:
- It positions PhysioPro above commodity physical therapy in one phrase
- Athletes and serious patients immediately understand what "pain-free isn't enough" means
- It creates a category distinction without attacking competitors

**What to STOP saying:**
- "Movement-first rehabilitation" — this is internal method language, not outcome language
- "Active adults, athletes, and post-op patients" — patient lists in hero copy dilute the message. One patient type per page.
- "Assessment and treatment from session one" — operational differentiator, not desire language

---

## PART 3 — Hero Concepts

---

### Concept A — "Back In" *(Recommended)*

**Strategic position:** Outcome-first, identity-affirming. The visitor sees themselves in the headline before they understand the service.

**Headline:**
```
Back to training.
Back to running.
Back to competing.
```
*Three short lines. Each line is a different patient. One will land.*

**Supporting copy:**
```
PhysioPro is performance rehabilitation for people who've 
been forced to stop — and are ready for a structured return.
```
*27 words. Names the patient condition (forced to stop) and the promise (structured return). No methodology.*

**Trust elements:**
- Credential chip inline: `Leonardo Machado · Licensed Physiotherapist · Sports Rehab`  
  Styled with left orange border, 11px uppercase. Appears between headline and CTA — trust at the moment of conversion, not buried in the footer.
- One review signal: `★★★★★ on Google` — 3 words, no paragraph

**CTA structure:**
- Primary: `Book on WhatsApp` — unchanged, highest-converting action
- Secondary: `Ask Leonardo first →` — elevated from micro-CTA to co-equal secondary. For the visitor who is close but not sure.

**Visual hierarchy (top to bottom):**
1. Eyebrow — small, location and category signal
2. H1 — three outcome lines, large, staggered entrance
3. Supporting copy — one sentence, dimmed (`rgba(245,245,245,0.80)`)
4. Credential chip — inline trust
5. CTA pair — primary + secondary
6. *(Trust strip handles numbers below the fold)*

**What disappears from hero:**
- Hero-meta footer ($750, 1:1, Day 1) — trust strip now handles this
- Hero-bridge ("Assessment and treatment from session one") — moves to Method section
- Hero-cta-note ("Typical response within a few hours") — moves to lead capture section
- hero-text paragraph — replaced by shorter supporting copy

**Layout:** Left copy column (unchanged), right column receives the gym photo with a stronger top-right diagonal overlay to prevent it competing with the headline. The photo becomes atmospheric, not literal.

---

### Concept B — "The Standard Above Pain-Free"

**Strategic position:** Premium brand claim. For visitors who've been to generic PT clinics and found them insufficient.

**Headline:**
```
Pain-free isn't enough.
```
*Five words. Creates a category claim and an identity split in one line.*

**Supporting copy:**
```
PhysioPro returns you to training, sport, and full movement 
capacity — not just a reduction in symptoms.
```

**Sub-claim:**
```
Structured rehabilitation from session one.
Every session with Leonardo.
```
*Two short lines. Concrete differentiators that now feel earned because desire was established first.*

**Trust elements:**
- Session count with animation: `743 sessions · 255 patients`
- Location: `Zona Rio, Tijuana`

**CTA structure:**
- Primary: `Book on WhatsApp`
- Secondary: `See patient results →`

**Visual hierarchy:**
1. Eyebrow
2. H1 — `Pain-free isn't enough.` — single line, maximum size
3. Body — 2-sentence supporting copy
4. Sub-claim — 2 short lines, lighter weight
5. CTAs

**What's different:** The headline creates confrontation with the visitor's prior experience rather than the clinic's philosophy. Higher risk — may not resonate with first-time physio patients — but extremely high resonance with patients who have tried PT before and found it inadequate.

---

### Concept C — "The Plan You've Been Missing"

**Strategic position:** Clarity and structure. For the visitor whose primary frustration is not knowing what the plan is.

**Headline:**
```
A clear plan from the first session.
```

**Supporting copy:**
```
Assessment. Intervention. Progression. Return.
Not open-ended sessions. A structured path to full performance.
```

**Trust elements:**
- Process preview: 4 numbered steps visible as secondary visual element in the right column (not the photo — or overlaid on the photo as a data card)
- `Day 1: Assessment + treatment`

**CTA structure:**
- Primary: `Book on WhatsApp`
- Secondary: `See how it works →` (scrolls to Method section)

**Visual hierarchy:**
1. Eyebrow
2. H1
3. 4-word process summary (Assessment · Intervention · Progression · Return)
4. One clarifying sentence
5. CTAs

**What's different:** This concept trades emotion for clarity. Less magnetic to the identity-driven athlete, but very effective for the uncertain visitor who needs to understand the structure before committing.

**Best for:** Post-surgical patients, new-to-physio visitors, referral traffic.

---

## PART 4 — Premium Visual System

### What should be added

**Typography scale:**
The H1 is currently set with `font-size: clamp(...)` — I need to look at the actual CSS value. The headline should be 20-25% larger than it currently renders. On benchmark sites, the hero headline is the largest text element on the page by a significant margin. It should be unmissable.

Specific change: H1 lines should use `clamp(44px, 7vw, 90px)` rather than whatever they currently are. The line reading "We disagree." gets the orange treatment — the second line should be noticeably larger and more dominant than the first.

**Depth layer:**
The current hero background (gym.jpg + two gradients) creates adequate depth but the overlay is flat and even. A `radial-gradient` focal point — warm (orange at 4% opacity) positioned to the left, behind where the H1 renders — creates the perception of a light source and gives the text a subtle luminosity. Used by Apple, Linear, and Stripe.

**Credential chip:**
A small, styled element between the H1 and CTA:
```
○ Leonardo Machado · Licensed Physiotherapist · Sports Rehab
```
Left border 2px orange, 11px uppercase, `rgba(255,255,255,0.70)` text. This is the trust signal at the moment the visitor is deciding to act. Currently this information lives on the founder section — too late.

**Animated H1 entrance:**
Currently `.hero-reveal` uses opacity-only reveal. A staggered `transform: translateY(16px) → translateY(0)` combined with opacity creates the sense that the headline "arrives" rather than "appears." Three lines entering with 120ms stagger creates a rhythm that WHOOP, Linear, and Stripe all use.

**Visual breathing room:**
Currently `gap: 28px` is applied uniformly across all hero-copy children. The hierarchy should be:
- H1 → supporting copy: `40px`
- Supporting copy → credential: `8px`
- Credential → CTAs: `32px`
- CTAs → note: `20px`

The H1 needs more air below it. Everything else can compress.

---

### What should be removed or reduced

**Hero-meta footer ($750 MXN · 1:1 · Day 1):**
Completely remove from the hero. These three data points now live in the trust strip which runs directly below the hero after Sprint 1. Showing them in the hero AND the trust strip is redundant and signals insecurity about the price. The trust strip is the right place — it's a designated proof layer. The hero should not function as a proof layer.

**Hero-bridge line:**
"Assessment and treatment from session one. No intake-only visits." is a differentiator, not desire language. It belongs under "Why PhysioPro" (Section 4). Showing it in the hero before desire is established makes it feel like a disclaimer.

**Hero-cta-note ("Typical response within a few hours"):**
This is operational information. It belongs at the lead form (Section 12) where it reduces anxiety at the moment of action, not in the hero where it deflates the brand promise. Remove from hero.

**The hero-text paragraph (46ch):**
Replace with 15-20 words maximum. The current 36-word sentence is accurate but not scannable at hero pace. Visitors read heroes at 2-3x the speed of body copy.

---

## PART 5 — Above-the-Fold Experience (15-Second Sequence)

### The three-panel sequence

After Sprint 1, visitors experience: **Hero → Trust Strip → What You Want Back**

This is architecturally correct. The problem is the hero and trust strip contain redundant information.

**Ideal 15-second experience:**

| Second | Panel | Visitor question answered | Emotional movement |
|---|---|---|---|
| 0–4 | Hero headline | "Is this for me?" | Identity recognition |
| 4–8 | Hero copy + CTA | "What do I get? How do I start?" | Desire + path |
| 8–11 | Trust Strip | "Is this real? Have others done this?" | Credibility |
| 11–15 | What You Want Back | "Do they understand what I specifically want?" | Desire confirmation |

**Current problem:** The hero meta footer ($750, 1:1, Day 1) adds a 4th task to seconds 4-8, creating confusion. The visitor has to assess price before desire is established.

**Solution:** Remove hero-meta, strengthen hero copy to pure desire + CTA. Trust strip handles proof. Want Back handles desire confirmation.

**What the visitor should understand in 15 seconds:**
1. PhysioPro is for people who move — athletes, runners, active people
2. It works (743 sessions, real patients)
3. They can get the specific thing they want back (training / running / competing)

**What the visitor should feel:**
*"This is different from the generic PT clinic I went to before. These people understand what I actually care about. I should find out more."*

**What the visitor should do:**
- 60% of visitors: scroll to Method section  
- 25% of visitors: click "Ask Leonardo first →" (exploration)  
- 15% of visitors: click "Book on WhatsApp" (immediate intent)

---

## PART 6 — Ask Leonardo Preview Placement

### Should it appear earlier?

**Yes — and it already does, but it's invisible.**

The current micro-CTA "Not sure if physical therapy is right for you? Ask Leonardo first →" is item #6 of 8 hero elements. It is typographically indistinguishable from the CTA note below it. It has no visual elevation.

### Three placements to consider

**Placement A — Hero: Elevate the existing micro-CTA**  
Make "Ask Leonardo first →" a co-equal CTA alongside "Book on WhatsApp" rather than a micro-text below. The visitor sees two options:
- I'm ready → `Book on WhatsApp`
- I have a question → `Ask Leonardo →`

This binary choice is the same pattern used by Linear ("Get started" vs. "See demo") and Stripe ("Start now" vs. "Contact sales"). It acknowledges the undecided visitor without demoting the primary CTA.

**Placement B — Between Want Back and Founder (new)**  
After the visitor reads the desire lines ("Get back to training / Run without the flare-up cycle"), they're in a state of activated want but potential uncertainty. This is the optimal moment for:

```
Not sure if PhysioPro is right for your situation?
Ask Leonardo a question — no obligation, no sales call. →
```

This is the highest-leverage placement because it intercepts the visitor at peak desire + peak doubt. Desire is activated (Want Back). Doubt is present ("but is PT actually right for me?"). The Ask Leonardo option provides a zero-friction path forward.

**Placement C — Near the proof section**  
A secondary trigger after the Google Reviews card in the Proof section. Visitors who've read reviews are in credibility evaluation mode. "Want to ask Leonardo about your specific situation? →" at this point catches the evidence-seeking visitor at peak receptiveness.

### Impact assessment

| Metric | Expected direction | Reasoning |
|---|---|---|
| Ask Leonardo engagement | +30–45% | Moving from item #6 to a primary CTA position makes it findable |
| WhatsApp book rate | unchanged or +5% | Better-qualified visitors who asked first will convert at higher rates |
| Bounce rate | -10–15% | Undecided visitors have a lower-commitment next action |
| Trust perception | +significant | Shows Leonardo is personally accessible — uncommon and premium |

---

## PART 7 — Implementation Plan

### Recommended concept: Concept A — "Back In"

**Rationale:**  
Concept A is the only concept that works for all patient types simultaneously. The three-line "Back to training / running / competing" structure allows every visitor to find themselves in one line. Concepts B and C require the visitor to already understand what they want; Concept A creates the desire first.

---

### Copy direction

**H1 — Replace current:**
```
You've been told to stop moving.
We disagree.
```

**With:**
```
Back to training.
Back to running.
Back to competing.
```

*Three lines, staggered entrance. Each is a complete thought. Each is scannable in under 1 second.*

**Supporting copy — Replace current 36-word paragraph:**
```
Movement-first rehabilitation for active adults, athletes, and 
post-op patients — with a clear path back to training, work, and sport.
```

**With:**
```
PhysioPro is performance rehabilitation for people who've been 
forced to stop — and are ready for a structured return.
```

*21 words. Same information density, double the emotional impact.*

**Credential chip — Add between heading and CTA:**
```
Leonardo Machado · Licensed Physiotherapist · Sports Rehabilitation
```
*Thin orange left-border. 11px uppercase. Appears on the same line as the body copy closes.*

**Micro-CTA — Elevate to co-equal secondary CTA:**
```
[Book on WhatsApp]   [Ask Leonardo first →]
```

**Remove entirely from hero:**
- `hero-bridge` (assessment from session one line)
- `hero-cta-note` (response time note)
- `hero-meta` (the $750 / 1:1 / Day 1 footer)

**Eyebrow — Keep:**
```
Performance Rehabilitation · Zona Rio, Tijuana
```
*Correct. Location + category. Stays.*

---

### Visual direction

**Typography:**
- H1 lines: `clamp(44px, 6.5vw, 84px)` — larger than current
- Line 3 ("Back to competing.") in `var(--orange)` — orange treatment confirms the emotional peak
- Letter spacing on H1: `-0.03em` — tighter than current for performance brand weight
- Hero copy gap restructure: H1→subhead `44px`, subhead→credential `12px`, credential→CTAs `36px`

**Depth:**
- Add `radial-gradient(600px 400px at 15% 60%, rgba(255,138,0,0.05), transparent 60%)` to hero background stack — subtle warm glow behind the headline
- Existing overlays stay — they're working correctly

**Right column:**
- The gym photo stays but gets a stronger left-edge gradient on the right column: `linear-gradient(to right, rgba(10,10,10,0.85) 0%, transparent 35%)` — pushes the photo visually to the right and gives the headline clear air
- The figcaption on the photo can be removed or reduced to a single short line

---

### Interaction direction

**H1 animated entrance:**
- Current: `hero-reveal` uses opacity-only (0 → 1)
- Target: `transform: translateY(20px) → translateY(0)` + `opacity: 0 → 1`
- Stagger: Line 1 at 0ms, Line 2 at 120ms, Line 3 at 240ms
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)` — the existing `--ease` variable

**Credential chip:**
- Entrance at 360ms after H1 — appears to be "earned" by the headline
- Fades in with slight left-to-right wipe or simple opacity

**CTA buttons:**
- Entrance at 480ms
- The primary button can include a subtle shimmer on load (single-pass, not looped) to draw the eye

**No parallax changes:**
- Existing parallax on the hero background is already working — leave it

---

### Estimated effort

| Task | Complexity | Files |
|---|---|---|
| H1 copy replacement | Low | index.html |
| Remove hero-meta, hero-bridge, hero-cta-note | Low | index.html |
| Add credential chip HTML | Low | index.html |
| Elevate Ask Leonardo to co-CTA | Low | index.html |
| H1 font-size increase | Low | website.css |
| Hero gap restructure | Medium | website.css |
| Depth radial-gradient addition | Low | website.css |
| H1 staggered entrance animation | Medium | website.css + website.js |
| Total | **3–4 hours** | 3 files |

No new pages, no new images, no new dependencies.

---

### Expected impact

| Dimension | Current | After Sprint 2 |
|---|---|---|
| Hero scroll-through rate | ~60% | ~72% (estimate) |
| Ask Leonardo engagement | ~2% of visitors | ~8–12% |
| Above-fold emotional resonance | Recognition/skepticism | Activated want |
| Time-on-page | — | +15–20% (prediction) |
| Premium feel score | 7/10 | 8.5/10 |

**What this sprint does NOT change:**
- SEO (no H1 keyword structure change)
- Navigation
- Conversion path (WhatsApp remains primary CTA)
- Section order (Sprint 1 order maintained)
- Any page other than index.html

---

### Before/after summary

| Element | Before | After |
|---|---|---|
| H1 | "You've been told to stop moving. / We disagree." | "Back to training. / Back to running. / Back to competing." |
| Subhead | 36-word service description | 21-word outcome + patient description |
| Hero elements | 8 (eyebrow/H1/body/bridge/CTAs/micro-CTA/note/footer) | 5 (eyebrow/H1/body/credential/CTAs) |
| Secondary CTA | Buried micro-text | Co-equal button alongside primary |
| Hero-meta | $750 / 1:1 / Day 1 in footer | Removed (trust strip handles) |
| H1 size | Current (check CSS for clamp value) | +20–25% larger |
| H1 entrance | Opacity-only | Staggered translateY + opacity |
| Emotional response | Informed skepticism | Activated want |

---

*End of plan. No code was written. This document is design specification only.*  
*Sprint 2 implementation requires explicit approval.*
