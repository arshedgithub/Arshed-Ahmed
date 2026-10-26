import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Project } from "./site";

// Runs at build time (every page is static), so a screenshot dropped into
// /public/images/projects/<slug>/ shows up on the next build with no code change.
function publicSrc(slug: string, file: string) {
  const exists = existsSync(join(process.cwd(), "public/images/projects", slug, file));
  return exists ? `/images/projects/${slug}/${file}` : null;
}

export function projectCover(project: Project) {
  const src = publicSrc(project.slug, project.cover.file);
  return src ? { src, alt: project.cover.alt } : null;
}

export function projectScreenshots(project: Project) {
  return project.screenshots.flatMap((s) => {
    const src = publicSrc(project.slug, s.file);
    return src ? [{ ...s, src }] : [];
  });
}
