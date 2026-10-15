/* Exercise Prescription funnel routing (shared by the English and Spanish questionnaires; targets and messages come from data attributes, defaulting to the English values). Client-side only: answers are never sent, stored or logged.
   Rule R1 (explicit stated answers only): BUY_NOW when Q2 is not "exploring" AND Q3 is "yes" AND Q4 is not "not_currently"; every other complete answer set is BUY_LATER.
   Q1 (goal) and Q5 (support type) are context only and never affect routing. */
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
  const proceed = () => {
    const unanswered = [...form.querySelectorAll("fieldset")].find((field) => !field.querySelector("input:checked"));
    if (unanswered) {
      status.textContent = text.msgIncomplete || "Please choose one option for each question to continue.";
      status.classList.add("is-error");
      unanswered.querySelector("input").focus();
      return;
    }
    status.classList.remove("is-error");
    status.textContent = text.msgRedirect || "Thank you. Taking you to your next step…";
    window.location.assign(route());
  };
  action.addEventListener("click", proceed);
  form.addEventListener("submit", (event) => { event.preventDefault(); proceed(); });
})();
