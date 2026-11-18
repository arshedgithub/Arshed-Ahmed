# Content you still need to supply

Everything below is a placeholder or a draft. Nothing here was invented and shown as fact: placeholders start with
`TODO_`, and production builds **leave them out** (no marker, no made-up value). To see every gap on the page while you
edit, run `npm run dev` (markers show by default) or build with `NEXT_PUBLIC_SHOW_TODO=1`.

`npm run i18n:check` also prints any placeholder still left in `messages/*.json`.

## 1. Metrics (one outcome line per project card)

Each project card shows one result with a number. Until you give one, the card shows the plain outcome sentence instead.
Edit `projects.<slug>.metric` in **both** `messages/en.json` and `messages/ar.json`.

| Project | Key | What would work |
| --- | --- | --- |
| SLMarket | `projects.slmarket.metric` | Shops using Flow, daily sales or transactions on Flow, uptime since launch |
| AI CV Builder | `projects.ai-cv-builder.metric` | Users, CVs generated, interviews run |
| WhatsApp AI Order Bot | `projects.whatsapp-ai-order-bot.metric` | Conversations handled, share answered without a human, reply time |

AI Business Support SaaS already uses a verified number (the 200+ transactions across 10+ products from your CV,
worded as "part of" that total).

## 2. Dates

| What | Where | Format |
| --- | --- | --- |
| Marketplace launch month (amber pill says "launching …") | `src/lib/site.ts`, slmarket `statuses[1].date` | `"2027-03"` (formatted per language) |
| AI Business Support SaaS timeline | `site.ts`, `timeline` | `startISO: "2025-04"`, `endISO: "2026-02"` |
| AI CV Builder timeline | `site.ts`, `timeline` | same; `endISO: null` if ongoing |
| WhatsApp bot timeline | `site.ts`, `timeline` | same |
| Confirm SLMarket start | `SLMARKET_START_ISO` in `site.ts` (now `2026-07`) | `YYYY-MM` |

## 3. Project facts to confirm

- **AI CV Builder status** (`site.ts`, `statuses[0].kind`): `"live"` only if it is publicly live, otherwise `"prototype"`.
  Until then the card has no status pill.
- **AI CV Builder ownership** (`owner`): `"self"` or `"company"` (and set `company`), plus `solo: true` if you built it
  alone. Until then the card says nothing about ownership.
- **Team size** (`projects.<slug>.case.team`, both languages) for AI Business Support SaaS, AI CV Builder and the
  WhatsApp bot. Write e.g. "Team of 4 engineers" / "فريق من 4 مهندسين".
- **Public links** (`links` in `site.ts`): live URL, demo video (`kind: "demo"`), staging demo (`"staging"`) or repo
  (`"github"`). Cards and case studies show a button for each one. Add the label under `projects.<slug>.links.<key>` in
  both catalogs. None of the three non-SLMarket projects has one today.
- **`SLMarket-web` is a public repo on your GitHub.** If it is the marketplace and you're happy to show it, add it as a
  `github` link on the SLMarket project.

## 4. Screenshots (biggest single upgrade)

Cards and case studies show a labelled schematic ("Illustration, not a screenshot") until real images exist. Drop WebP
files with these exact names into `public/images/projects/<slug>/` and rebuild; they are picked up automatically, and
their alt text is already written in both languages.

- Browser shots: **1280×800** (16:10), WebP, under ~150 KB each.
- Phone shots: **390×845**, WebP.
- `cover.webp` (1280×800) is the card image and the case-study lead image; it can simply be a copy of the first
  browser screenshot. Its alt text is that screenshot's alt text.

| Folder | Files |
| --- | --- |
| `slmarket/` | `cover.webp`, `flow-pos.webp`, `marketplace-home.webp`, `marketplace-mobile.webp` (phone) |
| `ai-business-support-saas/` | `cover.webp`, `payments-dashboard.webp`, `chatbot.webp` |
| `ai-cv-builder/` | `cover.webp`, `resume-editor.webp`, `mock-interview.webp` (phone) |
| `whatsapp-ai-order-bot/` | `cover.webp`, `chat-1.webp` (phone), `chat-2.webp` (phone) |

