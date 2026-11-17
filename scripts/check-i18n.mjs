// Fails when messages/ar.json and messages/en.json drift apart. Run with: npm run i18n:check
import { readFileSync } from "node:fs";

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

// Placeholders must be placeholders in both languages, so neither page invents a value the other lacks.
for (const key of Object.keys(en)) {
  if (key in ar && /TODO_/.test(String(en[key])) !== /TODO_/.test(String(ar[key]))) {
    problems.push(`placeholder in one language only: ${key}`);
  }
}

if (problems.length > 0) {
  console.error(`i18n check failed:\n${problems.map((p) => `  - ${p}`).join("\n")}`);
  process.exit(1);
}
const todos = Object.entries(en).filter(([, v]) => /TODO_/.test(String(v))).map(([k]) => k);
console.log(`i18n check passed: ${Object.keys(en).length} keys match in en.json and ar.json.`);
if (todos.length) console.log(`Placeholders still to fill (see TODO_CONTENT.md): ${todos.join(", ")}`);
