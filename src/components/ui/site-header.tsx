import Link from "next/link";
import { nav, site } from "@/lib/site";
import { buttonClasses } from "./button";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas">
      <div className="container-page relative flex h-14 items-center justify-between gap-4 md:h-16">
        <Logo variant="monogram-mobile" />

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center rounded-lg px-3 text-sm text-muted transition-colors hover:text-fg"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <a
            href={site.cvPath}
            download
            className={buttonClasses("secondary", "hidden min-h-9 px-3 text-xs md:inline-flex")}
          >
            CV
            <span className="sr-only"> (download PDF)</span>
          </a>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
