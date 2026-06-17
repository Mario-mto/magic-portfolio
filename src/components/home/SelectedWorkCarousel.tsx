"use client";
import { useEffect, useRef } from "react";
import { registerGsap, gsap, Draggable, InertiaPlugin } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { ProjectCard } from "@/components/work/ProjectCard";
import type { Project } from "@/lib/projects";
import styles from "./SelectedWorkCarousel.module.css";

export function SelectedWorkCarousel({ projects }: { projects: Project[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const track = trackRef.current; if (!track || reduced) return;
    registerGsap();
    const max = () => Math.min(0, track.parentElement!.clientWidth - track.scrollWidth);
    const d = Draggable.create(track, {
      type: "x", inertia: true, edgeResistance: 0.85,
      bounds: { minX: max(), maxX: 0 },
    });
    return () => { d.forEach((x) => x.kill()); };
  }, [reduced, projects.length]);

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.head}><h2>Selected Work</h2><span className="mono">drag / scroll →</span></div>
      </div>
      <div className={`${styles.viewport} ${reduced ? styles.native : ""}`}>
        <div ref={trackRef} className={styles.track}>
          {projects.map((p) => <div key={p.slug} className={styles.slide}><ProjectCard project={p} /></div>)}
        </div>
      </div>
    </section>
  );
}
