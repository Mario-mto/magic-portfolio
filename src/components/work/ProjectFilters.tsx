"use client";
import type { Domain } from "@/lib/projects-utils";
import { DOMAIN_LABELS } from "@/lib/projects-utils";
import styles from "./ProjectGrid.module.css";

const ORDER: (Domain | "all")[] = ["all", "ml", "medical", "saas", "frontend"];

export function ProjectFilters({ active, onChange }: { active: Domain | "all"; onChange: (d: Domain | "all") => void }) {
  return (
    <div className={styles.filters} role="tablist">
      {ORDER.map((d) => (
        <button key={d} role="tab" aria-selected={active === d}
          className={`${styles.filter} ${active === d ? styles.active : ""}`} onClick={() => onChange(d)}>
          {DOMAIN_LABELS[d]}
        </button>
      ))}
    </div>
  );
}
