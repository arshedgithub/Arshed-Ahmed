import { useLocale } from "next-intl";
import { catalog } from "@/i18n/messages";
import { localePath, type Locale } from "@/i18n/routing";
import type { Project } from "@/lib/content";
import { homeSources, lastModified } from "@/lib/last-modified";
import { absoluteUrl } from "@/lib/utils";
import { experience, knowsAbout, knowsLanguage, site } from "@/lib/site";

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Escape "<" so content can never close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

// Stable @ids: the Person and WebSite are one entity across languages, so search engines don't see two people.
const ids = {
  person: `${site.url}/#person`,
  website: `${site.url}/#website`,
};

// Reference to the Person from other pages: @id ties it to the full node on the home page,
// name/url keep each page valid on its own.
const personRef = { "@type": "Person", "@id": ids.person, name: site.name, url: site.url };

const current = experience.find((job) => job.endISO === null);

const localeUrl = (locale: Locale, path: string) => absoluteUrl(localePath(locale, path));

/** Home page: Person + WebSite + ProfilePage (mainEntity is the Person). */
export function HomeJsonLd() {
  const locale = useLocale();
  const { common, meta } = catalog(locale);
  const modified = lastModified(...homeSources);
  const url = locale === "en" ? site.url : localeUrl(locale, "/");
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Person",
            "@id": ids.person,
            name: common.name,
            ...(locale === "en" ? {} : { alternateName: site.name }),
            url,
            image: absoluteUrl("/images/about-1x1.webp"),
            jobTitle: common.jobTitle,
            description: meta.description,
            email: `mailto:${site.email}`,
            telephone: site.phoneE164,
            nationality: { "@type": "Country", name: "Sri Lanka" },
            address: { "@type": "PostalAddress", addressCountry: "AE" },
            sameAs: [site.linkedinUrl, site.githubUrl],
            knowsAbout: [...knowsAbout],
            knowsLanguage: [...knowsLanguage],
            alumniOf: [
              { "@type": "CollegeOrUniversity", name: "University of Colombo School of Computing" },
              { "@type": "CollegeOrUniversity", name: "University of Colombo" },
            ],
            ...(current?.company === "SLMarket"
              ? { worksFor: { "@type": "Organization", name: "SLMarket", url: site.products.marketplace } }
              : {}),
          },
          {
            "@type": "WebSite",
            "@id": ids.website,
            url: site.url,
            name: site.name,
            description: catalog("en").meta.description,
            inLanguage: ["en", "ar"],
            publisher: { "@id": ids.person },
          },
          {
            "@type": "ProfilePage",
            "@id": `${url}/#profilepage`.replace(/^(https:\/\/[^/]+)\/\//, "$1/"),
            url,
            name: meta.profileName,
            isPartOf: { "@id": ids.website },
            mainEntity: { "@id": ids.person },
            inLanguage: locale,
            ...(modified ? { dateModified: modified } : {}),
          },
        ],
      }}
    />
  );
}

/** Case study: CreativeWork authored by the Person, plus the visible breadcrumb trail. */
export function ProjectJsonLd({ project, image }: { project: Project; image: string }) {
  const locale = useLocale();
  const { caseStudy } = catalog(locale);
  const url = localeUrl(locale, `/projects/${project.slug}`);
  const name = `${project.title} ${project.titleAccent}`.trim();
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            // CreativeWork rather than Article: a case study has no publish date to report, and
            // Article without datePublished raises a Rich Results warning.
            "@type": "CreativeWork",
            "@id": `${url}#work`,
            name,
            headline: name,
            description: project.summary,
            abstract: project.outcome,
            url,
            mainEntityOfPage: url,
            image: absoluteUrl(image),
            author: personRef,
            creator: personRef,
            isPartOf: { "@id": ids.website },
            inLanguage: locale,
            genre: project.tag,
            keywords: [...new Set(project.stack.flatMap((s) => s.items))].join(", "),
            // The case study describes these sites; it is not the same thing as them, so `about`, not `sameAs`.
            ...(project.links.length
              ? { about: project.links.map((l) => ({ "@type": "WebSite", name: l.label, url: l.href })) }
              : {}),
          },
          {
            "@type": "BreadcrumbList",
            "@id": `${url}#breadcrumb`,
            itemListElement: [
              { "@type": "ListItem", position: 1, name: caseStudy.breadcrumbHome, item: locale === "en" ? site.url : localeUrl(locale, "/") },
              { "@type": "ListItem", position: 2, name, item: url },
            ],
          },
        ],
      }}
    />
  );
}
