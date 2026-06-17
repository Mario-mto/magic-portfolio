import { person, social } from "@/resources";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <span>© {new Date().getFullYear()} {person.name}</span>
      <nav>{social.filter((s) => s.essential).map((s) => (
        <a key={s.name} href={s.link} target="_blank" rel="noreferrer">{s.name}</a>
      ))}</nav>
      <span className="mono">Built from scratch · no template</span>
    </footer>
  );
}
