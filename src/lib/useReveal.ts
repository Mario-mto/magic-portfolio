"use client";
import { useEffect, useRef } from "react";
import { registerGsap, gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function useReveal<T extends HTMLElement>(stagger = 0.08) {
  const ref = useRef<T>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    registerGsap();
    if (reduced) return; // visible by default via CSS
    const targets = el.dataset.revealChildren === "true" ? el.children : [el];
    const ctx = gsap.context(() => {
      gsap.from(targets, {
        y: 28, opacity: 0, duration: 0.8, ease: "expo.out", stagger,
        scrollTrigger: { trigger: el, start: "top 82%" },
      });
    }, el);
    return () => ctx.revert();
  }, [reduced, stagger]);
  return ref;
}
