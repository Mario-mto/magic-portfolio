import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProjects, sortByDate } from "@/lib/projects";
import { CustomMDX } from "@/components/mdx/MDXComponents";
import { ProjectHero } from "@/components/project/ProjectHero";
import { MetricsBar } from "@/components/project/MetricsBar";
import { ImageCarousel } from "@/components/project/ImageCarousel";
import { ProjectNav } from "@/components/project/ProjectNav";
import { LangBody } from "@/components/project/LangBody";
import { work } from "@/resources";

export async function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProjects().find((x) => x.slug === slug);
  if (!p) return {};
  return { title: `${p.title} — ${work.title}`, description: p.summary };
}

export default async function Project({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const all = sortByDate(getProjects());
  const idx = all.findIndex((p) => p.slug === slug);
  if (idx === -1) notFound();
  const project = all[idx];
  return (
    <article>
      <ProjectHero project={project} />
      <MetricsBar project={project} />
      <LangBody
        en={<div className="container" style={{ maxWidth: "760px" }}><CustomMDX source={project.content} /></div>}
        fr={<div className="container" style={{ maxWidth: "760px" }}><CustomMDX source={project.contentFr} /></div>}
      />
      <ImageCarousel images={project.images} title={project.title} />
      <ProjectNav prev={all[idx - 1]} next={all[idx + 1]} />
    </article>
  );
}
