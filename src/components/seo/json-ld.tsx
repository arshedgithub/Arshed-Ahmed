import { absoluteUrl } from "@/lib/utils";
import { knowsAbout, site, type Project } from "@/lib/site";

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Escape "<" so content can never close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

const personRef = { "@type": "Person", "@id": `${site.url}/#person`, name: site.name, url: site.url };

export function PersonJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": `${site.url}/#person`,
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
        alumniOf: [
          { "@type": "CollegeOrUniversity", name: "University of Colombo School of Computing" },
          { "@type": "CollegeOrUniversity", name: "University of Colombo" },
        ],
      }}
    />
  );
}

export function ProjectJsonLd({ project }: { project: Project }) {
  const url = absoluteUrl(`/projects/${project.slug}`);
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        "@id": `${url}#article`,
        headline: `${project.title} ${project.titleAccent ?? ""}`.trim(),
        description: project.summary,
        url,
        mainEntityOfPage: url,
        image: absoluteUrl(`/projects/${project.slug}/opengraph-image`),
        author: personRef,
        publisher: personRef,
        about: {
          "@type": "CreativeWork",
          name: project.title,
          keywords: project.stack.flatMap((s) => s.items).join(", "),
          ...(project.links[0] ? { url: project.links[0].href } : {}),
        },
      }}
    />
  );
}
