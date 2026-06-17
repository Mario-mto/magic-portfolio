import { person, social, about } from "@/resources";
import styles from "./ContactCTA.module.css";

export function ContactCTA() {
  return (
    <section className={styles.section} id="contact">
      <div className="container">
        <h2 className={styles.big}>Let's build something that ships.</h2>
        <div className={styles.links}>
          <a href={`mailto:${person.email}`} className={styles.primary}>{person.email}</a>
          {about.calendar?.display && about.calendar.link && (
            <a href={about.calendar.link} target="_blank" rel="noreferrer" className={styles.link}>Book a call ↗</a>
          )}
          {social.filter((s) => s.essential && s.name !== "Email").map((s) => (
            <a key={s.name} href={s.link} target="_blank" rel="noreferrer" className={styles.link}>{s.name}</a>
          ))}
        </div>
      </div>
    </section>
  );
}
