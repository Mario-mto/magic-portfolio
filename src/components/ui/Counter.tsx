"use client";
import { useEffect, useRef } from "react";
import { registerGsap, gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const el = ref.current; if (!el) return;
    registerGsap();
    if (reduced) { el.textContent = `${to}${suffix}`; return; }
    const obj = { v: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, { v: to, duration: 1.4, ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 90%" },
        onUpdate: () => { el.textContent = `${Math.round(obj.v)}${suffix}`; } });
    }, el);
    return () => ctx.revert();
  }, [to, suffix, reduced]);
  return <span ref={ref}>0{suffix}</span>;
}
