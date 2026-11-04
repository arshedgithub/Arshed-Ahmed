import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/reveal";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { skillGroups } from "@/lib/site";

// Layout follows the draft (draft/draft-design.png): one bordered card per group, chips stacked one per line.
export function Skills() {
  const t = useTranslations("skills");
  return (
    <Section id="skills" labelledBy="skills-title">
      <SectionHeading id="skills-title" eyebrow={t("eyebrow")} title={t("title")} />
      <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
        {skillGroups.map((group, i) => (
          <Reveal key={group.key} delay={i * 0.06} className="h-full">
            <section aria-labelledby={`skills-${i}`} className="card h-full p-4 md:p-5">
              <h3 id={`skills-${i}`} className="text-sm font-semibold md:text-base">
                {t(`groups.${group.key}`)}
              </h3>
              <ul className="mt-3 flex flex-col items-start gap-2 md:mt-4">
                {group.items.map((item) => (
                  <li
                    key={typeof item === "string" ? item : item.key}
                    className="max-w-full rounded-md border border-line-strong bg-canvas/60 px-2.5 py-1 text-[13px] leading-5 text-fg/90 md:text-sm"
                  >
                    {typeof item === "string" ? item : t(`items.${item.key}`)}
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
