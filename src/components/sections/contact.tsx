import { Clock, Mail, MapPin, Plane } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/reveal";
import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from "@/components/ui/brand-icons";
import { CopyButton } from "@/components/ui/copy-button";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { catalog } from "@/i18n/messages";
import { site } from "@/lib/site";
import { LazyContactForm } from "./lazy-contact-form";

const channels = [
  { key: "email", value: site.email, href: `mailto:${site.email}`, Icon: Mail },
  { key: "whatsapp", value: site.phoneDisplay, href: site.whatsappUrl, Icon: WhatsAppIcon },
  { key: "linkedin", value: site.linkedinUrl.replace(/^https?:\/\/(www\.)?/, ""), href: site.linkedinUrl, Icon: LinkedInIcon },
  { key: "github", value: `github.com/${site.githubHandle}`, href: site.githubUrl, Icon: GitHubIcon },
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
  const t = useTranslations("contact");
  const common = useTranslations("common");
  // Read directly: these two are optional and empty strings mean "render nothing".
  const { visaValue, replyNote } = catalog(useLocale()).contact;
  return (
    <Section id="contact" labelledBy="contact-title">
      <div className="grid grid-cols-[minmax(0,1fr)] gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-12">
        <Reveal>
          <SectionHeading
            id="contact-title"
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
          />
          <ul className="mb-6 grid gap-2 text-sm">
            <li className="flex items-center gap-2">
              <Clock size={16} className="shrink-0 text-accent" aria-hidden="true" />
              <span>
                <span className="font-medium text-fg">{t("noticeLabel")}</span> <span className="text-muted">{t("noticeValue")}</span>
              </span>
            </li>
            {visaValue && (
              <li className="flex items-center gap-2">
                <Plane size={16} className="shrink-0 text-accent" aria-hidden="true" />
                <span>
                  <span className="font-medium text-fg">{t("visaLabel")}</span> <span className="text-muted">{visaValue}</span>
                </span>
              </li>
            )}
            <li className="flex items-center gap-2">
              <MapPin size={16} className="shrink-0 text-accent" aria-hidden="true" />
              <span className="text-muted">{common("locationLine")}</span>
            </li>
          </ul>
          <ul className="grid gap-2">
            {channels.map(({ key, value, href, Icon }) => (
              <li key={key} className="flex min-w-0 items-center gap-2">
                <a
                  href={href}
                  {...(href.startsWith("http")
                    ? { target: "_blank", rel: key === "whatsapp" ? "noopener noreferrer" : "noopener noreferrer me" }
                    : {})}
                  className="group flex min-h-14 min-w-0 flex-1 items-center gap-4 rounded-xl border border-transparent px-2 py-2 transition-colors hover:border-line hover:bg-surface"
                >
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-line text-accent">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm text-muted">{common(`channels.${key}`)}</span>
                    <span className="block truncate font-medium group-hover:text-accent">{value}</span>
                  </span>
                </a>
                {key === "email" && <CopyButton value={site.email} label={t("copyEmail")} />}
              </li>
            ))}
          </ul>
          {replyNote && <p className="mt-4 text-sm text-muted">{replyNote}</p>}
        </Reveal>
        <Reveal delay={0.08}>
          <LazyContactForm endpoint={contactEndpoint()} email={site.email} />
        </Reveal>
      </div>
    </Section>
  );
}
