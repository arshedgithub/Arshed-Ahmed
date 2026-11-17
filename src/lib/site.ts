/**
 * Facts shared by every locale: names, URLs, dates, tech names, statuses and structure.
 * Anything people read as a sentence or label lives in messages/<locale>.json; src/lib/content.ts joins the two.
 *
 * HONESTY RULE: facts come from the CV or from Arshed directly. Do not add metrics, clients, testimonials,
 * users or dates that are not confirmed. Unknown values are placeholders that start with "TODO_" (see todo.ts):
 * they render as a visible marker in development and are left out of production builds.
 * Every placeholder is listed in TODO_CONTENT.md.
 */

/** Canonical host. The apex 308s to www on Vercel today, so www is canonical (see README, "Canonical host"). */
export const SITE_URL = "https://www.arshedahmed.com";
export const LINKEDIN_URL = "https://www.linkedin.com/in/arshedahmed";
export const ACADEMY_NAME = "Solitrium Academy";
export const SLMARKET_START_ISO = "2026-07";

/**
 * "system": first visit follows the OS light/dark preference (dark when unknown).
 * "dark": first visit is always dark; the toggle still persists the visitor's choice.
 */
export const THEME_DEFAULT: "system" | "dark" = "dark";
/** Page background per theme; also the browser-chrome theme-color. Keep in sync with globals.css (--bg). */
export const THEME_COLORS = { dark: "#0d0f12", light: "#f6f6f3" } as const;

