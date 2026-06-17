"use client";
import { useEffect, useRef } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*";

export function scrambleStep(target: string, progress: number): string {
  const reveal = Math.floor(target.length * progress);
  let out = "";
  for (let i = 0; i < target.length; i++) {
    const ch = target[i];
    if (ch === " ") { out += " "; continue; }
    if (i < reveal || progress >= 1) out += ch;
    else out += GLYPHS[(i * 7 + Math.floor(progress * 97)) % GLYPHS.length];
  }
  return out;
}

export function useScramble(target: string, enabled: boolean, durationMs = 900) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!enabled) { el.textContent = target; return; }
    let raf = 0; let start = 0;
    const tick = (t: number) => {
      if (!start) start = t;
      const p = Math.min((t - start) / durationMs, 1);
      el.textContent = scrambleStep(target, p);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, enabled, durationMs]);
  return ref;
}
