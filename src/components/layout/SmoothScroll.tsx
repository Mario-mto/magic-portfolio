"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { registerGsap, gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  useEffect(() => {
    registerGsap();
    if (reduced) return; // native scroll for reduced-motion users
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, [reduced]);
  return <>{children}</>;
}
