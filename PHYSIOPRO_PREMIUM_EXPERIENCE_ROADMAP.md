# PHYSIOPRO PREMIUM EXPERIENCE ROADMAP

**Date:** 2026-06-19  
**Role:** Senior Product / UX / Conversion / Motion Designer  
**Scope:** Experience, feel, hierarchy, motion, emotion — not architecture, not SEO  
**Status:** Planning only. No code. No implementation.

---

## THE DIAGNOSIS BEFORE THE PRESCRIPTION

Before the audit sections, one thing must be stated plainly:

**The problem is not any single element. The problem is uniform density at a uniform pace.**

The homepage runs 13 sections at the same visual weight, same color contrast, same card format, same font scale, same motion behavior — from section 1 to section 13 — with no variation in rhythm. The user never slows down for something dramatic. They never speed up through something minimal. The page doesn't breathe.

WHOOP creates a page where you feel like you're watching a cinematic trailer. Linear creates a page where every hover confirms that this is built by obsessives. Bespoke creates a page where you instantly know you're dealing with a doctor-level clinician.

PhysioPro creates a page where you correctly understand what the clinic does.

That is the gap. Correctness versus desire. Information versus experience.

The following recommendations exist to close that gap. None require new content. Most require only CSS and ~200 lines of JS.

---

## PART 1 — HOMEPAGE EXPERIENCE AUDIT

### The Hero

**What is currently there:**

Headline: "You've been told to stop moving. / We disagree."  
Sub: "Movement-first rehabilitation for active adults, athletes, and post-op patients — with a clear path back to training, work, and sport."  
Bridge: "Assessment and treatment from session one. No intake-only visits."  
Actions: Book on WhatsApp / See how it works  
Micro-CTA: "Not sure if physical therapy is right for you? Ask Leonardo first →"  
Meta row: $750 MXN / 1:1 / Day 1  
Right panel: Static photo of the gym (empty room, tripod shot)

**What is wrong:**

The headline is excellent — it earns its place. The sub-headline is competent but long (27 words). The meta row is where the real differentiation lives but it sits below three other text elements and reads as small print, not as a marquee statement.

The right panel is the critical failure. A photo of an empty room does not sell performance rehabilitation. WHOOP's hero shows an athlete wearing the product. Apple's hero shows the product itself in extraordinary detail. Tundra's hero shows an athlete in motion. PhysioPro's hero shows an empty gym.

The visitor's brain automatically asks: who are these people for? The image should answer that immediately. It currently answers: this is a room.

There is also no visual tension. The design is competent and the copy is correct. But nothing on the first screen creates the feeling that missing this clinic would be a mistake.

**Why the homepage doesn't create desire:**

1. **The image communicates space, not outcome.** No human presence, no performance signal, no identity trigger. The patient can't see themselves in an empty room. They could see themselves in an athlete training again.

2. **The emotional hook is in the wrong position.** "What You Want Back" — the outline-fill desire lines ("Get back to training / Run without the next flare-up") — is section 10. This is the most emotionally charged element on the entire site. It creates identity resonance and should arrive before the page loses the visitor.

3. **The three consecutive card grids are a catalog, not a story.** Who We Help (6 cards) → What We Treat (6 cards) → Why PhysioPro (4 cards) = 16 identical-format cards across 3 sequential sections. This communicates "we are thorough" but not "we are exceptional." The experience is: browsing a menu, not making a decision.

4. **The proof is too late and too small.** The trust strip (743+ / 255+ / 1:1 / Day 1) appears immediately after the hero. The numbers are right. But they are static, they are small (15px), and they disappear in a thin horizontal band before the founder section. These numbers should feel like achievements, not footnotes.

5. **The Founder section has a strong quote but weak CTA.** The section is visually correct — cool background, portrait with orange corner accent, left-border quote. The problem: the CTA below the founder is a secondary ghost button ("Book on WhatsApp"). The founder section is where decision energy is highest. A primary CTA belongs there.

6. **The mid-page CTA is a orange-tinted banner with centered text.** "Ready to see what structured rehab actually looks like?" is a reasonable copy line, but the presentation — text + button centered on a pale orange background — looks like an email newsletter CTA. It has no visual drama and no connection to the content before or after it.

7. **"Before You Book" and the lead form are separated.** The FAQ section handles objections (7 items). The location block handles logistics. The lead capture form handles action. But these three things that belong together — objection → logistics → conversion — are visually distinct sections with gap between them.

---

**What exact elements are missing:**

- A human presence in the hero image (a body in motion, or Leonardo mid-treatment)
- A number that earns weight through animation (743 counting up to the number on scroll)
- The desire-activation layer ("What You Want Back") much earlier in the page
- A visual element that makes the hero section feel large and distinctive (not just competent)
- One section that stops the scroll — something dramatically different in proportion or treatment
- A clear emotional escalation curve (the page should peak at the Founder section and funnel tightly to conversion after)

---

## PART 2 — VISUAL HIERARCHY AUDIT

### Headline Sizing

`h1`: `clamp(46px, 9.2vw, 122px)` — Correct. The headline is big.  
`h2`: `clamp(34px, 5.4vw, 64px)` — Also big. Used for 8+ section headlines.  
`h3`: `clamp(15px, 1.4vw, 19px)` — Small. Used for all card titles.

**The problem:** h1 and h2 are both large and both uppercase. At 34–64px, h2 section headlines are only slightly smaller than the hero h1. The scale differential between "You've been told to stop moving" and "A clear process from the first session forward" is insufficient for hierarchy signaling. The visitor's eye cannot tell which heading is more important.

