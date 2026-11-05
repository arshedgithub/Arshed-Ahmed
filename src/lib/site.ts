/**
 * Facts shared by every locale: names, URLs, dates, tech names and structure.
 * Anything people read as a sentence or label lives in messages/<locale>.json, and src/lib/content.ts joins the two.
 * Facts come from the CV. Do not add metrics, clients or testimonials that are not in it.
 */

/** Canonical host. The www host must 301 to this one (see README, "Canonical host"). */
export const SITE_URL = "https://arshedahmed.com";
export const LINKEDIN_URL = "https://www.linkedin.com/in/arshedahmed";
export const ACADEMY_NAME = "Solitrium Academy";
export const SLMARKET_START_ISO = "2026-07";

/**
 * "system": first visit follows the OS light/dark preference (dark when unknown).
 * "dark": first visit is always dark; the toggle still persists the visitor's choice.
 */
export const THEME_DEFAULT: "system" | "dark" = "dark";
/** Page background per theme; also used for the browser-chrome theme-color. Keep in sync with globals.css. */
export const THEME_COLORS = { dark: "#0b0f14", light: "#f8fafc" } as const;

export const site = {
  url: SITE_URL,
  name: "Arshed Ahmed",
  firstName: "Arshed",
  lastName: "Ahmed",
  email: "arshedahmedmail@gmail.com",
  phoneDisplay: "+971 56 428 9291",
  phoneE164: "+971564289291",
  whatsappUrl: "https://wa.me/971564289291",
  githubUrl: "https://github.com/arshedgithub",
  githubHandle: "arshedgithub",
  linkedinUrl: LINKEDIN_URL,
  cvPath: "/Arshed-Ahmed-CV.pdf",
  products: {
    marketplace: "https://slmarket.lk",
    flow: "https://flow.slmarket.lk",
  },
} as const;

export const nav = [
  { key: "home", href: "/#top" },
  { key: "work", href: "/#work" },
  { key: "experience", href: "/#experience" },
  { key: "skills", href: "/#skills" },
  { key: "about", href: "/#about" },
  { key: "contact", href: "/#contact" },
] as const;

export const proof = [
  { key: "years", value: 4, suffix: "+" },
  { key: "saas", value: 3, suffix: "" },
  { key: "stripe", text: "Stripe" },
  { key: "solo", value: 3, suffix: "" },
] as const;

/** A skill is a tech name, or { key } when it has words to translate (messages: skills.items). */
export const skillGroups = [
  {
    key: "frontend",
    items: ["Next.js", "React", "Vue.js", "TypeScript", "Tailwind CSS", "HTML5/CSS3"],
  },
  {
    key: "backend",
    items: [
      "Node.js",
      "Express.js",
      "Laravel",
      "Prisma",
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Redis",
      { key: "restApi" },
      "JWT/RBAC",
    ],
  },
  {
    key: "ai",
    items: [
      "OpenAI API",
      "Groq LLM",
      "Whisper",
      "DIFY.ai",
      { key: "stripe" },
      "Twilio",
      "WhatsApp",
    ],
  },
  {
    key: "devops",
    items: ["Docker", "GitHub Actions CI/CD", "Jest", "AWS", "Vercel"],
  },
] as const;

/** `company: null` is self-employment (messages: experience.selfEmployed); `endISO: null` is the current job. */
export const experience = [
  { key: "slmarket", company: "SLMarket", startISO: SLMARKET_START_ISO, endISO: null },
  { key: "softsora", company: "Softsora (Pvt) Ltd", startISO: "2025-03", endISO: "2026-07" },
  { key: "softsoraAssociate", company: "Softsora (Pvt) Ltd", startISO: "2024-08", endISO: "2025-02" },
  { key: "freelance", company: null, startISO: "2022-07", endISO: "2024-08" },
  // TODO: confirm. The CV has one bullet for this role; the second line in messages restates its REST API/database detail.
  { key: "elzian", company: "Elzian Agro (Pvt) Ltd", startISO: "2022-01", endISO: "2022-07" },
] as const;

export const teaching = [
  { key: "solitrium", org: ACADEMY_NAME, startISO: "2025", endISO: null },
  { key: "earth", org: "Earth University College", startISO: "2023-03", endISO: "2025-07" },
] as const;

export const education = [
  { key: "bit", period: "2021 - 2024" },
  { key: "bsc", period: "2022 - 2025" },
] as const;

export const certifications = [
  { key: "ethicalHacker", year: "2026" },
  { key: "securityFundamentals", year: "2026" },
  { key: "jenkinsDocker", year: "2026" },
] as const;

/** Language names for JSON-LD, which stays in English. The visible list is in messages: about.languagesList. */
export const knowsLanguage = ["English", "Sinhala", "Tamil", "Arabic"] as const;

/** Hero tech row. */
export const heroStack = ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Stripe"] as const;

export const knowsAbout = [
  "Full-stack web development",
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Express.js",
  "Laravel",
  "PostgreSQL",
  "Prisma",
  "Redis",
  "Stripe billing",
  "REST API design",
  "OpenAI API",
  "LLM chatbots",
  "Twilio WhatsApp",
  "GitHub Actions CI/CD",
  "Jest",
  "Docker",
] as const;

