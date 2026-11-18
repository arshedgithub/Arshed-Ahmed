# arshedahmed.com

Personal portfolio for Arshed Ahmed, full-stack software engineer. Built with Next.js 16 (App Router), TypeScript,
Tailwind CSS v4 (through PostCSS) and `next-intl`. Every page is static. English lives at `/` and Arabic (RTL) at `/ar`.

## Commands

```bash
npm install
npm run dev              # http://localhost:3000 (content placeholders are visible as amber markers)
npm run check            # i18n key check + eslint + route types + tsc
npm run i18n:check       # fail if messages/en.json and ar.json differ in keys, placeholders or TODOs
npm run og:ar            # re-render the Arabic share images after changing Arabic titles or the hero copy
npm run build            # Vercel / Node build (.next)
npm run start            # serve the Vercel build locally
npm run build:static     # fully static export to ./out (Cloudflare Pages, Netlify)
npm run preview:static   # serve ./out locally
npm run images:photo     # rebuild portrait crops from public/images/me-cutout.png
```

Next.js 16.4.3 stops every other `next build` to print a security advisory; running the build again continues.
Upgrade Next.js to clear it (see TODO_CONTENT.md).

## Content you still need to supply

See **[TODO_CONTENT.md](TODO_CONTENT.md)**: metrics, dates, screenshots, certificate links, reply time, domain email,
Arabic CV and the drafts to confirm.

Placeholders are values that start with `TODO_` (`src/lib/todo.ts`). Production builds leave them out entirely, so the
live site never shows a made-up value or a marker. `npm run dev`, or any build with `NEXT_PUBLIC_SHOW_TODO=1`, shows
them as dashed amber markers.

## Design system

Direction: editorial-technical. Warm ink/paper neutrals carry 60% of the page, surfaces and hairlines 30%, and one cobalt
accent 10% (primary action, links, focus). Green, amber and grey are reserved for project status. All tokens (colour
roles for both themes, radius, type scale, motion) are at the top of `src/app/globals.css`.

- Type: IBM Plex Sans + IBM Plex Mono (English) and IBM Plex Sans Arabic (Arabic), one superfamily, so both locales share
  x-height and weights. Weights 400/500/600 only; `font-synthesis: none`. Self-hosted and subset by `next/font`, swap.
- Elevation comes from hairline borders; shadows appear only on overlays (toast).
- Motion only for state changes, all under `prefers-reduced-motion`. Nothing is hidden waiting for a scroll trigger.

## Deployment

The target is chosen at build time with `DEPLOY_TARGET` (see `next.config.ts`).

### Vercel (default)

1. Import the repo in Vercel. No build settings needed (`next build`).
2. Environment variables for the contact form (Resend). Set them in Vercel → Settings → Environment Variables
   (and in `.env` for local runs; restart the server after editing it):
   - `RESEND_API_KEY`: Resend API key (server-only).
   - `CONTACT_FROM_EMAIL`: the **sender** shown on the notification email, not your inbox.
     `Portfolio <onboarding@resend.dev>` works without a domain, but Resend then only delivers to the email your
     Resend account is registered with. To use `contact@arshedahmed.com`, verify the domain in Resend first.
   - `CONTACT_TO_EMAIL`: optional **receiver**, defaults to the email in `src/lib/site.ts`.
   Without both `RESEND_API_KEY` and `CONTACT_FROM_EMAIL`, the route answers 503 and the form shows its error state.
3. The contact route has a honeypot and a per-IP limit of 5 messages per 10 minutes. The limit is in memory, so it is per
   server instance; for a hard limit add a Vercel Firewall rate-limit rule on `/api/contact` (or Cloudflare Turnstile).
4. Security headers are set in `next.config.ts` (`headers()`), because Vercel ignores `public/_headers`.

### Canonical host

The canonical host is **www**: `https://www.arshedahmed.com` (`SITE_URL` in `src/lib/site.ts`). Canonicals, hreflang,
OG/Twitter URLs, the sitemap, robots.txt, JSON-LD and internal links all use it. Vercel already redirects the apex to www,
so nothing needs changing there. On Netlify, `public/_redirects` 301s the apex to www; on Cloudflare Pages, add a Bulk
Redirect from `arshedahmed.com` to `www.arshedahmed.com` (301).

### Cloudflare Pages / Netlify (static export)

- Build command: `npm run build:static`
- Output directory: `out`
- Node 20+.
- Set `NEXT_PUBLIC_CONTACT_ENDPOINT` to your Formspree form URL (e.g. `https://formspree.io/f/xxxxxxx`).
  It is a public endpoint by design, not a secret. Without it, the form shows an "email me directly" message on submit.
- `public/_headers` sets caching and security headers (both hosts read it).
- In this mode `images.unoptimized` is on and the pre-compressed WebP files in `public/images` are served as-is.
  The `/api/contact` route (`route.server.ts`) is excluded from the build.

## Where things live