Benchmarks use extreme scale contrast. Linear's h1 is 72px. Its section sub-headlines are 40px. Its card titles are 18px. The 4:1 scale ratio creates a clear hierarchy. PhysioPro's h2:h3 ratio is approximately 3:1 — correct in principle, but h2 being used for every section heading collapses the hierarchy.

---

### Typography Rhythm

The type system has two modes: headlines (Montserrat 800 uppercase) and body (Manrope, text-2 color). There is no intermediate style.

**Missing layers:**

- A "display quote" style (36–48px, not uppercase, italic or semi-bold) — for the founder quote, for testimony pulls, for key assertions
- A "large body" style (18–20px, not uppercase, color: text) — for section introductions and lead paragraphs
- A "caption" style (11px, color: text-2, spacing 0.22em) — already exists in figcaption and trust-chip labels ✓

The founder quote currently uses `.quote` at `clamp(20px, 2.6vw, 32px)`. That is exactly the missing intermediate style — but it only appears once. The proof assertions (4 items, orange left-border) use a separate style. The "want back" items use massive display type. None of these are connected into a coherent typographic system that can be reused.

---

### Section Hierarchy

13 sections. Each uses `var(--sec-y)` padding (`clamp(88px, 13vw, 180px)` top and bottom). Only two sections deviate: section-founder and #want-back use `clamp(100px, 14vw, 200px)` — marginally larger.

**Result:** All 13 sections read at the same visual weight. A section with 4 cards "weighs" the same as the founder section. A section with 6 cards weighs the same as the lead capture form.

Premium sites create a clear section hierarchy through three mechanisms:

1. **Scale contrast** — some sections are full-viewport, others are compact
2. **Density contrast** — some sections are text-only and spacious, others are information-dense
3. **Color contrast** — some sections break from the palette entirely (an all-white section on a dark-dominant site, or vice versa)

PhysioPro uses color alternation (bg/surface/cool-surface) but the contrast is too subtle to create visual chapters. The grid overlay pattern (`body::before` — fine grid lines) makes every section feel related, which is aesthetically coherent but reduces sectional separation.

---

### Whitespace

The clamp spacing system is technically correct but behaviorally uniform. The result: every section feels equally important and equally padded. Important sections should feel more open. Dense sections should feel tighter.

**Specific problem:** The trust strip (4 chips: 743+ / 255+ / 1:1 / Day 1) has horizontal padding `var(--pad-x)` and vertical padding 22px per chip. These are the clinic's hardest proof points, and they are the most compressed element on the page — sandwiched between two full sections.

---

### Visual Anchors

A visual anchor is an element so visually dominant it stops the eye and creates orientation. Currently:

- The hero image is a visual anchor ✓ (photo occupies right half)
- The founder portrait is a visual anchor ✓ (first image with a human)
- The "Want Back" outline text is a visual anchor ✓ (massive type that fills width)

That's three anchors across 13 sections. The middle portion of the page (sections 3–9) has no strong visual anchor — it is entirely card grids and text, with nothing to break the scan pattern.

**What's needed:** One more visual anchor in the middle third of the page — either a large background quote, a full-width number, a dramatic contrast section, or a visual element that interrupts the grid rhythm.

---

### Information Density

**Card body text at 13px** is the density problem. Thirteen pixels at `color: var(--text-2)` on `#121212` requires focus to read. The font is fine. The color is fine. The size is too small for content the visitor is supposed to browse.

On WHOOP, card body text is 16px at white. On Bespoke, body text is 16px at near-black on white. The visual information load PhysioPro places on the 13px text assumes the visitor will lean forward and read. Premium card design assumes the visitor will scan.

---

### What Causes the Page to Feel Flat

Four specific causes:

**1. Twelve section breaks at uniform padding.** The eye never receives a signal that says "this matters more than that." Everything receives equal visual budget.

**2. The color difference between sections is invisible on a normal monitor from a reading distance.** #0a0a0a and #121212 are 7 Luma units apart. The grid pattern (body::before) is shared across all of them. The topography is functionally flat.

**3. No element in the middle third creates surprise.** Sections 3–9 are a sequence of correctly-formatted information. Correct is not the same as remarkable.

**4. The hover layer is entirely absent.** Nothing on the page responds to the cursor except the primary buttons, the want-list items, and the review card. A grid of 16 cards that don't lift, don't glow, and don't respond creates a surface that reads as inert — a PDF viewed in a browser, not a product.

---

## PART 3 — SECTION RHYTHM AUDIT

### Every Section Analyzed

| Section | Current Weight | Problem | Recommendation |
|---|---|---|---|
| **Hero** | LARGE — correct | Photo has no human / no motion signal | Keep, but this is where B1 media gap hits hardest |
| **Founder** | LARGE | Arrives second — correct but button is wrong grade | Make primary CTA orange here. This is the highest trust moment |
| **The Method** | MEDIUM | Process track animation is good. Section feels equal to card sections despite being more important | Increase padding. Let this section breathe more than the grid sections |
| **Trust Strip** | SMALL | Correct position. Numbers are static and too small visually | Counter animation + increase chip number font to 22–24px |
| **Who We Help** | MEDIUM | 6-card grid with no hover. Reads as section 3 of a catalog | Add hover interaction. Consider merging with What We Treat |
| **What We Treat** | MEDIUM | Identical visual language to Who We Help. Two consecutive identical-format sections = catalog | MERGE with Who We Help into one section or radical visual differentiation |
| **Why PhysioPro** | MEDIUM | 4-card grid. Content is the best differentiator copy on the site. Visual execution is identical to every other grid | This section should be the most visually dramatic grid — not the same as the others |
| **Mid-page CTA** | SMALL | Orange-tinted text + button. Lowest-drama CTA possible. Has no visual relationship to the page around it | Redesign as a full-bleed statement CTA with large display type |
| **Proof + Trust** | MEDIUM | Four assertions + Google card + lobby photo. Assertions are repeat of earlier content | Replace assertions with future-state testimonial format. Make the Google card larger |
| **What You Want Back** | LARGE | Best element on the page. Buried at position 10 | MOVE to position 3 (immediately after trust strip) |
| **Before You Book** | MEDIUM | FAQ + location in two-column. Logistically correct | OK where it is, but could absorb the lead form below it |
| **Lead Capture** | SMALL | Correct position. Headline is weak ("Prefer to be contacted?") | Stronger headline. Consider merging with Before You Book |
| **Footer** | FUNCTIONAL | 21-link footer nav is thorough but dense | OK |