// ---------- Projects ----------

/** Shared project facts. Titles, descriptions, alt text and diagram labels are in messages: projects.<slug>. */
export type ProjectFacts = {
  slug: string;
  /** Only claims that are true: "live" needs a public link, "soloBuilt" means built alone. */
  badges: ("live" | "soloBuilt")[];
  period?: string;
  stack: { key: string; items: string[] }[];
  links: { label: string; href: string; kind: "live" | "github" }[];
  /**
   * Image files expected in /public/images/projects/<slug>/: cover.webp plus <id>.webp per screenshot.
   * Missing files are skipped at build time and the page renders a designed fallback card instead
   * (see README for the list to supply).
   */
  screenshots: { id: string; device: "browser" | "phone" }[];
  /** Layered system diagram; ids key into the project's messages for the labels. */
  architecture: {
    rows: { id: string; nodes: string[] }[];
    edges: [from: string, to: string][];
  };
};

export const projects: ProjectFacts[] = [
  {
    slug: "slmarket",
    badges: ["live", "soloBuilt"],
    stack: [
      {
        key: "marketplace",
        items: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Prisma", "Redis", "Cloudinary", "GitHub Actions", "Vercel"],
      },
      {
        key: "flow",
        items: ["Laravel", "Vue.js", "Inertia.js", "MySQL", "GitHub Actions", "cPanel"],
      },
    ],
    links: [
      { label: "slmarket.lk", href: "https://slmarket.lk", kind: "live" },
      { label: "flow.slmarket.lk", href: "https://flow.slmarket.lk", kind: "live" },
    ],
    screenshots: [
      { id: "marketplace-home", device: "browser" },
      { id: "flow-pos", device: "browser" },
      { id: "marketplace-mobile", device: "phone" },
    ],
    architecture: {
      rows: [
        { id: "users", nodes: ["buyers", "sellers", "staff"] },
        { id: "apps", nodes: ["market", "flow"] },
        { id: "data", nodes: ["pg", "redis", "cdn", "mysql"] },
        { id: "delivery", nodes: ["vercel", "cpanel"] },
      ],
      edges: [
        ["buyers", "market"],
        ["sellers", "market"],
        ["sellers", "flow"],
        ["staff", "flow"],
        ["market", "pg"],
        ["market", "redis"],
        ["market", "cdn"],
        ["flow", "mysql"],
        ["pg", "vercel"],
        ["mysql", "cpanel"],
      ],
    },
  },
  {
    slug: "ai-business-support-saas",
    badges: [],
    period: "Softsora (Pvt) Ltd",
    stack: [
      { key: "platform", items: ["Next.js", "TypeScript", "Express.js", "Node.js", "Stripe", "Jest"] },
    ],
    links: [], // TODO: confirm whether a public link can be shared.
    screenshots: [
      { id: "payments-dashboard", device: "browser" },
      { id: "chatbot", device: "browser" },
    ],
    architecture: {
      rows: [
        { id: "users", nodes: ["biz", "team"] },
        { id: "frontend", nodes: ["web"] },
        { id: "backend", nodes: ["api"] },
        { id: "services", nodes: ["ai", "stripe", "db"] },
      ],
      edges: [
        ["biz", "web"],
        ["team", "web"],
        ["web", "api"],
        ["api", "ai"],
        ["api", "stripe"],
        ["api", "db"],
      ],
    },
  },
  {
    slug: "ai-cv-builder",
    badges: [],
    stack: [
      { key: "platform", items: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Groq LLM", "Whisper"] },
    ],
    links: [], // TODO: add live link and/or GitHub repo if public.
    screenshots: [
      { id: "resume-editor", device: "browser" },
      { id: "mock-interview", device: "phone" },
    ],
    architecture: {
      rows: [
        { id: "users", nodes: ["cand"] },
        { id: "app", nodes: ["next"] },
        { id: "aiData", nodes: ["groq", "whisper", "pg"] },
      ],
      edges: [
        ["cand", "next"],
        ["next", "groq"],
        ["next", "whisper"],
        ["next", "pg"],
      ],
    },
  },
  {
    slug: "whatsapp-ai-order-bot",
    badges: [],
    period: "Softsora (Pvt) Ltd",
    stack: [{ key: "bot", items: ["Python", "LLM APIs", "Twilio", "WhatsApp"] }],
    links: [], // TODO: add GitHub repo if public.
    screenshots: [
      { id: "chat-1", device: "phone" },
      { id: "chat-2", device: "phone" },
    ],
    architecture: {
      rows: [
        { id: "users", nodes: ["cust"] },
        { id: "channel", nodes: ["twilio"] },
        { id: "service", nodes: ["py"] },
        { id: "ai", nodes: ["llm"] },
      ],
      edges: [
        ["cust", "twilio"],
        ["twilio", "py"],
        ["py", "llm"],
      ],
    },
  },
];
