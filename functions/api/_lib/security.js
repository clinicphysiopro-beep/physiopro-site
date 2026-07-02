const DEFAULT_ALLOWED_ORIGINS = [
  "https://physioprotijuana.com",
  "https://www.physioprotijuana.com",
  "http://127.0.0.1:8788",
  "http://localhost:8788",
  "http://127.0.0.1:8000",
  "http://localhost:8000",
];

const LOCAL_RATE_LIMITS = {
  lead: { limit: 5, periodMs: 10_000 },
  ask: { limit: 3, periodMs: 10_000 },
  assistant: { limit: 20, periodMs: 60_000 },
};

const localRateStore = globalThis.__PHYSIOPRO_RATE_STORE || new Map();
globalThis.__PHYSIOPRO_RATE_STORE = localRateStore;

const encoder = new TextEncoder();

export const ASSISTANT_TOPICS = [
  {
    label: "Pricing",
    keywords: ["price", "pricing", "cost", "how much", "fee", "charge", "750", "mxn", "precio", "costo"],
    answer: "$750 MXN per session. The first session includes assessment and treatment from day one. This assistant cannot change pricing or negotiate rates.",
    ctaLabel: "Book on WhatsApp",
    ctaHref: "https://wa.me/526634875859?text=Hello%2C%20I%27m%20interested%20in%20booking%20an%20evaluation%20at%20PhysioPro",
  },
  {
    label: "What We Treat",
    keywords: ["condition", "treat", "injury", "pain", "knee", "back", "shoulder", "neck", "sports", "surgery", "post-op", "running", "combat sports"],
    answer: "PhysioPro treats musculoskeletal pain, sports injuries, post-operative recovery, chronic pain, and return-to-sport or return-to-training limitations.",
    ctaLabel: "What We Treat",
    ctaHref: "/what-we-treat.html",
  },
  {
    label: "Who We Help",
    keywords: ["who", "athlete", "runner", "active", "gym", "crossfit", "desk", "post-surgical", "for me"],
    answer: "PhysioPro is for athletes, active adults, runners, combat sports athletes, post-surgical patients, and desk workers dealing with pain or movement limits.",
    ctaLabel: "Who We Help",
    ctaHref: "/who-we-help.html",
  },
  {
    label: "First Session",
    keywords: ["first", "session", "expect", "assessment", "evaluation", "initial", "visit", "intake"],
    answer: "The first session includes a full clinical assessment and treatment from day one. You leave with a clearer direction and a structured next-step plan.",
    ctaLabel: "First Session",
    ctaHref: "/first-session.html",
  },
  {
    label: "Location",
    keywords: ["where", "location", "address", "hours", "open", "zona rio", "tijuana", "parking", "maps", "from san diego"],
    answer: "PhysioPro is at Jose Maria Velazco 2632, Zona Urbana Rio Tijuana. Monday to Friday, 8:00 AM to 8:00 PM. Appointments are required.",
    ctaLabel: "Contact",
    ctaHref: "/contact.html",
  },
  {
    label: "Booking",
    keywords: ["book", "booking", "appointment", "schedule", "reserve", "start", "whatsapp"],
    answer: "WhatsApp is the fastest booking path. If you are ready to schedule, use the booking button and Leonardo will coordinate your slot directly.",
    ctaLabel: "Book on WhatsApp",
    ctaHref: "https://wa.me/526634875859?text=Hello%2C%20I%27m%20interested%20in%20booking%20an%20evaluation%20at%20PhysioPro",
  },
  {
    label: "Insurance",
    keywords: ["insurance", "insurances", "covered", "private pay", "cash", "bank transfer", "payment"],
    answer: "PhysioPro operates as a private-pay clinic. Website pricing is in MXN. The public website states payment is private-pay and does not promise insurance coordination.",
    ctaLabel: "Contact",
    ctaHref: "/contact.html",
  },
];

