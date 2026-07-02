# WEBSITE CURRENT STATE INVENTORY BEFORE FABLE REDESIGN

## 1. Executive Summary

This repository currently contains a static multi-page marketing website for PhysioPro, deployed at `https://physioprotijuana.com`, with Cloudflare Pages Functions for lead capture, Ask Leonardo, assistant guardrails, Turnstile validation, and abuse protection.

The current site is not just a brochure. It contains:

- 30 public HTML pages
- a shared multi-level navigation and full footer ecosystem
- lead capture and Ask Leonardo conversion flows
- WhatsApp-first booking architecture
- legal/privacy/compliance pages in Spanish
- SEO metadata, canonical URLs, schema/JSON-LD, sitemap, and robots
- shared tracking stack: GA4, Microsoft Clarity, Meta Pixel
- shared trust system: Google reviews, success stories, location proof, founder authority
- reusable conversion modules that must survive any redesign

The redesign can change visual presentation, layout treatment, motion style, and hierarchy, but it must not remove the business-critical structures listed in this inventory.

## 2. Full Page List

### Core conversion and business pages

- `index.html` — homepage
- `first-session.html` — first session / offer detail
- `ask-leonardo.html` — Ask Leonardo pre-booking form
- `about-leonardo.html` — founder / philosophy page
- `contact.html` — contact, location, booking channels
- `faq.html` — FAQ
- `who-we-help.html` — audience breakdown
- `what-we-treat.html` — conditions/services breakdown

### Condition / service pages

- `knee-pain.html`
- `back-pain.html`
- `shoulder-pain.html`
- `neck-pain.html`
- `sports-injuries.html`
- `post-surgical-rehab.html`
- `return-to-sport.html`
- `return-to-running.html`
- `combat-sports-rehab.html`

### Educational / authority pages

- `resources.html` — knowledge hub
- `videos.html` — video/social hub
- `why-physical-therapy-didnt-work-the-first-time.html`
- `can-you-keep-training-while-injured.html`
- `what-happens-during-your-first-session.html`
- `do-you-need-an-mri-before-physical-therapy.html`
- `how-return-to-sport-testing-works.html`

### Proof / trust pages

- `reviews.html`
- `success-stories.html`

### Legal / compliance pages

- `aviso-privacidad.html`
- `aviso-medico.html`
- `aviso-cookies.html`
- `derechos-arco.html`

## 3. Navigation Structure

### Primary navigation

- `Home` → `./`
- `New Patients`
  - `First Session` → `./first-session.html`
  - `Ask Leonardo` → `./ask-leonardo.html`
  - `FAQ` → `./faq.html`
  - `Who We Help` → `./who-we-help.html`
- `Pain & Injury`
  - `What We Treat` → `./what-we-treat.html`
  - `Knee Pain` → `./knee-pain.html`
  - `Back Pain` → `./back-pain.html`
  - `Shoulder Pain` → `./shoulder-pain.html`
  - `Neck Pain` → `./neck-pain.html`
  - `Post-Surgical Rehab` → `./post-surgical-rehab.html`
- `Sports & Performance`
  - `Sports Injuries` → `./sports-injuries.html`
  - `Return To Sport` → `./return-to-sport.html`
  - `Return To Running` → `./return-to-running.html`
  - `Combat Sports Rehab` → `./combat-sports-rehab.html`
- `Learn`
  - `All Resources` → `./resources.html`
  - `Videos` → `./videos.html`
  - `Why PT Didn't Work` → `./why-physical-therapy-didnt-work-the-first-time.html`
  - `Training While Injured` → `./can-you-keep-training-while-injured.html`
  - `Your First Session` → `./what-happens-during-your-first-session.html`
  - `MRI Before PT?` → `./do-you-need-an-mri-before-physical-therapy.html`
  - `RTS Testing Explained` → `./how-return-to-sport-testing-works.html`
- `Results`
  - `Reviews` → `./reviews.html`
  - `Success Stories` → `./success-stories.html`
- `About` → `./about-leonardo.html`
- `Contact` → `./contact.html`
- persistent CTA: `Book on WhatsApp` → main booking WhatsApp link

### Footer navigation

- `Process` → `#method`
- `Leonardo` → `#founder`
- `Location` → `#before-book`
- `First Session`
- `What We Treat`
- `Who We Help`
- `About Leonardo`
- `Reviews`
- `Knee Pain`
- `Back Pain`
- `Shoulder Pain`
- `Neck Pain`
- `Sports Injuries`
- `Post-Surgical Rehab`
- `Return to Sport`
- `Return to Running`
- `Combat Sports Rehab`
- `Videos`
- `Resources`
- `FAQ`
- `Success Stories`
- `Contact`
- `Ask Leonardo`

