import type { MetadataRoute } from "next";
import { localePath, routing } from "@/i18n/routing";
import { homeSources, lastModified, projectSources } from "@/lib/last-modified";
import { projects, site } from "@/lib/site";

export const dynamic = "force-static";

const absolute = (path: string) => (path === "/" ? site.url : `${site.url}${path}`);

/** One entry per locale, each listing every language version, as hreflang requires. */
function localizedEntries(path: string, entry: Omit<MetadataRoute.Sitemap[number], "url" | "alternates">): MetadataRoute.Sitemap {
  return routing.locales.map((locale) => ({
    url: absolute(localePath(locale, path)),
    ...entry,
    alternates: {
      languages: {
        en: absolute(localePath("en", path)),
        "ar-AE": absolute(localePath("ar", path)),
        "x-default": absolute(localePath(routing.defaultLocale, path)),
      },
    },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...localizedEntries("/", { lastModified: lastModified(...homeSources), changeFrequency: "monthly", priority: 1 }),
    ...projects.flatMap((p) =>
      localizedEntries(`/projects/${p.slug}`, {
        lastModified: lastModified(...projectSources(p.slug)),
        changeFrequency: "monthly",
        priority: 0.8,
      }),
    ),
  ];
}
