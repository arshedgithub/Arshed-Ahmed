import { Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { ACADEMY_NAME } from "@/lib/site";

const facts = ["based", "visa", "notice", "nationality", "languages"] as const;

/** Short, human, specific. The AI-tools note and "Arabic (basic)" stay: honesty is a trust signal. */
export function About() {
  const t = useTranslations("about");
  return (
    <Section id="about" labelledBy="about-title">
      <div className="grid gap-10 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-16">
        <div className="mx-auto w-44 self-start overflow-hidden rounded-card border border-line bg-[var(--photo-tile)] md:mx-0 md:w-full">
          <Image
            src="/images/about-1x1.webp"
            alt={t("portraitAlt")}
            width={800}
            height={800}
            sizes="(min-width: 768px) 240px, 176px"
            className="photo-cutout block h-auto w-full"
          />
        </div>
        <div>
          <SectionHeading id="about-title" kicker={t("kicker")} title={t("title")} className="mb-6 md:mb-8" />
          <div className="grid max-w-[65ch] gap-4 text-fg-2 md:text-lg">
            <p>{t("paragraph1")}</p>
            <p>{t("paragraph2", { academy: ACADEMY_NAME })}</p>
          </div>
          <p className="mt-5 flex max-w-[65ch] items-start gap-2.5 rounded-control border border-line bg-surface p-3 text-sm text-fg-2">
            <Sparkles size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-muted" />
            {t("paragraph3")}
          </p>

          <dl className="mt-8 grid border-t border-line sm:grid-cols-2">
            {facts.map((key) => (
              <div key={key} className="flex flex-col gap-0.5 border-b border-line py-3 sm:odd:pe-4 sm:even:ps-4">
                <dt className="kicker">{t(`facts.${key}`)}</dt>
                <dd className="text-[0.9375rem] text-fg">{t(`facts.${key}Value`)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