### Footer legal navigation

- `Aviso de Privacidad`
- `Aviso Médico`
- `Cookies`
- `Derechos ARCO`

## 4. Homepage Section-by-Section Inventory

### Header / topbar

- PhysioPro brand mark and brand copy
- full dropdown navigation
- mobile nav toggle
- persistent top-right WhatsApp CTA

### Hero (`#hero`)

- eyebrow: `Performance Rehabilitation · Zona Rio, Tijuana`
- main headline:
  - `Back to training.`
  - `Back to running.`
  - `Back to competing.`
- supporting copy about structured return
- credential line: Leonardo Machado / licensed physiotherapist / sports rehabilitation
- CTAs:
  - `Book on WhatsApp`
  - `Ask Leonardo`
- treatment approach rail:
  - `Assess`
  - `Treat`
  - `Return`
- hero image of clinic/performance space
- scroll cue anchor

### Proof strip

- `743+ Clinical sessions`
- `255+ Patients treated`
- `1:1 Every session with Leonardo`
- `Day 1 Assessment + treatment`

### What You Want Back (`#want-back`)

- desire list anchored to lead capture:
  - `Get back to training.`
  - `Run without the next flare-up.`
  - `Load, work, or compete again.`
  - `Move without living in avoidance.`
  - `Have a clear plan.`

### Founder (`#founder`)

- founder portrait
- founder philosophy quote
- `Leonardo Machado, LFT`
- credential line
- short founder positioning copy
- CTA: `Book on WhatsApp`

### Method (`#method`)

- section kicker: `1 · From Pain To Performance`
- four-step process:
  - `Assessment`
  - `Intervention`
  - `Progression`
  - `Return`
- supporting copy for each step
- bridging CTA:
  - note: first session includes full assessment and treatment from day one
  - CTA: `Book your first session`

### Who We Help (`#who-we-help`)

- section kicker: `2 · Who We Help`
- six audience cards:
  - athletes
  - active adults
  - runners
  - combat sports athletes
  - post-surgical patients
  - desk workers
- soft link CTA: `See full breakdown`

### What We Treat (`#what-we-treat`)

- section kicker: `3 · What We Treat`
- six treatment cards:
  - knee pain
  - shoulder pain
  - back pain
  - neck pain
  - sports injuries
  - post-surgical rehabilitation
- soft link CTA: `See full breakdown`

### Mid-page CTA

- copy: `Ready to see what structured rehab actually looks like?`
- CTA: `Book on WhatsApp`

### Why PhysioPro (`#difference`)

- section kicker: `4 · Why PhysioPro`
- four differentiators:
  - assessment + treatment on day one
  - every session with Leonardo
  - performance as the finish line
  - structured plan from session one

### Trust / Proof (`#proof`)

- section kicker: `5 · Trust`
- proof assertions:
  - founder-led care
  - assessment and treatment on day one
  - 1:1 sessions
  - `$750 MXN. No hidden consultation fees.`
- Google review card linking to GBP review profile
- founder soft link
- clinic/lobby image with location proof

### Before You Book (`#before-book`)

- section kicker: `6 · Before You Book`
- FAQ accordion with pre-booking questions
- location/contact block:
  - address
  - opening hours
  - first-session pricing
  - San Diego accessibility
  - Google Maps button
  - three clinic images:
    - reception
    - performance space
    - treatment room
  - Google review CTA
  - WhatsApp booking CTA

### Lead capture (`#lead-capture`)

- heading: `Prefer to be contacted? Leave your details.`
- keyword/SEO support copy
- lead form with Turnstile
- consent and privacy disclosure

### Footer ecosystem

- footer brand and tagline
- extensive footer navigation
- clinic contact block
- social links
- reviews links
- legal links
- copyright / clinic identity line
- sticky WhatsApp CTA outside footer

## 5. All CTAs and Destination URLs

### Shared/global CTAs

- `Book on WhatsApp` → `https://wa.me/526634875859?text=Hello%2C%20I%27m%20interested%20in%20booking%20an%20evaluation%20at%20PhysioPro`
- sticky CTA `Book on WhatsApp` → same core booking link or page-specific booking link on some service pages
- footer `WhatsApp` → core booking link
- `Ask Leonardo` → `./ask-leonardo.html`
- `Leave a Google Review` → `https://g.page/r/CUDvDKu7CdGbEBM/review`
- `Google Business Profile` / `Read Google reviews` → `https://share.google/1glqPDzQIQxOqPNUn`

