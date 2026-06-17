"use client";
import { useEffect, useRef } from "react";
import { registerGsap, gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import styles from "./Marquee.module.css";

export function Marquee({ items }: { items: string[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const track = trackRef.current; if (!track || reduced) return;
    registerGsap();
    const ctx = gsap.context(() => {
      gsap.to(track, { xPercent: -50, duration: 24, ease: "none", repeat: -1 });
    }, track);
    return () => ctx.revert();
  }, [reduced]);
  const doubled = [...items, ...items];
  return (
    <div className={styles.wrap}>
      <div ref={trackRef} className={styles.track}>
        {doubled.map((it, i) => <span key={i} className={styles.item}>{it}</span>)}
      </div>
    </div>
  );
}
