import { ogSize, renderOg } from "@/components/seo/og";
import { site } from "@/lib/site";

export const alt = `${site.name}, full-stack software engineer in the UAE`;
export const size = ogSize;
export const contentType = "image/png";
export const dynamic = "force-static";

export default function Image() {
  return renderOg({
    eyebrow: site.status,
    title: site.firstName,
    accent: site.lastName,
    subtitle: site.positioning,
  });
}
