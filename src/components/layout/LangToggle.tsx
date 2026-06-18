"use client";
import { useLang } from "@/lib/i18n";
import styles from "./LangToggle.module.css";

export function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <span className={styles.toggle} role="group" aria-label="Language">
      <button type="button" className={lang === "en" ? styles.on : ""} aria-pressed={lang === "en"} onClick={() => setLang("en")}>EN</button>
      <span className={styles.sep} aria-hidden="true">/</span>
      <button type="button" className={lang === "fr" ? styles.on : ""} aria-pressed={lang === "fr"} onClick={() => setLang("fr")}>FR</button>
    </span>
  );
}
