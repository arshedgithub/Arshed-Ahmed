import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { ProofStrip } from "@/components/sections/proof-strip";
import { SelectedWork } from "@/components/sections/selected-work";
import { Skills } from "@/components/sections/skills";
import { Teaching } from "@/components/sections/teaching";
import { PersonJsonLd } from "@/components/seo/json-ld";

export default function HomePage() {
  return (
    <>
      <PersonJsonLd />
      <Hero />
      <ProofStrip />
      <SelectedWork />
      <Skills />
      <Experience />
      <Teaching />
      <About />
      <Contact />
    </>
  );
}
