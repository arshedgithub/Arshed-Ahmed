import type { MetadataRoute } from "next";
import { catalog } from "@/i18n/messages";
import { THEME_COLORS, site } from "@/lib/site";

const { meta } = catalog("en");

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: meta.profileName,
    short_name: site.name,
    description: meta.description,
    start_url: "/",
    display: "browser",
    background_color: THEME_COLORS.dark,
    theme_color: THEME_COLORS.dark,
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