---

### Sections That Should Be Merged

**Who We Help + What We Treat → One "Who We Serve" section**

These two 6-card grids use the same layout, the same font sizes, the same card structure, and the same minimal body copy. Visually, from three feet away, they are identical. The user reads a section heading, scans 6 cards, then reads another section heading, scans 6 more cards of the same format.

Combined, they could be one section with two groups: *Patients we work with* and *Conditions we treat* — visually differentiated within the same section frame. Or they could use audience-type cards that expand to show associated conditions on click, which is the Tundra model.

---

### Sections That Should Become More Dramatic

**"Why PhysioPro Is Different"** is the most important differentiator section on the site. It contains the four statements that answer "why not the clinic down the street?":
- Day 1 assessment + treatment
- Every session with Leonardo
- Performance as the finish line
- A structured plan from session one

These are not features. These are convictions. This section should look like convictions, not like four boxes.

**Recommendation for visual treatment:** Large display numbers (01, 02, 03, 04 at 120px+, opacity 0.08, background layer) similar to the existing `.philosophy-item span` treatment — but pushed harder. Or use a full-width horizontal scroll at desktop that reveals each differentiator like a slide. Or use alternating 50/50 full-width rows instead of a 2x2 grid. Anything that breaks the uniform card format.

---

### "What You Want Back" — Reposition This Section

This is the most emotionally resonant element on the site. Massive outline type that fills solid on hover:

- "Get back to training."
- "Run without the next flare-up."
- "Load, work, or compete again."
- "Move without living in avoidance."
- "Have a clear plan."

This creates **identity resonance** — the visitor reads their own desire in large type and feels seen. It is a conversion mechanism, not just a design flourish.

Currently it sits at section 10, after the visitor has already read: the hero, the founder, the method, the trust strip, who we help, what we treat, why physiopro is different, the mid-page CTA, and the proof section. By position 10, the visitor has either converted or disengaged.

This section should come at position 3 — immediately after the trust strip, before the founder. The desire layer should come before the explanation layer.

---

### Ideal Homepage Structure (Recommended)

```
01 · HERO
    "You've been told to stop moving. We disagree."
    → Book CTA / Ask Leonardo
    → $750 / 1:1 / Day 1 meta row (enlarged)

02 · TRUST STRIP (with animated counters)
    743+  /  255+  /  1:1  /  Day 1

03 · WHAT YOU WANT BACK (moved from position 10)
    Desire-layer: outline text fills on hover
    "Get back to training. Run again. Compete again."

04 · THE FOUNDER (moved from position 2)
    Now arrives after desire is activated
    Portrait + quote + credentials + PRIMARY CTA (orange, not secondary)

05 · THE METHOD (process track — animated)
    Assessment → Intervention → Progression → Return

06 · WHO WE SERVE (merged Who We Help + What We Treat)
    Single section, two visual groups, one flow

07 · WHY PHYSIOPRO IS DIFFERENT (dramatic visual treatment)
    These should look like convictions, not cards

08 · PROOF + TRUST (expanded)
    Assertions + Google card + (future: testimonial slots)

09 · MID-PAGE CTA (redesigned)
    Full-bleed, large display type — not centered text on pale background

10 · BEFORE YOU BOOK + LEAD CAPTURE (merged)
    FAQ + location + form in one connected section
    "Questions? Here. Form? Below it. Directions? Here too."

11 · FOOTER
```

This structure:
- Activates desire (position 3) before explaining process (position 5)
- Humanizes (founder, position 4) after creating want (position 3)
- Ends with objection handling + conversion in one visual unit
- Eliminates the sensation of three consecutive catalog grids

---

## PART 4 — MOTION SYSTEM DESIGN

### Philosophy

**Premium motion is fast, purposeful, and invisible.**

It never draws attention to itself. The user does not think "nice animation." They think "this feels right." Linear's micro-animations are so fast (150–200ms) that users experience confidence, not choreography. WHOOP's counter animation makes numbers feel earned rather than printed.

Every motion decision should answer: "Does this make the next thing the user does feel more certain?"

---

### Easing System

All motion uses one of three timing functions:

| Name | Curve | Use case |
|---|---|---|
| `--ease` (existing) | `cubic-bezier(0.22, 1, 0.36, 1)` | All element entrances, card lifts, button hover |
| `--ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Dropdowns opening, panels appearing |
| `--ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | State transitions (toggled elements, tab changes) |

No bounce. No spring overshoot. No cubic that overshoots.

---

### Card Motion System

**Condition cards, Who We Help cards, Differentiator cards, Hub cards, Resource cards:**