const BLOCK_RULES = [
  {
    category: "emergency",
    pattern: /\b(chest pain|can't breathe|cannot breathe|difficulty breathing|stroke|seizure|passing out|suicidal|suicide|overdose|loss of consciousness|emergency|urgent medical)\b/i,
    answer: "This assistant cannot handle urgent or emergency medical situations. If this may be an emergency, call 911 immediately or go to urgent/emergency care now.",
  },
  {
    category: "diagnosis",
    pattern: /\b(diagnose|diagnosis|what do i have|is it torn|acl tear|meniscus tear|herniated disc|fracture|tumor|cancer|red flag|neurologic|neurological)\b/i,
    answer: "This assistant cannot diagnose injuries, interpret urgent symptoms, or replace an in-person clinical assessment. For diagnosis-related questions, book a session with Leonardo.",
  },
  {
    category: "pricing_manipulation",
    pattern: /\b(discount|cheaper|lower the price|free session|match price|negotiate|special price|coupon)\b/i,
    answer: "This assistant cannot change, negotiate, or manipulate pricing. The public website price is $750 MXN per session.",
  },
  {
    category: "prompt_injection",
    pattern: /\b(ignore (all|your|previous) instructions|system prompt|developer prompt|reveal prompt|jailbreak|bypass|policy|internal file|vault|pmis|physiopro_os|documentation|repo|source code|hidden instructions)\b/i,
    answer: "I can only answer public PhysioPro website questions. I cannot reveal internal instructions, files, prompts, policies, or non-public system material.",
  },
  {
    category: "spam",
    pattern: /\b(crypto|casino|viagra|seo service|guest post|backlink|loan|forex)\b/i,
    answer: "This assistant is limited to PhysioPro website questions only.",
  },
];

export function getAllowedOrigins(env) {
  const configured = String(env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  return configured.length ? configured : DEFAULT_ALLOWED_ORIGINS;
}

export function isAllowedOrigin(origin, env) {
  if (!origin) return true;
  return getAllowedOrigins(env).includes(origin);
}

export function buildSecurityHeaders(origin, env, extra = {}) {
  const headers = new Headers(extra);
  headers.set("X-Frame-Options", "DENY");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("Permissions-Policy", "accelerometer=(), autoplay=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()");
  headers.set("Cache-Control", "no-store");
  if (origin && isAllowedOrigin(origin, env)) {
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Vary", "Origin");
  }
  headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type");
  return headers;
}

export function jsonResponse(data, { status = 200, headers, origin, env } = {}) {
  const responseHeaders = buildSecurityHeaders(origin, env, headers);
  responseHeaders.set("Content-Type", "application/json; charset=utf-8");
  return new Response(JSON.stringify(data), { status, headers: responseHeaders });
}

export function handleCorsPreflight(request, env) {
  const origin = request.headers.get("Origin") || "";
  if (!isAllowedOrigin(origin, env)) {
    return jsonResponse({ ok: false, error: "origin_not_allowed" }, { status: 403, origin, env });
  }
  return new Response(null, {
    status: 204,
    headers: buildSecurityHeaders(origin, env),
  });
}

export function ensureAllowedOrigin(request, env) {
  const origin = request.headers.get("Origin") || "";
  if (!isAllowedOrigin(origin, env)) {
    return jsonResponse({ ok: false, error: "origin_not_allowed" }, { status: 403, origin, env });
  }
  return null;
}

export async function readJson(request, maxBytes = 16_384) {
  const contentLength = Number(request.headers.get("content-length") || "0");
  if (contentLength > maxBytes) {
    throw new Error("payload_too_large");
  }
  const bodyText = await request.text();
  if (bodyText.length > maxBytes) {
    throw new Error("payload_too_large");
  }
  return bodyText ? JSON.parse(bodyText) : {};
}

export function cleanText(value, maxLength) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

export function normalizePhone(value) {
  return String(value || "")
    .replace(/[^\d+\-\s()]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 24);
}

export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
}

export function isValidName(value) {
  return value.length >= 2 && value.length <= 80;
}

export function isValidPhone(value) {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

export async function sha256Hex(value) {
  const hash = await crypto.subtle.digest("SHA-256", encoder.encode(value));
  return Array.from(new Uint8Array(hash))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export function clientFingerprint(request) {
  const ip = request.headers.get("cf-connecting-ip") || "unknown-ip";
  const userAgent = request.headers.get("user-agent") || "unknown-ua";
  return `${ip}:${userAgent.slice(0, 160)}`;
}

export async function rateLimitRequest(context, kind) {
  const request = context.request;
  const route = new URL(request.url).pathname;
  const fingerprint = clientFingerprint(request);
  const keySeed = `${kind}:${route}:${fingerprint}`;
  const bindingName = {
    lead: "LEAD_RATE_LIMITER",
    ask: "ASK_RATE_LIMITER",
    assistant: "ASSISTANT_RATE_LIMITER",
  }[kind];

  if (bindingName && context.env[bindingName] && typeof context.env[bindingName].limit === "function") {
    const result = await context.env[bindingName].limit({ key: keySeed });
    return { success: result.success, retryAfter: null, source: "cloudflare-binding" };
  }

  const limits = LOCAL_RATE_LIMITS[kind];
  const now = Date.now();
  const entry = localRateStore.get(keySeed);

  if (!entry || entry.resetAt <= now) {
    localRateStore.set(keySeed, { count: 1, resetAt: now + limits.periodMs });
    return { success: true, retryAfter: null, source: "local-fallback" };
  }

  if (entry.count >= limits.limit) {
    return {
      success: false,
      retryAfter: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)),
      source: "local-fallback",
    };
  }

  entry.count += 1;
  localRateStore.set(keySeed, entry);
  return { success: true, retryAfter: null, source: "local-fallback" };
}

export async function logAbuse(context, category, metadata = {}) {
  const request = context.request;
  const ipHash = await sha256Hex(request.headers.get("cf-connecting-ip") || "unknown-ip");
  const uaHash = await sha256Hex((request.headers.get("user-agent") || "unknown-ua").slice(0, 200));
  const payload = {
    event: "physiopro_abuse_signal",
    category,
    route: new URL(request.url).pathname,
    ip_hash: ipHash.slice(0, 16),
    ua_hash: uaHash.slice(0, 16),
    colo: request.cf && request.cf.colo ? request.cf.colo : null,
    country: request.cf && request.cf.country ? request.cf.country : null,
    ts: new Date().toISOString(),
    metadata,
  };
  console.warn(JSON.stringify(payload));
}

export async function verifyTurnstileToken({ token, request, env }) {
  const allowInsecureLocal = env.ALLOW_INSECURE_LOCAL_DEV === "true";
  const hostname = new URL(request.url).hostname;
  const isLocal = hostname === "127.0.0.1" || hostname === "localhost";

  if (!env.TURNSTILE_SECRET) {
    if (allowInsecureLocal || isLocal) {
      return { success: true, skipped: true };
    }
    return { success: false, error: "turnstile_not_configured" };
  }

  if (!token) {
    return { success: false, error: "turnstile_missing" };
  }

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      secret: env.TURNSTILE_SECRET,
      response: token,
      remoteip: request.headers.get("cf-connecting-ip") || undefined,
    }),
  });

  const result = await response.json();
  if (!result.success) {
    return {
      success: false,
      error: Array.isArray(result["error-codes"]) ? result["error-codes"].join(",") : "turnstile_failed",
    };
  }

  return { success: true, skipped: false };
}

