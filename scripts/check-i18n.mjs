// Fails when messages/ar.json and messages/en.json drift apart. Run with: npm run i18n:check
import { existsSync, readdirSync, readFileSync } from "node:fs";

const read = (locale) => JSON.parse(readFileSync(`messages/${locale}.json`, "utf8"));

/** Flattens to { "a.b.0": "text" }; arrays count as keys so a missing bullet is caught too. */
function flatten(value, prefix = "", out = {}) {
  if (value !== null && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) flatten(child, prefix ? `${prefix}.${key}` : key, out);
  } else {
    out[prefix] = value;
  }
  return out;
}

/** ICU placeholders and rich-text tags: {name}, <email>. Translations must use the same set. */
const tokens = (text) => [...new Set(text.match(/\{\w+\}|<\/?\w+>/g) ?? [])].sort().join(" ");

const en = flatten(read("en"));
const ar = flatten(read("ar"));
const problems = [];

for (const key of Object.keys(en)) {
  if (!(key in ar)) problems.push(`missing in ar.json: ${key}`);
}
for (const key of Object.keys(ar)) {
  if (!(key in en)) {
    problems.push(`missing in en.json: ${key}`);
    continue;
  }
  // Empty is allowed one way only: an optional line that exists in Arabic but not English.
  if (ar[key] === "" && en[key] !== "") problems.push(`empty in ar.json: ${key}`);
  if (tokens(ar[key]) !== tokens(en[key])) {
    problems.push(`placeholders differ at ${key}: en [${tokens(en[key])}] ar [${tokens(ar[key])}]`);
  }
  if (/[٠-٩۰-۹]/.test(ar[key])) problems.push(`Eastern Arabic digits at ${key} (use 0-9)`);
}

// Case studies are translated as whole files, so check them by file and by the components they place.
const dir = "src/content/projects";
const components = (file) => (readFileSync(file, "utf8").match(/<[A-Z]\w+ \/>/g) ?? []).join(" ");
for (const name of readdirSync(dir).filter((f) => f.endsWith(".mdx"))) {
  const translated = `${dir}/ar/${name}`;
  if (!existsSync(translated)) problems.push(`missing case study: ${translated}`);
  else if (components(translated) !== components(`${dir}/${name}`)) problems.push(`components differ: ${translated}`);
}

if (problems.length > 0) {
  console.error(`i18n check failed:\n${problems.map((p) => `  - ${p}`).join("\n")}`);
  process.exit(1);
}
console.log(`i18n check passed: ${Object.keys(en).length} keys match in en.json and ar.json.`);