```
On hover:
  transform: translateY(-4px)
  border-color: rgba(255, 138, 0, 0.30)
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45), 0 4px 12px rgba(255, 138, 0, 0.08)
  transition: 280ms --ease

On release (hover-off):
  return to default over 200ms
  box-shadow fades, transform settles

Cards in a grid:
  stagger entrance by 70ms per card (nth-child delay)
  max delay cap: 350ms (so grid of 6 doesn't feel slow)
```

**Contact method cards, Resource cards (interactive navigation cards):**

These represent destinations, not just information. Slightly stronger hover:

```
On hover:
  transform: translateY(-5px)
  border-color: rgba(255, 138, 0, 0.50)
  background: rgba(255, 138, 0, 0.04)
  → the arrow within the card (→) shifts: translateX(3px)
```

**Clinic images (inside-main, proof-image, location-image):**

```
Container: overflow: hidden
Image on hover: transform: scale(1.035), transition 500ms ease-out
The scale is subtle — barely perceptible consciously, but registers as alive
```

---

### Button Motion System

**Primary button (orange, clip-path):**

```
Default: background: --orange, clip-path polygon, no shadow
Hover:
  transform: translateY(-2px)          [already implemented ✓]
  box-shadow: 0 12px 32px rgba(255,138,0,0.28)  [already implemented ✓]
  background: #ff9d1a (one shade lighter — warmth on hover)
  
Press (active):
  transform: translateY(0)
  box-shadow: none
  transition: 80ms ease-in

Focus-visible:
  outline: 2px solid var(--orange)
  outline-offset: 4px
  (no transform — focus should not move the element)
```

**Secondary button (ghost/outline):**

```
Default: transparent background, 1px inset border at 25% white opacity
Hover: 
  border opacity → 60% white   [already implemented ✓]
  background: rgba(255,255,255,0.04)   [ADD THIS]
  
Missing: the secondary button currently has no background change on hover — 
it only changes border opacity. A very subtle background fill makes the button 
feel more present without competing with primary.
```

**Nav CTA:**

```
Current: orange, clip-path, no hover transform
Should match primary button: translateY(-1px) + subtle glow on hover
Difference from page button: smaller travel (1px not 2px) — it's a smaller target
```

**The sticky button:**

```
Current: appears as a rectangle (no clip-path — SYSTEM INCONSISTENCY)
Should: use the same clip-path as all other primary buttons
Hover: same translateY(-2px) + glow as page buttons
```

---

### Navigation Motion System

**Dropdown reveal — critical fix:**

Current state: `display: none → display: flex` — a hard cut, no transition.

Required redesign approach (visibility/opacity instead of display):

```
Default state: 
  visibility: hidden
  opacity: 0
  transform: translateY(-6px)
  transition: opacity 180ms ease-out, transform 180ms ease-out, visibility 0s 180ms

Open state (.nav-item:hover, .nav-item:focus-within, .nav-item.is-open):
  visibility: visible
  opacity: 1
  transform: none
  transition-delay: 0s (no delay on open)
```

**Timing:** 180ms feel instant but elegant. Under 150ms feels abrupt. Over 220ms feels sluggish.

**Chevron rotation:** Already implemented (rotates 180°). Correct. ✓

**Nav topbar scroll state:** Already implemented (blur + background on scroll). Correct. ✓

---

### Scroll Reveal System

**Current state:** All elements with `.reveal` class transition from `opacity: 0, translateY: 28px` to visible at 92% viewport. This works but has two weaknesses:

1. All elements enter at the same distance (28px) regardless of their visual weight
2. Card grids enter simultaneously instead of staggered

**Recommended refinement:**

```
Light elements (text paragraphs, eyebrows, section kickers):
  translateY: 20px, duration: 700ms

Standard elements (cards, CTAs, images):
  translateY: 28px, duration: 900ms  [current ✓]

Heavy elements (h2 headlines, hero-scale text):
  Use wipe animation (clip-path) instead of fade+translate
  Already implemented on hero h1 — extend to all section h2 headlines

Stagger for card grids:
  .reveal:nth-child(1) → delay: 0ms
  .reveal:nth-child(2) → delay: 70ms
  .reveal:nth-child(3) → delay: 140ms
  .reveal:nth-child(4) → delay: 210ms
  .reveal:nth-child(5) → delay: 280ms
  .reveal:nth-child(6) → delay: 350ms
  Cap at 350ms — do not let stagger exceed 400ms total
```

---

### Counter Animation System

The 743+ sessions and 255+ patients are the hardest social proof on the site. They should earn weight.

**Behavior specification:**

```
Trigger: when the trust-strip enters the viewport (IntersectionObserver)
Starting value: 92% of final value (e.g., 684 for 743, 234 for 255)
Duration: 1200ms
Easing: ease-out cubic (decelerates to the final number — feels like settling)
Format: integer + "+" suffix
Once only: fire once, do not replay on scroll

Chip labels ($ 750 MXN, 1:1, Day 1):
  These are not numbers — no counter
  They should have a micro-reveal: opacity 0 → 1 with 200ms delay after the counter
  finishes — so the units appear after the number, not simultaneously
```

**Why start at 92%:** Starting from 0 makes the animation feel like a loading spinner. Starting from 92% confirms the large number is real — the animation just brings precision to what's already impressively large.

---

### Page Entrance on Inner Pages

**Homepage:** Staggered wipe + fade entrance on hero elements. ✓  
**Inner pages:** No entrance animation. Content appears immediately. Gap.

**Recommended for inner pages:**

The `.page-hero` block (all 25 condition/service/article pages) should receive the same entrance treatment as the homepage hero:

