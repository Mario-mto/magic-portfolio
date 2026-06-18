"use client";
import { useLang, tr } from "@/lib/i18n";
import { site } from "@/resources/site";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import styles from "./CapabilitiesGrid.module.css";

export function CapabilitiesGrid() {
  const { lang } = useLang();
  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.h}>{tr(lang, site.headings.capabilities)}</h2>
        <Reveal className={styles.grid} childrenStagger>
          {site.skills.map((skill) => (
            <article key={tr(lang, skill.title)} className={styles.card}>
              <h3 className={styles.title}>{tr(lang, skill.title)}</h3>
              <p className={styles.desc}>{tr(lang, skill.description)}</p>
              <div className={styles.tags}>{skill.tags.map((t) => <Tag key={t}>{t}</Tag>)}</div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
