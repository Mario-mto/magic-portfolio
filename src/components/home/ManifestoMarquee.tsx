"use client";
import { useLang, tr } from "@/lib/i18n";
import { site } from "@/resources/site";
import { Reveal } from "@/components/ui/Reveal";
import { Marquee } from "@/components/ui/Marquee";
import { Counter } from "@/components/ui/Counter";
import styles from "./ManifestoMarquee.module.css";

export function ManifestoMarquee() {
  const { lang } = useLang();
  return (
    <section className={styles.section}>
      <Reveal className="container">
        <p className={styles.manifesto}>{tr(lang, site.manifesto)}</p>
      </Reveal>
      <div className={`container ${styles.stats}`}>
        {site.stats.map((s) => (
          <div key={tr(lang, s.label)} className={styles.stat}>
            <span className={styles.num}><Counter to={s.to} /></span>
            <span className="mono">{tr(lang, s.label)}</span>
          </div>
        ))}
      </div>
      <div className={styles.marquee}><Marquee items={site.tools} /></div>
    </section>
  );
}
