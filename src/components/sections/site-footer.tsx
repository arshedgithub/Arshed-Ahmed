import { MapPin } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { SocialLinks } from "@/components/ui/social-links";
import { nav, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="container-page grid gap-8 py-10 md:grid-cols-[1fr_auto] md:items-start">
        <div>
          <Logo />
          <p className="mt-1 max-w-xs text-sm text-muted">{site.positioning}</p>
          <p className="mt-4 inline-flex items-center gap-2 text-sm text-fg">
            <MapPin size={16} className="text-accent" aria-hidden="true" />
            {site.openTo}
          </p>
        </div>
        <div className="grid gap-4 md:justify-items-end">
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-1 gap-y-0 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="inline-flex min-h-11 items-center px-2 text-muted hover:text-fg">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <SocialLinks />
        </div>
      </div>
      <div className="container-page border-t border-line py-5 text-xs text-muted">
        © {process.env.BUILD_YEAR} {site.name}. All rights reserved.
      </div>
    </footer>
  );
}
