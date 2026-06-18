"use client";
import { useLang, tr } from "@/lib/i18n";
import { site } from "@/resources/site";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./DeploymentLog.module.css";

export function DeploymentLog() {
  const { lang } = useLang();
  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.h}>{tr(lang, site.headings.deploymentLog)}</h2>

        <h3 className={styles.subh}>{tr(lang, site.headings.experience)}</h3>
        <Reveal className={styles.log} childrenStagger>
          {site.experience.map((e) => (
            <article key={tr(lang, e.role)} className={styles.entry}>
              <div className={styles.time}>{e.timeframe}</div>
              <div className={styles.body}>
                <h4 className={styles.role}>{tr(lang, e.role)}</h4>
                <div className={styles.org}>{tr(lang, e.org)} · {tr(lang, e.location)}</div>
                <ul className={styles.bullets}>
                  {e.bullets.map((b, i) => <li key={i}>{tr(lang, b)}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </Reveal>

        <h3 className={styles.subh}>{tr(lang, site.headings.education)}</h3>
        <Reveal className={styles.log} childrenStagger>
          {site.studies.map((s) => (
            <article key={tr(lang, s.degree)} className={styles.entry}>
              <div className={styles.time}>{s.timeframe}</div>
              <div className={styles.body}>
                <h4 className={styles.role}>{tr(lang, s.degree)}</h4>
                <div className={styles.org}>{tr(lang, s.institution)} · {tr(lang, s.location)}</div>
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
