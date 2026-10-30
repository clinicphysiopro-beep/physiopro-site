/* Night Session — CORE behaviour shared by every page. Vanilla, no dependencies.
   Content never depends on this file: without JS every page is complete and readable. */
(() => {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Reveals: one-shot, only under motion-allowed (CSS gates the effect) ---------- */
  const once = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.classList.add("is-in");
      once.unobserve(e.target);
    }
  }, { threshold: 0.35 });
  document.querySelectorAll(".reveal").forEach((el) => once.observe(el));
  window.NS = { once, reduced };

  /* ---------- Nav: tint, hide on scroll down / show on scroll up, booking dock, progress ---------- */
  const nav = document.querySelector("[data-nav]");
  const dock = document.querySelector("[data-dock]");
  const hideDockAt = [...document.querySelectorAll("[data-dock-hide]")];
  const progress = document.querySelector("[data-progress]");
  const article = document.querySelector("[data-progress-of]");
  let lastY = scrollY, ticking = false;
  const inView = (el) => { const r = el.getBoundingClientRect(); return r.top < innerHeight && r.bottom > 0; };
  const onScroll = () => {
    const y = scrollY, down = y - lastY > 4, up = lastY - y > 4;
    if (nav) {
      nav.classList.toggle("is-solid", y > 40);
      const menuOpen = document.querySelector(".menu[open]");
      if (!menuOpen && nav.contains(document.activeElement) === false) {
        if (down && y > innerHeight * 0.6) nav.classList.add("is-hidden");
        else if (up || y < 80) nav.classList.remove("is-hidden");
      }
    }
    if (dock) {
      const typing = document.activeElement && document.activeElement.closest("form");
      const show = y > innerHeight * 0.85 && !hideDockAt.some(inView) && !down && !typing;
      dock.classList.toggle("is-shown", show);
      dock.setAttribute("aria-hidden", String(!show));
      dock.querySelectorAll("a").forEach((a) => (a.tabIndex = show ? 0 : -1));
    }
    if (progress && article) {
      const r = article.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - innerHeight)));
      progress.style.setProperty("--p", p.toFixed(3));
    }
    lastY = y; ticking = false;
  };
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  if (nav) nav.addEventListener("focusin", () => nav.classList.remove("is-hidden"));
  // Never let the fixed dock sit over a field the reader is filling in.
  document.addEventListener("focusin", () => requestAnimationFrame(onScroll));
  document.addEventListener("focusout", () => setTimeout(() => requestAnimationFrame(onScroll), 0));
  requestAnimationFrame(onScroll);

  /* ---------- Full-screen menu (native <dialog>: focus trap, Esc, focus return) ---------- */
  const menu = document.getElementById("menu");
  const opener = document.querySelector("[data-menu-open]");
  if (opener && menu) {
    opener.setAttribute("aria-expanded", "false");
    opener.addEventListener("click", () => { menu.showModal(); opener.setAttribute("aria-expanded", "true"); });
    menu.addEventListener("close", () => opener.setAttribute("aria-expanded", "false"));
    menu.querySelector("[data-menu-close]").addEventListener("click", () => menu.close());
    menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => menu.close()));
  }

  /* ---------- On-this-page TOC: active section marker ---------- */
  const tocLinks = [...document.querySelectorAll("[data-toc] a[href^='#']")];
  if (tocLinks.length) {
    const targets = tocLinks.map((a) => document.getElementById(a.hash.slice(1))).filter(Boolean);
    const spy = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        tocLinks.forEach((a) => a.removeAttribute("aria-current"));
        const hit = tocLinks.find((a) => a.hash === "#" + e.target.id);
        if (hit) hit.setAttribute("aria-current", "true");
      }
    }, { rootMargin: "-20% 0px -70% 0px" });
    targets.forEach((t) => spy.observe(t));
    // Mobile TOC is a <details>: close it after a jump so the reader lands on the text.
    const toc = document.querySelector("details[data-toc]");
    // Open by default (no-JS readers see it); on phones/tablets it starts collapsed above the text.
    if (toc && matchMedia("(max-width: 1099px)").matches) toc.open = false;
    if (toc) tocLinks.forEach((a) => a.addEventListener("click", () => { if (matchMedia("(max-width: 1099px)").matches) toc.open = false; }));
  }

  /* ---------- Prototype mocks: nothing leaves this machine ---------- */
  const toast = document.querySelector("[data-toast]");
  let tt;
  const say = (msg) => { toast.textContent = msg; toast.classList.add("is-on"); clearTimeout(tt); tt = setTimeout(() => toast.classList.remove("is-on"), 4200); };
  document.querySelectorAll("[data-mock]").forEach((a) => a.addEventListener("click", (e) => { e.preventDefault(); say(a.dataset.mock); }));

  /* ---------- Lead / Ask forms: validation → mocked send → success state ----------
     Field names mirror the production payload contract (/api/lead: full_name, phone, goal, honeypot,
     consent · /api/ask: full_name, question, email, phone, honeypot, consent) so the transplant is
     mechanical. The honeypot is never validated; a per-field data-err overrides the default message. */
  const msgs = {
    name: "Enter your name.", full_name: "Enter your name.",
    phone: "Enter a phone number we can reach on WhatsApp.",
    email: "Enter a valid email address.",
    interest: "Choose what you're looking for.", goal: "Choose what you're looking for.",
    question: "Write your question (at least 8 characters).",
    consent: "Consent is required before we can contact you.",
  };
  document.querySelectorAll("[data-mock-form]").forEach((form) => {
    const status = form.querySelector(".lead__status");
    const fields = [...form.querySelectorAll("input, select, textarea")].filter((f) => f.name !== "honeypot");
    const check = (f) => {
      const ok = f.checkValidity();
      f.setAttribute("aria-invalid", String(!ok));
      const err = document.getElementById((f.getAttribute("aria-describedby") || "").split(" ")[0]);
      if (err) err.textContent = ok ? "" : f.dataset.err || msgs[f.name] || "Required.";
      return ok;
    };
    // Re-check only fields already flagged, and only as they change — never on blur, which would
    // collapse an error row mid-click and move the next target out from under the pointer.
    fields.forEach((f) => ["input", "change"].forEach((ev) =>
      f.addEventListener(ev, () => { if (f.getAttribute("aria-invalid") === "true") check(f); })));
    // Visible character counter for capped fields (e.g. Ask: question ≤ 500)
    form.querySelectorAll("[data-count-for]").forEach((c) => {
      const f = form.querySelector(`[name="${c.dataset.countFor}"]`);
      const max = Number(f.getAttribute("maxlength"));
      const upd = () => { c.textContent = `${f.value.length} / ${max}`; c.classList.toggle("is-near", f.value.length > max * 0.9); };
      f.addEventListener("input", upd); upd();
    });
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const bad = fields.filter((f) => !check(f));
      if (bad.length) { status.textContent = `Please fix ${bad.length} field${bad.length > 1 ? "s" : ""}.`; bad[0].focus(); return; }
      const btn = form.querySelector("button[type=submit]");
      btn.setAttribute("aria-busy", "true"); status.textContent = "Sending…";
      setTimeout(() => {
        btn.removeAttribute("aria-busy");
        const done = form.nextElementSibling;
        status.textContent = ""; form.hidden = true; done.hidden = false; done.querySelector("h3").focus();
      }, reduced ? 0 : 700);
    });
    const again = form.parentElement.querySelector("[data-lead-again]");
    if (again) again.addEventListener("click", () => {
      form.reset(); form.querySelectorAll("[aria-invalid]").forEach((f) => f.removeAttribute("aria-invalid"));
      form.querySelectorAll(".lead__err").forEach((x) => (x.textContent = ""));
      form.querySelectorAll("[data-count-for]").forEach((c) => form.querySelector(`[name="${c.dataset.countFor}"]`).dispatchEvent(new Event("input")));
      status.textContent = ""; form.hidden = false; form.nextElementSibling.hidden = true; fields[0].focus();
    });
  });
})();
