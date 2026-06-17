// Client-safe utilities — no Node.js imports (no fs, no path)
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
