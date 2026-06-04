const topbar = document.querySelector("[data-topbar]");
const fab = document.querySelector(".sticky-whatsapp");
const revealItems = document.querySelectorAll(".reveal");
const parallaxItems = document.querySelectorAll("[data-parallax]");
const leadForm = document.querySelector("[data-lead-form]");
const leadStatus = document.querySelector("[data-lead-status]");
const leadSubmitButton = document.querySelector("[data-lead-submit]");

const WHATSAPP_NUMBER = "526634875859";

const updateTopbar = () => {
    if (!topbar) return;
    topbar.classList.toggle("is-scrolled", window.scrollY > 16);
};

const updateFab = () => {
    fab?.classList.toggle("is-visible", window.scrollY > 200);
};

const setLeadStatus = (message, type) => {
    if (!leadStatus) return;
    leadStatus.hidden = false;
    leadStatus.textContent = message;
    leadStatus.classList.remove("lead-capture__status--success", "lead-capture__status--error");
    if (type) leadStatus.classList.add(`lead-capture__status--${type}`);
};

const setupLeadCapture = () => {
    if (!leadForm) return;

    leadForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(leadForm);
        const honeypot = String(formData.get("honeypot") || "").trim();
        if (honeypot) return; // bot trap

        const name = String(formData.get("full_name") || "").trim();
        const phone = String(formData.get("phone") || "").trim();
        const goal = String(formData.get("goal") || "").trim();

        if (!name || !phone || !goal) return;

        if (leadSubmitButton) leadSubmitButton.disabled = true;

        // Track conversion in GA4
        if (typeof gtag === "function") {
            gtag("event", "lead_form_submit", {
                event_category: "lead",
                event_label: goal,
            });
        }

        const message = `Hola, me interesa agendar una evaluación en PhysioPro.\n\nNombre: ${name}\nWhatsApp: ${phone}\nBusco: ${goal}`;
        const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

        leadForm.classList.add("is-submitted");
        setLeadStatus(
            "Listo. Te redirigimos a WhatsApp para coordinar tu primera sesión.",
            "success"
        );

        setTimeout(() => {
            window.open(waUrl, "_blank", "noopener,noreferrer");
        }, 800);
    });
};

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
    },
    { threshold: 0.18 }
);

revealItems.forEach((item) => revealObserver.observe(item));

window.addEventListener("scroll", () => {
    updateTopbar();
    updateFab();

    const scrollY = window.scrollY;
    parallaxItems.forEach((item, index) => {
        const shift = (scrollY * (0.03 + index * 0.01)).toFixed(2);
        item.style.transform = `translateY(${shift}px)`;
    });
});

// Track WhatsApp CTA clicks
document.querySelectorAll('a[href*="wa.me"]').forEach((el) => {
    el.addEventListener("click", () => {
        if (typeof gtag === "function") {
            gtag("event", "whatsapp_cta_click", {
                event_category: "lead",
                event_label: el.textContent.trim(),
            });
        }
    });
});

updateTopbar();
updateFab();
setupLeadCapture();

/* Hero entry animation */
const heroEntry = document.querySelector("[data-hero-entry]");
if (heroEntry) {
    const children = heroEntry.querySelectorAll(
        ".hero-badge, .eyebrow, h1, .hero-text, .hero-actions, .hero-points"
    );
    children.forEach((el, i) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(18px)";
        el.style.transition = `opacity 0.65s cubic-bezier(0.22,1,0.36,1) ${0.05 + i * 0.08}s, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${0.05 + i * 0.08}s`;
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
            });
        });
    });
}

/* Count-up animation */
const countupEls = document.querySelectorAll("[data-countup]");
if (countupEls.length) {
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);
    const animateCountup = (el) => {
        const target = parseInt(el.dataset.target, 10);
        const prefix = el.dataset.prefix || "";
        const suffix = el.dataset.suffix || "";
        const duration = 1400;
        const start = performance.now();
        const step = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const value = Math.round(easeOut(progress) * target);
            el.textContent = prefix + value.toLocaleString("es-MX") + suffix;
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    };
    const countupObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateCountup(entry.target);
                    countupObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );
    countupEls.forEach((el) => countupObserver.observe(el));
}
