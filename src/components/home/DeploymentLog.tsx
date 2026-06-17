import { Reveal } from "@/components/ui/Reveal";
import { about } from "@/resources";
import styles from "./DeploymentLog.module.css";

export function DeploymentLog() {
  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.h}>Deployment log</h2>
        <Reveal className={styles.log} childrenStagger>
          {about.work.experiences.map((exp) => (
            <div key={exp.company} className={styles.row}>
              <span className={styles.time}>{exp.timeframe}</span>
              <div><div className={styles.role}>{exp.role} — {exp.company}</div></div>
            </div>
          ))}
          {about.studies.institutions.map((inst) => (
            <div key={inst.name} className={styles.row}>
              <span className={styles.time}>studies</span>
              <div><div className={styles.role}>{inst.name}</div></div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