### Homepage-specific CTAs

- `Ask Leonardo →` → `./ask-leonardo.html`
- `Book your first session →` → WhatsApp booking
- `See full breakdown →` → `./who-we-help.html`
- `See full breakdown →` → `./what-we-treat.html`
- `★★★★★ Reviewed on Google Read patient reviews →` → GBP reviews
- `Meet Leonardo →` → `#founder`
- `View on Google Maps` → `https://maps.google.com/?q=Jose+Maria+Velazco+2632,+Zona+Urbana+Rio+Tijuana,+22010+Tijuana,+B.C.`

### Condition/service page booking CTAs

- `Book a knee assessment` → knee-specific WhatsApp message
- `Book a back pain assessment` → back-specific WhatsApp message
- `Book a shoulder assessment` → shoulder-specific WhatsApp message
- `Book a neck pain assessment` → neck-specific WhatsApp message
- `Book an evaluation` → sports-injuries-specific WhatsApp message
- `Book a post-surgical assessment` → post-surgical-specific WhatsApp message
- `Book a return-to-sport assessment` → return-to-sport-specific WhatsApp message
- `Book a running assessment` → return-to-running-specific WhatsApp message
- `Book a combat sports assessment` → combat-sports-specific WhatsApp message

### Condition/service page question CTAs

- `Ask Leonardo about your knee →` → knee WhatsApp question
- `Ask Leonardo about your back pain →` → back WhatsApp question
- `Ask Leonardo about your shoulder →` → shoulder WhatsApp question
- `Ask Leonardo about your neck pain →` → neck WhatsApp question
- `Ask Leonardo about your injury →` → sports or combat variants
- `Ask about prehab →` → post-surgical WhatsApp prehab question
- `Ask Leonardo about your injury →` → return-to-running question variant

### Educational/article CTAs

- `← All Resources` → `./resources.html`
- `First Session Details →` → `./first-session.html`
- `Sports Injury Rehab →` → `./sports-injuries.html`
- `Meet Leonardo →` → `./about-leonardo.html`
- `Assessment Details →` → `./return-to-sport.html`

### Trust / reviews / video / hub CTAs

- `Read all reviews on Google →` → GBP reviews
- `Leave a review` → GBP review write link
- `View success stories →` → `./success-stories.html`
- `Share your experience` → WhatsApp case-study discussion
- `YouTube →` → `https://www.youtube.com/@PhysioProClinic`
- `Instagram →` → `https://www.instagram.com/physio_pro_recovery?utm_source=qr`
- TikTok channel card → `https://www.tiktok.com/@physiopro0?_r=1&_t=ZP-977zXW6FJD5`
- resources cards linking to hub pages and articles

### Contact-page CTAs

- `Book on WhatsApp`
- `Ask Leonardo`
- `Phone` → `tel:+526634875859`
- `Email` → `mailto:lft.leonardo.machado@gmail.com`
- `Open in Google Maps →`
- `Read reviews →`
- `Leave a Google Review`

### Full WhatsApp link inventory in current repo

- Main booking link
- service-specific booking links for:
  - knee
  - back
  - shoulder
  - neck
  - sports injuries
  - post-surgical rehab
  - return-to-sport
  - return-to-running
  - combat sports rehab
- question links for:
  - pre-booking question to Leonardo
  - service-specific questions
  - prehab question
  - case-study sharing invitation

## 6. All Forms and API Endpoints

### Homepage lead form

- page: `index.html`
- form id: `lead-capture-form`
- data attribute: `data-lead-form`
- fields:
  - `full_name`
  - `phone`
  - `goal`
  - `honeypot`
  - `consent`
- Turnstile container:
  - `data-turnstile-container="lead"`
- frontend submit target:
  - `/api/lead`

### Ask Leonardo form

- page: `ask-leonardo.html`
- form id: `ask-form`
- data attribute: `data-ask-form`
- fields:
  - `honeypot`
  - `full_name`
  - `question`
  - `email`
  - `phone`
  - `consent`
- Turnstile container:
  - `data-turnstile-container="ask"`
- frontend submit target:
  - `/api/ask`

### Assistant/chat widget

- injected by shared runtime `static/website.js`
- frontend submit target:
  - `/api/assistant`
- scope:
  - public website questions only
- topics built into runtime:
  - pricing
  - what we treat
  - who we help
  - first session
  - location
  - booking
  - insurance

## 7. All Pages Functions / API Routes

### Public API routes

- `/api/config`
  - returns Turnstile site key
  - returns canonical origin
  - returns assistant message max length

