/* Persistent conversion CTA (Spanish funnel pages). Shows the sticky CTA only while no inline CTA or the footer is on screen,
   so there is never a duplicate or competing primary action and it never covers the footer. Without JS it stays visible. */
(() => {
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
