// ─── Attribution config ──────────────────────────────────────────────────────
// Replace YOUR_PIXEL_ID with the 15-digit ID from Meta Business Manager →
// Events Manager → Connect Data Sources → Web → Meta Pixel
const PHYSIOPRO_META_PIXEL_ID = "YOUR_PIXEL_ID";

// Set to the PhysioPro API base URL when domain + SSL are live (e.g. "https://physiopro.mx").
// Leave empty to skip the API lead capture (WhatsApp fallback is always active).
const PHYSIOPRO_API_URL = "";
// ─────────────────────────────────────────────────────────────────────────────

const topbar = document.querySelector("[data-topbar]");
const fab = document.querySelector(".sticky-whatsapp");
const navToggle = document.querySelector("[data-nav-toggle]");
const navMenu = document.querySelector(".nav");
const heroEl = document.querySelector(".hero");
const leadForm = document.querySelector("[data-lead-form]");
const leadStatus = document.querySelector("[data-lead-status]");
const leadSubmitButton = document.querySelector("[data-lead-submit]");
const WHATSAPP_NUMBER = "526634875859";

// ─── Meta Pixel ──────────────────────────────────────────────────────────────
const initMetaPixel = () => {
    if (!PHYSIOPRO_META_PIXEL_ID || PHYSIOPRO_META_PIXEL_ID === "YOUR_PIXEL_ID") return;
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
    document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', PHYSIOPRO_META_PIXEL_ID);
    fbq('track', 'PageView');
};

// ─── UTM capture ─────────────────────────────────────────────────────────────
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
const SESSION_UTM_KEY = "physiopro_utms";
const SESSION_LP_KEY  = "physiopro_landing_page";

const captureAndStoreUtms = () => {
    const params = new URLSearchParams(window.location.search);
    const utms = {};
    UTM_KEYS.forEach(k => { if (params.get(k)) utms[k] = params.get(k); });
    if (Object.keys(utms).length > 0) {
        try {
            sessionStorage.setItem(SESSION_UTM_KEY, JSON.stringify(utms));
            sessionStorage.setItem(SESSION_LP_KEY, window.location.pathname);
        } catch (_) {}
    }
};

const getStoredUtms = () => {
    try {
        const raw = sessionStorage.getItem(SESSION_UTM_KEY);
        const lp  = sessionStorage.getItem(SESSION_LP_KEY);
        return { utms: raw ? JSON.parse(raw) : {}, landing_page: lp || "" };
    } catch (_) {
        return { utms: {}, landing_page: "" };
    }
};

const sendLeadToApi = (payload) => {
    if (!PHYSIOPRO_API_URL) return;
    try {
        navigator.sendBeacon(
            PHYSIOPRO_API_URL + "/api/public/leads",
            new Blob([JSON.stringify(payload)], { type: "application/json" })
        );
    } catch (_) {}
};
// ─────────────────────────────────────────────────────────────────────────────

const revealEls = Array.from(document.querySelectorAll(".reveal:not(.in)"));
const processTrack = document.getElementById("process-track");
const trustStrip = document.querySelector("[data-trust-strip]");
let processTrackDone = false;
let trustStripDone = false;

const updateTopbar = () => {
    if (!topbar) return;
    topbar.classList.toggle("is-scrolled", window.scrollY > 24);
};

