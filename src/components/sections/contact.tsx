import { CalendarCheck, Clock, Download, Mail, MapPin, Plane } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from "@/components/ui/brand-icons";
import { CopyButton } from "@/components/ui/copy-button";
import { Section, SectionHeading, TodoMark } from "@/components/ui/primitives";
import { catalog } from "@/i18n/messages";
import { cvFor } from "@/lib/cv";
import { contactEmail, site } from "@/lib/site";
import { SHOW_TODO, isTodo } from "@/lib/todo";
import { LazyContactForm } from "./lazy-contact-form";

/**
 * Form endpoint, resolved at build time:
 * - NEXT_PUBLIC_CONTACT_ENDPOINT (e.g. a Formspree URL) always wins.
 * - Otherwise server builds use the built-in /api/contact route (Resend).
 * - Static exports without an endpoint show an "email me directly" message on submit.
 */
function contactEndpoint() {
  if (process.env.NEXT_PUBLIC_CONTACT_ENDPOINT) return process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;
  return process.env.DEPLOY_TARGET === "static" ? null : "/api/contact";
}

/**
 * Recruiter-first: the four answers screeners need (notice, visa, location, reply time) before any form,
 * then every direct channel with one tap, and the form last for those who prefer it.
 */
export function Contact() {
  const t = useTranslations("contact");
  const common = useTranslations("common");
  const locale = useLocale();
  const { replyValue, replyNote } = catalog(locale).contact;
  const cv = cvFor(locale);

  // Placeholder facts (reply time until it is set) are left out of production builds entirely.
  const facts = (
    [
      { key: "notice", value: t("noticeValue"), Icon: CalendarCheck },
      { key: "visa", value: t("visaValue"), Icon: Plane },
      { key: "location", value: t("locationValue"), Icon: MapPin },
      { key: "reply", value: replyValue as string, Icon: Clock },
    ] as const
  ).filter((f) => SHOW_TODO || !isTodo(f.value));

  const channels = [
    { key: "email", value: contactEmail, href: `mailto:${contactEmail}`, Icon: Mail },
    { key: "whatsapp", value: site.phoneDisplay, href: site.whatsappUrl, Icon: WhatsAppIcon },
    { key: "linkedin", value: site.linkedinUrl.replace(/^https?:\/\/(www\.)?/, ""), href: site.linkedinUrl, Icon: LinkedInIcon },
    { key: "github", value: `github.com/${site.githubHandle}`, href: site.githubUrl, Icon: GitHubIcon },
  ] as const;

  return (
    <Section id="contact" labelledBy="contact-title">
      <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <SectionHeading id="contact-title" kicker={t("kicker")} title={t("title")} description={t("description")} className="mb-8" />

          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-line bg-line">
            {facts.map(({ key, value, Icon }) => (
              <div key={key} className="flex flex-col gap-1 bg-surface p-4 odd:last:col-span-2">
                <dt className="flex items-center gap-1.5 text-xs text-muted">
                  <Icon size={14} aria-hidden="true" />
                  {t(key)}
                </dt>
                <dd className="text-[0.9375rem] font-medium text-fg">
                  {isTodo(value) ? <TodoMark>{value}</TodoMark> : value}
                </dd>
              </div>
            ))}
          </dl>
          {replyNote && <p className="mt-3 text-sm text-muted">{replyNote}</p>}

          <ul className="mt-8 grid gap-1">
            {channels.map(({ key, value, href, Icon }) => (
              <li key={key} className="flex min-w-0 items-center gap-2">
                <a
                  href={href}
                  {...(href.startsWith("http")
                    ? { target: "_blank", rel: key === "whatsapp" ? "noopener noreferrer" : "noopener noreferrer me" }
                    : {})}
                  className="group flex min-h-14 min-w-0 flex-1 items-center gap-4 rounded-control px-2 py-2 transition-colors hover:bg-surface"
                >
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-control border border-line text-muted group-hover:text-fg">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-muted">{common(`channels.${key}`)}</span>
                    <span className="block font-medium wrap-anywhere text-fg">
                      <bdi dir="ltr">{value}</bdi>
                    </span>
                  </span>
                </a>
                {key === "email" && <CopyButton value={contactEmail} label={t("copyEmail")} />}
              </li>
            ))}
            <li>
              <a
                href={cv.href}
                hrefLang={cv.lang}
                download
                className="group flex min-h-14 items-center gap-4 rounded-control px-2 py-2 transition-colors hover:bg-surface"
              >
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-control border border-line text-muted group-hover:text-fg">
                  <Download size={18} aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-xs text-muted">{common("channels.cv")}</span>
                  <span className="block font-medium text-fg">
                    {common("downloadCv")} · <span className="text-muted">{cv.lang === locale && locale !== "en" ? "PDF" : t("cvValue")}</span>
                  </span>
                </span>
              </a>
            </li>
          </ul>
          {isTodo(site.domainEmail) && <TodoMark className="mt-2">TODO_DOMAIN_EMAIL (e.g. hello@arshedahmed.com)</TodoMark>}
        </div>

        <div className="lg:pt-2">
          <LazyContactForm endpoint={contactEndpoint()} email={contactEmail} />
        </div>
      </div>
    </Section>
  );
}
