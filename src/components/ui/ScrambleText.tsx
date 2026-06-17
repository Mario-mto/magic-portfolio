"use client";
import { useScramble } from "@/lib/useScramble";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function ScrambleText({ text, as: Tag = "span", className }: {
  text: string; as?: React.ElementType; className?: string;
}) {
  const reduced = useReducedMotion();
  const ref = useScramble(text, !reduced);
  return <Tag ref={ref as never} className={className}>{text}</Tag>;
}
