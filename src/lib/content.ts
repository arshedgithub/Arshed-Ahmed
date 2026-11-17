import { catalog, type Messages } from "@/i18n/messages";
import type { Locale } from "@/i18n/routing";
import { projects as projectFacts, type ProjectFacts, type StatusKind } from "./site";
import { isTodo } from "./todo";

export type ArchitectureNode = { id: string; title: string; sub: string };
export type Architecture = {
  rows: { label: string; nodes: ArchitectureNode[] }[];
  edges: [from: string, to: string][];
};

type ProjectCopy = Messages["projects"]["slmarket"];
export type CaseCopy = ProjectCopy["case"];

export type ProjectStatus = { label: string; kind: StatusKind | "TODO_STATUS"; date?: string };

/** A project with its shared facts and one locale's wording joined. */
export type Project = {
  slug: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  summary: string;
  seoTitle: string;
  seoDescription: string;
  outcome: string;
  /** The one-line result with a number; a TODO_ placeholder until Arshed supplies it. */
  metric: string;
  tag: string;
  role: string;
  solo: boolean;
  owner: ProjectFacts["owner"];
  company: string | null;
  timeline: ProjectFacts["timeline"];
  statuses: ProjectStatus[];
  proofChips: string[];
  links: { label: string; href: string; kind: ProjectFacts["links"][number]["kind"] }[];
  stack: { label: string; items: string[] }[];
  cover: { file: string; alt: string };
  screenshots: { file: string; alt: string; device: "browser" | "phone" }[];
  schematic: ProjectFacts["schematic"];
  architecture: Architecture;
  case: CaseCopy;
};

function localize(facts: ProjectFacts, locale: Locale): Project {
  // Every project has the same keys; only the per-project maps (statuses, proof, links) differ in shape.
  const copy = (catalog(locale).projects as unknown as Record<string, ProjectCopy>)[facts.slug];
  const statusLabels = copy.statuses as Record<string, string>;
  const proofLabels = copy.proof as Record<string, string>;
  const linkLabels = copy.links as Record<string, string>;
  const coverId = facts.screenshots.find((s) => s.device === "browser")?.id;
  return {
    slug: facts.slug,
    title: copy.title,
    titleAccent: copy.titleAccent,
    subtitle: copy.subtitle,
    summary: copy.summary,
    seoTitle: copy.seoTitle,
    seoDescription: copy.seoDescription,
    outcome: copy.outcome,
    metric: copy.metric,
    tag: copy.tag,
    role: copy.role,
    solo: facts.solo,
    owner: facts.owner,
    company: facts.company,
    timeline: facts.timeline,
    statuses: facts.statuses.map((s) => ({ label: statusLabels[s.key] ?? "", kind: s.kind, date: s.date })),
    proofChips: facts.proofChips.map((key) => proofLabels[key]),
    links: facts.links.map((l) => ({ label: linkLabels[l.key] ?? l.href, href: l.href, kind: l.kind })),
    stack: facts.stack.map((group) => ({ label: (copy.stackLabels as Record<string, string>)[group.key], items: group.items })),
    cover: {
      file: "cover.webp",
      alt: coverId ? (copy.screenshotAlts as Record<string, string>)[coverId] : copy.coverAlt,
    },
    screenshots: facts.screenshots.map((s) => ({
      file: `${s.id}.webp`,
      alt: (copy.screenshotAlts as Record<string, string>)[s.id],
      device: s.device,
    })),
    schematic: facts.schematic,
    architecture: {
      rows: facts.architecture.rows.map((row) => ({
        label: (copy.architecture.rows as Record<string, string>)[row.id],
        nodes: row.nodes.map((id) => ({ id, ...(copy.architecture.nodes as Record<string, { title: string; sub: string }>)[id] })),
      })),
      edges: facts.architecture.edges,
    },
    case: copy.case,
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
  en: new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric", timeZone: "UTC" }),
  // nu-latn: Western digits in Arabic, as everywhere else on the site.
  ar: new Intl.DateTimeFormat("ar-AE-u-nu-latn-ca-gregory", { month: "long", year: "numeric", timeZone: "UTC" }),
};

/** "2026-07" to "Jul 2026" / "يوليو 2026". A bare year stays as it is; placeholders pass through. */
export function formatMonth(iso: string, locale: Locale) {
  if (isTodo(iso) || iso.length === 4) return iso;
  return monthFormatters[locale].format(new Date(`${iso}-01T00:00:00Z`));
}

/** Date range with an en dash, both locales: "Mar 2025 – Jul 2026", "2025 – Present". */
export function formatRange(startISO: string, endISO: string | null, locale: Locale, presentLabel: string) {
  return `${formatMonth(startISO, locale)} – ${endISO ? formatMonth(endISO, locale) : presentLabel}`;
}
