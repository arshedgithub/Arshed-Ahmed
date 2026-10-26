# arshedahmed.com

Personal portfolio for Arshed Ahmed, full-stack software engineer. Built with Next.js 16 (App Router),
TypeScript, Tailwind CSS v4, MDX case studies and `motion` for animation. Every page is static.

## Commands

```bash
npm install
npm run dev              # http://localhost:3000
npm run check            # eslint + route types + tsc
npm run build            # Vercel / Node build (.next)
npm run start            # serve the Vercel build locally
npm run build:static     # fully static export to ./out (Cloudflare Pages, Netlify)
npm run preview:static   # serve ./out locally
npm run images:photo     # rebuild portrait crops from public/images/me-cutout.png
```

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
   Each form submission becomes one email to you, with the visitor's address as Reply-To. Without both
   `RESEND_API_KEY` and `CONTACT_FROM_EMAIL`, the route answers 503 and the form shows its error state.
3. Image optimisation (AVIF/WebP) is on, limited to widths up to 1200px (`images.deviceSizes` in `next.config.ts`).

### Canonical host (do this when you deploy)

The site's canonical host is the apex, `https://arshedahmed.com` (`SITE_URL` in `src/lib/site.ts`). Canonicals,
OG/Twitter URLs, the sitemap, robots.txt and JSON-LD all use it. Vercel currently redirects the apex **to** www,
so flip it:

1. Vercel → Project → Settings → Domains.
2. Edit `arshedahmed.com`: remove its redirect so it serves the project.
3. Edit `www.arshedahmed.com`: set "Redirect to" `arshedahmed.com`, status **301 Moved Permanently**.
4. Check: `curl -I https://www.arshedahmed.com/` returns `301` with `location: https://arshedahmed.com/`.

This lives in the domain settings, not in code: a redirect in `next.config.ts` or `vercel.json` would loop
against the current apex → www setting. For Netlify, `public/_redirects` already 301s www to the apex. On
Cloudflare Pages, add a Bulk Redirect from `www.arshedahmed.com` to `arshedahmed.com` (301).

### Cloudflare Pages / Netlify (static export)

- Build command: `npm run build:static`
- Output directory: `out`
- Node 20+.
- Set `NEXT_PUBLIC_CONTACT_ENDPOINT` to your Formspree form URL (e.g. `https://formspree.io/f/xxxxxxx`).
  It is a public endpoint by design, not a secret. Without it, the form shows an "email me directly" message on submit.
- `public/_headers` sets the OG image content type, caching and security headers (both hosts read it).
- In this mode `images.unoptimized` is on and the pre-compressed WebP files in `public/images` are served as-is.
  The `/api/contact` route (`route.server.ts`) is excluded from the build.

## Where things live

| What | Where |
| --- | --- |
| All content (bio, links, skills, experience, projects, diagrams) | `src/lib/site.ts` |
| Case-study text | `src/content/projects/<slug>.mdx` |
| Design tokens (colours, light/dark) | `src/app/globals.css` |
| Home sections | `src/components/sections/` |
| Client-only code | `src/components/motion/*`, `ui/theme-toggle`, `ui/mobile-menu`, `ui/bottom-nav`, `sections/*contact-form*` |
| SEO (metadata, JSON-LD, OG images, sitemap, robots) | `src/app/layout.tsx`, `src/components/seo/`, `src/app/opengraph-image.tsx` (home), `src/app/projects/[slug]/og-image.png/route.tsx` (case studies), `src/app/sitemap.ts`, `src/app/robots.ts` |
| Icons and manifest | `src/app/icon.svg`, `src/app/favicon.ico`, `src/app/apple-icon.png`, `public/icons/`, `src/app/manifest.ts` |
| Page titles and descriptions | `site.description` (home) and `seoTitle` / `seoDescription` per project in `src/lib/site.ts` |
| Sitemap `lastmod` | last git commit touching each page's sources (`src/lib/last-modified.ts`); omitted if git is unavailable |