```
.page-hero .eyebrow:
  hero-reveal class + delay 0ms

.page-hero h1:
  h1-line wipe animation + delay 80ms per line

.page-hero .page-hero-sub:
  hero-reveal class + delay 280ms

.page-hero .hero-actions:
  hero-reveal class + delay 380ms
```

This requires adding the appropriate classes to the 25 inner page hero sections. The animation classes already exist in the CSS — this is an HTML-only change.

---

### FAQ Accordion Animation

**Current:** `<details>` element snaps open/closed. The + rotates. The content pops in.

**Premium behavior:** The content should expand with a max-height transition.

```
Approach: The native <details> element cannot smoothly animate height.
Options:
  A) Replace <details> with a JS-driven disclosure widget (max-height: 0 → measured height)
  B) Add a grid-based transition (grid-template-rows: 0fr → 1fr, modern browsers only)
  C) CSS-only animation using content-visibility (limited browser support)

Recommendation: Option B (grid rows) — clean, no layout thrashing, good browser support:
  .faq-item .faq-body:
    display: grid
    grid-template-rows: 0fr (closed) → 1fr (open)
    transition: grid-template-rows 220ms ease

Duration: 220ms is fast enough to not feel sluggish, slow enough to feel designed.
```

---

### Mobile Motion Safety Rules

1. All transforms must use GPU-friendly properties only: `transform`, `opacity`, `filter`. No `height`, `width`, `top`, `left`.
2. Parallax on the hero image must disable on mobile (currently does disable via JS check). ✓
3. Counter animation must fire once the chip is on screen — on mobile the trust strip is single-column, so the viewport timing changes. Check IntersectionObserver threshold on mobile.
4. `prefers-reduced-motion` disables all transitions and animations — this is already implemented. ✓
5. Stagger delays must be capped at 280ms on mobile (fewer visible cards per row means stagger feels longer).

---

## PART 5 — PREMIUM COMPONENT SYSTEM

### Existing Components (Catalog)

| Component | Class | Quality | Notes |
|---|---|---|---|
| Primary button | `.button-primary` | Strong | Clip-path is distinctive |
| Secondary button | `.button-secondary` | Adequate | Missing background hover |
| Nav CTA | `.nav-cta` | Strong | Missing hover transform |
| Sticky CTA | `.sticky-whatsapp` | Weak | Missing clip-path, missing hover |
| Process track | `.process-track` | Strong | Animated line + dots is excellent |
| FAQ accordion | `.faq-item` | Adequate | No height transition |
| Trust strip | `.trust-strip` | Weak | Numbers too small, no animation |
| Want list | `.want-list` | Excellent | Most distinctive element on site |
| Proof assertions | `.proof-assertion` | Good | Orange left-border + large type works |
| Founder quote | `.quote` | Strong | Correct scale and treatment |
| Google Reviews card | `.google-reviews-card` | Adequate | No count displayed — content gap |
| Review card | `.review-card` | Strong | Ready, awaiting content |
| Resource card | `.resource-card` | Adequate | No hover elevation |
| Channel card | `.channel-card` | Adequate | Minimal hover |
| Contact method | `.contact-method` | Good | Hover background change exists |
| Chat widget | `.pchat` | Good | Well-structured, functional |
| Page hero | `.page-hero` | Good | Missing entrance animation |
| Placeholder card | `.placeholder-card` | Weak | Should not appear in production |

---

### Weak Components

**Trust strip chips:**
The number size (15px) does not communicate the weight of "743 sessions." A number this significant should display at 32–40px on desktop. The chip label (11px, letter-spaced) is correct. The number is undersized.

**Mid-page CTA section (`.section-cta-mid`):**
This is the most visually generic component on the site. It's a paragraph + button centered on a pale orange-tinted background. It has no visual distinctiveness, no connection to the page above or below, and reads as a low-energy interrupt. 

Premium treatment: Full-section width, large (48px+) display type, dark background that breaks from the section palette, and the CTA button should be significantly larger here — this is the section asking for commitment.

**Lead capture form headline:**
"Prefer to be contacted? Leave your details." — This is the lowest-energy headline on the homepage. The user who reaches the form has read 10 sections of content. They are primed. The invite should match that energy. Compare: "Ready? Start here." or "Your first session starts with a message."

---

### Missing Components

**1. Stat block with animated counter**

A component that holds a large number (display-scale: 48–80px), a unit label, and a context line. Triggers a count-up animation on scroll entry.

```
Structure:
  [LARGE NUMBER] ← animates from 92% of value to final
  [Unit / label]    ← uppercase, letter-spaced, text-2
  [Context line]    ← optional, small body text
```

This component is needed for the trust strip, and for any future "proof numbers" block (sessions per year, years in practice, conditions treated, return-to-sport outcomes).

---

**2. Testimonial / quote card placeholder (production-ready design)**

A card designed to hold a real testimonial when one exists. Currently `review-card` exists and is well-designed. The missing piece is a placeholder variant that doesn't look like a placeholder — it should look like the component waiting to be filled.

```
Design: Same dimensions as review-card. No "coming soon" language.
Placeholder state: Shows the card chrome (border, star rating, meta line)
  with the quote area replaced by a subtle texture or pattern.
Production state: Shows the actual testimonial text.
The transition from placeholder → real content should be a class swap only.
```

---

**3. Article / knowledge card**

A card for linking to published articles. Needs: category tag, headline, one-line teaser, estimated read time, date. This does not exist as a component — articles are currently listed as plain `<a>` tags in the nav dropdown.

