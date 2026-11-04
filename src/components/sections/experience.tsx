import { useLocale, useTranslations } from "next-intl";
import { TimelineRail } from "@/components/motion/timeline-line";
import { Reveal } from "@/components/motion/reveal";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { catalog } from "@/i18n/messages";
import { formatMonth } from "@/lib/content";
import { experience } from "@/lib/site";

export function Experience() {
  const t = useTranslations("experience");
  const locale = useLocale();
  const copy = catalog(locale).experience.items;
  return (
    <Section id="experience" labelledBy="experience-title">
      <SectionHeading id="experience-title" eyebrow={t("eyebrow")} title={t("title")} />
      <TimelineRail>
        <ol className="grid gap-8">
          {experience.map((job) => (
            <li key={job.key} className="relative ps-8">
              <span
                aria-hidden="true"
                className="absolute top-1.5 start-0 size-[15px] rounded-full border-2 border-accent bg-canvas"
              />
              <Reveal>
                <div className="md:grid md:grid-cols-[180px_minmax(0,1fr)] md:gap-8">
                  <p className="font-mono text-xs text-muted md:pt-1">
                    <time dateTime={job.startISO}>{formatMonth(job.startISO, locale)}</time> –{" "}
                    {job.endISO ? formatMonth(job.endISO, locale) : t("present")}
                  </p>
                  <div className="mt-1 md:mt-0">
                    <h3 className="font-semibold">
                      {copy[job.key].role} <span className="font-normal text-muted">· <bdi>{job.company ?? t("selfEmployed")}</bdi></span>
                    </h3>
                    <ul className="mt-2 grid max-w-3xl gap-1.5 text-sm text-muted">
                      {copy[job.key].bullets.map((b) => (
                        <li key={b} className="relative ps-4 before:absolute before:top-[0.6em] before:start-0 before:size-1 before:rounded-full before:bg-muted">
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </TimelineRail>
    </Section>
  );
}
