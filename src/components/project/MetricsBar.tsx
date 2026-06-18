"use client";
import { useLang, tr } from "@/lib/i18n";
import { site } from "@/resources/site";
import type { Project } from "@/lib/projects-utils";
import styles from "./MetricsBar.module.css";

export function MetricsBar({ project }: { project: Project }) {
  const { lang } = useLang();
  const isGithub = project.link.includes("github");
  return (
    <div className={`container ${styles.bar}`}>
      {project.metric && (
        <div className={styles.item}>
          <span className="mono">{tr(lang, site.project.status)}</span>
          <strong>{project.metric}</strong>
        </div>
      )}
      {project.team[0] && (
        <div className={styles.item}>
          <span className="mono">{tr(lang, site.project.role)}</span>
          <strong>{project.team[0].role}</strong>
        </div>
      )}
      {project.link && (
        <a href={project.link} target="_blank" rel="noreferrer" className={styles.repo}>
          {tr(lang, isGithub ? site.project.github : site.project.visit)}
        </a>
      )}
    </div>
  );
}
