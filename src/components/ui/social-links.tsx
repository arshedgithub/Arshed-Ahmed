import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { contactEmail, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from "./brand-icons";

export const socials = [
  { key: "email", href: `mailto:${contactEmail}`, Icon: Mail },
  { key: "whatsapp", href: site.whatsappUrl, Icon: WhatsAppIcon },
  { key: "linkedin", href: site.linkedinUrl, Icon: LinkedInIcon },
  { key: "github", href: site.githubUrl, Icon: GitHubIcon },
] as const;

/** Icon-only contact links: 44px targets, each with a localized accessible name and a tooltip. */
export function SocialLinks({ className, ariaLabel }: { className?: string; ariaLabel?: string }) {
  const t = useTranslations("common");
  return (
    <ul className={cn("flex items-center gap-1", className)} aria-label={ariaLabel}>
      {socials.map(({ key, href, Icon }) => {
        const external = href.startsWith("http");
        const label = t(`channels.${key}`);
        return (
          <li key={key}>
            <a
              href={href}
              aria-label={external ? t("externalLabel", { label }) : t("emailLabel", { label, email: contactEmail })}
              title={label}
              // rel="me" only on profiles that identify the same person (they are also in the Person sameAs).
              {...(external ? { target: "_blank", rel: key === "whatsapp" ? "noopener noreferrer" : "noopener noreferrer me" } : {})}
              className="inline-flex size-11 items-center justify-center rounded-control text-muted transition-colors hover:bg-surface hover:text-fg"
            >
              <Icon size={18} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
