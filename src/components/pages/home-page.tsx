import { About } from "@/components/sections/about";
import { Closing } from "@/components/sections/closing";
import { Contact } from "@/components/sections/contact";
import { Credibility } from "@/components/sections/credibility";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { ProofStrip } from "@/components/sections/proof-strip";
import { SelectedWork } from "@/components/sections/selected-work";
import { Skills } from "@/components/sections/skills";
import { Teaching } from "@/components/sections/teaching";
import { HomeJsonLd } from "@/components/seo/json-ld";

/** Recruiter-first scan order: who and proof, then work, history, skills, credentials, people, contact. */
export function HomePage() {
  return (
    <>
      <HomeJsonLd />
      <Hero />
      <ProofStrip />
      <SelectedWork />
      <Experience />
      <Skills />
      <Credibility />
      <Teaching />
      <About />
      <Contact />
      <Closing />
    </>
  );
}
