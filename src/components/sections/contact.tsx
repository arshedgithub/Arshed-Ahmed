import { Mail } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from "@/components/ui/brand-icons";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { site } from "@/lib/site";
import { LazyContactForm } from "./lazy-contact-form";

const channels = [
  { label: "Email", value: site.email, href: `mailto:${site.email}`, Icon: Mail },
  { label: "WhatsApp", value: site.phoneDisplay, href: site.whatsappUrl, Icon: WhatsAppIcon },
  { label: "LinkedIn", value: site.linkedinUrl.replace(/^https?:\/\/(www\.)?/, ""), href: site.linkedinUrl, Icon: LinkedInIcon },
  { label: "GitHub", value: `github.com/${site.githubHandle}`, href: site.githubUrl, Icon: GitHubIcon },
] as const;

/**
 * Form endpoint, resolved at build time:
 * - NEXT_PUBLIC_CONTACT_ENDPOINT (e.g. a Formspree URL) always wins.
 * - Otherwise server builds use the built-in /api/contact route (Resend).
 * - Static exports without an endpoint show a "email me directly" fallback on submit.
 */
function contactEndpoint() {
  if (process.env.NEXT_PUBLIC_CONTACT_ENDPOINT) return process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;
  return process.env.DEPLOY_TARGET === "static" ? null : "/api/contact";
}

export function Contact() {
  return (
    <Section id="contact" labelledBy="contact-title">
      <div className="grid gap-8 md:grid-cols-2 md:gap-12">
        <Reveal>
          <SectionHeading
            id="contact-title"
            eyebrow="Contact"
            title="Get in touch"
            description="Hiring for a full-stack role, or have a product to build? Send a message or reach me directly."
          />
          <ul className="grid gap-2">
            {channels.map(({ label, value, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex min-h-14 items-center gap-4 rounded-xl border border-transparent px-2 py-2 transition-colors hover:border-line hover:bg-surface"
                >
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-line text-accent">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm text-muted">{label}</span>
                    <span className="block truncate font-medium group-hover:text-accent">{value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.08}>
          <LazyContactForm endpoint={contactEndpoint()} email={site.email} />
        </Reveal>
      </div>
    </Section>
  );
}
