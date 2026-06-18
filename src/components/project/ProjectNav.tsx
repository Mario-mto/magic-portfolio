import Link from "next/link";
import type { Project } from "@/lib/projects-utils";
import styles from "./ProjectNav.module.css";

export function ProjectNav({ prev, next }: { prev?: Project; next?: Project }) {
  return (
    <nav className={`container ${styles.nav}`}>
      {prev ? (
        <Link href={`/work/${prev.slug}`} className={styles.link}>
          <span className="mono">← prev</span>
          {prev.title}
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={`/work/${next.slug}`} className={`${styles.link} ${styles.right}`}>
          <span className="mono">next →</span>
          {next.title}
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
