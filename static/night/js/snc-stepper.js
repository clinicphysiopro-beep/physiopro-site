/* Exercise Prescription questionnaire: one-question-at-a-time presentation (EN + ES). Presentation only: routing (rule R1), validation of the final
   answer set, attribution and the redirect stay in snc-funnel.js; answers are never sent, stored or logged. Without JS every question stays visible. */
(() => {
  const form = document.querySelector("[data-snc-funnel]");
  if (!form) return;
  const steps = [...form.querySelectorAll("fieldset.snc-question")];
  const next = form.querySelector("[data-snc-next]");
  const back = form.querySelector("[data-snc-back]");
  const finish = form.querySelector("[data-snc-continue]");
  const status = form.querySelector("[data-snc-status]");
  const label = form.querySelector("[data-snc-step-label]");
  const fill = form.querySelector("[data-snc-fill]");
  const progress = form.querySelector("[data-snc-progress]");
  if (steps.length < 2 || !next || !back || !finish || !status || !label || !fill || !progress) return;
  const text = form.dataset;
  const last = steps.length - 1;
  const answered = (step) => !!step.querySelector("input:checked");
  const fmt = (tpl, n) => (tpl || "{n}/{total}").replace("{n}", n).replace("{total}", steps.length);
  let index = 0;
  let pending = null;
  let pointerAt = 0;
  const show = (n, moveFocus) => {
    index = n;
    if (pending) { clearTimeout(pending); pending = null; }
    steps.forEach((step, k) => { step.hidden = k !== n; });
    back.hidden = n === 0;
    next.hidden = n === last;
    finish.hidden = n !== last;
    label.textContent = fmt(text.stepLabel, n + 1);
    fill.style.width = ((n + 1) / steps.length) * 100 + "%";
    progress.setAttribute("role", "progressbar");
    progress.setAttribute("aria-valuemin", "1");
    progress.setAttribute("aria-valuemax", String(steps.length));
    progress.setAttribute("aria-valuenow", String(n + 1));
    progress.setAttribute("aria-valuetext", fmt(text.stepLabel, n + 1));
    progress.setAttribute("aria-label", form.getAttribute("aria-label") || "");
    status.textContent = "";
    status.classList.remove("is-error");
    if (moveFocus) steps[n].focus();
  };
  const advance = () => {
    const step = steps[index];
    if (!answered(step)) {
      status.textContent = text.msgStep || "Please choose an option to continue.";
      status.classList.add("is-error");
      step.classList.add("is-invalid");
      step.querySelector("input").focus();
      return;
    }
    if (index < last) show(index + 1, true);
  };
  form.classList.add("is-stepper");
  const firstOpen = steps.findIndex((step) => !answered(step));
  show(firstOpen === -1 ? last : firstOpen, false);
  next.addEventListener("click", advance);
  back.addEventListener("click", () => { if (index > 0) show(index - 1, true); });
  // Enter on a radio acts as "Continue" until the last question, then as the final action (browsers do not reliably submit from a radio).
  form.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" || !event.target || event.target.type !== "radio") return;
    event.preventDefault();
    if (index < last) advance(); else finish.click();
  });
  form.addEventListener("submit", (event) => {
    if (index < last) { event.preventDefault(); event.stopImmediatePropagation(); advance(); }
  }, true);
  // Auto-advance after a pointer/touch selection (one advance per selection, never on the last question). Keyboard selection (arrow keys,
  // Space) does not advance, so keyboard users can browse options; they use Continue or Enter. Back and Continue stay available.
  form.addEventListener("pointerdown", () => { pointerAt = Date.now(); }, true);
  form.addEventListener("change", (event) => {
    if (status.classList.contains("is-error")) { status.textContent = ""; status.classList.remove("is-error"); }
    const input = event.target;
    if (!input || input.type !== "radio" || index >= last || pending || Date.now() - pointerAt > 800) return;
    const from = index;
    pending = setTimeout(() => { pending = null; if (index === from && answered(steps[from])) show(from + 1, true); }, 280);
  });
  // Completion state (the redirect itself is started by snc-funnel.js, registered first).
  finish.addEventListener("click", () => {
    if (steps.every(answered)) {
      form.classList.add("is-complete");
      fill.style.width = "100%";
      label.textContent = text.labelDone || label.textContent;
    }
  });
})();
