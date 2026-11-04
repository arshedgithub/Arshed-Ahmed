import { catalog } from "@/i18n/messages";
import type { Locale } from "@/i18n/routing";
import { projects as projectFacts, type ProjectFacts } from "./site";

export type ArchitectureNode = { id: string; title: string; sub: string };
export type Architecture = {
  rows: { label: string; nodes: ArchitectureNode[] }[];
  edges: [from: string, to: string][];
};

/** Per-locale wording of a project, shaped like messages: projects.<slug>. */
type ProjectCopy = {
  title: string;
  /** Second half of the title, rendered in the accent colour on the case-study page. */
  titleAccent: string;
  subtitle: string;
  summary: string;
  /** <title> before the " | Arshed Ahmed" suffix: what was built and the outcome. Keep the full title 50-60 chars. */
  seoTitle: string;
  /** Meta description, 140-160 chars, restating only what the case study says. */
  seoDescription: string;
  /** One-line outcome, shown on cards and on the no-screenshot fallback. */
  outcome: string;
  tag: string;
  role: string;
  coverAlt: string;
  screenshotAlts: Record<string, string>;
  stackLabels: Record<string, string>;
  architecture: {
    rows: Record<string, string>;
    nodes: Record<string, { title: string; sub: string }>;
  };
};

/** A project with its shared facts and one locale's wording joined. */
export type Project = Omit<ProjectCopy, "coverAlt" | "screenshotAlts" | "stackLabels" | "architecture"> &
  Pick<ProjectFacts, "slug" | "badges" | "period" | "links"> & {
    stack: { label: string; items: string[] }[];
    cover: { file: string; alt: string };
    screenshots: { file: string; alt: string; device: "browser" | "phone" }[];
    architecture: Architecture;
  };

function localize(facts: ProjectFacts, locale: Locale): Project {
  const copy = (catalog(locale).projects as Record<string, ProjectCopy>)[facts.slug];
  const { coverAlt, screenshotAlts, stackLabels, architecture, ...text } = copy;
  return {
    ...text,
    slug: facts.slug,
    badges: facts.badges,
    period: facts.period,
    links: facts.links,
    stack: facts.stack.map((group) => ({ label: stackLabels[group.key], items: group.items })),
    cover: { file: "cover.webp", alt: coverAlt },
    screenshots: facts.screenshots.map((s) => ({ file: `${s.id}.webp`, alt: screenshotAlts[s.id], device: s.device })),
    architecture: {
      rows: facts.architecture.rows.map((row) => ({
        label: architecture.rows[row.id],
        nodes: row.nodes.map((id) => ({ id, ...architecture.nodes[id] })),
      })),
      edges: facts.architecture.edges,
    },
  };
}

export function getProjects(locale: Locale) {
  return projectFacts.map((facts) => localize(facts, locale));
}

export function getProject(slug: string, locale: Locale) {
  const facts = projectFacts.find((p) => p.slug === slug);
  return facts && localize(facts, locale);
}

const monthFormatters: Record<Locale, Intl.DateTimeFormat> = {
  en: new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric", timeZone: "UTC" }),
  // nu-latn: Western digits in Arabic.
  ar: new Intl.DateTimeFormat("ar-AE-u-nu-latn-ca-gregory", { month: "long", year: "numeric", timeZone: "UTC" }),
};

/** "2026-07" to "Jul 2026" / "يوليو 2026". A bare year stays as it is. */
export function formatMonth(iso: string, locale: Locale) {
  return iso.length === 4 ? iso : monthFormatters[locale].format(new Date(`${iso}-01T00:00:00Z`));
}