### Adding a case study

1. Add an entry to `projects` in `src/lib/site.ts` (slug, stack, links, screenshots, architecture rows and edges).
2. Create `src/content/projects/<slug>.mdx`. Use `<Stack />`, `<Architecture />` and `<ProjectLinks />`
   where those sections belong; the page, sitemap, OG image and JSON-LD pick it up automatically.

### Project screenshots

Projects render a designed fallback card (name, outcome, stack chips) until real images exist. Drop WebP files
with these exact names into `public/images/projects/<slug>/` and rebuild; they are picked up automatically
(`src/lib/project-images.ts`), and their alt text is already written in `site.ts`.
Browser shots at 1280x800 (16:10), phone shots at 390x845.

| Folder | Files |
| --- | --- |
| `slmarket/` | `cover.webp`, `marketplace-home.webp`, `flow-pos.webp`, `marketplace-mobile.webp` (phone) |
| `ai-business-support-saas/` | `cover.webp`, `payments-dashboard.webp`, `chatbot.webp` |
| `ai-cv-builder/` | `cover.webp`, `resume-editor.webp`, `mock-interview.webp` (phone) |
| `whatsapp-ai-order-bot/` | `cover.webp`, `chat-1.webp` (phone), `chat-2.webp` (phone) |

`cover.webp` is the home-page card image; the first browser screenshot leads the case-study page.

### Photo

`public/images/me-cutout.png` is the transparent master (background removed with an ISNet model, then the
leftover haze beside the jacket was cleaned up; face, hair and beard untouched). To use a different photo, replace it
with another transparent PNG and run `npm run images:photo`, which writes `hero-1x1.webp` (1200x1200),
`about-1x1.webp` (800x800), `og-portrait.png` and the inlined `src/components/seo/og-portrait.ts`.

### Theme

Dark is the default: `THEME_DEFAULT` in `src/lib/site.ts` is `"dark"`, so first-time visitors always see dark.
Set it to `"system"` to follow an OS light preference instead. A visitor's toggle choice is saved either way, and
an inline script applies it before first paint (no flash). In dark the portrait is a cutout over a soft glow; in
light it sits in a square pale-blue tile.

## TODO (needs your input)

- [ ] Flip the canonical host in Vercel's domain settings (see "Canonical host").
- [ ] Add real project screenshots (see "Project screenshots" for the exact filenames).
- [ ] Confirm `ACADEMY_NAME` and `SLMARKET_START` ("Jul 2026") in `src/lib/site.ts`.
- [ ] Fill in `VISA_STATUS` in `src/lib/site.ts`. It renders under "Notice period" only once it is set.
- [ ] Confirm the "Live" / "Solo-built" badges in `site.ts` (only SLMarket has them; add "Live" to others if
      they are publicly live).
- [ ] Optional: the light theme shows a faint grey fringe around the hair at 2x zoom (dark is clean). A re-cut
      with edge colour decontamination would remove it; replace `me-cutout.png` and run `npm run images:photo`.
- [ ] Review every `{/* TODO: confirm */}` in `src/content/projects/*.mdx` (run `grep -rn "TODO" src`).
- [ ] Add live/GitHub links for the three projects that have none (`links: []` in `site.ts`).
- [ ] Elzian Agro second bullet in `site.ts` is a restatement of the CV line. Confirm or replace it.
- [ ] Contact form: set `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` (Vercel) or `NEXT_PUBLIC_CONTACT_ENDPOINT` (static).
- [ ] Re-run Lighthouse on the deployed site (see notes below).

## Performance notes

Measured locally with Lighthouse 12 (mobile, simulated throttling) against `next start`:
Accessibility, Best Practices and SEO 100 on the home and case-study pages, CLS 0. Performance was
measured on a heavily loaded machine (full disk, slow CPU), which inflates blocking time. Re-measure on the
deployed URL with PageSpeed Insights for real numbers.