**Softsora projects** (AI Business Support SaaS, WhatsApp bot) are company work. Only add screenshots that are already
public or that Softsora has cleared, with client names, customer data and amounts removed or replaced. Otherwise keep
the schematic: the case study already says why.

## 5. Contact

| What | Where |
| --- | --- |
| Reply-time promise, e.g. "Within 24 hours" / "خلال 24 ساعة" | `contact.replyValue`, both catalogs |
| Domain email, e.g. `hello@arshedahmed.com` (replaces Gmail everywhere) | `site.domainEmail` in `site.ts` |
| Contact form delivery | Vercel env: `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` (see README) |

## 6. Credentials

| What | Where |
| --- | --- |
| Credly / issuer verification URL, Cisco Ethical Hacker | `certifications[0].verifyUrl` in `site.ts` |
| Verification URL, Palo Alto Networks Security Fundamentals | `certifications[1].verifyUrl` |
| Issuer and verification URL, Jenkins and Docker | `certifications[2].issuer` and `.verifyUrl` |
| 2-3 pinned repos for the GitHub card (public only) | `pinnedRepos` in `site.ts`, descriptions under `credibility.repos.<name>` |
| References or testimonials (optional, real and attributable, with permission) | `references` in `site.ts`, quotes under `credibility.referenceItems.<key>` |

Candidate repos (recently pushed): `SLMarket-web`, `Majlis_project_uoc`, `codemyte-academy-laravel-backend`,
`school-ICT-game`. Pick only ones you'd be happy for a hiring manager to open.

## 7. Arabic CV

Add `public/Arshed-Ahmed-CV-ar.pdf` and rebuild. `/ar` then links to it and drops the "(English)" labels automatically.
Until then every Arabic CV link says it is the English PDF.

## 8. Drafts to confirm (written from your CV, not invented, but the wording is mine)

- **Case-study reasoning**: the "hard decisions", "trade-off", "challenges" and "what I'd improve" items for all four
  projects (`projects.<slug>.case` in both catalogs). The facts come from your CV; the reasons are my reading of them.
  Rewrite anything that isn't how you actually think about it.
- **Skill tiers** (`skillTiers` in `site.ts`): Core / Working / Familiar is my judgement from the CV.
- **Experience context lines**: "Software company building SaaS and AI products" (Softsora), "Promoted to Software
  Engineer in March 2025" (inferred from the two Softsora titles), and the employment types (both Softsora roles marked
  full-time).
- **Elzian Agro second bullet** restates the CV's single bullet; confirm or replace.
- **Proof strip** "Building software since 2022" counts from your first internship (Jan 2022), and the label says so.
- **SLMarket title**: you asked for "Founder & Full-Stack Developer, SLMarket (pre-launch)". Flow is live, so
  "(pre-launch)" now applies to the marketplace only. Consider "SLMarket (marketplace pre-launch)" or dropping it. It's in
  `experience.items.slmarket.company`.

## 9. Arabic review

All Arabic copy was rewritten for this redesign, including the case studies (now in `messages/ar.json` under
`projects.<slug>.case`). `messages/ar.REVIEW.md` still lists the open wording questions. A native Gulf reader should go
through `ar.json` once before launch.

## 10. Decisions and settings outside the code

- **Canonical host is now www.** Vercel already 308s the apex to www, so nothing to change there. Check in Search
  Console that `https://www.arshedahmed.com/` is the indexed version after deploying.
- **Production branch**: the earlier audit found production is not built from `main`. Check which branch Vercel deploys
  before merging this one.
- **Next.js security advisory**: `next build` reports a known vulnerability in Next.js 16.4.3. Upgrade Next.js
  (`npx next upgrade`) in its own branch.
