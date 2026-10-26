import { GraduationCap } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { teaching } from "@/lib/site";

export function Teaching() {
  return (
    <Section id="teaching" labelledBy="teaching-title" className="pt-0 md:pt-0">
      <SectionHeading id="teaching-title" eyebrow="Teaching" title="Teaching and mentoring" />
      <div className="grid gap-4 md:grid-cols-2">
        {teaching.map((t, i) => (
          <Reveal key={t.role} delay={i * 0.06} className="h-full">
            <article className="card flex h-full gap-4 p-5">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <GraduationCap size={20} aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-semibold">{t.role}</h3>
                <p className="text-sm text-fg/90">{t.org}</p>
                <p className="mt-0.5 font-mono text-xs text-muted">{t.period}</p>
                <p className="mt-3 text-sm text-muted">{t.detail}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
