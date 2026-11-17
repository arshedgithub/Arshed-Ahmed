import { useLocale, useTranslations } from "next-intl";
import { Chip, Section, SectionHeading } from "@/components/ui/primitives";
import { catalog } from "@/i18n/messages";
import { formatMonth } from "@/lib/content";
import { experience } from "@/lib/site";

/**
 * Compact timeline. Each role states its employment type (own product / full-time / freelance / internship),
 * so nobody reads internship or freelance time as full-time experience.
 */
export function Experience() {
  const t = useTranslations("experience");
  const locale = useLocale();
  const copy = catalog(locale).experience.items;
  return (
    <Section id="experience" labelledBy="experience-title">
      <SectionHeading id="experience-title" kicker={t("kicker")} title={t("title")} />
      <ol className="grid">
        {experience.map((job) => {
          const item = copy[job.key];
          return (
            <li key={job.key} className="grid gap-x-10 gap-y-2 border-t border-line py-7 first:border-t-0 first:pt-0 md:grid-cols-[11rem_minmax(0,1fr)]">
              <div className="flex flex-wrap items-center gap-2 md:flex-col md:items-start">
                <p className="font-mono text-xs text-muted md:pt-1.5">
                  <time dateTime={job.startISO}>{formatMonth(job.startISO, locale)}</time>
                  {" – "}
                  {job.endISO ? <time dateTime={job.endISO}>{formatMonth(job.endISO, locale)}</time> : t("present")}
                </p>
                <Chip>{t(`types.${job.type}`)}</Chip>
              </div>
              <div className="max-w-3xl">
                <h3 className="text-lg font-semibold">
                  {item.role}
                  <span className="font-normal text-muted">
                    {" · "}
                    <bdi>{item.company || t("selfEmployed")}</bdi>
                  </span>
                </h3>
                <p className="mt-0.5 text-sm text-muted">{item.context}</p>
                <ul className="list-dash mt-3 grid gap-2 text-[0.9375rem] text-fg-2">
                  {item.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
