import { describe, it, expect } from "vitest";
import { sortByDate, filterByDomain, type Project } from "./projects";

const mk = (slug: string, date: string, domain: Project["domain"]): Project => ({
  slug, domain, badge: "deployed", metric: "", title: slug, summary: "",
  images: [], link: "", publishedAt: date, content: "", team: [],
});

describe("projects logic", () => {
  it("sorts newest first", () => {
    const out = sortByDate([mk("a", "2024-01-01", "ml"), mk("b", "2025-01-01", "saas")]);
    expect(out.map((p) => p.slug)).toEqual(["b", "a"]);
  });
  it("filters by domain, 'all' returns everything", () => {
    const list = [mk("a", "2024-01-01", "ml"), mk("b", "2025-01-01", "saas")];
    expect(filterByDomain(list, "ml").map((p) => p.slug)).toEqual(["a"]);
    expect(filterByDomain(list, "all").length).toBe(2);
  });
});

import { getProjects } from "./projects";

describe("getProjects frontmatter", () => {
  it("reads domain + badge + video across projects", () => {
    const bySlug = Object.fromEntries(getProjects().map((p) => [p.slug, p]));
    expect(bySlug["saas_housing_pricing"]?.domain).toBe("ml");
    expect(bySlug["saas_housing_pricing"]?.badge).toBe("deployed");
    expect(bySlug["health_technology_project"]?.domain).toBe("medical");
    expect(bySlug["menu_optimizer"]?.badge).toBe("live");
    expect(bySlug["sites"]?.domain).toBe("frontend");
    expect(bySlug["nocturne"]?.domain).toBe("frontend");
    expect(bySlug["nocturne"]?.video).toBe("/images/projects/nocturne/nocturne.mp4");
  });
});
