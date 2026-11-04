import { ogSize, renderOg } from "@/components/seo/og";
import { catalog } from "@/i18n/messages";
import { site } from "@/lib/site";

const { common, meta } = catalog("en");

export const alt = meta.ogImageAlt;
export const size = ogSize;
export const contentType = "image/png";
export const dynamic = "force-static";

export default function Image() {
  return renderOg({
    eyebrow: common.status,
    title: site.firstName,
    accent: site.lastName,
    subtitle: common.positioning,
  });
}
