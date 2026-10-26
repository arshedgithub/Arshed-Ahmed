import { renderOg } from "@/components/seo/og";
import { getProject, projects } from "@/lib/site";

// Served at /projects/<slug>/og-image.png and declared in the page's generateMetadata, so each case
// study gets its own alt text. (opengraph-image with generateImageMetadata does not prerender with
// dynamicParams = false in Next 16, and a static export needs every image prerendered.)
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return new Response("Not found", { status: 404 });
  return renderOg({
    eyebrow: "Case study",
    title: project.title,
    accent: project.titleAccent,
    subtitle: project.subtitle,
    chips: project.stack.flatMap((s) => s.items).slice(0, 6),
  });
}
