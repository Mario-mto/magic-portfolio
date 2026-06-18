import type { Project } from "@/lib/projects-utils";
import styles from "./MetricsBar.module.css";

export function MetricsBar({ project }: { project: Project }) {
  return (
    <div className={`container ${styles.bar}`}>
      {project.metric && (
        <div className={styles.item}>
          <span className="mono">status</span>
          <strong>{project.metric}</strong>
        </div>
      )}
      {project.team[0] && (
        <div className={styles.item}>
          <span className="mono">role</span>
          <strong>{project.team[0].role}</strong>
        </div>
      )}
      {project.link && (
        <a href={project.link} target="_blank" rel="noreferrer" className={styles.repo}>
          View on GitHub ↗
        </a>
      )}
    </div>
  );
}
