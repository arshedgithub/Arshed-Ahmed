import { ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { ProjectFallback } from "@/components/ui/project-fallback";
import { Chip, Section, SectionHeading } from "@/components/ui/primitives";
import { LocaleLink } from "@/i18n/link";
import { getProjects } from "@/lib/content";
import { projectCover } from "@/lib/project-images";

export function SelectedWork() {
  const t = useTranslations("work");
  const projects = getProjects(useLocale());
  return (
    <Section id="work" labelledBy="work-title">
      <SectionHeading
        id="work-title"
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {projects.map((p, i) => {
          const cover = projectCover(p);
          return (
            <li key={p.slug}>
              <Reveal delay={i * 0.06} className="h-full">
                <article className="card group relative flex h-full flex-col p-3 transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:border-accent/60 active:translate-y-0 active:border-accent/60 motion-reduce:hover:translate-y-0">
                  {cover ? (
                    <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-line shadow-card">
                      <Image
                        src={cover.src}
                        alt={cover.alt}
                        fill
                        sizes="(min-width: 1120px) 256px, (min-width: 1024px) 23vw, (min-width: 640px) 45vw, calc(100vw - 56px)"
                        className="object-cover object-top"
                      />
                    </div>
                  ) : (
                    <ProjectFallback project={p} variant="card" />
                  )}
                  <div className="flex flex-1 flex-col px-1 pt-4 pb-1">
                    <h3 className="font-semibold">
                      <LocaleLink
                        href={`/projects/${p.slug}`}
                        className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-accent"
                      >
                        {p.title} {p.titleAccent}
                      </LocaleLink>
                    </h3>
                    <p className="mt-1 text-sm text-muted">{p.outcome}</p>
                    <ul className="mt-3 flex flex-wrap gap-1.5" aria-label={t("tagsAria")}>
                      <li>
                        <Chip>{p.tag}</Chip>
                      </li>
                      {p.badges.map((b) => (
                        <li key={b}>
                          <Chip className="border-accent/40 bg-accent-soft text-fg">{t(`badges.${b}`)}</Chip>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-accent" aria-hidden="true">
                      {t("readCaseStudy")}
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
                    </p>
                  </div>
                </article>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
