"use client";
import { useEffect, useRef } from "react";
import { registerGsap, gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import styles from "./MagneticCursor.module.css";

export function MagneticCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const dot = dotRef.current;
    if (!dot || reduced) return;
    if (window.matchMedia("(pointer: coarse)").matches) return; // touch → native cursor
    registerGsap();
    const xTo = gsap.quickTo(dot, "x", { duration: 0.4, ease: "expo.out" });
    const yTo = gsap.quickTo(dot, "y", { duration: 0.4, ease: "expo.out" });
    const move = (e: PointerEvent) => { xTo(e.clientX); yTo(e.clientY); };
    const over = (e: PointerEvent) => {
      const interactive = (e.target as HTMLElement).closest("a,button,canvas");
      dot.classList.toggle(styles.hover, !!interactive);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    return () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerover", over); };
  }, [reduced]);
  return <div ref={dotRef} className={styles.cursor} aria-hidden="true" />;
}