```
Article card structure:
  [CATEGORY TAG]   ← e.g., "Training & Injury" in orange uppercase
  [Article title]  ← h3 scale
  [1-line excerpt] ← 13–14px, text-2
  [Read time + date] ← 11px, right-aligned or inline
  [→ arrow]        ← orange, shifts right on hover
```

---

**4. "Why This Is Different" comparison block**

A component that directly contrasts PhysioPro against the generic alternative. Two-column: [Generic clinic] vs [PhysioPro]. Each row is a claim.

```
Example:
  "Open-ended sessions with no plan"  →  "Structured progression with clear milestones"
  "Rotation between staff and aides"  →  "Same provider, every session"
  "Treatment stops at pain reduction"  →  "Treatment finishes at full performance return"

Visual: Table-like but styled as two branded columns.
Right column (PhysioPro) has orange accent treatment.
```

This is the highest-converting content type for premium services. It is explicit competitive contrast without naming any competitor.

---

**5. Reading progress indicator (article pages)**

A 3–4px bar at the top of the viewport, orange, that fills as the user scrolls through an article. Signals: depth of content, progress through reading, visual reward.

```
Implementation: position: fixed; top: 0 or 60px (below topbar); left: 0; right: 0; 
height: 3px; background: --orange; 
width = (scrollY / (document.body.scrollHeight - window.innerHeight)) * 100%
Only on article pages. Not on homepage or condition pages.
```

---

**6. Full-bleed CTA band (replacement for mid-page CTA)**

A section that breaks from the page palette. On a dark site like PhysioPro, a full-bleed white or near-white section is a dramatic visual interrupt. Or alternatively: a full-bleed deep orange section.

```
Full-bleed dark orange (#181100 with orange radial gradient at top):
  Large display type (60–80px) — 1 line only
  Single primary button
  No secondary text, no copy justification
  
The section earns attention through contrast alone, not through copy length.
```

---

**7. Clinical credential badge**

A small display component for licensing, credential, and specialization. Currently "Licensed Physiotherapist · Sports Rehabilitation · Biomechanical Analysis" is an inline `<p class="founder-credential">` with no visual distinction from regular body text.

```
Design: Inline badge chips, similar to existing .tag-row spans
But: use one chip per credential
Example: [LFT] [Sports Rehab] [Biomechanical Analysis]
When cédula is available: [Cédula: 0000000]
These chips should appear on about-leonardo.html, the hero of first-session.html,
and the footer tagline if space allows.
```

---

## PART 6 — ASK LEONARDO EXPERIENCE

### Current State

The page is structurally correct. The copy is honest and the form handles the LFPDPPP consent correctly. But the experience is: a form page.

The user who navigates to "Ask Leonardo" is a specific person: interested but not ready. They have a question they can't answer from the site. They are in the evaluation phase of the decision. This visitor needs to feel that they are reaching a specific person, not submitting a ticket.

**What the page currently feels like:** A contact form with good copy.

**What the page should feel like:** A direct line to someone who cares about the answer.

---

### What's Missing

**1. No human signal at the start.**
The hero is text only. "Get a direct answer before you book." Correct. But no image, no photo of Leonardo, no signal that this is a person waiting to answer.

The most effective change: a small photo of Leonardo (headshot, not portrait scale) in the hero section, next to or above the headline. The visual message: "this person will read your question." That is trust activation at the entry point — before the user decides whether to fill out the form.

---

**2. The form looks like work.**
Four fields, one large textarea, a full paragraph of consent text, and a required checkbox. From the top of the form, the user sees density. The experience is: this is a lot to fill out.

**Recommendation:** Change the form's visual entry point. Move the consent and privacy notes below the submit button (they're required to be visible, but they don't need to be the first thing the user sees). Start with name and question only. The email/phone can come after.

Or: use a conversational form layout where one field appears at a time — "What's your first name?" → enter → "Great. What would you like to ask Leonardo?" This is a premium interaction pattern used by Typeform and Notion intake pages. It transforms a form into a conversation.

---

**3. The "Why this exists" section is redundant with the page hero.**
The hero says: "Not ready to book? Send your question to Leonardo directly — a real answer, not a template."  
The three-card section says: "No commitment required / A real answer, not a template / Directly from the clinician."

The page hero and the three-card section are saying the same thing in different formats. The three-card section should either be removed or replaced with something the hero doesn't say — for example: a sample Q&A. Show an actual example: "Question: I've had back pain for 3 years and two previous PTs didn't help. Is this something you can work with? Answer: Here's what Leonardo said..." A real or realistic example answer would be more persuasive than restating that the answer will be real.

---

**4. The "How Leonardo responds" section is administrative.**
"Questions typically receive a response within a few hours on weekdays." This is necessary information. It doesn't need a section headline and an ask-expect box. It could be two lines of text beneath the form's submit button.

---

### What the Premium Ask Leonardo Experience Looks Like

```
[HEADER WITH PHOTO — Leonardo small headshot, right-aligned or floating]
[HEADLINE] "Get a real answer before you book."

[1-2 lines only] "Your question goes directly to Leonardo.
A thoughtful response, not a template — usually within a few hours."

[SAMPLE Q&A — one real or realistic example]
→ This is the trust mechanism that three cards cannot replace.

[FORM — streamlined]
Name → Question → Contact
Consent below submit

[RESPONSE NOTE — 2 lines below button]
"Expect a reply within a few hours, Mon–Fri 8am–8pm."
No separate section.

[ALREADY DECIDED? CTA — keep as is ✓]
```

---

### The Chat Widget vs. The Ask Page

