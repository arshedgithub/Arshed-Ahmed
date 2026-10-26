import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { BrowserFrame } from "@/components/ui/device-frames";
import { Chip, Section, SectionHeading } from "@/components/ui/primitives";
import { projects } from "@/lib/site";

export function SelectedWork() {
  return (
    <Section id="work" labelledBy="work-title">
      <SectionHeading
        id="work-title"
        eyebrow="Selected work"
        title="Products I have built and shipped"
        description="Featured projects across marketplaces, payments and AI."
      />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {projects.map((p, i) => (
          <li key={p.slug}>
            <Reveal delay={i * 0.06} className="h-full">
              <article className="card group relative flex h-full flex-col overflow-hidden p-3 transition-[transform,border-color] duration-200 hover:-translate-y-1 hover:border-accent/60 active:scale-[0.99] motion-reduce:hover:translate-y-0">
                <BrowserFrame
                  src={p.cover}
                  alt=""
                  sizes="(min-width: 1024px) 250px, (min-width: 640px) 45vw, 90vw"
                />
                <div className="flex flex-1 flex-col px-1 pt-4 pb-1">
                  <h3 className="font-semibold">
                    <Link
                      href={`/projects/${p.slug}`}
                      className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-accent"
                    >
                      {p.title} {p.titleAccent}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-muted">{p.subtitle}</p>
                  <div className="mt-3">
                    <Chip>{p.tag}</Chip>
                  </div>
                  <p className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-accent" aria-hidden="true">
                    Read case study
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                  </p>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
