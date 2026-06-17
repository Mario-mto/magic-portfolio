import { getPosts } from "@/utils/utils";
import type { Project } from "./projects-utils";

// Re-export all client-safe types and utilities from projects-utils
export type { Domain, Badge, Project } from "./projects-utils";
export { sortByDate, filterByDomain, DOMAIN_LABELS } from "./projects-utils";

// Server-only: reads MDX files via fs
const PROJECTS_PATH = ["src", "app", "work", "projects"];

export function getProjects(): Project[] {
  return getPosts(PROJECTS_PATH).map((p) => ({
    slug: p.slug,
    content: p.content,
    title: p.metadata.title,
    summary: p.metadata.summary,
    publishedAt: p.metadata.publishedAt,
    images: p.metadata.images,
    link: p.metadata.link || "",
    team: p.metadata.team || [],
    domain: p.metadata.domain,
    badge: p.metadata.badge,
    metric: p.metadata.metric,
  }));
}
