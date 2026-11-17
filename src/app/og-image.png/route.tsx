import { renderOg } from "@/components/seo/og";
import { catalog } from "@/i18n/messages";

// English home card, at a fixed URL with a real extension so static hosts send the right content type.
// (An opengraph-image file inside a route group gets a hashed, extensionless URL.)
export const dynamic = "force-static";

export function GET() {
  const { common, hero } = catalog("en");
  return renderOg({
    eyebrow: common.status,
    title: hero.headline,
    subtitle: hero.proof,
  });
}
