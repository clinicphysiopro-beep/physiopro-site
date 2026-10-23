/* Exercise Prescription funnel routing (shared by the English and Spanish questionnaires; targets and messages come from data attributes, defaulting to the English values). Client-side only: answers are never sent, stored or logged.
   Rule R1 (explicit stated answers only): BUY_NOW when Q2 is not "exploring" AND Q3 is "yes" AND Q4 is not "not_currently"; every other complete answer set is BUY_LATER.
   Q1 (goal) and Q5 (support type) are context only and never affect routing.
   The redirect carries only allow-listed utm_* values from the current URL (never answers); see snc-attribution.js. */
(() => {
  const form = document.querySelector("[data-snc-funnel]");
  if (!form) return;
  const status = form.querySelector("[data-snc-status]");
  const action = form.querySelector("[data-snc-continue]");
  if (!action || !status) return;
  const text = form.dataset;
  const nowUrl = text.routeNow || "consultation/";
  const laterUrl = text.routeLater || "information/";
  const answer = (name) => {
    const checked = form.querySelector(`input[name="${name}"]:checked`);
    return checked ? checked.value : null;
  };
  const route = () =>
    answer("start_timing") !== "exploring" &&
    answer("commitment_readiness") === "yes" &&
    answer("investment_readiness") !== "not_currently"
      ? nowUrl
      : laterUrl;
  // Allow-listed utm_* only (see snc-attribution.js); never answers. Empty string when absent, malformed or the helper is missing.
  const carriedQuery = () => {
    const attribution = window.sncAttribution;
    return attribution ? attribution.toQuery(attribution.fromSearch(window.location.search)) : "";
  };
  // Internal links marked data-snc-link (language switch, no-JS fallbacks) keep the same allow-listed utm_* values; never answers.
  const carried = carriedQuery();
  if (carried) {
    document.querySelectorAll("a[data-snc-link]").forEach((a) => {
      const href = a.getAttribute("href");
      if (href && href.indexOf("?") === -1 && href.indexOf("#") === -1) a.setAttribute("href", href + carried);
    });
  }
  const proceed = () => {
    const unanswered = [...form.querySelectorAll("fieldset")].find((field) => !field.querySelector("input:checked"));
    if (unanswered) {
      status.textContent = text.msgIncomplete || "Please choose one option for each question to continue.";
      status.classList.add("is-error");
      if (unanswered.classList) unanswered.classList.add("is-invalid");
      unanswered.querySelector("input").focus();
      return;
    }
    status.classList.remove("is-error");
    status.textContent = text.msgRedirect || "Thank you. Taking you to your next step…";
    window.location.assign(route() + carriedQuery());
  };
  action.addEventListener("click", proceed);
  form.addEventListener("submit", (event) => { event.preventDefault(); proceed(); });
  form.addEventListener("change", (event) => {
    const field = event.target && event.target.closest ? event.target.closest("fieldset") : null;
    if (field) field.classList.remove("is-invalid");
  });
})();
