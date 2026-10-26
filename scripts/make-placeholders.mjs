// Generates neutral, text-free screenshot placeholders for every path listed in src/lib/site.ts
// whose filename starts with "TODO-". Existing files are never overwritten.
// Usage: node scripts/make-placeholders.mjs
import sharp from "sharp";
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const siteSrc = readFileSync(join(root, "src/lib/site.ts"), "utf8");

// Phone screenshots are declared with device: "phone" on the same line as their src.
const entries = [...siteSrc.matchAll(/"(\/images\/projects\/[^"]+\/TODO-[^"]+\.webp)"([^\n]*)/g)].map((m) => ({
  path: m[1],
  phone: m[2].includes('"phone"'),
}));

const browserSvg = (w, h) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <rect width="100%" height="100%" fill="#111827"/>
  <rect x="0" y="0" width="${w}" height="64" fill="#152033"/>
  <rect x="40" y="22" width="140" height="20" rx="6" fill="#2c3b52"/>
  <rect x="${w - 340}" y="24" width="64" height="16" rx="6" fill="#1f2a3a"/>
  <rect x="${w - 260}" y="24" width="64" height="16" rx="6" fill="#1f2a3a"/>
  <rect x="${w - 180}" y="20" width="140" height="24" rx="8" fill="#2563eb" opacity=".7"/>
  <rect x="40" y="110" width="${w * 0.42}" height="36" rx="8" fill="#2c3b52"/>
  <rect x="40" y="162" width="${w * 0.32}" height="18" rx="6" fill="#1f2a3a"/>
  <rect x="40" y="190" width="${w * 0.28}" height="18" rx="6" fill="#1f2a3a"/>
  ${[0, 1, 2, 3]
    .map((i) => {
      const cw = (w - 80 - 3 * 24) / 4;
      const x = 40 + i * (cw + 24);
      return `<rect x="${x}" y="250" width="${cw}" height="${h - 300}" rx="14" fill="#152033" stroke="#1f2a3a"/>
              <rect x="${x + 16}" y="266" width="${cw - 32}" height="${(h - 300) * 0.5}" rx="10" fill="#1f2a3a"/>
              <rect x="${x + 16}" y="${266 + (h - 300) * 0.5 + 18}" width="${cw * 0.6}" height="14" rx="5" fill="#2c3b52"/>
              <rect x="${x + 16}" y="${266 + (h - 300) * 0.5 + 42}" width="${cw * 0.4}" height="12" rx="5" fill="#1f2a3a"/>`;
    })
    .join("")}
</svg>`;

const phoneSvg = (w, h) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <rect width="100%" height="100%" fill="#111827"/>
  <rect x="0" y="0" width="${w}" height="96" fill="#152033"/>
  <rect x="24" y="44" width="120" height="20" rx="6" fill="#2c3b52"/>
  ${[0, 1, 2, 3, 4, 5]
    .map((i) => {
      const y = 130 + i * 112;
      const mine = i % 2 === 1;
      const bw = w * (mine ? 0.55 : 0.68);
      const x = mine ? w - 24 - bw : 24;
      return `<rect x="${x}" y="${y}" width="${bw}" height="84" rx="16" fill="${mine ? "#1d4ed8" : "#1f2a3a"}" opacity="${mine ? 0.6 : 1}"/>`;
    })
    .join("")}
  <rect x="16" y="${h - 76}" width="${w - 32}" height="52" rx="26" fill="#1f2a3a"/>
</svg>`;

let made = 0;
for (const { path, phone } of entries) {
  const file = join(root, "public", path);
  if (existsSync(file)) continue;
  mkdirSync(dirname(file), { recursive: true });
  const [w, h] = phone ? [390, 845] : [1280, 800];
  await sharp(Buffer.from(phone ? phoneSvg(w, h) : browserSvg(w, h)))
    .webp({ quality: 70 })
    .toFile(file);
  made++;
}
console.log(`Created ${made} placeholder(s); ${entries.length - made} already existed.`);
