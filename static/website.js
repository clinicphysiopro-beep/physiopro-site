const topbar = document.querySelector("[data-topbar]");
const fab = document.querySelector(".sticky-whatsapp");
const navToggle = document.querySelector("[data-nav-toggle]");
const navMenu = document.querySelector(".nav");
const leadForm = document.querySelector("[data-lead-form]");
const leadStatus = document.querySelector("[data-lead-status]");
const leadSubmitButton = document.querySelector("[data-lead-submit]");
const WHATSAPP_NUMBER = "526634875859";

const revealEls = Array.from(document.querySelectorAll(".reveal:not(.in)"));
const processTrack = document.getElementById("process-track");
let processTrackDone = false;

const updateTopbar = () => {
    if (!topbar) return;
    topbar.classList.toggle("is-scrolled", window.scrollY > 24);
};

const updateFab = () => {
    if (!fab) return;
    const hero = document.getElementById("hero");
    const lead = document.getElementById("lead-capture");
    const pastHero = window.scrollY > (hero ? hero.offsetHeight * 0.62 : 600);
    const nearLead = lead && lead.getBoundingClientRect().top < window.innerHeight * 0.9;
    fab.classList.toggle("is-visible", pastHero && !nearLead);
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

        const message = `Hello, I'm interested in booking an evaluation at PhysioPro.\n\nName: ${name}\nWhatsApp: ${phone}\nLooking for: ${goal}`;
        const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

        leadForm.classList.add("is-submitted");
        setLeadStatus(
            "Done. We’re sending you to WhatsApp to coordinate your first session.",
            "success"
        );

        setTimeout(() => {
            window.open(waUrl, "_blank", "noopener,noreferrer");
        }, 700);
    });
};

const lightProcess = () => {
    if (!processTrack || processTrackDone) return;
    processTrackDone = true;
    processTrack.style.setProperty("--progress", window.innerWidth <= 980 ? "100%" : "100%");
    Array.from(processTrack.querySelectorAll(".pstep")).forEach((step, index) => {
        setTimeout(() => {
            step.classList.add("lit");
        }, 180 + index * 220);
    });
};

const checkReveals = () => {
    const vh = window.innerHeight || document.documentElement.clientHeight;

    for (let i = revealEls.length - 1; i >= 0; i -= 1) {
        const rect = revealEls[i].getBoundingClientRect();
        if (rect.top < vh * 0.92) {
            revealEls[i].classList.add("in", "is-visible");
            revealEls.splice(i, 1);
        }
    }

    if (processTrack && !processTrackDone) {
        const rect = processTrack.getBoundingClientRect();
        if (rect.top < vh * 0.85 && rect.bottom > 0) {
            lightProcess();
        }
    }
};

const setupWantList = () => {
    const wantList = document.getElementById("want-list");
    if (!wantList || !window.matchMedia("(hover: none)").matches) return;

    Array.from(wantList.querySelectorAll("li")).forEach((li) => {
        li.addEventListener(
            "touchstart",
            () => {
                Array.from(wantList.children).forEach((child) => child.classList.remove("on"));
                li.classList.add("on");
            },
            { passive: true }
        );
    });
};

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

window.addEventListener(
    "scroll",
    () => {
        updateTopbar();
        updateFab();
        checkReveals();
    },
    { passive: true }
);

window.addEventListener("resize", checkReveals, { passive: true });
window.addEventListener("load", () => {
    updateTopbar();
    updateFab();
    checkReveals();
});

setTimeout(checkReveals, 400);

const revealPoll = setInterval(() => {
    checkReveals();
    if (revealEls.length === 0 && processTrackDone) clearInterval(revealPoll);
}, 450);

const setupHamburger = () => {
    if (!navToggle || !navMenu) return;

    const closeNav = () => {
        navMenu.classList.remove("is-open");
        navToggle.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
    };

    navToggle.addEventListener("click", () => {
        const opening = !navMenu.classList.contains("is-open");
        navMenu.classList.toggle("is-open", opening);
        navToggle.classList.toggle("is-open", opening);
        navToggle.setAttribute("aria-expanded", String(opening));
    });

    navMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", closeNav);
    });

    document.addEventListener("keydown", e => {
        if (e.key === "Escape") closeNav();
    });
};

updateTopbar();
updateFab();
checkReveals();
setupWantList();
setupLeadCapture();
setupHamburger();
