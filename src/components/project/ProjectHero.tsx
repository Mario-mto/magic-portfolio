"use client";
import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/utils/formatDate";
import type { Project } from "@/lib/projects-utils";
import styles from "./ProjectHero.module.css";

export function ProjectHero({ project }: { project: Project }) {
  const { lang } = useLang();
  const title = lang === "fr" ? project.titleFr : project.title;
  const summary = lang === "fr" ? project.summaryFr : project.summary;
  return (
    <header className={styles.hero}>
      <div className="container">
        <div className={styles.meta}>
          <Badge kind={project.badge} />
          <span className="mono">{formatDate(project.publishedAt)}</span>
        </div>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.summary}>{summary}</p>
      </div>
      {project.images[0] && (
        <div className={styles.cover}>
          <Image src={project.images[0]} alt={title} fill priority sizes="100vw" className={styles.img} />
        </div>
      )}
    </header>
  );
}