const updateParallax = () => {
    if (!heroEl || window.scrollY > window.innerHeight * 1.4) return;
    heroEl.style.setProperty("--parallax-y", `${window.scrollY * -0.10}px`);
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

        const { utms, landing_page } = getStoredUtms();

        if (typeof fbq === "function") {
            fbq("track", "Lead", { content_category: goal || "general" });
        }

        sendLeadToApi({
            full_name: name,
            phone: phone,
            goal: goal,
            source: utms.utm_source || "website",
            utm_source: utms.utm_source || null,
            utm_medium: utms.utm_medium || null,
            utm_campaign: utms.utm_campaign || null,
            utm_content: utms.utm_content || null,
            utm_term: utms.utm_term || null,
            landing_page: landing_page || null,
            consent_whatsapp: true,
        });

        const sourceTag = utms.utm_source
            ? `\nSource: ${[utms.utm_source, utms.utm_medium, utms.utm_campaign].filter(Boolean).join("/")}`
            : "";
        const message = `Hello, I'm interested in booking an evaluation at PhysioPro.\n\nName: ${name}\nWhatsApp: ${phone}\nLooking for: ${goal}${sourceTag}`;
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
    processTrack.classList.add("is-lit");
    processTrack.style.setProperty("--progress", window.innerWidth <= 980 ? "100%" : "100%");
    Array.from(processTrack.querySelectorAll(".pstep")).forEach((step, index) => {
        setTimeout(() => {
            step.classList.add("lit");
        }, 180 + index * 220);
    });
};

const animateCount = (el) => {
    if (!el || el.dataset.counted === "true") return;
    const target = Number(el.dataset.countTo);
    if (!Number.isFinite(target)) return;

    const suffix = el.dataset.countSuffix || "";
    const duration = 1200;
    const start = performance.now();
    el.dataset.counted = "true";

    const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = `${Math.round(target * eased)}${suffix}`;
        if (progress < 1) {
            requestAnimationFrame(tick);
        } else {
            el.textContent = `${target}${suffix}`;
        }
    };

    requestAnimationFrame(tick);
};

const lightTrustStrip = () => {
    if (!trustStrip || trustStripDone) return;
    const rect = trustStrip.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top >= vh * 0.94 || rect.bottom <= 0) return;

    trustStripDone = true;
    trustStrip.classList.add("is-visible");
    trustStrip.querySelectorAll("[data-count-to]").forEach((el) => animateCount(el));
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

    lightTrustStrip();
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
        if (typeof fbq === "function") {
            fbq("track", "Contact");
        }
    });
});

window.addEventListener(
    "scroll",
    () => {
        updateTopbar();
        updateFab();
        checkReveals();
        updateParallax();
    },
    { passive: true }
);

