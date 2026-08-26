# New URLs for Sitemap Consolidation (Batch E5)

**Owner of `sitemap.xml`:** Workstream 3, applied last (E5), after C/D/E's
URL additions are all known. This workstream does **not** touch
`sitemap.xml` directly — noting the URLs here per the execution plan's
instruction, for later consolidation.

## New condition pages shipped this workstream

| URL | Source file | Category |
|---|---|---|
| `https://physioprotijuana.com/ankle-sprain` | `ankle-sprain.html` | Pain & Injury (condition page) |
| `https://physioprotijuana.com/tennis-golfers-elbow` | `tennis-golfers-elbow.html` | Pain & Injury (condition page) — single page covering both lateral and medial epicondylalgia |
| `https://physioprotijuana.com/hip-pain` | `hip-pain.html` | Pain & Injury (condition page) |

## Suggested `sitemap.xml` entries (for E5 to consume, not applied now)

Match the existing condition-page entries' `<changefreq>`/`<priority>`
pattern in `sitemap.xml` (check against `knee-pain`'s current entry at
consolidation time):

```xml
<url>
  <loc>https://physioprotijuana.com/ankle-sprain</loc>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
<url>
  <loc>https://physioprotijuana.com/tennis-golfers-elbow</loc>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
<url>
  <loc>https://physioprotijuana.com/hip-pain</loc>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

(Exact `<changefreq>`/`<priority>`/`<lastmod>` values should be copied from
`knee-pain`'s live sitemap entry at E5 time, not assumed from this draft —
this table is a placeholder pending Leonardo's "ship shell now vs. hold for
copy" decision per the plan's open decision #10.)

## Not yet in sitemap

These 3 URLs are **not** in `sitemap.xml` as of this commit. `sitemap.xml`
was explicitly left untouched in this workstream since it's a shared
collision file consolidated once across Batches C/D/E (see plan §
"Named collision points" and Batch E5 row in the master execution table).
