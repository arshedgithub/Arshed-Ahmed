import { homeSources, lastModified } from "@/lib/last-modified";
import { absoluteUrl } from "@/lib/utils";
import { experience, knowsAbout, languages, site, type Project } from "@/lib/site";

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Escape "<" so content can never close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

// Stable @ids: the Person is described once (home page) and referenced everywhere else,
// so search engines see one entity across the site.
const ids = {
  person: `${site.url}/#person`,
  website: `${site.url}/#website`,
  profile: `${site.url}/#profilepage`,
};

// Reference to the Person from other pages: @id ties it to the full node on the home page,
// name/url keep each page valid on its own.
const personRef = { "@type": "Person", "@id": ids.person, name: site.name, url: site.url };

const current = experience.find((job) => job.end === "Present");

/** Home page: Person + WebSite + ProfilePage (mainEntity is the Person). */
export function HomeJsonLd() {
  const modified = lastModified(...homeSources);
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Person",
            "@id": ids.person,
            name: site.name,
            url: site.url,
            image: absoluteUrl("/images/about-1x1.webp"),
            jobTitle: site.jobTitle,
            description: site.description,
            email: `mailto:${site.email}`,
            telephone: site.phoneE164,
            nationality: { "@type": "Country", name: "Sri Lanka" },
            address: { "@type": "PostalAddress", addressCountry: "AE" },
            sameAs: [site.linkedinUrl, site.githubUrl],
            knowsAbout: [...knowsAbout],
            knowsLanguage: languages.map((l) => l.name),
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
            description: site.description,
            inLanguage: "en",
            publisher: { "@id": ids.person },
          },
          {
            "@type": "ProfilePage",
            "@id": ids.profile,
            url: site.url,
            name: `${site.name} | ${site.jobTitle}`,
            isPartOf: { "@id": ids.website },
            mainEntity: { "@id": ids.person },
            inLanguage: "en",
            ...(modified ? { dateModified: modified } : {}),
          },
        ],
      }}
    />
  );
}

/** Case study: CreativeWork authored by the Person, plus the visible breadcrumb trail. */
export function ProjectJsonLd({ project, image }: { project: Project; image: string }) {
  const url = absoluteUrl(`/projects/${project.slug}`);
  const name = `${project.title} ${project.titleAccent ?? ""}`.trim();
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
            inLanguage: "en",
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
              { "@type": "ListItem", position: 1, name: "Home", item: site.url },
              { "@type": "ListItem", position: 2, name, item: url },
            ],
          },
        ],
      }}
    />
  );
}
