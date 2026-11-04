import { setRequestLocale } from "next-intl/server";
import { ProjectPage, projectPageMetadata, projectStaticParams } from "@/components/pages/project-page";

export const dynamicParams = false;

export const generateStaticParams = projectStaticParams;

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">) {
  return projectPageMetadata((await params).slug, "en");
}

export default async function Page({ params }: PageProps<"/projects/[slug]">) {
  setRequestLocale("en");
  return <ProjectPage slug={(await params).slug} locale="en" />;
}
