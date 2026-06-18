"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { home } from "@/resources";
import styles from "./HeroLatentSpace.module.css";

interface Point { x: number; y: number; bx: number; by: number; r: number; c: string; slug?: string; label?: string; }
const HIT = 18; // px radius to register a project-point hover/click

export function HeroLatentSpace({ projects }: { projects: { slug: string; title: string }[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const router = useRouter();
  const hovered = useRef<Point | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    let raf = 0; const mouse = { x: -9999, y: -9999 };
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let pts: Point[] = [];
    const projectPts = () => pts.filter((p) => p.slug);

    const seed = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      pts = [];
      projects.forEach((p, i) => {
        const cluster = i % 2 === 0;
        const bx = w * (cluster ? 0.62 : 0.78) + (Math.sin(i) * 60);
        const by = h * (0.3 + (i / Math.max(projects.length, 1)) * 0.45);
        pts.push({ x: bx, y: by, bx, by, r: 5, c: cluster ? "#5eead4" : "#7c6cff", slug: p.slug, label: p.title });
      });
      for (let i = 0; i < 60; i++) {
        const bx = Math.random() * w, by = Math.random() * h;
        pts.push({ x: bx, y: by, bx, by, r: Math.random() * 1.6 + 0.4, c: "#5a6678" });
      }
    };

    const nearest = (): Point | null => {
      let best: Point | null = null, bd = HIT;
      for (const p of projectPts()) { const d = Math.hypot(p.x - mouse.x, p.y - mouse.y); if (d < bd) { bd = d; best = p; } }
      return best;
    };

    const draw = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      if (!reduced) {
        for (const p of projectPts()) {
          const d = Math.hypot(p.x - mouse.x, p.y - mouse.y);
          if (d < 220) {
            ctx.beginPath(); ctx.moveTo(mouse.x, mouse.y); ctx.lineTo(p.x, p.y);
            ctx.strokeStyle = `rgba(94,234,212,${(1 - d / 220) * 0.35})`; ctx.lineWidth = 1; ctx.stroke();
          }
        }
      }
      const hov = hovered.current;
      for (const p of pts) {
        if (!reduced) {
          const dx = p.x - mouse.x, dy = p.y - mouse.y, dist = Math.hypot(dx, dy);
          if (dist < 120) { const f = (120 - dist) / 120; p.x += (dx / dist) * f * 2; p.y += (dy / dist) * f * 2; }
          p.x += (p.bx - p.x) * 0.05; p.y += (p.by - p.y) * 0.05;
        }
        const big = p === hov;
        ctx.beginPath(); ctx.arc(p.x, p.y, big ? p.r + 3 : p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.c; ctx.shadowBlur = p.slug ? 12 : 0; ctx.shadowColor = p.c; ctx.fill();
      }
      ctx.shadowBlur = 0;
      if (hov?.label) {
        ctx.font = "600 13px ui-monospace, monospace"; ctx.fillStyle = "#e9eef6";
        ctx.fillText(hov.label, hov.x + 14, hov.y - 10);
      }
      if (!reduced) raf = requestAnimationFrame(draw);
    };

    seed(); draw();
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
      hovered.current = nearest();
      canvas.style.cursor = hovered.current ? "pointer" : "default";
      if (reduced) draw();
    };
    const onClick = () => { const hv = hovered.current; if (hv?.slug) router.push(`/work/${hv.slug}`); };
    const onResize = () => { seed(); draw(); };
    window.addEventListener("mousemove", onMove);
    canvas.addEventListener("click", onClick);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("click", onClick);
      window.removeEventListener("resize", onResize);
    };
  }, [projects, reduced, router]);

  return (
    <section className={styles.hero} id="top">
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.glow} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <div className={`mono ${styles.eyebrow}`}>Applied AI Engineer · Montréal · ● Available</div>
        <h1 className={styles.title}>
          Designing practical <ScrambleText text="AI systems" as="span" className={styles.stroke} /> that ship.
        </h1>
        <p className={styles.sub}>{home.subline}</p>
      </div>
      <Link href="/work" className={`mono ${styles.cue}`}>Scroll ↓</Link>
      <ul className={styles.srLinks} aria-label="Projects">
        {projects.map((p) => (<li key={p.slug}><Link href={`/work/${p.slug}`}>{p.title}</Link></li>))}
      </ul>
    </section>
  );
}
