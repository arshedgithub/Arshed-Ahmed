import { ArrowUpRight, Award, GraduationCap, Quote } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { GitHubIcon } from "@/components/ui/brand-icons";
import { buttonClasses } from "@/components/ui/button";
import { Section, SectionHeading, TodoMark } from "@/components/ui/primitives";
import { catalog } from "@/i18n/messages";
import { certifications, education, pinnedRepos, references, site } from "@/lib/site";
import { isTodo } from "@/lib/todo";

/**
 * Authority signals: degrees, certificates with issuer verification links, GitHub, and references.
 * References render only when real, attributable entries exist in site.ts.
 */
export function Credibility() {
  const t = useTranslations("credibility");
  const about = useTranslations("about");
  const caseStudy = useTranslations("caseStudy");
  const { credibility } = catalog(useLocale());
  const repoCopy = credibility.repos as Record<string, string>;
  const referenceCopy = credibility.referenceItems as Record<string, string>;

  return (
    <Section id="credentials" labelledBy="credentials-title">
      <SectionHeading id="credentials-title" kicker={t("kicker")} title={t("title")} />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <section aria-labelledby="education-title" className="card p-5 md:p-6">
          <h3 id="education-title" className="flex items-center gap-2 font-semibold">
            <GraduationCap size={18} className="text-muted" aria-hidden="true" />
            {t("education")}
          </h3>
          <ul className="mt-4 grid gap-4">
            {education.map((e) => (
              <li key={e.key}>
                <p className="text-[0.9375rem] font-medium text-fg">{about(`degrees.${e.key}.degree`)}</p>
                <p className="text-sm text-muted">{about(`degrees.${e.key}.school`)}</p>
                <p className="mt-0.5 font-mono text-xs text-muted">
                  {e.startISO} – {e.endISO}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="certs-title" className="card p-5 md:p-6">
          <h3 id="certs-title" className="flex items-center gap-2 font-semibold">
            <Award size={18} className="text-muted" aria-hidden="true" />
            {t("certifications")}
          </h3>
          <ul className="mt-4 grid gap-4">
            {certifications.map((c) => {
              const name = about(`certs.${c.key}`);
              return (
                <li key={c.key} className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[0.9375rem] font-medium text-fg">{name}</p>
                    <p className="text-sm text-muted">
                      {isTodo(c.issuer) ? (
                        <TodoMark className="me-1.5">{c.issuer}</TodoMark>
                      ) : (
                        <>
                          <bdi>{c.issuer}</bdi>
                          {" · "}
                        </>
                      )}
                      <span className="font-mono text-xs">{c.year}</span>
                    </p>
                  </div>
                  {isTodo(c.verifyUrl) ? (
                    <TodoMark className="mt-1 shrink-0">{c.verifyUrl}</TodoMark>
                  ) : (
                    <a
                      href={c.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={t("verifyAria", { name })}
                      className="inline-flex min-h-11 shrink-0 items-center gap-1 text-sm font-medium text-accent hover:underline"
                    >
                      {t("verify")}
                      <ArrowUpRight size={14} aria-hidden="true" className="rtl:-scale-x-100" />
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        <section aria-labelledby="github-title" className="card flex flex-col p-5 md:col-span-2 md:p-6 lg:col-span-1">
          <h3 id="github-title" className="flex items-center gap-2 font-semibold">
            <GitHubIcon size={18} className="text-muted" />
            {t("github")}
          </h3>
          <p className="mt-4 text-sm text-muted">{t("githubBody")}</p>
          {pinnedRepos.length > 0 ? (
            <ul className="mt-4 grid gap-3">
              {pinnedRepos.map((repo) => (
                <li key={repo.name}>
                  <a href={repo.url} target="_blank" rel="noopener noreferrer" className="block rounded-control border border-line p-3 hover:border-line-strong">
                    <span className="block font-mono text-sm text-fg" dir="ltr">{repo.name}</span>
                    {repoCopy[repo.name] && <span className="mt-1 block text-sm text-muted">{repoCopy[repo.name]}</span>}
                    <span className="mt-1 block font-mono text-xs text-muted">{repo.language}</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <TodoMark className="mt-3 self-start">TODO_REPOS (pin 2-3 public repos in site.ts)</TodoMark>
          )}
          <p className="mt-auto pt-5 font-mono text-xs text-muted">
            <bdi dir="ltr">github.com/{site.githubHandle}</bdi>
          </p>
          <a
            href={site.githubUrl}
            target="_blank"
            rel="noopener noreferrer me"
            className={buttonClasses("secondary", "mt-2 self-start gap-1.5", "sm")}
          >
            {t("githubCta")}
            <span className="sr-only">{caseStudy("opensNewTab")}</span>
            <ArrowUpRight size={16} aria-hidden="true" className="rtl:-scale-x-100" />
          </a>
        </section>
      </div>

      {references.length > 0 && (
        <section aria-labelledby="references-title" className="mt-10">
          <h3 id="references-title" className="kicker">
            {t("references")}
          </h3>
          <ul className="mt-4 grid gap-5 md:grid-cols-2">
            {references.map((r) => (
              <li key={r.key}>
                <figure className="card h-full p-5 md:p-6">
                  <Quote size={18} aria-hidden="true" className="text-muted rtl:-scale-x-100" />
                  <blockquote className="mt-3 text-fg-2">{referenceCopy[r.key]}</blockquote>
                  <figcaption className="mt-4 text-sm">
                    <span className="font-medium text-fg">{r.name}</span>
                    <span className="text-muted">
                      {" · "}
                      {r.role}, <bdi>{r.company}</bdi>
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </section>
      )}
    </Section>
  );
}
