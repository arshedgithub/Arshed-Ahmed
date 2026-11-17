import { useTranslations } from "next-intl";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { skillTiers } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Three tiers by depth of use (Core / Working / Familiar). No bars or percentages: they claim false precision. */
export function Skills() {
  const t = useTranslations("skills");
  return (
    <Section id="skills" labelledBy="skills-title">
      <SectionHeading id="skills-title" kicker={t("kicker")} title={t("title")} description={t("description")} />
      <div className="grid">
        {skillTiers.map((tier, i) => (
          <section
            key={tier.key}
            aria-labelledby={`skills-${tier.key}`}
            className="grid gap-x-10 gap-y-3 border-t border-line py-6 first:border-t-0 first:pt-0 md:grid-cols-[11rem_minmax(0,1fr)]"
          >
            <div>
              <h3 id={`skills-${tier.key}`} className="font-semibold">
                {t(`tiers.${tier.key}.title`)}
              </h3>
              <p className="mt-0.5 text-sm text-muted">{t(`tiers.${tier.key}.note`)}</p>
            </div>
            <ul className="flex flex-wrap content-start items-start gap-2">
              {tier.items.map((item) => (
                <li
                  key={typeof item === "string" ? item : item.key}
                  className={cn(
                    "rounded-chip border px-2.5 py-1 text-sm leading-5",
                    // Visual weight follows depth: core is strongest, familiar is quietest.
                    i === 0 && "border-line-strong bg-surface font-medium text-fg",
                    i === 1 && "border-line text-fg-2",
                    i === 2 && "border-dashed border-line text-muted",
                  )}
                >
                  <bdi>{typeof item === "string" ? item : t(`items.${item.key}`)}</bdi>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </Section>
  );
}
