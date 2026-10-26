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
npm run images:placeholders  # create any missing TODO-*.webp screenshot placeholders
```

## Deployment

The target is chosen at build time with `DEPLOY_TARGET` (see `next.config.ts`).

### Vercel (default)

1. Import the repo in Vercel. No build settings needed (`next build`).
2. Environment variables for the contact form (Resend):
   - `RESEND_API_KEY`: Resend API key (server-only)
   - `CONTACT_FROM_EMAIL`: a sender on a domain verified in Resend, e.g. `Portfolio <contact@arshedahmed.com>`
   - `CONTACT_TO_EMAIL`: optional, defaults to the email in `src/lib/site.ts`
3. Image optimisation (AVIF/WebP) is on. The form posts to the built-in `/api/contact` route.

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
| SEO (metadata, JSON-LD, OG images, sitemap, robots) | `src/app/layout.tsx`, `src/components/seo/`, `src/app/**/opengraph-image.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts` |

### Adding a case study

1. Add an entry to `projects` in `src/lib/site.ts` (slug, stack, links, screenshots, architecture rows and edges).
2. Create `src/content/projects/<slug>.mdx`. Use `<Stack />`, `<Architecture />` and `<ProjectLinks />`
   where those sections belong; the page, sitemap, OG image and JSON-LD pick it up automatically.

### Photo

`public/images/me-cutout.png` is the transparent master (background removed with an ISNet model, then the
leftover haze beside the jacket was cleaned up; face, hair and beard untouched). To use a different photo, replace it
with another transparent PNG and run `npm run images:photo`, which writes `hero-4x5.webp` (1200x1500),
`about-1x1.webp` (800x800), `og-portrait.png` and the inlined `src/components/seo/og-portrait.ts`.

### Theme

Dark is the default. `THEME_DEFAULT` in `src/lib/site.ts` is `"system"`: a first-time visitor whose OS
prefers light sees light. Set it to `"dark"` to always open dark. A visitor's toggle choice is saved either way,
and an inline script applies it before first paint (no flash).

## TODO (needs your input)

- [ ] Confirm `LINKEDIN_URL` and `ACADEMY_NAME` in `src/lib/site.ts`.
- [ ] Replace the screenshot placeholders in `public/images/projects/**/TODO-*.webp` with real screenshots
      (1280x800 for browser frames, 390x845 for phone frames), then update the paths in `site.ts`.
- [ ] Review every `{/* TODO: confirm */}` in `src/content/projects/*.mdx` (run `grep -rn "TODO" src`).
- [ ] Add live/GitHub links for the three projects that have none (`links: []` in `site.ts`).
- [ ] Elzian Agro second bullet in `site.ts` is a restatement of the CV line. Confirm or replace it.
- [ ] Contact form: set the Resend env vars (Vercel) or `NEXT_PUBLIC_CONTACT_ENDPOINT` (static).
- [ ] Re-run Lighthouse on the deployed site (see notes below).

## Performance notes

Measured locally with Lighthouse 12 (mobile, simulated throttling) against `next start`:
Accessibility, Best Practices and SEO 100 on the home and case-study pages, CLS 0. Performance was
measured on a heavily loaded machine (full disk, slow CPU), which inflates blocking time. Re-measure on the
deployed URL with PageSpeed Insights for real numbers.
