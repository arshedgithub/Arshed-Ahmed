import { Reveal } from "@/components/motion/reveal";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { skillGroups } from "@/lib/site";

// Layout follows the draft (draft/draft-design.png): one bordered card per group, chips stacked one per line.
export function Skills() {
  return (
    <Section id="skills" labelledBy="skills-title">
      <SectionHeading id="skills-title" eyebrow="Skills" title="Technologies I work with" />
      <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
        {skillGroups.map((group, i) => (
          <Reveal key={group.title} delay={i * 0.06} className="h-full">
            <section aria-labelledby={`skills-${i}`} className="card h-full p-4 md:p-5">
              <h3 id={`skills-${i}`} className="text-sm font-semibold md:text-base">
                {group.title}
              </h3>
              <ul className="mt-3 flex flex-col items-start gap-2 md:mt-4">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="max-w-full rounded-md border border-line-strong bg-canvas/60 px-2.5 py-1 text-[13px] leading-5 text-fg/90 md:text-sm"
                  >
                    {item}
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
