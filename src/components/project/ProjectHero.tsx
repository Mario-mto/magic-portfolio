import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/utils/formatDate";
import type { Project } from "@/lib/projects-utils";
import styles from "./ProjectHero.module.css";

export function ProjectHero({ project }: { project: Project }) {
  return (
    <header className={styles.hero}>
      <div className="container">
        <div className={styles.meta}>
          <Badge kind={project.badge} />
          <span className="mono">{formatDate(project.publishedAt)}</span>
        </div>
        <h1 className={styles.title}>{project.title}</h1>
        <p className={styles.summary}>{project.summary}</p>
      </div>
      {project.images[0] && (
        <div className={styles.cover}>
          <Image
            src={project.images[0]}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className={styles.img}
          />
        </div>
      )}
    </header>
  );
}