export const site = {
  url: SITE_URL,
  name: "Arshed Ahmed",
  email: "arshedahmedmail@gmail.com",
  /** A domain address (e.g. hello@arshedahmed.com) replaces the Gmail address everywhere once set. */
  domainEmail: "TODO_DOMAIN_EMAIL",
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

/** The address shown and linked everywhere: the domain address once it is set, the Gmail address until then. */
export const contactEmail: string = site.domainEmail.startsWith("TODO_") ? site.email : site.domainEmail;

/** Header and footer navigation. Five items at most (Hick's law). */
export const nav = [
  { key: "work", href: "/#work" },
  { key: "experience", href: "/#experience" },
  { key: "skills", href: "/#skills" },
  { key: "about", href: "/#about" },
  { key: "contact", href: "/#contact" },
] as const;

/**
 * Proof strip: defensible facts only, rendered as final text in the HTML (no counters).
 * Values are short and language-neutral; labels are in messages: proof.<key>.
 */
export const proof = [
  { key: "transactions", value: "200+" },
  { key: "live", value: "1" },
  { key: "mentored", value: "20+" },
  { key: "since", value: "2022" },
] as const;

/** Skills by depth. Tiers are a draft from the CV: confirm them (TODO_CONTENT.md). */
export const skillTiers = [
  {
    key: "core",
    items: [
      "TypeScript",
      "Next.js",
      "React",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Prisma",
      { key: "stripe" },
      { key: "restApi" },
      "Tailwind CSS",
      "GitHub Actions CI/CD",
      "Jest",
    ],
  },
  {
    key: "working",
    items: [
      "Laravel",
      "Vue.js",
      "Inertia.js",
      "MySQL",
      "MongoDB",
      "Redis",
      "Docker",
      "JWT / RBAC",
      "OpenAI API",
      "Groq",
      "Whisper",
      "Twilio WhatsApp API",
      "DIFY.ai",
      "Python",
      "Vercel",
    ],
  },
  {
    key: "familiar",
    items: ["AWS", "Spring Boot", "Java", "Cloudinary", "cPanel"],
  },
] as const;

/** `company: null` is self-employment; `endISO: null` is ongoing. `type` keys into messages: experience.types. */
export const experience = [
  { key: "slmarket", company: "SLMarket", startISO: SLMARKET_START_ISO, endISO: null, type: "founder" },
  { key: "softsora", company: "Softsora (Pvt) Ltd", startISO: "2025-03", endISO: "2026-07", type: "fullTime" },
  { key: "softsoraAssociate", company: "Softsora (Pvt) Ltd", startISO: "2024-08", endISO: "2025-02", type: "fullTime" },
  { key: "freelance", company: null, startISO: "2022-07", endISO: "2024-08", type: "freelance" },
  { key: "elzian", company: "Elzian Agro (Pvt) Ltd", startISO: "2022-01", endISO: "2022-07", type: "internship" },
] as const;

export const teaching = [
  { key: "solitrium", org: ACADEMY_NAME, startISO: "2025", endISO: null },
  { key: "earth", org: "Earth University College", startISO: "2023-03", endISO: "2025-07" },
] as const;

export const education = [
  { key: "bit", startISO: "2021", endISO: "2024" },
  { key: "bsc", startISO: "2022", endISO: "2025" },
] as const;

/** `verifyUrl`: the issuer's credential page. Shown as "Verify" once it is a real URL. */
export const certifications = [
  { key: "ethicalHacker", issuer: "Cisco", year: "2026", verifyUrl: "TODO_LINK" },
  { key: "securityFundamentals", issuer: "Palo Alto Networks", year: "2026", verifyUrl: "TODO_LINK" },
  { key: "jenkinsDocker", issuer: "TODO_ISSUER", year: "2026", verifyUrl: "TODO_LINK" },
] as const;

/**
 * References and testimonials. The section renders only when this has entries, and only real, attributable
 * quotes belong here (with the person's permission). Wording per locale goes in messages: credibility.references.
 */
export const references: { key: string; name: string; role: string; company: string; linkedinUrl?: string }[] = [];

/**
 * Pinned GitHub repositories (public repos only). Empty: the GitHub card shows the profile link alone.
 * Descriptions per locale go in messages: credibility.repos.<name>.
 */
export const pinnedRepos: { name: string; url: string; language: string }[] = [];

/** Language names for JSON-LD, which stays in English. The visible list is in messages: about.languages. */
export const knowsLanguage = ["English", "Sinhala", "Tamil", "Arabic"] as const;

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

/**
 * Status pill colours: live = green (only for products Arshed confirms are live), dev = amber,
 * client / prototype = grey. `date` is the launch month for "dev" (placeholder until confirmed).
 */
export type StatusKind = "live" | "dev" | "client" | "prototype";

export type ProjectFacts = {
  slug: string;
  /** One pill per product; labels are in messages: projects.<slug>.statuses.<key>. */
  statuses: { key: string; kind: StatusKind | "TODO_STATUS"; date?: string }[];
  /** True only when Arshed built it alone. */
  solo: boolean;
  /** Whose product it is. "TODO_OWNER" until confirmed: the card then says nothing about ownership. */
  owner: "self" | "company" | "TODO_OWNER";
  /** The employer the work was done at (owner "company"). */
  company: string | null;
  /** ISO months; placeholders until confirmed. */
  timeline: { startISO: string; endISO: string | null };
  stack: { key: string; items: string[] }[];
  /** Keys into messages: projects.<slug>.proof. Only things that are true of the build. */
  proofChips: string[];
  /** Public links. `kind` picks the label: visit the live product, a demo video, or a staging demo. */
  links: { key: string; href: string; kind: "live" | "demo" | "staging" | "github" }[];
  /**
   * Image slots in /public/images/projects/<slug>/: cover.webp plus <id>.webp per screenshot
   * (browser shots 1280x800, phone shots 390x845). Missing files render a labelled schematic instead.
   */
  screenshots: { id: string; device: "browser" | "phone" }[];
  /** Which schematic illustration stands in until real screenshots exist. */
  schematic: "marketplace" | "dashboard" | "editor" | "chat";
  /** Layered system diagram; ids key into the project's messages for labels. */
  architecture: {
    rows: { id: string; nodes: string[] }[];
    edges: [from: string, to: string][];
  };
};

export const projects: ProjectFacts[] = [
  {
    slug: "slmarket",
    statuses: [
      { key: "flow", kind: "live" },
      { key: "marketplace", kind: "dev", date: "TODO_DATE" },
    ],
    solo: true,
    owner: "self",
    company: null,
    timeline: { startISO: SLMARKET_START_ISO, endISO: null },
    stack: [
      {
        key: "flow",
        items: ["Laravel", "Vue.js", "Inertia.js", "MySQL", "GitHub Actions", "cPanel"],
      },
      {
        key: "marketplace",
        items: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Prisma", "Redis", "Cloudinary", "GitHub Actions", "Vercel"],
      },
    ],
    proofChips: ["ci", "tests", "rbac", "cache"],
    links: [{ key: "flow", href: "https://flow.slmarket.lk", kind: "live" }],
    screenshots: [
      { id: "flow-pos", device: "browser" },
      { id: "marketplace-home", device: "browser" },
      { id: "marketplace-mobile", device: "phone" },
    ],
    schematic: "marketplace",
    architecture: {
      rows: [
        { id: "users", nodes: ["staff", "sellers", "buyers"] },
        { id: "apps", nodes: ["flow", "market"] },
        { id: "data", nodes: ["mysql", "pg", "redis", "cdn"] },
        { id: "delivery", nodes: ["cpanel", "vercel"] },
      ],
      edges: [
        ["staff", "flow"],
        ["sellers", "flow"],
        ["sellers", "market"],
        ["buyers", "market"],
        ["flow", "mysql"],
        ["market", "pg"],
        ["market", "redis"],
        ["market", "cdn"],
        ["mysql", "cpanel"],
        ["pg", "vercel"],
      ],
    },
  },
  {
    slug: "ai-business-support-saas",
    statuses: [{ key: "main", kind: "client" }],
    solo: false,
    owner: "company",
    company: "Softsora (Pvt) Ltd",
    timeline: { startISO: "TODO_DATE", endISO: "TODO_DATE" },
    stack: [{ key: "platform", items: ["Next.js", "TypeScript", "Express.js", "Node.js", "Stripe", "Jest"] }],
    proofChips: ["webhooks", "proration", "tests", "dashboard"],
    links: [],
    screenshots: [
      { id: "payments-dashboard", device: "browser" },
      { id: "chatbot", device: "browser" },
    ],
    schematic: "dashboard",
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
    statuses: [{ key: "main", kind: "TODO_STATUS" }],
    solo: false, // TODO: confirm solo or team (TODO_CONTENT.md).
    owner: "TODO_OWNER",
    company: null,
    timeline: { startISO: "TODO_DATE", endISO: "TODO_DATE" },
    stack: [{ key: "platform", items: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Groq", "Whisper"] }],
    proofChips: ["voice", "ats", "typed"],
    links: [],
    screenshots: [
      { id: "resume-editor", device: "browser" },
      { id: "mock-interview", device: "phone" },
    ],
    schematic: "editor",
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
    statuses: [{ key: "main", kind: "client" }],
    solo: false,
    owner: "company",
    company: "Softsora (Pvt) Ltd",
    timeline: { startISO: "TODO_DATE", endISO: "TODO_DATE" },
    stack: [{ key: "bot", items: ["Python", "LLM APIs", "Twilio", "WhatsApp"] }],
    proofChips: ["webhook", "llm", "deployed"],
    links: [],
    screenshots: [
      { id: "chat-1", device: "phone" },
      { id: "chat-2", device: "phone" },
    ],
    schematic: "chat",
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