- `/api/lead`
  - same-origin validation
  - rate limiting
  - input validation
  - Turnstile verification
  - abuse logging
  - returns WhatsApp redirect URL for booking

- `/api/ask`
  - same-origin validation
  - rate limiting
  - input validation
  - Turnstile verification
  - abuse logging
  - returns WhatsApp redirect URL for Ask Leonardo flow

- `/api/assistant`
  - same-origin validation
  - rate limiting
  - assistant guardrails
  - output scoping
  - abuse logging

### Shared API/security library

- `functions/api/_lib/security.js`
  - origin allowlist
  - security headers for API responses
  - payload size limits
  - input cleaners/validators
  - rate limiting
  - Turnstile verification
  - abuse logging
  - WhatsApp URL builders
  - assistant topical answers and block rules

## 8. All Legal / Compliance Pages

- `aviso-privacidad.html`
  - privacy notice under Mexican law
  - data handling disclosures
  - health-related information consent references
  - third-party platform disclosures

- `aviso-medico.html`
  - medical disclaimer
  - website content is not diagnosis or treatment

- `aviso-cookies.html`
  - cookies/tracking notice
  - Google Analytics and other technologies explained
  - Google Fonts / GitHub / opt-out references

- `derechos-arco.html`
  - ARCO rights
  - privacy rights request path
  - INAI references

## 9. SEO Assets

### `sitemap.xml`

- contains 26 indexed URLs
- prioritizes:
  - homepage
  - conversion pages
  - service pages
  - educational pages
  - trust/hub pages
  - utility page `ask-leonardo.html`
- legal pages are not included

### `robots.txt`

- `User-agent: *`
- `Allow: /`
- sitemap declared at `https://physioprotijuana.com/sitemap.xml`

### Canonical URLs

- every public page has a canonical URL
- current domain is `https://physioprotijuana.com`

### Schema / JSON-LD

Current schema types in use include:

- `PhysicalTherapy`
- `LocalBusiness`
- `MedicalBusiness`
- `ContactPage`
- `CollectionPage`
- `WebPage`
- `Person`
- `FAQPage`
- `Article`
- `BreadcrumbList`
- `AggregateRating`
- `ItemList`
- `OfferCatalog`
- `Offer`
- `Service`
- `PostalAddress`
- `GeoCoordinates`

### Open Graph / Twitter metadata

- public pages carry:
  - title
  - meta description
  - `og:type`
  - `og:locale`
  - `og:site_name`
  - `og:title`
  - `og:description`
  - `og:url`
  - `twitter:card`
  - `twitter:title`
  - `twitter:description`

### Indexing rules

- main public pages: indexable
- legal pages:
  - `aviso-cookies.html`
  - `aviso-medico.html`
  - `aviso-privacidad.html`
  - `derechos-arco.html`
  use `noindex, follow`

## 10. Analytics / Tracking

### GA4

- present on all public pages
- measurement ID:
  - `G-PXDTD1M7WK`
- included as:
  - `https://www.googletagmanager.com/gtag/js?id=G-PXDTD1M7WK`
  - `gtag('config', 'G-PXDTD1M7WK')`

### Meta Pixel

- shared runtime initialization in `static/website.js`
- Pixel ID:
  - `984249047745055`
- default event:
  - `PageView`
- additional tracked actions in runtime:
  - `Lead`
  - `Contact`
- noscript fallback image present on all public pages

### Microsoft Clarity

- shared runtime initialization in `static/website.js`
- project ID:
  - `xgb53ac4gs`

### Search Console

- no `google-site-verification` meta tag found in the current repo
- no explicit Search Console verification artifact found in public HTML

### Google Ads links / conversion scripts

- no Google Ads `AW-...` tag or conversion event found
- no `adsbygoogle` script found
- no Google Ads conversion script found in public pages

## 11. Trust Components

### Reviews

- dedicated page: `reviews.html`
- Google review card and GBP links
- aggregate review schema on reviews page
- repeated review CTAs throughout site

### Success stories

- dedicated page: `success-stories.html`
- currently framed as documented case categories / cases in development
- six case categories listed:
  - ACL reconstruction / return to sport
  - recurring running injury
  - post-surgical rehabilitation
  - chronic back pain
  - combat sports injury management
  - tendinopathy resolution

### Google Business Profile links

- profile/read reviews:
  - `https://share.google/1glqPDzQIQxOqPNUn`
- write review:
  - `https://g.page/r/CUDvDKu7CdGbEBM/review`

### Location block

