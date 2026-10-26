import { ArrowRight, Download } from "lucide-react";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { StatusChip } from "@/components/ui/primitives";
import { SocialLinks } from "@/components/ui/social-links";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="pt-4 pb-8 md:pt-16 md:pb-12 lg:pt-20">
      <div className="container-page grid items-center gap-6 md:grid-cols-[minmax(0,1fr)_300px] md:gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16">
        {/* Shorter 6:5 crop on mobile keeps both CTAs above the fold on a 390x844 screen. */}
        <div className="photo-frame aspect-[6/5] w-full md:order-last md:aspect-[4/5]">
          <Image
            src="/images/hero-4x5.webp"
            alt="Arshed Ahmed, full-stack software engineer, in a sage suit jacket and white shirt"
            fill
            preload
            fetchPriority="high"
            sizes="(min-width: 1024px) 360px, (min-width: 768px) 300px, calc(100vw - 32px)"
            className="object-cover object-[50%_22%] md:object-bottom"
          />
        </div>

        <div className="hero-reveal flex flex-col items-start">
          <StatusChip>{site.status}</StatusChip>
          <h1 id="hero-title" className="mt-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            {site.firstName} <span className="text-accent">{site.lastName}</span>
          </h1>
          <p className="mt-3 max-w-xl text-base text-muted md:mt-4 md:text-lg">{site.positioning}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href="/#work">
              View work
              <ArrowRight size={16} aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href={site.cvPath} variant="secondary" download>
              <Download size={16} aria-hidden="true" />
              Download CV
            </ButtonLink>
          </div>
          <SocialLinks className="mt-6" />
        </div>
      </div>
    </section>
  );
}
