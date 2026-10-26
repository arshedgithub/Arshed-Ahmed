import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { Chip, Section, SectionHeading } from "@/components/ui/primitives";
import { ACADEMY_NAME, education, site } from "@/lib/site";

export function About() {
  return (
    <Section id="about" labelledBy="about-title">
      <Reveal>
        <div className="card grid gap-6 p-5 md:grid-cols-[220px_minmax(0,1fr)] md:gap-10 md:p-8">
          <div className="photo-frame mx-auto aspect-square w-48 md:w-full">
            <Image
              src="/images/about-1x1.webp"
              alt="Head-and-shoulders portrait of Arshed Ahmed"
              fill
              sizes="(min-width: 768px) 220px, 192px"
              className="object-cover"
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
            <ul className="mt-5 grid gap-1 text-sm">
              {education.map((e) => (
                <li key={e.degree}>
                  <span className="text-fg">{e.degree}</span>
                  <span className="text-muted"> · {e.school} · {e.period}</span>
                </li>
              ))}
            </ul>
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Quick facts">
              <li><Chip>{site.nationality}</Chip></li>
              <li><Chip>Based in UAE</Chip></li>
              <li><Chip>Available now</Chip></li>
            </ul>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
