// Renders the Arabic Open Graph cards to public/images/og/ar/ with a local Chrome.
// next/og cannot shape Arabic or lay out RTL text, so these are committed PNGs instead of generated routes.
// Re-run after changing Arabic titles or subtitles: npm run og:ar
// Needs Node 22.18+ (imports site.ts directly), Chrome (or CHROME_PATH) and network access for the font.
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import sharp from "sharp";
import { projects, site } from "../src/lib/site.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const ar = JSON.parse(readFileSync(join(root, "messages/ar.json"), "utf8"));
const outDir = join(root, "public/images/og/ar");
const portrait = `data:image/png;base64,${readFileSync(join(root, "public/images/og-portrait.png")).toString("base64")}`;

const chrome = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].find((p) => p && existsSync(p));
if (!chrome) throw new Error("Chrome not found. Set CHROME_PATH.");

const escape = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

// Same card as src/components/seo/og.tsx, mirrored.
const card = ({ eyebrow, title, accent, subtitle, chips = [] }) => `<!doctype html>
<html lang="ar" dir="rtl"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;600&display=block" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; }
  html, body { background: #0d0f12; }
  body { width: 1200px; height: 630px; overflow: hidden; font-family: "IBM Plex Sans Arabic", sans-serif; color: #eceef1; }
  .card { width: 1200px; height: 630px; display: flex; gap: 40px; padding: 64px; background: #0d0f12; }
  .text { flex: 1; min-width: 0; display: flex; flex-direction: column; justify-content: space-between; }
  .eyebrow { font-size: 24px; color: #959ca7; display: flex; align-items: center; gap: 12px; } .eyebrow i { width: 10px; height: 10px; border-radius: 10px; background: #4ad48a; }
  h1 { font-size: ${(title + accent).length > 30 ? 50 : (title + accent).length > 16 ? 56 : 72}px; font-weight: 600; line-height: 1.35; margin-top: 18px; }
  h1 span { color: #959ca7; }
  .sub { font-size: 27px; line-height: 1.55; color: #eceef1; margin-top: 20px; border-right: 3px solid #8fa8ff; padding-right: 18px; }
  .chips { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 22px; }
  .chip { font-size: 20px; border: 1px solid #343a43; border-radius: 6px; padding: 4px 12px; color: #959ca7; }
  .foot { font-size: 24px; color: #959ca7; }
  .foot b { color: #eceef1; font-weight: 600; }
  .photo { width: 340px; height: 425px; align-self: center; flex: none; border-radius: 18px; overflow: hidden; border: 1px solid #343a43; background: #131619; }
  .photo img { width: 100%; height: 100%; object-fit: cover; display: block; }
</style></head><body><div class="card">
  <div class="text">
    <div>
      <div class="eyebrow"><i></i>${escape(eyebrow)}</div>
      <h1>${escape(title)}${accent ? ` <span>${escape(accent)}</span>` : ""}</h1>
      <p class="sub">${escape(subtitle)}</p>
      ${chips.length ? `<div class="chips">${chips.map((c) => `<bdi class="chip">${escape(c)}</bdi>`).join("")}</div>` : ""}
    </div>
    <div class="foot"><b>${escape(ar.common.name)}</b> · <bdi>${new URL(site.url).host.replace(/^www\./, "")}</bdi></div>
  </div>
  <div class="photo"><img src="${portrait}" alt=""></div>
</div></body></html>`;

const cards = [
  ["home", { eyebrow: ar.common.status, title: ar.hero.headline, accent: "", subtitle: ar.hero.proof }],
  ...projects.map((p) => {
    const copy = ar.projects[p.slug];
    return [
      p.slug,
      {
        eyebrow: ar.caseStudy.ogEyebrow,
        title: copy.title,
        accent: copy.titleAccent,
        subtitle: copy.subtitle,
        chips: p.stack.flatMap((s) => s.items).slice(0, 5),
      },
    ];
  }),
];

mkdirSync(outDir, { recursive: true });
const work = mkdtempSync(join(tmpdir(), "og-ar-"));
try {
  for (const [name, props] of cards) {
    const html = join(work, `${name}.html`);
    const shot = join(work, `${name}.png`);
    writeFileSync(html, card(props));
    // The window is taller than the card because headless Chrome reserves part of it; sharp crops to the exact size.
    execFileSync(chrome, [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      "--force-device-scale-factor=1",
      "--window-size=1200,800",
      "--virtual-time-budget=8000",
      `--user-data-dir=${join(work, "profile")}`,
      `--screenshot=${shot}`,
      pathToFileURL(html).href,
    ], { stdio: "ignore" });
    await sharp(shot)
      .extract({ left: 0, top: 0, width: 1200, height: 630 })
      .png({ palette: true, quality: 90 })
      .toFile(join(outDir, `${name}.png`));
    console.log(`public/images/og/ar/${name}.png`);
  }
} finally {
  rmSync(work, { recursive: true, force: true, maxRetries: 3 });
}
