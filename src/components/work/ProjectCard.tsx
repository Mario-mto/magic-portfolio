import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import type { Project } from "@/lib/projects-utils";
import styles from "./ProjectCard.module.css";

export function ProjectCard({ project }: { project: Project }) {
  const cover = project.images[0];
  return (
    <Link href={`/work/${project.slug}`} className={styles.card}>
      <div className={styles.cover}>
        {cover && <Image src={cover} alt={project.title} fill sizes="(max-width:640px) 80vw, 360px" className={styles.img} />}
      </div>
      <div className={styles.body}>
        <div className={styles.top}><Badge kind={project.badge} />{project.metric && <span className="mono">{project.metric}</span>}</div>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.summary}>{project.summary}</p>
      </div>
    </Link>
  );
}
