import { execFileSync } from "node:child_process";

/**
 * Last commit date touching any of `paths`, read from git at build time (every page is static).
 * Returns undefined when git history is unavailable, so callers omit the date rather than guess one.
 */
export function lastModified(...paths: string[]): string | undefined {
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cI", "--", ...paths], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    return out || undefined;
  } catch {
    return undefined;
  }
}

/** Files whose content makes up the home page. */
export const homeSources = ["src/lib/site.ts", "src/app/page.tsx", "src/components/sections"];

/** Files whose content makes up a case study. */
export function projectSources(slug: string) {
  return [`src/content/projects/${slug}.mdx`, "src/lib/site.ts", "src/app/projects/[slug]/page.tsx"];
}
