/* Funnel destination pages (EN + ES): (1) campaign attribution: carries allow-listed utm_* on internal funnel links and appends a short
   "[ref: ...]" tag to the WhatsApp prefill when a valid utm_source is present (see snc-attribution.js; nothing stored or sent);
   (2) persistent conversion CTA: shows the sticky CTA only while no inline CTA or the footer is on screen, so there is never a
   duplicate or competing primary action and it never covers the footer. Without JS the sticky CTA stays visible and links are unchanged. */
(() => {
  const attribution = window.sncAttribution;
  if (attribution) {
    const attr = attribution.fromSearch(window.location.search);
    const query = attribution.toQuery(attr);
    const tag = attribution.waTag(attr);
    if (tag) {
      document.querySelectorAll('a[data-wa][href^="https://wa.me/"]').forEach((a) => {
        try {
          const url = new URL(a.href);
          const text = url.searchParams.get("text");
          if (text) a.setAttribute("href", url.origin + url.pathname + "?text=" + encodeURIComponent(text + tag));
        } catch (e) { /* leave the link untouched */ }
      });
    }
    if (query) {
      document.querySelectorAll("a[data-snc-link]").forEach((a) => {
        const href = a.getAttribute("href");
        if (href && href.indexOf("?") === -1 && href.indexOf("#") === -1) a.setAttribute("href", href + query);
      });
    }
  }
  const bar = document.querySelector("[data-sticky-cta]");
  if (!bar || !("IntersectionObserver" in window)) return;
  const targets = [...document.querySelectorAll("[data-cta-inline], .foot")];
  const onScreen = new Set();
  const apply = () => {
    const hide = onScreen.size > 0;
    bar.classList.toggle("is-hidden", hide);
    bar.inert = hide;
    bar.setAttribute("aria-hidden", String(hide));
  };
  bar.classList.add("is-hidden");
  bar.inert = true;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => (entry.isIntersecting ? onScreen.add(entry.target) : onScreen.delete(entry.target)));
    apply();
  }, { threshold: 0 });
  targets.forEach((t) => io.observe(t));
})();