The chat widget (bottom-left bubble) is actually more personal than the ask-leonardo.html form — it's conversational, immediate, and responsive. But it handles operational questions (pricing, location, booking). Ask Leonardo handles clinical questions (my specific injury, my history, can you help me?).

These are different conversations and should remain separate entry points. But the chat widget should more clearly escalate to ask-leonardo.html rather than to WhatsApp for clinical questions. Currently, all escalations go to `./ask-leonardo.html` which is correct. The copy in the escalation message — "I'd like Leonardo to answer that personally" — is also correct.

The positioning conflict (chat bubble left, sticky button right, collision on mobile) is the operational UX problem to fix. The brand problem is that the chat bubble icon (speech bubble SVG) is generic. A branded icon — the PhysioPro mark or an "L" initial — would make the bubble feel like reaching Leonardo, not like reaching a bot.

---

## PART 7 — LEARN EXPERIENCE

### The Knowledge Base as It Exists

Currently:
- 5 articles, each high quality and clinically specific
- resources.html: flat 6-card grid (Videos + FAQ link + Resources hub + 3 article cards)
- Videos hub: channel directory
- Nav: "Learn" dropdown with 7 items listed as titles

A user arriving at `resources.html` sees: six cards of similar weight. Nothing says "start here." Nothing says "if you have X problem, read Y." Nothing says "these were written by a physiotherapist."

---

### The "Knowledge Base" Mental Model

The goal is to make this feel like a curated library, not an archive.

The difference:
- **Archive**: "Here are the things we've published."
- **Library**: "Here is what you need to know, organized for you."

Tundra's blog is an archive (chronological list). MOCEAN doesn't have a visible content section. Linear's blog is curated by topic. The PhysioPro knowledge base should be curated by patient intent.

---

### Recommended Structure

**resources.html redesigned as "PhysioPro Knowledge Base"**

```
[PAGE HERO]
Section kicker: The PhysioPro Knowledge Base
Headline: "Answers for people who want to move better."
Sub: 5-6 articles · Updated 2026 · Written by Leonardo Machado, LFT

[SECTION: START HERE — 1 featured article]
The single most important article for new visitors.
Recommendation: "Why Physical Therapy Didn't Work the First Time"
Large format — image, full description, read time, book CTA inline

[SECTION: If You're Dealing With Pain]
About PT & Injury
→ Why Physical Therapy Didn't Work the First Time
→ Do You Need an MRI Before Physical Therapy?
→ What Happens During Your First Session?

[SECTION: If You're an Athlete or Active Person]
Training & Return
→ Can You Keep Training While Injured?
→ How Return-to-Sport Testing Works

[SECTION: Useful Tools]
→ FAQ (link to faq.html) — "22 answered questions"
→ First Session (link) — "What to expect, step by step"
→ Ask Leonardo (link) — "Get a clinical answer to your specific situation"
```

---

### Article Page Experience Improvements

Each article page currently renders as: page hero + a sequence of `<section>` blocks. The reading experience is functional but generic.

**What would make articles feel premium:**

1. **Author block below the headline** — "By Leonardo Machado, LFT · Physiotherapist, PhysioPro · Published June 2026"
2. **Reading time** — "7 minute read" in the eyebrow line next to the category
3. **Pull quote callout** — one key sentence per article, displayed at 28–32px in an orange left-border box, to break the body text rhythm
4. **Related reading at the bottom** — "Next: Can You Keep Training While Injured? →" — the most relevant follow-on article
5. **Reading progress bar** — 3px orange bar at the top of the viewport, fills as the user scrolls
6. **End-of-article CTA** — "You've read enough. Book a session." — matches the article's conclusion energy

---

### The FAQ as Knowledge Base Entry

`faq.html` has 22 questions organized by category. This is an underutilized trust asset. It is linked from the nav dropdown but it doesn't display like a destination — it displays as a list.

**Enhancement without redesign:** Add a search-filter behavior so users can type a keyword and see relevant questions highlighted. This is a 30-line JS pattern and makes the FAQ feel like a tool rather than a document.

---

## PART 8 — IMPLEMENTATION ROADMAP

---

## PHYSIOPRO_PREMIUM_EXPERIENCE_ROADMAP.md

**Three sprints. Architecture frozen. No new pages. No new content.**

---

### Sprint 1 — Motion Foundation
**Estimated time: 4–6 hours**  
**Visual impact: HIGH (site goes from static to reactive)**  
**Conversion impact: MEDIUM (trust increases through interactivity)**

This sprint makes the site feel alive to the cursor.

| Task | What changes | Time |
|---|---|---|
| **Card hover states** | translateY(-4px) + border-color + box-shadow on all grid cards (.treat-card, .who-card, .diff-item, .hub-card, .philosophy-item, .resource-card) | 30 min CSS |
| **Card entrance stagger** | nth-child delay (70ms per card, 350ms cap) on all card grids | 20 min CSS |
| **Dropdown transition** | visibility/opacity approach replacing display:none; 180ms ease-out open | 45 min CSS + JS fix |
| **Stat counter animation** | Scroll-triggered count-up for 743+ and 255+ (IntersectionObserver, 1200ms, ease-out cubic) | 45 min JS |
| **Trust strip number scale** | Increase trust-chip strong font-size from 15px to 28–32px. Current: invisible weight. | 10 min CSS |
| **Image hover zoom** | inside-main, proof-image, location-image: scale(1.035) on hover, overflow:hidden parent | 15 min CSS |
| **Secondary button fill** | Add rgba(255,255,255,0.04) background on :hover (currently only border changes) | 5 min CSS |
| **Sticky button clip-path** | Apply same polygon as .button-primary to .sticky-whatsapp | 5 min CSS |
| **Chat/sticky positional fix** | Move .pchat to right side, above .sticky-whatsapp OR left-right separation | 10 min CSS |

