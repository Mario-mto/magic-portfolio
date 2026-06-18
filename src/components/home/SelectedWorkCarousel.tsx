"use client";
import { ProjectCard } from "@/components/work/ProjectCard";
import { Draggable, InertiaPlugin, gsap, registerGsap } from "@/lib/gsap";
import type { Project } from "@/lib/projects";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./SelectedWorkCarousel.module.css";

export function SelectedWorkCarousel({ projects }: { projects: Project[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const draggableRef = useRef<Draggable | null>(null);
  const reduced = useReducedMotion();
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [overflow, setOverflow] = useState(false);

  const minX = useCallback(() => {
    const track = trackRef.current;
    const parent = track?.parentElement;
    if (!track || !parent) return 0;
    return Math.min(0, parent.clientWidth - track.scrollWidth);
  }, []);

  // keep the arrow enabled/disabled state in sync with the current position
  const sync = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    if (reduced) {
      const vp = viewportRef.current;
      if (!vp) return;
      const maxScroll = vp.scrollWidth - vp.clientWidth;
      setOverflow(maxScroll > 1);
      setAtStart(vp.scrollLeft <= 1);
      setAtEnd(vp.scrollLeft >= maxScroll - 1);
      return;
    }
    const x = gsap.getProperty(track, "x") as number;
    const lo = minX();
    setOverflow(lo < 0);
    setAtStart(x >= -1);
    setAtEnd(x <= lo + 1);
  }, [reduced, minX]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: rebuild Draggable bounds when the project count changes
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (reduced) {
      sync();
      return;
    }
    registerGsap();
    const d = Draggable.create(track, {
      type: "x",
      inertia: true,
      edgeResistance: 0.85,
      bounds: { minX: minX(), maxX: 0 },
      onDrag: sync,
      onThrowUpdate: sync,
    });
    draggableRef.current = d[0];
    sync();
    const onResize = () => {
      draggableRef.current?.applyBounds({ minX: minX(), maxX: 0 });
      sync();
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      for (const instance of d) instance.kill();
      draggableRef.current = null;
    };
  }, [reduced, projects.length, minX, sync]);

  const step = () => (trackRef.current?.parentElement?.clientWidth ?? 0) * 0.8;

  const go = (dir: 1 | -1) => {
    if (reduced) {
      viewportRef.current?.scrollBy({ left: dir * step(), behavior: "smooth" });
      return;
    }
    const track = trackRef.current;
    if (!track) return;
    const current = gsap.getProperty(track, "x") as number;
    const target = gsap.utils.clamp(minX(), 0, current - dir * step());
    gsap.to(track, {
      x: target,
      duration: 0.6,
      ease: "power3.out",
      onUpdate: () => {
        draggableRef.current?.update();
        sync();
      },
      onComplete: sync,
    });
  };

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.head}>
          <h2>Selected Work</h2>
          <div className={styles.controls}>
            <span className={`${styles.hint} mono`}>drag / scroll</span>
            <button
              type="button"
              className={styles.arrow}
              aria-label="Previous projects"
              onClick={() => go(-1)}
              disabled={!overflow || atStart}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path
                  d="M15 5l-7 7 7 7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              className={styles.arrow}
              aria-label="Next projects"
              onClick={() => go(1)}
              disabled={!overflow || atEnd}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path
                  d="M9 5l7 7-7 7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div
        ref={viewportRef}
        className={`${styles.viewport} ${reduced ? styles.native : ""}`}
        onScroll={reduced ? sync : undefined}
      >
        <div ref={trackRef} className={styles.track}>
          {projects.map((p) => (
            <div key={p.slug} className={styles.slide}>
              <ProjectCard project={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
