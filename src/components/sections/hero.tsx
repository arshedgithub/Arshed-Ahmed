import { ArrowRight, Download } from "lucide-react";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { Chip, StatusChip } from "@/components/ui/primitives";
import { SocialLinks } from "@/components/ui/social-links";
import { heroStack, site } from "@/lib/site";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="overflow-x-clip pt-2 pb-12 md:py-20 lg:py-28">
      <div className="container-page grid items-center md:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] md:gap-10 lg:gap-12">
        {/* Dark: transparent cutout over a soft glow. Light: the photo on a pale blue tile (full width on phones).
            Height is capped on phones (see hero-photo-size) so everything down to the social icons clears the tab bar. */}
        <div className="photo-tile hero-photo-size relative mx-auto md:order-last md:justify-self-end">
          <div aria-hidden="true" className="photo-glow absolute top-[-6%] left-1/2 hidden aspect-square w-[150%] -translate-x-1/2 dark:block" />
          <Image
            src="/images/hero-1x1.webp"
            alt="Arshed Ahmed, full-stack software engineer, in a sage suit jacket and white shirt"
            width={1200}
            height={1200}
            preload
            fetchPriority="high"
            sizes="(min-width: 1120px) 480px, (min-width: 768px) 42vw, min(calc(100vw - 32px), 40vh)"
            className="photo-cutout relative block size-full object-cover object-top"
          />
        </div>

        <div className="hero-reveal relative mt-4 flex flex-col items-start md:mt-0">
          <StatusChip>{site.status}</StatusChip>
          <h1 id="hero-title" className="mt-4 font-bold tracking-tight md:mt-6">
            <span className="block text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05]">
              {site.firstName} <span className="text-accent">{site.lastName}</span>
            </span>
            <span className="mt-2 block text-lg font-semibold tracking-normal text-fg/90 md:mt-3 md:text-2xl">
              {site.jobTitle}
            </span>
          </h1>
          <p className="mt-3 max-w-xl text-base text-muted max-[359px]:hidden md:mt-5 md:text-lg lg:text-[1.375rem] lg:leading-relaxed">
            {site.positioning}
          </p>
          <ul className="mt-5 hidden flex-wrap gap-2 md:flex" aria-label="Core stack">
            {heroStack.map((item) => (
              <li key={item}>
                <Chip>{item}</Chip>
              </li>
            ))}
          </ul>
          <div className="mt-5 grid w-full gap-3 min-[360px]:flex min-[360px]:w-auto min-[360px]:flex-wrap md:mt-8">
            <ButtonLink href="/#work">
              View work
              <ArrowRight size={16} aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href={site.cvPath} variant="secondary" download>
              <Download size={16} aria-hidden="true" />
              Download CV
            </ButtonLink>
          </div>
          <SocialLinks className="mt-4 md:mt-6" />
        </div>
      </div>
    </section>
  );
}
