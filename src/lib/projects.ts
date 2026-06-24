import { getPosts } from "@/utils/utils";
import type { Project } from "./projects-utils";

// Re-export all client-safe types and utilities from projects-utils
export type { Domain, Badge, Project } from "./projects-utils";
export { sortByDate, filterByDomain, DOMAIN_LABELS } from "./projects-utils";

// Server-only: reads MDX files via fs
const PROJECTS_PATH = ["src", "app", "work", "projects"];

export function getProjects(): Project[] {
  const all = getPosts(PROJECTS_PATH);
  const frBodies = new Map<string, string>();
  const base: typeof all = [];
  for (const p of all) {
    if (p.slug.endsWith(".fr")) {
      frBodies.set(p.slug.replace(/\.fr$/, ""), p.content);
    } else {
      base.push(p);
    }
  }
  return base.map((p) => ({
    slug: p.slug,
    content: p.content,
    contentFr: frBodies.get(p.slug) || p.content, // EN fallback when no FR body yet
    title: p.metadata.title,
    titleFr: p.metadata.title_fr || p.metadata.title,
    summary: p.metadata.summary,
    summaryFr: p.metadata.summary_fr || p.metadata.summary,
    publishedAt: p.metadata.publishedAt,
    images: p.metadata.images,
    link: p.metadata.link || "",
    team: p.metadata.team || [],
    domain: p.metadata.domain,
    badge: p.metadata.badge,
    metric: p.metadata.metric,
    video: p.metadata.video,
  }));
}
