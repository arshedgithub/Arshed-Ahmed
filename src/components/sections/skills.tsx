import { Reveal } from "@/components/motion/reveal";
import { Chip, Section, SectionHeading } from "@/components/ui/primitives";
import { skillGroups } from "@/lib/site";

export function Skills() {
  return (
    <Section id="skills" labelledBy="skills-title">
      <SectionHeading id="skills-title" eyebrow="Skills" title="Technologies I work with" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group, i) => (
          <Reveal key={group.title} delay={i * 0.06} className="h-full">
            <section aria-labelledby={`skills-${i}`} className="card h-full p-5">
              <h3 id={`skills-${i}`} className="font-semibold">
                {group.title}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item}>
                    <Chip>{item}</Chip>
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
