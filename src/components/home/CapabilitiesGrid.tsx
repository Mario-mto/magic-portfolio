import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { about } from "@/resources";
import styles from "./CapabilitiesGrid.module.css";

export function CapabilitiesGrid() {
  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.h}>Capabilities</h2>
        <Reveal className={styles.grid} childrenStagger>
          {about.technical.skills.map((skill) => (
            <article key={skill.title} className={styles.card}>
              <h3 className={styles.title}>{skill.title}</h3>
              <p className={styles.desc}>{skill.description}</p>
              <div className={styles.tags}>{skill.tags?.map((t) => <Tag key={t.name}>{t.name}</Tag>)}</div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