| What | Where |
| --- | --- |
| Shared facts (links, dates, statuses, stack, structure) | `src/lib/site.ts` |
| All wording, per locale, including case studies | `messages/en.json`, `messages/ar.json` |
| Placeholder rules | `src/lib/todo.ts` |
| Arabic copy awaiting native review | `messages/ar.REVIEW.md` |
| Design tokens (colours, type, radius, motion; light/dark) | `src/app/globals.css` |
| Home sections | `src/components/sections/` |
| Case-study template | `src/components/pages/project-page.tsx` |
| Locale routing | `src/i18n/`, `src/app/(en)` and `src/app/(ar)/ar` |
| Client-only code | `ui/theme-toggle`, `ui/mobile-menu`, `ui/language-switcher`, `ui/locale-hint`, `ui/copy-button`, `sections/*contact-form*` |
| SEO (metadata, JSON-LD, OG images, sitemap, robots) | `src/lib/metadata.ts`, `src/components/seo/`, `src/app/og-image.png/route.tsx` (home), `public/images/og/ar/` (Arabic), `src/app/projects/[slug]/og-image.png/route.tsx` (case studies), `src/app/sitemap.ts`, `src/app/robots.ts` |
| Icons and manifest | `src/app/icon.svg`, `src/app/favicon.ico`, `src/app/apple-icon.png`, `public/icons/`, `src/app/manifest.ts` |
| Sitemap `lastmod` | last git commit touching each page's sources (`src/lib/last-modified.ts`); omitted if git is unavailable |

Client components take their strings as props from server components. There is no `NextIntlClientProvider`, so the
browser never downloads the catalogs or the ICU formatter.

### Adding a case study

1. Add an entry to `projects` in `src/lib/site.ts`: slug, statuses, owner, timeline, stack, proof chips, links,
   screenshots, schematic and the architecture rows and edges.
2. Add its wording under `projects.<slug>` in both `messages/en.json` and `messages/ar.json`, including the `case`
   block (problem, team, context, architecture, decisions with trade-offs, challenges, improve).
3. The page, card, sitemap, OG image and JSON-LD pick it up automatically. Run `npm run og:ar` for the Arabic card.

### Project statuses

Only claims that are true. `live` (green) needs a product that real users use today; `dev` (amber) can carry a launch
month; `client` (grey) is company work; `prototype` (grey). SLMarket Flow is live; the slmarket.lk marketplace is in
development.

### Project screenshots

Cards and case studies show a labelled, data-free schematic until real images exist. Drop WebP files with the exact names
listed in TODO_CONTENT.md into `public/images/projects/<slug>/` and rebuild; they are picked up automatically
(`src/lib/project-images.ts`), and their alt text is already written in both catalogs. Browser shots at 1280x800 (16:10),
phone shots at 390x845.

### Photo

`public/images/me-cutout.png` is the transparent master. To use a different photo, replace it with another transparent
PNG and run `npm run images:photo`, which writes `hero-1x1.webp` (1200x1200), `about-1x1.webp` (800x800),
`og-portrait.png` and the inlined `src/components/seo/og-portrait.ts`.

### Languages

`/` is English and `/ar` is Arabic. There is no middleware, because the static export cannot run one: each locale is
its own route tree with its own root layout, which is also what makes `<html lang dir>` correct in prerendered HTML.

- The header switcher is visible at every width, names each language in its own script ("English" / "العربية"), keeps
  the current page and section, and saves the choice in `localStorage`.
- Nobody is ever redirected, by IP or by browser language. If a saved choice differs from the page someone opens (e.g.
  a shared link), a small dismissible toast offers the equivalent page (`src/components/ui/locale-hint.tsx`).
- Add the Arabic CV as `public/Arshed-Ahmed-CV-ar.pdf` and rebuild; `/ar` links to it automatically (`src/lib/cv.ts`).
  Until then every Arabic CV link is labelled as the English PDF.
- Arabic OG images are committed PNGs in `public/images/og/ar/`, because `next/og` cannot shape Arabic. After changing
  an Arabic title, subtitle or the hero copy, run `npm run og:ar` (needs Chrome and Node 22.18+).
- Known limitation: on server builds, unmatched `/ar/*` URLs return 404 with Next's error shell, and the Arabic 404 is
  rendered in the browser (the English 404 is fully server-rendered).

### Theme

Dark is the default: `THEME_DEFAULT` in `src/lib/site.ts` is `"dark"`, and the browser theme-color starts dark to match.
Set it to `"system"` to follow an OS light preference instead. A visitor's toggle choice is saved either way, and an
inline script applies it before first paint (no flash).

## Quality checks run for this redesign

Playwright screenshots (EN/AR, 375/768/1280/1440, light/dark), axe (WCAG 2.2 AA + best practices: 0 violations), a
keyboard walkthrough (skip link, focus rings, menu focus trap and Escape), internal link check, and Lighthouse. Desktop
Lighthouse is 100 in all four categories. Mobile Accessibility, Best Practices and SEO are 100; mobile Performance was
measured on a slow, memory-starved machine (Lighthouse benchmark index under 1000) and should be re-measured on the
deployed URL with PageSpeed Insights.
