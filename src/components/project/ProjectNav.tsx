"use client";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import type { Project } from "@/lib/projects-utils";
import styles from "./ProjectNav.module.css";

export function ProjectNav({ prev, next }: { prev?: Project; next?: Project }) {
  const { lang } = useLang();
  const t = (p: Project) => (lang === "fr" ? p.titleFr : p.title);
  return (
    <nav className={`container ${styles.nav}`}>
      {prev ? <Link href={`/work/${prev.slug}`} className={styles.link}><span className="mono">← prev</span>{t(prev)}</Link> : <span />}
      {next ? <Link href={`/work/${next.slug}`} className={`${styles.link} ${styles.right}`}><span className="mono">next →</span>{t(next)}</Link> : <span />}
    </nav>
  );
}
