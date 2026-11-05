import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from "./brand-icons";

export const socials = [
  { key: "whatsapp", href: site.whatsappUrl, Icon: WhatsAppIcon },
  { key: "email", href: `mailto:${site.email}`, Icon: Mail },
  { key: "linkedin", href: site.linkedinUrl, Icon: LinkedInIcon },
  { key: "github", href: site.githubUrl, Icon: GitHubIcon },
] as const;

export function SocialLinks({ className }: { className?: string }) {
  const t = useTranslations("common");
  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {socials.map(({ key, href, Icon }) => {
        const external = href.startsWith("http");
        const label = t(`channels.${key}`);
        return (
          <li key={key}>
            <a
              href={href}
              aria-label={external ? t("externalLabel", { label }) : t("emailLabel", { label, email: site.email })}
              title={label}
              // rel="me" only on profiles that identify the same person (they are also in the Person sameAs).
              {...(external ? { target: "_blank", rel: key === "whatsapp" ? "noopener noreferrer" : "noopener noreferrer me" } : {})}
              className="inline-flex size-11 items-center justify-center rounded-lg border border-line text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <Icon size={18} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
