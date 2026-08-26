# Homepage FAQ Schema Addition — Ready to Paste

**Owner of this file's consumption:** the homepage workstream (Batch C,
Workstream 1). This workstream (Batch E, Workstream 3) only defines the
pattern and drafts the ready-to-paste object per the integration plan's
named collision point: "Homepage FAQ schema: Workstream 3 defines the
JSON-LD pattern; Workstream 1 applies it to `release/production-homepage.html`
(not `index.html`)."

**Do not apply this directly.** `release/production-homepage.html` is not
touched by this workstream.

## Source question (Fable's border-crossing question)

> "I'm crossing from the U.S. — does that work?"
> "Yes. The clinic is minutes from the border, and sessions are available
> in English and Spanish."

## Ready-to-paste `mainEntity` object

Field set matches `knee-pain.html`'s existing `FAQPage` JSON-LD shape
(`@type: Question` / `acceptedAnswer.@type: Answer`). Insert as one more
entry in the homepage's FAQ `mainEntity` array (the plan's homepage build
order calls for an 8-question FAQ section — this is one of those 8):

```json
{
  "@type": "Question",
  "name": "I'm crossing from the U.S. — does that work?",
  "acceptedAnswer": {
    "@type": "Answer",
    "text": "Yes. The clinic is minutes from the border, and sessions are available in English and Spanish."
  }
}
```

## Matching visible FAQ accordion markup (optional, for consistency)

If the homepage FAQ section uses the same `<details>/<summary>` accordion
pattern as the condition pages (see `knee-pain.html`'s FAQ section), the
equivalent visible markup is:

```html
<li class="faq-item">
    <details>
        <summary>I'm crossing from the U.S. — does that work?</summary>
        <p>Yes. The clinic is minutes from the border, and sessions are available in English and Spanish.</p>
    </details>
</li>
```

## Notes for the homepage workstream

- This is a direct transplant of Fable's unique border-crossing question,
  cleaned of any tracking/marketing framing — content only.
- No specific claims about wait times, distance in minutes-exact, or
  scheduling guarantees were added beyond what's stated above.
- Verify the final FAQ section's total question count and JSON-LD
  `mainEntity` array against whatever seven other questions Workstream 1
  selects, per the plan's "FAQ (8 questions + schema)" build-order note.
