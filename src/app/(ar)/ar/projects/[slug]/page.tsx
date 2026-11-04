import { setRequestLocale } from "next-intl/server";
import { ProjectPage, projectPageMetadata, projectStaticParams } from "@/components/pages/project-page";

export const dynamicParams = false;

export const generateStaticParams = projectStaticParams;

export async function generateMetadata({ params }: PageProps<"/ar/projects/[slug]">) {
  return projectPageMetadata((await params).slug);
}

export default async function Page({ params }: PageProps<"/ar/projects/[slug]">) {
  setRequestLocale("ar");
  return <ProjectPage slug={(await params).slug} />;
}
