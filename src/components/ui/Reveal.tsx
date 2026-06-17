"use client";
import { useReveal } from "@/lib/useReveal";

export function Reveal({ children, stagger, childrenStagger = false, className }: {
  children: React.ReactNode; stagger?: number; childrenStagger?: boolean; className?: string;
}) {
  const ref = useReveal<HTMLDivElement>(stagger);
  return <div ref={ref} className={className} data-reveal-children={childrenStagger ? "true" : undefined}>{children}</div>;
}