window.addEventListener("resize", checkReveals, { passive: true });
window.addEventListener("load", () => {
    updateTopbar();
    updateFab();
    checkReveals();
    updateParallax();
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

// Attribution init — runs on every page
initMetaPixel();
captureAndStoreUtms();

// Ask-Leonardo form — fire Lead pixel event (form is handled by inline script in ask-leonardo.html)
(function () {
    const askForm = document.getElementById("ask-form");
    if (!askForm) return;
    askForm.addEventListener("submit", function () {
        if (typeof fbq === "function") {
            fbq("track", "Lead", { content_category: "ask_leonardo" });
        }
    });
})();

// ---------- PhysioPro chat widget ----------

const PHYSIO_TOPICS = [
    {
        label: "Pricing",
        keywords: ["price", "cost", "how much", "fee", "charge", "750", "mxn", "expensive", "costo", "precio"],
        answer: "$750 MXN per session. This covers your full clinical assessment and treatment from day one. No separate evaluation fees — you come in and we get to work.",
        ctaLabel: null,
        ctaHref: null
    },
    {
        label: "Conditions treated",
        keywords: ["condition", "treat", "injury", "pain", "knee", "back", "shoulder", "ankle", "sports", "surgery", "post-op", "neck", "hip", "tendon", "elbow", "herniat", "rotator", "acl"],
        answer: "We treat musculoskeletal pain, sports injuries, post-operative recovery, chronic pain, and performance limitations. If it involves movement, we can likely help.",
        ctaLabel: "What We Treat →",
        ctaHref: "./what-we-treat.html"
    },
    {
        label: "Who is this for?",
        keywords: ["who", "athlete", "active", "runner", "gym", "crossfit", "patient", "recover", "suitable", "for me"],
        answer: "Athletes, active people, post-surgical patients, and anyone dealing with pain that's limiting movement or training. If you want to move better, you're in the right place.",
        ctaLabel: "Who We Help →",
        ctaHref: "./who-we-help.html"
    },
    {
        label: "First session",
        keywords: ["first", "session", "expect", "initial", "assessment", "evaluation", "happen", "visit", "intake"],
        answer: "Your first session includes a full clinical assessment and treatment — not just evaluation. You leave with a clear diagnosis and a structured treatment plan.",
        ctaLabel: "First Session →",
        ctaHref: "./first-session.html"
    },
    {
        label: "Location & hours",
        keywords: ["where", "location", "address", "hour", "open", "schedule", "tijuana", "zona rio", "park", "direction", "near"],
        answer: "Jose Maria Velazco 2632, Zona Urbana Rio Tijuana. Monday–Friday, 8:00 AM–8:00 PM. Appointments required.",
        ctaLabel: "Get Directions →",
        ctaHref: "https://www.google.com/maps/search/Jose+Maria+Velazco+2632,+Zona+Urbana+Rio+Tijuana"
    },
    {
        label: "How to book",
        keywords: ["book", "appointment", "schedule", "reserve", "booking", "start", "begin", "how do i"],
        answer: "Message us on WhatsApp — it's the fastest way. Leonardo will confirm your slot directly. Assessment + treatment from session one.",
        ctaLabel: "Book on WhatsApp →",
        ctaHref: "https://wa.me/526634875859?text=Hello%2C%20I%27m%20interested%20in%20booking%20an%20evaluation%20at%20PhysioPro"
    }
];

const CHAT_ASK_HREF = "./ask-leonardo.html";

const setupChatWidget = () => {
    const host = document.createElement("div");
    host.id = "physio-chat";
    host.className = "pchat";
    host.innerHTML = [
        '<div class="pchat-panel" id="pchat-panel" hidden>',
            '<div class="pchat-header">',
                '<span class="pchat-title">PhysioPro Assistant</span>',
                '<button class="pchat-close" id="pchat-close" aria-label="Close chat">×</button>',
            '</div>',
            '<div class="pchat-messages" id="pchat-messages"></div>',
            '<div class="pchat-topics" id="pchat-topics"></div>',
            '<div class="pchat-input-row">',
                '<input type="text" class="pchat-input" id="pchat-input" placeholder="Type a question…" autocomplete="off" aria-label="Your question">',
                '<button class="pchat-send" id="pchat-send" aria-label="Send">→</button>',
            '</div>',
        '</div>',
        '<button class="pchat-bubble" id="pchat-bubble" aria-label="Open chat assistant" aria-expanded="false">',
            '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
        '</button>'
    ].join("");
    document.body.appendChild(host);

    const panel    = document.getElementById("pchat-panel");
    const bubble   = document.getElementById("pchat-bubble");
    const closeBtn = document.getElementById("pchat-close");
    const msgs     = document.getElementById("pchat-messages");
    const topicsEl = document.getElementById("pchat-topics");
    const input    = document.getElementById("pchat-input");
    const sendBtn  = document.getElementById("pchat-send");
    let isOpen = false;
    let initialized = false;

    const addMsg = (html, cls) => {
        const div = document.createElement("div");
        div.className = "pchat-msg " + cls;
        div.innerHTML = html;
        msgs.appendChild(div);
        msgs.scrollTop = msgs.scrollHeight;
    };

    const buildAnswerHtml = (topic) => {
        let html = "<p>" + topic.answer + "</p>";
        if (topic.ctaHref) {
            const external = topic.ctaHref.startsWith("http");
            html += '<a class="pchat-cta" href="' + topic.ctaHref + '"'
                + (external ? ' target="_blank" rel="noopener noreferrer"' : "") + ">"
                + topic.ctaLabel + "</a>";
        }
        html += '<span class="pchat-escalate">Still have questions? <a href="' + CHAT_ASK_HREF + '">Ask Leonardo personally →</a></span>';
        return html;
    };

    const showTopics = () => {
        topicsEl.innerHTML = "";
        PHYSIO_TOPICS.forEach((t) => {
            const btn = document.createElement("button");
            btn.className = "pchat-topic";
            btn.textContent = t.label;
            btn.addEventListener("click", () => {
                topicsEl.innerHTML = "";
                addMsg(t.label, "pchat-msg--user");
                addMsg(buildAnswerHtml(t), "pchat-msg--answer");
                showTopics();
            });
            topicsEl.appendChild(btn);
        });
    };

    const matchTopic = (text) => {
        const lower = text.toLowerCase();
        for (const t of PHYSIO_TOPICS) {
            if (t.keywords.some((kw) => lower.includes(kw))) return t;
        }
        return null;
    };

    const handleSend = () => {
        const text = input.value.trim();
        if (!text) return;
        input.value = "";
        addMsg(text, "pchat-msg--user");
        const match = matchTopic(text);
        if (match) {
            topicsEl.innerHTML = "";
            addMsg(buildAnswerHtml(match), "pchat-msg--answer");
            showTopics();
        } else {
            addMsg(
                "<p>I’d like Leonardo to answer that personally.</p>"
                + '<a class="pchat-cta" href="' + CHAT_ASK_HREF + '">Ask Leonardo →</a>',
                "pchat-msg--answer"
            );
        }
        if (typeof gtag === "function") {
            gtag("event", "chat_message", { event_category: "chat", event_label: text.substring(0, 60) });
        }
    };

    const openChat = () => {
        isOpen = true;
        panel.hidden = false;
        bubble.setAttribute("aria-expanded", "true");
        if (!initialized) {
            initialized = true;
            addMsg("Hi — what can I help you with before you book?", "pchat-msg--bot");
            showTopics();
        }
        if (typeof gtag === "function") {
            gtag("event", "chat_open", { event_category: "chat" });
        }
    };

    const closeChat = () => {
        isOpen = false;
        panel.hidden = true;
        bubble.setAttribute("aria-expanded", "false");
    };

    bubble.addEventListener("click", () => (isOpen ? closeChat() : openChat()));
    closeBtn.addEventListener("click", closeChat);
    sendBtn.addEventListener("click", handleSend);
    input.addEventListener("keydown", (e) => { if (e.key === "Enter") handleSend(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && isOpen) closeChat(); });
};

const setupDropdowns = () => {
    const items = Array.from(document.querySelectorAll('[data-nav-item]'));
    if (!items.length) return;

    const closeAll = () => {
        items.forEach(item => {
            item.classList.remove('is-open');
            const t = item.querySelector('.nav-trigger');
            if (t) t.setAttribute('aria-expanded', 'false');
        });
    };

    items.forEach(item => {
        const trigger = item.querySelector('.nav-trigger');
        if (!trigger) return;

        trigger.addEventListener('click', () => {
            const isMobile = window.innerWidth <= 980;
            if (!isMobile) {
                // Desktop: toggle is-open for keyboard users (hover handles mouse)
                const opening = !item.classList.contains('is-open');
                closeAll();
                item.classList.toggle('is-open', opening);
                trigger.setAttribute('aria-expanded', String(opening));
            } else {
                // Mobile: accordion toggle
                const opening = !item.classList.contains('is-open');
                closeAll();
                item.classList.toggle('is-open', opening);
                trigger.setAttribute('aria-expanded', String(opening));
            }
        });
    });

    // Escape closes all open dropdowns
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeAll();
    });

    // Click outside closes all
    document.addEventListener('click', e => {
        if (!e.target.closest('[data-nav-item]')) closeAll();
    }, true);
};

const setupActiveNav = () => {
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = Array.from(document.querySelectorAll(".nav a[href]"));

    navLinks.forEach((link) => {
        const href = link.getAttribute("href");
        if (!href || href.startsWith("http") || href.startsWith("#")) return;
        const normalized = href === "./" ? "index.html" : href.replace("./", "");
        if (normalized === currentPath) {
            link.classList.add("is-current");
            link.setAttribute("aria-current", "page");
            const parentItem = link.closest(".nav-item");
            if (parentItem) parentItem.classList.add("has-current");
        }
    });
};

setupDropdowns();
setupActiveNav();
setupChatWidget();
