"use client";
import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { Badge } from "@/components/ui/Badge";
import type { Project } from "@/lib/projects-utils";
import styles from "./ProjectCard.module.css";

export function ProjectCard({ project }: { project: Project }) {
  const { lang } = useLang();
  const cover = project.images[0];
  const title = lang === "fr" ? project.titleFr : project.title;
  const summary = lang === "fr" ? project.summaryFr : project.summary;
  return (
    <Link href={`/work/${project.slug}`} className={styles.card}>
      <div className={styles.cover}>
        {cover && <Image src={cover} alt={title} fill sizes="(max-width:640px) 80vw, 360px" className={styles.img} />}
      </div>
      <div className={styles.body}>
        <div className={styles.top}><Badge kind={project.badge} />{project.metric && <span className="mono">{project.metric}</span>}</div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.summary}>{summary}</p>
      </div>
    </Link>
  );
}
