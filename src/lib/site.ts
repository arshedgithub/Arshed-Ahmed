/**
 * Single source of truth for all site content.
 * Facts come from the CV. Do not add metrics, clients or testimonials that are not in it.
 */

/** Canonical host. The www host must 301 to this one (see README, "Canonical host"). */
export const SITE_URL = "https://arshedahmed.com";
export const LINKEDIN_URL = "https://www.linkedin.com/in/arshedahmed";
export const ACADEMY_NAME = "Solitrium Academy";
export const SLMARKET_START = { label: "Jul 2026", iso: "2026-07" } as const;
export const LOCATION_LINE = "Based in the UAE · Open to roles in Dubai and Abu Dhabi";
export const NOTICE_PERIOD = "Immediate";
export const VISA_STATUS = "";

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
  title: "Software Engineer | Full Stack Developer",
  jobTitle: "Full-Stack Software Engineer",
  positioning:
    "Full-stack engineer building SaaS, payments and AI products with Next.js, TypeScript and Node.js.",
  description:
    "Arshed Ahmed is a full-stack software engineer in the UAE building SaaS, Stripe payments and AI products with Next.js, TypeScript and Node.js. Available now.",
  status: "Available immediately · UAE",
  location: "United Arab Emirates",
  nationality: "Sri Lankan",
  email: "arshedahmedmail@gmail.com",
  phoneDisplay: "+971 56 428 9291",
  phoneE164: "+971564289291",
  whatsappUrl: "https://wa.me/971564289291",
  githubUrl: "https://github.com/arshedgithub",
  githubHandle: "arshedgithub",
  linkedinUrl: LINKEDIN_URL,
  cvPath: "/Arshed-Ahmed-CV.pdf",
  locationLine: LOCATION_LINE,
  products: {
    marketplace: "https://slmarket.lk",
    flow: "https://flow.slmarket.lk",
  },
} as const;

export const nav = [
  { label: "Home", href: "/#top" },
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "Skills", href: "/#skills" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
] as const;

export const proof = [
  { value: 4, suffix: "+", label: "Years experience" },
  { value: 3, suffix: "", label: "SaaS products" },
  { text: "Stripe", label: "Billing in production" },
  { value: 3, suffix: "", label: "Products launched solo" },
] as const;

export const skillGroups = [
  {
    title: "Frontend",
    items: ["Next.js", "React", "Vue.js", "TypeScript", "Tailwind CSS", "HTML5/CSS3"],
  },
  {
    title: "Backend and Data",
    items: [
      "Node.js",
      "Express.js",
      "Laravel",
      "Prisma",
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Redis",
      "REST API design",
      "JWT/RBAC",
    ],
  },
  {
    title: "AI and Integrations",
    items: [
      "OpenAI API",
      "Groq LLM",
      "Whisper",
      "DIFY.ai",
      "Stripe (subscriptions, proration, webhooks, refunds)",
      "Twilio",
      "WhatsApp",
    ],
  },
  {
    title: "DevOps and Testing",
    items: ["Docker", "GitHub Actions CI/CD", "Jest", "AWS", "Vercel"],
  },
] as const;

