import { Mail } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from "./brand-icons";

export const socials = [
  { label: "WhatsApp", href: site.whatsappUrl, Icon: WhatsAppIcon },
  { label: "Email", href: `mailto:${site.email}`, Icon: Mail },
  { label: "LinkedIn", href: site.linkedinUrl, Icon: LinkedInIcon },
  { label: "GitHub", href: site.githubUrl, Icon: GitHubIcon },
] as const;

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {socials.map(({ label, href, Icon }) => {
        const external = href.startsWith("http");
        return (
          <li key={label}>
            <a
              href={href}
              aria-label={`${label} (${label === "Email" ? site.email : "opens in a new tab"})`}
              title={label}
              {...(external ? { target: "_blank", rel: "noopener noreferrer me" } : {})}
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
