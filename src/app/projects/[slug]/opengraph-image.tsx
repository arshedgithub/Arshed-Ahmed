import { ogSize, renderOg } from "@/components/seo/og";
import { getProject, projects } from "@/lib/site";

export const alt = "Case study by Arshed Ahmed";
export const size = ogSize;
export const contentType = "image/png";
export const dynamic = "force-static";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  return renderOg({
    eyebrow: "Case study",
    title: project?.title ?? "Project",
    accent: project?.titleAccent,
    subtitle: project?.subtitle ?? "",
    chips: project?.stack.flatMap((s) => s.items).slice(0, 6),
  });
}