export const experience = [
  {
    company: "SLMarket",
    role: "Full-Stack Developer",
    start: SLMARKET_START.label,
    end: "Present",
    startISO: SLMARKET_START.iso,
    bullets: [
      "Designed, built and launched two products solo: a multilingual marketplace (slmarket.lk) and SLMarket Flow, a real-time POS/ERP.",
      "Automated releases with GitHub Actions CI/CD, applied TDD with unit and integration tests, and added role-based authorisation and Redis caching.",
    ],
  },
  {
    company: "Softsora (Pvt) Ltd",
    role: "Software Engineer",
    start: "Mar 2025",
    end: "Jul 2026",
    startISO: "2025-03",
    bullets: [
      "Implemented Stripe billing (subscriptions, one-time payments, automated proration, webhooks and refunds), processing 200+ transactions across 10+ products.",
      "Built and deployed Node.js, Express.js and MongoDB services for Next.js and TypeScript frontends, with Jest unit and integration tests covering payment and API logic.",
    ],
  },
  {
    company: "Softsora (Pvt) Ltd",
    role: "Associate Software Engineer",
    start: "Aug 2024",
    end: "Feb 2025",
    startISO: "2024-08",
    bullets: [
      "Launched AI chatbot solutions for a leading oven company by integrating DIFY.ai workflows with custom Next.js interfaces.",
      "Automated customer interactions with a WhatsApp AI chatbot built with Python, LLM APIs and Twilio.",
    ],
  },
  {
    company: "Self-employed",
    role: "Freelance Software Developer",
    start: "Jul 2022",
    end: "Aug 2024",
    startISO: "2022-07",
    bullets: [
      "Delivered client web applications end-to-end, from requirements to deployment, using React, Node.js, Express.js and Spring Boot.",
      "Built a sales counting and analysis tool that replaced a client's manual process.",
    ],
  },
  {
    company: "Elzian Agro (Pvt) Ltd",
    role: "Software Engineer Intern",
    start: "Jan 2022",
    end: "Jul 2022",
    startISO: "2022-01",
    bullets: [
      "Built full-stack features with the MERN stack for enterprise applications.",
      // TODO: confirm. The CV has one bullet for this role; this second line restates its REST API/database detail.
      "Implemented REST APIs and database operations across the SDLC, from requirements to testing.",
    ],
  },
] as const;

export const teaching = [
  {
    role: "Course Instructor & Founder",
    org: ACADEMY_NAME,
    period: "2025 - Present",
    detail:
      "Teaching full-stack development, OOP, system design, SDLC and Git. Guided 20+ BIT final-year projects through code review.",
  },
  {
    role: "Junior Lecturer / Demonstrator (Part-time)",
    org: "Earth University College",
    period: "Mar 2023 - Jul 2025",
    detail:
      "Taught Web Development, UX Design, Programming, OOP, system design, SDLC and Mathematics, and led Java and web lab sessions.",
  },
] as const;

export const education = [
  { degree: "Bachelor of Information Technology (BIT)", school: "University of Colombo School of Computing (UCSC)", period: "2021 - 2024" },
  { degree: "BSc in Physical Science", school: "University of Colombo", period: "2022 - 2025" },
] as const;

export const certifications = [
  { name: "Ethical Hacker", issuer: "Cisco", year: "2026" },
  { name: "Security Fundamentals", issuer: "Palo Alto Networks", year: "2026" },
  { name: "Jenkins and Docker", year: "2026" },
] as const;

export const languages = [
  { name: "English", level: "Professional" },
  { name: "Sinhala", level: "Native" },
  { name: "Tamil", level: "Native" },
  { name: "Arabic", level: "Basic" },
] as const;

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

export type ArchitectureNode = { id: string; title: string; sub?: string };
export type Architecture = {
  rows: { label: string; nodes: ArchitectureNode[] }[];
  edges: [from: string, to: string][];
};

export type Project = {
  slug: string;
  title: string;
  /** Second half of the title, rendered in the accent colour on the case-study page. */
  titleAccent?: string;
  subtitle: string;
  summary: string;
  /** <title> before the " | Arshed Ahmed" suffix: what was built and the outcome. Keep the full title 50-60 chars. */
  seoTitle: string;
  /** Meta description, 140-160 chars, restating only what the case study says. */
  seoDescription: string;
  /** One-line outcome, shown on cards and on the no-screenshot fallback. */
  outcome: string;
  tag: string;
  /** Only claims that are true: "Live" needs a public link, "Solo-built" means built alone. */
  badges: ("Live" | "Solo-built")[];
  period?: string;
  role: string;
  stack: { label: string; items: string[] }[];
  links: { label: string; href: string; kind: "live" | "github" }[];
  /**
   * Image files expected in /public/images/projects/<slug>/. Missing files are skipped at build time and
   * the page renders a designed fallback card instead (see README for the list to supply).
   */
  cover: { file: string; alt: string };
  screenshots: { file: string; alt: string; device: "browser" | "phone" }[];
  architecture: Architecture;
};

