"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./PipelineRail.module.css";

const STAGES = ["Input", "Features", "Model", "Production", "Ship"];

export function PipelineRail() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      const p = window.scrollY / (document.body.scrollHeight - window.innerHeight || 1);
      setActive(Math.min(STAGES.length - 1, Math.floor(p * STAGES.length)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div ref={ref} className={styles.rail} aria-hidden="true">
      {STAGES.map((s, i) => (
        <div key={s} className={`${styles.node} ${i <= active ? styles.on : ""}`}>
          <i /><span>{s}</span>
        </div>
      ))}
    </div>
  );
}
