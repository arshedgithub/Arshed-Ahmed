/**
 * Single source of truth for all site content.
 * Facts come from the CV. Do not add metrics, clients or testimonials that are not in it.
 */

export const LINKEDIN_URL = "https://linkedin.com/in/arshed-ahmed";
export const ACADEMY_NAME = "Solitrium Academy";

/**
 * "system": first visit follows the OS light/dark preference (dark when unknown).
 * "dark": first visit is always dark; the toggle still persists the visitor's choice.
 */
export const THEME_DEFAULT: "system" | "dark" = "system";

export const site = {
  url: "https://arshedahmed.com",
  name: "Arshed Ahmed",
  firstName: "Arshed",
  lastName: "Ahmed",
  title: "Software Engineer | Full Stack Developer",
  jobTitle: "Full-Stack Software Engineer",
  positioning:
    "Full-stack engineer building SaaS, payments and AI products with Next.js, TypeScript and Node.js.",
  description:
    "Arshed Ahmed is a full-stack software engineer in the UAE building SaaS, Stripe payments and AI products with Next.js, TypeScript and Node.js. Available immediately.",
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
  openTo: "Open to roles in Dubai and Abu Dhabi",
  products: {
    marketplace: "https://slmarket.lk",
    flow: "https://flow.slmarket.lk",
  },
} as const;

export const nav = [
  { label: "Home", href: "/#top" },
  { label: "Work", href: "/#work" },
  { label: "Skills", href: "/#skills" },
  { label: "Experience", href: "/#experience" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
] as const;

export const proof = [
  { value: 4, suffix: "+", label: "Years experience" },
  { value: 10, suffix: "+", label: "SaaS products" },
  { text: "Stripe", label: "Billing in production" },
  { value: 2, suffix: "", label: "Products launched solo" },
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
    start: "Aug 2026",
    end: "Present",
    startISO: "2026-08",
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
    company: "Freelance",
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
  { degree: "Bachelor of Information Technology (BIT)", school: "University of Colombo School of Computing", period: "2021 - 2024" },
  { degree: "BSc in Physical Science", school: "University of Colombo", period: "2022 - 2025" },
] as const;

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
  tag: string;
  period?: string;
  role: string;
  stack: { label: string; items: string[] }[];
  links: { label: string; href: string; kind: "live" | "github" }[];
  /** TODO: replace each placeholder in /public/images/projects with a real screenshot (same path, or update here). */
  cover: string;
  screenshots: { src: string; alt: string; device: "browser" | "phone" }[];
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
    tag: "E-commerce",
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
    cover: "/images/projects/slmarket/TODO-cover.webp",
    screenshots: [
      { src: "/images/projects/slmarket/TODO-marketplace-home.webp", alt: "SLMarket marketplace home page (placeholder)", device: "browser" },
      { src: "/images/projects/slmarket/TODO-flow-pos.webp", alt: "SLMarket Flow point-of-sale screen (placeholder)", device: "browser" },
      { src: "/images/projects/slmarket/TODO-marketplace-mobile.webp", alt: "SLMarket marketplace on a phone (placeholder)", device: "phone" },
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
    tag: "SaaS · Payments",
    period: "Softsora (Pvt) Ltd",
    role: "Full-stack engineer; owner of the Stripe payments layer",
    stack: [
      { label: "Platform", items: ["Next.js", "TypeScript", "Express.js", "Node.js", "Stripe", "Jest"] },
    ],
    links: [], // TODO: confirm whether a public link can be shared.
    cover: "/images/projects/ai-business-support-saas/TODO-cover.webp",
    screenshots: [
      { src: "/images/projects/ai-business-support-saas/TODO-payments-dashboard.webp", alt: "Stripe payments dashboard (placeholder)", device: "browser" },
      { src: "/images/projects/ai-business-support-saas/TODO-chatbot.webp", alt: "AI chatbot conversation screen (placeholder)", device: "browser" },
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
    tag: "AI / LLM",
    role: "Full-stack development",
    stack: [
      { label: "Platform", items: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Groq LLM", "Whisper"] },
    ],
    links: [], // TODO: add live link and/or GitHub repo if public.
    cover: "/images/projects/ai-cv-builder/TODO-cover.webp",
    screenshots: [
      { src: "/images/projects/ai-cv-builder/TODO-resume-editor.webp", alt: "Resume builder editor (placeholder)", device: "browser" },
      { src: "/images/projects/ai-cv-builder/TODO-mock-interview.webp", alt: "Voice mock interview screen (placeholder)", device: "phone" },
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
    tag: "Automation",
    period: "Softsora (Pvt) Ltd",
    role: "Developer: built and deployed the bot",
    stack: [{ label: "Bot", items: ["Python", "LLM APIs", "Twilio", "WhatsApp"] }],
    links: [], // TODO: add GitHub repo if public.
    cover: "/images/projects/whatsapp-ai-order-bot/TODO-cover.webp",
    screenshots: [
      { src: "/images/projects/whatsapp-ai-order-bot/TODO-chat-1.webp", alt: "WhatsApp conversation with the order bot (placeholder)", device: "phone" },
      { src: "/images/projects/whatsapp-ai-order-bot/TODO-chat-2.webp", alt: "Order confirmation in WhatsApp (placeholder)", device: "phone" },
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
