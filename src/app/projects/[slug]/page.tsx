import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectJsonLd } from "@/components/seo/json-ld";
import { ArchitectureDiagram } from "@/components/ui/architecture-diagram";
import { buttonClasses } from "@/components/ui/button";
import { BrowserFrame, PhoneFrame } from "@/components/ui/device-frames";
import { Chip } from "@/components/ui/primitives";
import { GitHubIcon } from "@/components/ui/brand-icons";
import { getProject, projects, type Project } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const title = `${project.title} ${project.titleAccent ?? ""}`.trim() + " case study";
  const url = `/projects/${project.slug}`;
  return {
    title,
    description: project.summary,
    alternates: { canonical: url },
    openGraph: { type: "article", url, title, description: project.summary },
    twitter: { card: "summary_large_image", title, description: project.summary },
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { default: Content } = await import(`@/content/projects/${project.slug}.mdx`);
  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];
  const [first, ...rest] = project.screenshots;
  const heroPhone = project.screenshots.find((s) => s.device === "phone");

  return (
    <article className="pb-16 md:pb-24">
      <ProjectJsonLd project={project} />

      <header className="border-b border-line">
        <div className="container-page grid items-center gap-8 py-8 md:py-14 lg:grid-cols-[minmax(0,1fr)_480px] lg:gap-12">
          <div>
            <Link
              href="/#work"
              className="-ml-2 inline-flex min-h-11 items-center gap-2 rounded-lg px-2 text-sm text-muted hover:text-fg"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              Back to projects
            </Link>
            <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
              {project.title} {project.titleAccent && <span className="text-accent">{project.titleAccent}</span>}
            </h1>
            <p className="mt-3 text-lg text-muted">{project.subtitle}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Chip>{project.tag}</Chip>
              {project.period && <Chip>{project.period}</Chip>}
            </div>
          </div>
          <div className="relative pr-10 pb-6">
            <BrowserFrame
              src={first.device === "browser" ? first.src : project.cover}
              alt={first.device === "browser" ? first.alt : `${project.title} cover (placeholder)`}
              sizes="(min-width: 1024px) 440px, 90vw"
              preload
            />
            {heroPhone && (
              <PhoneFrame
                src={heroPhone.src}
                alt=""
                sizes="110px"
                className="absolute right-0 bottom-0 w-[22%] min-w-20 shadow-card"
              />
            )}
          </div>
        </div>
      </header>

      <div className="container-page mt-10 md:mt-14">
        <div className="card mx-auto max-w-3xl bg-raised p-5 md:p-10">
          <div className="prose-case">
            <Content
              components={{
                Architecture: () => (
                  <ArchitectureDiagram
                    id={`arch-${project.slug}`}
                    title={`${project.title} system architecture`}
                    architecture={project.architecture}
                  />
                ),
                Stack: () => <StackList project={project} />,
                ProjectLinks: () => <ProjectLinks project={project} />,
              }}
            />
          </div>
        </div>

        <section aria-labelledby="screenshots-title" className="mt-14">
          <h2 id="screenshots-title" className="text-xl font-semibold">
            Screenshots
          </h2>
          <ul className="mt-6 grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[first, ...rest].map((s) => (
              <li key={s.src} className={s.device === "phone" ? "mx-auto w-full max-w-[220px]" : ""}>
                {s.device === "phone" ? (
                  <PhoneFrame src={s.src} alt={s.alt} sizes="220px" />
                ) : (
                  <BrowserFrame src={s.src} alt={s.alt} sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw" />
                )}
              </li>
            ))}
          </ul>
        </section>

        <nav aria-label="More projects" className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
          <Link href="/#work" className="inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-fg">
            <ArrowLeft size={16} aria-hidden="true" />
            All projects
          </Link>
          <Link
            href={`/projects/${next.slug}`}
            className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-accent"
          >
            Next: {next.title} {next.titleAccent}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </nav>
      </div>
    </article>
  );
}

function StackList({ project }: { project: Project }) {
  return (
    <div className="mt-4 grid gap-4">
      {project.stack.map((group) => (
        <div key={group.label}>
          {project.stack.length > 1 && <p className="mb-2 font-mono text-xs uppercase tracking-wider text-muted">{group.label}</p>}
          <ul className="flex flex-wrap gap-2" aria-label={`${group.label} stack`}>
            {group.items.map((item) => (
              <li key={item}>
                <Chip>{item}</Chip>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  if (project.links.length === 0) {
    // TODO: confirm wording, or add links in site.ts.
    return <p>There is no public link for this project yet. I am happy to walk through it in an interview.</p>;
  }
  return (
    <div className="mt-4 flex flex-wrap gap-3">
      {project.links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClasses(link.kind === "live" ? "primary" : "secondary")}
        >
          {link.kind === "github" && <GitHubIcon size={16} />}
          {link.label}
          <ArrowUpRight size={16} aria-hidden="true" />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      ))}
    </div>
  );
}
