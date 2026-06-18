"use client";
import { useLang, tr } from "@/lib/i18n";
import { site } from "@/resources/site";
import styles from "./ContactCTA.module.css";

export function ContactCTA() {
  const { lang } = useLang();
  return (
    <section className={styles.section} id="contact">
      <div className="container">
        <h2 className={styles.big}>{tr(lang, site.contact.heading)}</h2>
        <div className={styles.links}>
          <a href={`mailto:${site.person.email}`} className={styles.primary}>{site.person.email}</a>
          {site.social.filter((s) => s.essential && s.name !== "Email").map((s) => (
            <a key={s.name} href={s.link} target="_blank" rel="noreferrer" className={styles.link}>{s.name}</a>
          ))}
        </div>
      </div>
    </section>
  );
}
