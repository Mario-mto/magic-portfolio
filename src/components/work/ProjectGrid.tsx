"use client";
import { useState, useRef, useLayoutEffect } from "react";
import { registerGsap, gsap } from "@/lib/gsap";
import { ProjectCard } from "./ProjectCard";
import { ProjectFilters } from "./ProjectFilters";
import { filterByDomain, type Project, type Domain } from "@/lib/projects-utils";
import styles from "./ProjectGrid.module.css";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [domain, setDomain] = useState<Domain | "all">("all");
  const gridRef = useRef<HTMLDivElement>(null);
  const visible = filterByDomain(projects, domain);

  useLayoutEffect(() => {
    const grid = gridRef.current; if (!grid) return;
    registerGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(grid.children, { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "expo.out", stagger: 0.05 });
    }, grid);
    return () => ctx.revert();
  }, [domain]);

  return (
    <div className="container">
      <ProjectFilters active={domain} onChange={setDomain} />
      <div ref={gridRef} className={styles.grid}>
        {visible.map((p) => <ProjectCard key={p.slug} project={p} />)}
      </div>
    </div>
  );
}