**Expected result:** The site transforms from a well-designed brochure into an interactive product. Cards respond. Numbers earn weight. The cursor has a relationship with the content.

---

### Sprint 2 — Page Rhythm & Inner Page Polish
**Estimated time: 5–7 hours**  
**Visual impact: HIGH (eliminates the "catalog" feeling)**  
**Conversion impact: HIGH (section order improves emotional flow)**

This sprint addresses the section rhythm problem and extends the premium experience to inner pages.

| Task | What changes | Time |
|---|---|---|
| **"What You Want Back" — reposition** | Move section from position 10 to position 3 in homepage HTML | 20 min HTML |
| **Mid-page CTA redesign** | Replace the pale orange-tinted band with a full-section dark block and 48px+ display type | 45 min CSS + HTML |
| **Why PhysioPro — visual upgrade** | Increase the .diff-item background number (01/02/03/04) from current subtle ghost treatment to 160px opacity 0.10 — make them tower over the cards | 30 min CSS |
| **Inner page entrance animation** | Add hero-reveal class and stagger to .page-hero elements on all 25 inner pages | 90 min HTML (bulk edit, all pages) |
| **Section h2 headline wipe** | Apply the clip-path wipe to all .section-head h2 headlines (not just hero h1) | 30 min CSS |
| **FAQ accordion smooth height** | Replace <details> with grid-template-rows transition | 60 min CSS + HTML |
| **Article reading experience** | Add .article-body CSS: 18px body, 1.8 line-height, 68ch max-width, pull quote style, reading progress bar | 60 min CSS |
| **Trust strip chip sizing** | Numbers already enlarged in Sprint 1. Now ensure mobile layout still works after resize | 20 min CSS |

**Expected result:** The homepage has an emotional arc — desire first (What You Want Back), then identity (Founder), then process (Method). Inner pages feel consistent with the homepage experience. Articles feel editorial. The mid-page CTA stops feeling like an email newsletter.

---

### Sprint 3 — Knowledge Base & Ask Leonardo Polish
**Estimated time: 4–5 hours**  
**Visual impact: MEDIUM (major improvement on specific pages)**  
**Conversion impact: HIGH on those specific pages — they handle the undecided visitor)**

This sprint upgrades the "nurture" layer — the pages that convert the visitor who is interested but not ready.

| Task | What changes | Time |
|---|---|---|
| **resources.html — knowledge base redesign** | Restructure from flat 6-card grid to: Featured Article + 2 intent-based sections + Tools section. New article card component with category, read time, excerpt | 90 min HTML + CSS |
| **Article pages — author block + read time** | Add author byline below h1 on all 5 article pages: "By Leonardo Machado, LFT · [Read time] · [Date]" | 30 min HTML |
| **Article pages — pull quote component** | Add .pull-quote CSS class (36px, orange left border, max-width 22ch) + use on one key sentence per article | 30 min CSS + 5 × 10min HTML |
| **Article pages — related reading CTA** | Add a "Next: [Article title] →" link at the end of each article, in the hub-cta-section style | 30 min HTML |
| **Ask Leonardo — streamlined form** | Reorder: Name first → Question → Contact → Consent below submit (not above). Remove the 3-card "Why this exists" section or replace with one realistic sample Q&A | 45 min HTML |
| **Ask Leonardo — reading progress bar** | 3px orange fixed bar, fills on scroll. On article pages only (not homepage or condition pages) | 30 min JS + CSS |
| **FAQ keyword filter** | 30-line JS that filters .faq-item visibility based on text input | 45 min JS + HTML |
| **Chat bubble branding** | Replace generic chat SVG icon with "L" monogram or PhysioPro mark in the bubble | 15 min HTML + CSS |

**Expected result:** The "undecided visitor" has a premium experience. The knowledge base feels curated. Articles feel authored by someone with expertise. Asking Leonardo feels personal. The FAQ is a tool, not a document.

---

### Sprint Priority Decision

**If one sprint only:** Sprint 1 — Motion Foundation.
This closes the largest perceptual gap (static vs. reactive) with the least risk. It touches only CSS and a small amount of JS. It has no effect on architecture, no risk of content regression, and the visual delta is immediately apparent. Every card, every grid, every photo responds to the cursor.

**If two sprints:** Sprint 1 + Sprint 2 — Motion + Rhythm.
Section reorder (Want Back to position 3) is the single highest-ROI content move possible without creating new pages. The mid-page CTA redesign removes the only section that actively looks generic.

**If three sprints:** All three in order.
The full premium experience is approximately 13–18 hours of focused work. The result is a site that competes at the visual level with Tundra Performance (the closest scale-matched benchmark) and begins approaching the interaction level of WHOOP as a design benchmark.

---

### What This Does Not Fix

The following will remain gaps regardless of these three sprints:

- The hero image is a room, not a person in motion (B — media required)
- The Google Reviews card shows no review count (B — reviews required)
- Success stories page is an empty framework (B — patient consent required)
- The "Sports Performance" positioning does not have a visual proof anchor — no athlete photography, no performance metrics (B — media required)

These are not failures of the current sprint strategy. They are the content production layer that runs in parallel and eventually makes all three sprints' work land at 100% of their potential.

**The sprints take the site from 7/10 to ~9/10 without any new content.**  
**The B-layer content takes it from 9/10 to 10/10 when it arrives.**

---

*End of document. No code. No implementation. Design specification only.*
