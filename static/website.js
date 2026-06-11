const topbar = document.querySelector("[data-topbar]");
const fab = document.querySelector(".sticky-whatsapp");
const revealItems = document.querySelectorAll(".reveal");
const leadForm = document.querySelector("[data-lead-form]");
const leadStatus = document.querySelector("[data-lead-status]");
const leadSubmitButton = document.querySelector("[data-lead-submit]");

const WHATSAPP_NUMBER = "526634875859";

const updateTopbar = () => {
    if (!topbar) return;
    topbar.classList.toggle("is-scrolled", window.scrollY > 16);
};

const updateFab = () => {
    fab?.classList.toggle("is-visible", window.scrollY > 260);
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
        if (honeypot) return;

        const name = String(formData.get("full_name") || "").trim();
        const phone = String(formData.get("phone") || "").trim();
        const goal = String(formData.get("goal") || "").trim();

        if (!name || !phone || !goal) return;

        if (leadSubmitButton) leadSubmitButton.disabled = true;

        if (typeof gtag === "function") {
            gtag("event", "lead_form_submit", {
                event_category: "lead",
                event_label: goal,
            });
        }

        const message = `Hola, me interesa agendar una evaluacion en PhysioPro.\n\nNombre: ${name}\nWhatsApp: ${phone}\nBusco: ${goal}`;
        const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

        leadForm.classList.add("is-submitted");
        setLeadStatus(
            "Listo. Te redirigimos a WhatsApp para coordinar tu primera sesion.",
            "success"
        );

        setTimeout(() => {
            window.open(waUrl, "_blank", "noopener,noreferrer");
        }, 700);
    });
};

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
        });
    },
    { threshold: 0.12 }
);

revealItems.forEach((item) => revealObserver.observe(item));

window.addEventListener(
    "scroll",
    () => {
        updateTopbar();
        updateFab();
    },
    { passive: true }
);

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
