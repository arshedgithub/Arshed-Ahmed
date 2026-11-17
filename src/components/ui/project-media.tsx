import { useTranslations } from "next-intl";
import type { Project } from "@/lib/content";
import { projectCover } from "@/lib/project-images";
import { BrowserFrame } from "./device-frames";
import { ProjectSchematic } from "./project-schematic";

/**
 * The project's 16:10 lead image: the real cover.webp when it exists in /public/images/projects/<slug>/,
 * otherwise a schematic that is labelled as an illustration, so nobody mistakes it for the product UI.
 */
export function ProjectMedia({ project, sizes, preload }: { project: Project; sizes: string; preload?: boolean }) {
  const t = useTranslations("work");
  const cover = projectCover(project);
  if (cover) return <BrowserFrame src={cover.src} alt={cover.alt} sizes={sizes} preload={preload} />;
  return (
    <BrowserFrame caption={t("schematic")}>
      <ProjectSchematic kind={project.schematic} />
    </BrowserFrame>
  );
}
