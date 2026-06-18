"use client";
import { useLang, tr } from "@/lib/i18n";
import { site } from "@/resources/site";
import styles from "./Footer.module.css";

export function Footer() {
  const { lang } = useLang();
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <span>© {year} {site.person.name}</span>
      <nav>{site.social.filter((s) => s.essential).map((s) => (
        <a key={s.name} href={s.link} target="_blank" rel="noreferrer">{s.name}</a>
      ))}</nav>
      <span className="mono">{tr(lang, site.footerNote)}</span>
    </footer>
  );
}
