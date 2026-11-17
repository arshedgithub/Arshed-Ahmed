import { ArrowRight, ArrowUpRight, PlayCircle } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { GitHubIcon } from "@/components/ui/brand-icons";
import { buttonClasses } from "@/components/ui/button";
import { ProjectMedia } from "@/components/ui/project-media";
import { Chip, Known, Section, SectionHeading, StatusPill, TodoMark } from "@/components/ui/primitives";
import { LocaleLink } from "@/i18n/link";
import { getProjects, type Project } from "@/lib/content";
import { isTodo } from "@/lib/todo";

/**
 * Recruiter-optimised cards, scanned top to bottom: image -> honest status -> name -> one outcome line with a
 * number -> 3-4 proof chips -> two actions (case study, and the live product or demo when a URL exists).
 */
export function SelectedWork() {
  const t = useTranslations("work");
  const projects = getProjects(useLocale());
  return (
    <Section id="work" labelledBy="work-title">
      <SectionHeading id="work-title" kicker={t("kicker")} title={t("title")} description={t("description")} />
      <ul className="grid gap-5 md:grid-cols-2 md:gap-6">
        {projects.map((p) => (
          <li key={p.slug}>
            <ProjectCard project={p} />
          </li>
        ))}
      </ul>
    </Section>
  );
}

function ProjectCard({ project: p }: { project: Project }) {
  const t = useTranslations("work");
  const status = useTranslations("status");
  const titleId = `work-${p.slug}`;
  // Outcome line: the metric when it is known, otherwise the plain outcome (and a TODO marker in development).
  const metricKnown = !isTodo(p.metric);
  return (
    <article aria-labelledby={titleId} className="card flex h-full flex-col overflow-hidden p-2 transition-colors hover:border-line-strong">
      <ProjectMedia
        project={p}
        sizes="(min-width: 1160px) 536px, (min-width: 768px) calc(50vw - 44px), calc(100vw - 48px)"
      />
      <div className="flex flex-1 flex-col px-3 pt-5 pb-3 md:px-4">
        <ul aria-label={status("aria")} className="flex flex-wrap gap-1.5">
          {p.statuses.map((s) => (
            <li key={s.label + s.kind}>
              <StatusPill status={s} />
            </li>
          ))}
        </ul>

        <h3 id={titleId} className="mt-4 text-xl font-semibold">
          {p.title} <span className="text-muted">{p.titleAccent}</span>
        </h3>
        <p className="mt-1 text-sm text-muted">
          {p.owner === "company" && p.company && <>{t("builtAt", { company: p.company })} · </>}
          {p.owner === "self" && <>{t("ownProduct")} · </>}
          {p.owner === "TODO_OWNER" && <TodoMark className="me-1.5">TODO_OWNER</TodoMark>}
          {p.solo && <>{t("solo")} · </>}
          <bdi>{p.tag}</bdi>
        </p>

        <p className="mt-4 text-[0.9375rem] font-medium text-fg">
          {metricKnown ? p.metric : p.outcome}
        </p>
        {!metricKnown && <Known value={p.metric} />}

        <ul aria-label={t("proofAria")} className="mt-4 flex flex-wrap gap-1.5">
          {p.proofChips.map((chip) => (
            <li key={chip}>
              <Chip>{chip}</Chip>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
          <LocaleLink
            href={`/projects/${p.slug}`}
            aria-label={t("readCaseStudyAria", { title: `${p.title} ${p.titleAccent}` })}
            className={buttonClasses("secondary", "gap-1.5", "sm")}
          >
            {t("readCaseStudy")}
            <ArrowRight size={16} aria-hidden="true" className="rtl:-scale-x-100" />
          </LocaleLink>
          {p.links.map((link) => (
            <ProjectLink key={link.href} link={link} />
          ))}
        </div>
      </div>
    </article>
  );
}

export function ProjectLink({ link, variant = "ghost" }: { link: Project["links"][number]; variant?: "ghost" | "secondary" }) {
  const t = useTranslations("work");
  const common = useTranslations("common");
  const label = t(`linkLabels.${link.kind}`);
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={common("externalLabel", { label: `${label}: ${link.label}` })}
      className={buttonClasses(variant, variant === "ghost" ? "gap-1.5 text-muted hover:text-fg" : "gap-1.5", "sm")}
    >
      {link.kind === "github" && <GitHubIcon size={16} />}
      {link.kind === "demo" && <PlayCircle size={16} aria-hidden="true" />}
      {label}
      {/* Diagonal "external" arrow: mirrored in RTL like other directional icons. */}
      <ArrowUpRight size={16} aria-hidden="true" className="rtl:-scale-x-100" />
    </a>
  );
}
