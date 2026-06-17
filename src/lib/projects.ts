import { getPosts } from "@/utils/utils";

export type Domain = "ml" | "medical" | "saas" | "frontend";
export type Badge = "deployed" | "live" | "research" | "design";

export interface Project {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  images: string[];
  link: string;
  content: string;
  team: { name: string; role: string; avatar: string; linkedIn: string }[];
  domain?: Domain;
  badge?: Badge;
  metric?: string;
}

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

export function sortByDate(list: Project[]): Project[] {
  return [...list].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function filterByDomain(list: Project[], domain: Domain | "all"): Project[] {
  return domain === "all" ? list : list.filter((p) => p.domain === domain);
}

export const DOMAIN_LABELS: Record<Domain | "all", string> = {
  all: "All", ml: "ML", medical: "Medical", saas: "SaaS", frontend: "Frontend",
};
