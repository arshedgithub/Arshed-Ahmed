import { useLocale, useTranslations } from "next-intl";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { formatRange } from "@/lib/content";
import { teaching } from "@/lib/site";

/** Short leadership signal: founding a teaching practice and reviewing 20+ final-year projects. */
export function Teaching() {
  const t = useTranslations("teaching");
  const locale = useLocale();
  return (
    <Section id="teaching" labelledBy="teaching-title">
      <SectionHeading id="teaching-title" kicker={t("kicker")} title={t("title")} description={t("description")} />
      <ul className="grid gap-5 md:grid-cols-2">
        {teaching.map((item) => (
          <li key={item.key} className="card p-5 md:p-6">
            <p className="font-mono text-xs text-muted">{formatRange(item.startISO, item.endISO, locale, t("present"))}</p>
            <h3 className="mt-2 font-semibold">{t(`items.${item.key}.role`)}</h3>
            <p className="text-sm text-muted">
              <bdi>{item.org}</bdi>
            </p>
            <p className="mt-3 text-[0.9375rem] text-fg-2">{t(`items.${item.key}.detail`)}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
