/* Ad-to-page message match (questionnaire pages, EN + ES). When the visit carries an allow-listed utm_content that the page knows
   (data-hook-<utm_content> attributes on the [data-entry-hook] heading), the heading text is replaced by that ad's hook phrase.
   No match, no UTMs, no helper or no JS: the default heading stays.
   Pre-paint guard: an inline script in <head> hides the heading (visibility only, layout unchanged) while a valid ad key is pending so the default text is never painted before the swap; this script clears it on every exit path and the inline script clears it 3 s after the first frame if this file never runs. Text-only DOM change: nothing is stored or sent, and no answers are read. Relies on snc-attribution.js (same allow-list and value rule). */
(() => {
  try {
  const attribution = window.sncAttribution;
  const heading = document.querySelector("[data-entry-hook]");
  if (!attribution || !heading) return;
  const key = attribution.fromSearch(window.location.search).utm_content;
  if (!key || key !== key.toLowerCase()) return;
  const hook = heading.getAttribute("data-hook-" + key);
  if (!hook) return;
  const node = [...heading.childNodes].find((n) => n.nodeType === 3);
  if (!node) return;
  node.nodeValue = hook;
  heading.setAttribute("data-hook-applied", key);
  } finally {
    if (typeof window.sncHookClear === "function") window.sncHookClear();
  }
})();
