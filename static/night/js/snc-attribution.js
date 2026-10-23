/* Campaign attribution helper for the exercise-program funnel pages (questionnaire + consultation/information pages, EN and ES).
   Carries ONLY allow-listed utm_* values from the current URL to the next funnel page and into a short "[ref: ...]" tag on the
   WhatsApp prefill. Pure functions: no storage, no cookies, no network, no analytics. Questionnaire answers never enter a URL. */
(() => {
  const KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
  const SAFE = /^[A-Za-z0-9._~-]{1,64}$/;
  const fromSearch = (search) => {
    const out = {};
    let params;
    try { params = new URLSearchParams(search || ""); } catch (e) { return out; }
    for (const key of KEYS) {
      const value = params.get(key);
      if (value !== null && SAFE.test(value)) out[key] = value;
    }
    return out;
  };
  const toQuery = (attr) => {
    const parts = KEYS.filter((key) => attr[key]).map((key) => key + "=" + encodeURIComponent(attr[key]));
    return parts.length ? "?" + parts.join("&") : "";
  };
  const waTag = (attr) => (attr.utm_source ? " [ref: " + attr.utm_source + (attr.utm_content ? "/" + attr.utm_content : "") + "]" : "");
  if (typeof window !== "undefined") window.sncAttribution = { KEYS, fromSearch, toQuery, waTag };
})();
