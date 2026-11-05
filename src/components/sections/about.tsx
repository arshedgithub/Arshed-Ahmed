import { Award, GraduationCap, Languages } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { Chip, Section, SectionHeading } from "@/components/ui/primitives";
import { ACADEMY_NAME, certifications, education } from "@/lib/site";

export function About() {
  const t = useTranslations("about");
  return (
    <Section id="about" labelledBy="about-title">
      <Reveal>
        <div className="card grid gap-6 p-5 md:grid-cols-[220px_minmax(0,1fr)] md:gap-10 md:p-8">
          <div className="photo-tile relative mx-auto w-48 self-start md:w-full">
            <div aria-hidden="true" className="photo-glow absolute inset-[-15%] hidden dark:block" />
            <Image
              src="/images/about-1x1.webp"
              alt={t("portraitAlt")}
              width={800}
              height={800}
              sizes="(min-width: 768px) 220px, 192px"
              className="photo-cutout relative block h-auto w-full"
            />
          </div>
          <div>
            <SectionHeading id="about-title" eyebrow={t("eyebrow")} title={t("title")} />
            <div className="-mt-4 grid max-w-2xl gap-4 text-muted md:-mt-6">
              <p>{t("paragraph1")}</p>
              <p>{t("paragraph2", { academy: ACADEMY_NAME })}</p>
              <p>{t("paragraph3")}</p>
            </div>
            <ul className="mt-5 flex flex-wrap gap-2" aria-label={t("quickFactsAria")}>
              <li><Chip>{t("nationality")}</Chip></li>
              <li><Chip>{t("basedIn")}</Chip></li>
              <li><Chip>{t("availableNow")}</Chip></li>
            </ul>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.06}>
        <section aria-labelledby="credentials-title" className="card mt-4 grid gap-6 p-5 md:grid-cols-2 md:gap-10 md:p-8">
          <h3 id="credentials-title" className="font-semibold md:col-span-2">
            {t("credentialsTitle")}
          </h3>
          <div>
            <p className="flex items-center gap-2 text-sm font-medium text-fg">
              <GraduationCap size={18} className="text-accent" aria-hidden="true" />
              {t("education")}
            </p>
            <ul className="mt-3 grid gap-3 text-sm">
              {education.map((e) => (
                <li key={e.key}>
                  <span className="block text-fg">{t(`degrees.${e.key}.degree`)}</span>
                  <span className="block text-muted">
                    {t(`degrees.${e.key}.school`)} · {e.period}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="flex items-center gap-2 text-sm font-medium text-fg">
              <Award size={18} className="text-accent" aria-hidden="true" />
              {t("certifications")}
            </p>
            <ul className="mt-3 grid gap-3 text-sm">
              {certifications.map((c) => (
                <li key={c.key}>
                  <span className="block text-fg">{t(`certs.${c.key}`)}</span>
                  <span className="block text-muted">{c.year}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-line pt-5 text-sm md:col-span-2">
            <Languages size={18} className="text-accent" aria-hidden="true" />
            <span className="font-medium text-fg">{t("languagesLabel")}</span>
            <span className="text-muted">{t("languagesList")}</span>
          </p>
        </section>
      </Reveal>
    </Section>
  );
}
