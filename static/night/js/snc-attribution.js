/* Campaign attribution helper for the exercise-program funnel pages (questionnaire + consultation/information pages, EN and ES).
   Carries ONLY allow-listed utm_* values from the current URL to the next funnel page and, for the three approved EP creatives only,
   a short human-readable " (Ref: EP-N1|EP-N2|EP-N3)" suffix on the WhatsApp prefill (no raw UTM strings, never invented, never defaulted
   for untagged/direct visitors). Pure functions: no storage, no cookies, no network, no analytics. Questionnaire answers never enter a URL. */
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
  // Approved EP creative ids (utm_content) -> visible reference. Exact, case-sensitive match; anything else yields no reference.
  const EP_REFS = { ep3_n1_structure: "EP-N1", ep3_n2_return: "EP-N2", ep3_n3_complete_system: "EP-N3" };
  // utm_campaign values accepted as the EP campaign (owner slug first; others legacy/alias). An absent campaign is tolerated, a different one is not.
  const EP_CAMPAIGNS = ["ep_3_months_launch", "physiopro_exercise_prescription", "ep_90d_launch"];
  const epRef = (attr) => {
    const content = attr && attr.utm_content;
    if (!content || !Object.prototype.hasOwnProperty.call(EP_REFS, content)) return "";
    if (attr.utm_campaign && EP_CAMPAIGNS.indexOf(attr.utm_campaign) === -1) return "";
    return EP_REFS[content];
  };
  const waTag = (attr) => { const ref = epRef(attr); return ref ? " (Ref: " + ref + ")" : ""; };
  if (typeof window !== "undefined") window.sncAttribution = { KEYS, fromSearch, toQuery, waTag, epRef };
})();