- homepage `Before You Book` section
- contact page `Find us`
- includes:
  - address
  - hours
  - border-crossing relevance
  - maps link
  - parking note
  - emergency disclaimer on contact page

### Founder trust

- `about-leonardo.html`
- homepage founder section
- founder-led-care claim repeated site-wide

## 12. Conversion Components

### WhatsApp buttons

- primary booking mechanism across site
- both generic and page-specific message variants

### Sticky CTA

- persistent `Book on WhatsApp` sticky button across public pages
- controlled by `static/website.js`

### Lead form

- homepage form
- same-origin submit to `/api/lead`
- Turnstile-protected

### Ask Leonardo

- dedicated form page
- same-origin submit to `/api/ask`
- Turnstile-protected
- also linked repeatedly as pre-booking question flow

### First session offer

- `first-session.html`
- current offer proposition:
  - assessment + treatment on day one
  - `$750 MXN`
- this pricing/offer positioning is repeated elsewhere

### Chat assistant

- shared JS widget
- pre-booking site assistant
- fallback escalation to Ask Leonardo
- abuse/guardrail protection

## 13. Content / Components That MUST Survive the Fable Redesign

- all 30 public pages or their equivalent URLs
- full nav IA and footer IA
- homepage lead capture section and form behavior
- Ask Leonardo page and form behavior
- WhatsApp-first booking flow
- sticky WhatsApp CTA
- service pages for major conditions and performance services
- resources hub and article pages
- reviews page
- success stories page
- contact page with location, phone, email, and maps
- founder page and founder-led care proposition
- legal/privacy/cookies/ARCO/medical pages
- GA4
- Meta Pixel
- Microsoft Clarity
- Turnstile
- API routes and same-origin protections
- schema/JSON-LD
- sitemap and robots
- Google Business Profile links
- social platform links
- location, hours, pricing references

## 14. Components That Can Be Redesigned Visually But Not Removed

- hero presentation
- trust strip styling
- founder section layout
- method/process visualization
- who-we-help and what-we-treat card treatments
- mid-page CTA design
- proof/review card styling
- FAQ styling
- location block layout
- footer visual treatment
- cards in resources/videos/success stories
- contact method card layout
- review presentation layout
- assistant UI chrome

## 15. Components That Are Outdated or Optional

- success stories page content is partly placeholder / in development
- review count schema on `reviews.html` is minimal and may be stale over time
- no Search Console verification artifact is visible in repo
- no Google Ads conversion tagging is present
- some success-story/case-study content is framed as future-state rather than fully published proof
- root repo contains extra planning/docs files outside the public site, blocked by `_redirects`

## 16. Migration Checklist for the Fable 5 Redesign

- preserve every existing public URL or add exact redirects
- preserve nav taxonomy and footer legal links
- preserve homepage lead form fields, consent, and `/api/lead`
- preserve Ask Leonardo form fields, consent, and `/api/ask`
- preserve assistant widget and `/api/assistant`
- preserve WhatsApp booking links and service-specific message variants
- preserve first-session offer positioning and current pricing references unless intentionally changed
- preserve contact details:
  - `+52 663 487 5859`
  - `lft.leonardo.machado@gmail.com`
  - `Jose Maria Velazco 2632, Zona Urbana Rio Tijuana`
- preserve Google review/read-review URLs
- preserve social links:
  - Facebook
  - Instagram
  - Threads
  - TikTok
  - YouTube
- preserve legal pages and noindex behavior
- preserve canonical URLs and schema coverage
- preserve GA4, Clarity, Meta Pixel, Turnstile
- preserve `_headers`, `_redirects`, `_routes.json`, and Pages Functions
- preserve emergency / cross-border / compliance disclosures on contact/legal pages
- verify sticky CTA remains on mobile and desktop
- verify no redesign removes the homepage location proof, founder authority, or proof/reviews pathway

## 17. Final “Do Not Lose” Checklist

- homepage lead form
- Ask Leonardo form
- `/api/lead`
- `/api/ask`
- `/api/assistant`
- `/api/config`
- WhatsApp booking architecture
- sticky WhatsApp CTA
- full page inventory
- reviews page
- success stories page
- contact page
- founder page
- legal/privacy/cookies/ARCO/medical pages
- resources hub
- educational article URLs
- service/condition URLs
- location / map / hours / phone / email
- Google review links
- social links
- GA4
- Clarity
- Meta Pixel
- Turnstile
- canonical URLs
- schema/JSON-LD
- sitemap.xml
- robots.txt
- footer legal links
- trust strip numbers
- first-session `$750 MXN` positioning
- founder-led-care and day-one assessment+treatment differentiators

