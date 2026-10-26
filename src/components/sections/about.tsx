import { Award, GraduationCap, Languages } from "lucide-react";
import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { Chip, Section, SectionHeading } from "@/components/ui/primitives";
import { ACADEMY_NAME, certifications, education, languages, site } from "@/lib/site";

export function About() {
  return (
    <Section id="about" labelledBy="about-title">
      <Reveal>
        <div className="card grid gap-6 p-5 md:grid-cols-[220px_minmax(0,1fr)] md:gap-10 md:p-8">
          <div className="photo-tile relative mx-auto w-48 self-start md:w-full">
            <div aria-hidden="true" className="photo-glow absolute inset-[-15%] hidden dark:block" />
            <Image
              src="/images/about-1x1.webp"
              alt="Head-and-shoulders portrait of Arshed Ahmed"
              width={800}
              height={800}
              sizes="(min-width: 768px) 220px, 192px"
              className="photo-cutout relative block h-auto w-full"
            />
          </div>
          <div>
            <SectionHeading id="about-title" eyebrow="About" title="From idea to live system" />
            <div className="-mt-4 grid max-w-2xl gap-4 text-muted md:-mt-6">
              <p>
                I like owning a product from the first sketch to the system people use every day: shaping the data
                model, designing the API, building the interface, wiring payments and shipping it behind CI/CD.
              </p>
              <p>
                At Softsora I built SaaS platforms, Stripe billing and LLM-powered features. On my own I designed, built
                and launched SLMarket and SLMarket Flow. I also teach: I founded {ACADEMY_NAME} and have guided 20+
                final-year projects through code review.
              </p>
              <p>
                I use Claude Code, GitHub Copilot and Cursor for speed, and I own the architecture and review every
                change myself.
              </p>
            </div>
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Quick facts">
              <li><Chip>{site.nationality}</Chip></li>
              <li><Chip>Based in UAE</Chip></li>
              <li><Chip>Available now</Chip></li>
            </ul>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.06}>
        <section aria-labelledby="credentials-title" className="card mt-4 grid gap-6 p-5 md:grid-cols-2 md:gap-10 md:p-8">
          <h3 id="credentials-title" className="font-semibold md:col-span-2">
            Education and certifications
          </h3>
          <div>
            <p className="flex items-center gap-2 text-sm font-medium text-fg">
              <GraduationCap size={18} className="text-accent" aria-hidden="true" />
              Education
            </p>
            <ul className="mt-3 grid gap-3 text-sm">
              {education.map((e) => (
                <li key={e.degree}>
                  <span className="block text-fg">{e.degree}</span>
                  <span className="block text-muted">
                    {e.school} · {e.period}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="flex items-center gap-2 text-sm font-medium text-fg">
              <Award size={18} className="text-accent" aria-hidden="true" />
              Certifications
            </p>
            <ul className="mt-3 grid gap-3 text-sm">
              {certifications.map((c) => (
                <li key={c.name}>
                  <span className="block text-fg">{"issuer" in c ? `${c.issuer} ${c.name}` : c.name}</span>
                  <span className="block text-muted">{c.year}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-line pt-5 text-sm md:col-span-2">
            <Languages size={18} className="text-accent" aria-hidden="true" />
            <span className="font-medium text-fg">Languages:</span>
            <span className="text-muted">{languages.map((l) => `${l.name} (${l.level.toLowerCase()})`).join(", ")}</span>
          </p>
        </section>
      </Reveal>
    </Section>
  );
}