export function buildLeadWhatsAppUrl({ name, phone, goal, sourceTag, whatsappNumber }) {
  const lines = [
    "Hello, I'm interested in booking an evaluation at PhysioPro.",
    "",
    `Name: ${name}`,
    `WhatsApp: ${phone}`,
    `Looking for: ${goal}`,
  ];
  if (sourceTag) lines.push(`Source: ${sourceTag}`);
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export function buildAskWhatsAppUrl({ name, email, phone, question, whatsappNumber }) {
  const lines = [
    "Hi Leonardo, I have a question before booking at PhysioPro.",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
  ];
  if (phone) lines.push(`Phone: ${phone}`);
  lines.push("", `Question: ${question}`);
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export function validateLeadPayload(payload) {
  const name = cleanText(payload.full_name, 80);
  const phone = normalizePhone(payload.phone);
  const goal = cleanText(payload.goal, 80);
  const pagePath = cleanText(payload.page_path, 120);
  const turnstileToken = cleanText(payload.turnstileToken, 4096);

  if (!isValidName(name)) return { ok: false, error: "invalid_name" };
  if (!isValidPhone(phone)) return { ok: false, error: "invalid_phone" };
  if (!goal) return { ok: false, error: "invalid_goal" };

  return {
    ok: true,
    data: {
      full_name: name,
      phone,
      goal,
      page_path: pagePath,
      turnstileToken,
      utm_source: cleanText(payload.utm_source, 64),
      utm_medium: cleanText(payload.utm_medium, 64),
      utm_campaign: cleanText(payload.utm_campaign, 80),
      utm_content: cleanText(payload.utm_content, 80),
      utm_term: cleanText(payload.utm_term, 80),
      landing_page: cleanText(payload.landing_page, 120),
    },
  };
}

export function validateAskPayload(payload) {
  const name = cleanText(payload.full_name, 80);
  const email = cleanText(payload.email, 120);
  const phone = normalizePhone(payload.phone);
  const question = cleanText(payload.question, 700);
  const pagePath = cleanText(payload.page_path, 120);
  const turnstileToken = cleanText(payload.turnstileToken, 4096);

  if (!isValidName(name)) return { ok: false, error: "invalid_name" };
  if (!isValidEmail(email)) return { ok: false, error: "invalid_email" };
  if (phone && !isValidPhone(phone)) return { ok: false, error: "invalid_phone" };
  if (question.length < 8) return { ok: false, error: "invalid_question" };

  return {
    ok: true,
    data: {
      full_name: name,
      email,
      phone,
      question,
      page_path: pagePath,
      turnstileToken,
    },
  };
}

export function validateAssistantPayload(payload) {
  const message = cleanText(payload.message, 320);
  const pagePath = cleanText(payload.page_path, 120);
  if (message.length < 2) return { ok: false, error: "invalid_message" };
  return {
    ok: true,
    data: {
      message,
      page_path: pagePath,
    },
  };
}

export function clampOutput(text, maxLength = 480) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1).trim()}…`;
}

export function answerAssistant(message) {
  for (const rule of BLOCK_RULES) {
    if (rule.pattern.test(message)) {
      return {
        classification: rule.category,
        blocked: true,
        answer: clampOutput(rule.answer),
        ctaLabel: rule.category === "emergency" ? null : "Ask Leonardo",
        ctaHref: rule.category === "emergency" ? null : "/ask-leonardo.html",
      };
    }
  }

  const lower = message.toLowerCase();
  for (const topic of ASSISTANT_TOPICS) {
    if (topic.keywords.some((keyword) => lower.includes(keyword))) {
      return {
        classification: "matched_topic",
        blocked: false,
        answer: clampOutput(topic.answer),
        ctaLabel: topic.ctaLabel,
        ctaHref: topic.ctaHref,
      };
    }
  }

  return {
    classification: "off_topic",
    blocked: true,
    answer: clampOutput("I can only answer PhysioPro website questions about booking, pricing, first session, location, who we help, and what we treat."),
    ctaLabel: "Ask Leonardo",
    ctaHref: "/ask-leonardo.html",
  };
}