export const projects: Project[] = [
  {
    slug: "slmarket",
    title: "SLMarket",
    titleAccent: "Ecosystem",
    subtitle: "Marketplace + SLMarket Flow POS/ERP",
    summary:
      "A multilingual marketplace connecting buyers and sellers across Sri Lanka, plus SLMarket Flow, a real-time POS with ERP features. Designed, built and launched solo.",
    seoTitle: "SLMarket: Marketplace and POS/ERP Built Solo",
    seoDescription:
      "How Arshed Ahmed designed, built and launched SLMarket solo: a multilingual Sri Lankan marketplace on Next.js and SLMarket Flow, a real-time Laravel POS/ERP.",
    outcome: "Two products designed, built and launched solo: a marketplace and a real-time POS/ERP.",
    tag: "E-commerce",
    badges: ["Live", "Solo-built"],
    role: "Solo: product, architecture, full-stack development and deployment",
    stack: [
      {
        label: "Marketplace",
        items: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Prisma", "Redis", "Cloudinary", "GitHub Actions", "Vercel"],
      },
      {
        label: "SLMarket Flow (POS/ERP)",
        items: ["Laravel", "Vue.js", "Inertia.js", "MySQL", "GitHub Actions", "cPanel"],
      },
    ],
    links: [
      { label: "slmarket.lk", href: "https://slmarket.lk", kind: "live" },
      { label: "flow.slmarket.lk", href: "https://flow.slmarket.lk", kind: "live" },
    ],
    cover: { file: "cover.webp", alt: "SLMarket marketplace home page with product listings" },
    screenshots: [
      { file: "marketplace-home.webp", alt: "SLMarket marketplace home page with categories and product listings", device: "browser" },
      { file: "flow-pos.webp", alt: "SLMarket Flow point-of-sale screen with a cart and product grid", device: "browser" },
      { file: "marketplace-mobile.webp", alt: "SLMarket marketplace on a phone", device: "phone" },
    ],
    architecture: {
      rows: [
        {
          label: "Users",
          nodes: [
            { id: "buyers", title: "Buyers", sub: "Web, multilingual" },
            { id: "sellers", title: "Sellers", sub: "Web" },
            { id: "staff", title: "Shop staff", sub: "POS" },
          ],
        },
        {
          label: "Apps",
          nodes: [
            { id: "market", title: "Marketplace", sub: "Next.js · TypeScript" },
            { id: "flow", title: "SLMarket Flow", sub: "Laravel · Vue · Inertia" },
          ],
        },
        {
          label: "Data",
          nodes: [
            { id: "pg", title: "PostgreSQL", sub: "Prisma" },
            { id: "redis", title: "Redis", sub: "Cache" },
            { id: "cdn", title: "Cloudinary", sub: "Media" },
            { id: "mysql", title: "MySQL", sub: "POS data" },
          ],
        },
        {
          label: "Delivery",
          nodes: [
            { id: "vercel", title: "Vercel", sub: "GitHub Actions" },
            { id: "cpanel", title: "cPanel", sub: "GitHub Actions" },
          ],
        },
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
    title: "AI Business Support",
    titleAccent: "SaaS",
    subtitle: "Stripe payments layer and live payments dashboard",
    summary:
      "A production SaaS platform of AI chatbots that guide businesses on grants and funding. I owned the Stripe payments layer end-to-end and built a real-time payments dashboard.",
    seoTitle: "Stripe Payments for an AI Business SaaS",
    seoDescription:
      "Arshed Ahmed owned the Stripe payments layer of a production AI SaaS that guides businesses on grants and funding, and built a real-time payments dashboard.",
    outcome: "Owned the Stripe payments layer end-to-end and built a real-time payments dashboard.",
    tag: "SaaS · Payments",
    badges: [],
    period: "Softsora (Pvt) Ltd",
    role: "Full-stack engineer; owner of the Stripe payments layer",
    stack: [
      { label: "Platform", items: ["Next.js", "TypeScript", "Express.js", "Node.js", "Stripe", "Jest"] },
    ],
    links: [], // TODO: confirm whether a public link can be shared.
    cover: { file: "cover.webp", alt: "AI Business Support SaaS payments dashboard" },
    screenshots: [
      { file: "payments-dashboard.webp", alt: "Real-time Stripe payments dashboard with transaction list", device: "browser" },
      { file: "chatbot.webp", alt: "AI chatbot conversation guiding a business on grants and funding", device: "browser" },
    ],
    architecture: {
      rows: [
        {
          label: "Users",
          nodes: [
            { id: "biz", title: "Businesses", sub: "Chat + billing" },
            { id: "team", title: "Internal team", sub: "Dashboard" },
          ],
        },
        { label: "Frontend", nodes: [{ id: "web", title: "Next.js app", sub: "TypeScript" }] },
        { label: "Backend", nodes: [{ id: "api", title: "Express.js API", sub: "Payments + business logic" }] },
        {
          label: "Services",
          nodes: [
            { id: "ai", title: "AI chatbots", sub: "LLM workflows" },
            { id: "stripe", title: "Stripe", sub: "Billing + webhooks" },
            { id: "db", title: "Database", sub: "Payment records" },
          ],
        },
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
    title: "AI CV Builder",
    titleAccent: "& Interview Prep",
    subtitle: "ATS resume generation + voice mock interview",
    summary:
      "ATS-friendly resume generation, parsing and job-description optimisation, plus a voice-based AI mock interview that gives candidates instant feedback.",
    seoTitle: "AI CV Builder with Voice Mock Interviews",
    seoDescription:
      "An AI CV builder by Arshed Ahmed: ATS-friendly resumes tailored to a job description, plus voice mock interviews with instant AI feedback, on Next.js and Groq.",
    outcome: "ATS-friendly resumes and voice mock interviews with instant AI feedback.",
    tag: "AI / LLM",
    badges: [],
    role: "Full-stack development",
    stack: [
      { label: "Platform", items: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Groq LLM", "Whisper"] },
    ],
    links: [], // TODO: add live link and/or GitHub repo if public.
    cover: { file: "cover.webp", alt: "AI CV Builder resume editor" },
    screenshots: [
      { file: "resume-editor.webp", alt: "Resume editor with an ATS-optimised CV preview", device: "browser" },
      { file: "mock-interview.webp", alt: "Voice mock interview screen with AI feedback", device: "phone" },
    ],
    architecture: {
      rows: [
        { label: "Users", nodes: [{ id: "cand", title: "Candidates", sub: "Web + microphone" }] },
        { label: "App", nodes: [{ id: "next", title: "Next.js app", sub: "TypeScript · API routes" }] },
        {
          label: "AI + Data",
          nodes: [
            { id: "groq", title: "Groq LLM", sub: "Resume + feedback" },
            { id: "whisper", title: "Whisper", sub: "Speech-to-text" },
            { id: "pg", title: "PostgreSQL", sub: "Prisma" },
          ],
        },
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
    title: "WhatsApp AI",
    titleAccent: "Order Bot",
    subtitle: "Conversational ordering and support on WhatsApp",
    summary:
      "A WhatsApp AI chatbot built with Python, LLM APIs and Twilio that automates customer conversations.",
    seoTitle: "WhatsApp AI Bot That Automates Customer Chats",
    seoDescription:
      "A WhatsApp AI chatbot Arshed Ahmed built and deployed at Softsora with Python, LLM APIs and Twilio, automating customer conversations on WhatsApp.",
    outcome: "Automated customer conversations on WhatsApp with an LLM-powered bot.",
    tag: "Automation",
    badges: [],
    period: "Softsora (Pvt) Ltd",
    role: "Developer: built and deployed the bot",
    stack: [{ label: "Bot", items: ["Python", "LLM APIs", "Twilio", "WhatsApp"] }],
    links: [], // TODO: add GitHub repo if public.
    cover: { file: "cover.webp", alt: "WhatsApp AI order bot conversation" },
    screenshots: [
      { file: "chat-1.webp", alt: "WhatsApp conversation in which the bot answers a customer question", device: "phone" },
      { file: "chat-2.webp", alt: "Order confirmation message sent by the bot in WhatsApp", device: "phone" },
    ],
    architecture: {
      rows: [
        { label: "Users", nodes: [{ id: "cust", title: "Customers", sub: "WhatsApp" }] },
        { label: "Channel", nodes: [{ id: "twilio", title: "Twilio", sub: "WhatsApp API" }] },
        { label: "Service", nodes: [{ id: "py", title: "Python service", sub: "Webhook + logic" }] },
        { label: "AI", nodes: [{ id: "llm", title: "LLM API", sub: "Intent + replies" }] },
      ],
      edges: [
        ["cust", "twilio"],
        ["twilio", "py"],
        ["py", "llm"],
      ],
    },
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
