"use client";
import Link from "next/link";
import { useLang, tr } from "@/lib/i18n";
import { site } from "@/resources/site";
import { LangToggle } from "./LangToggle";
import { LocalTime } from "./LocalTime";
import styles from "./Header.module.css";

export function Header() {
  const { lang } = useLang();
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>MM<span>.</span></Link>
      <nav className={styles.nav}>
        <Link href="/work">01 {tr(lang, site.nav.work)}</Link>
        <Link href="/about">02 {tr(lang, site.nav.about)}</Link>
        <Link href="/#contact">03 {tr(lang, site.nav.contact)}</Link>
      </nav>
      <span className={styles.right}>
        <LangToggle />
        <span className={styles.status}><i />{tr(lang, site.person.availability)} · Montréal<LocalTime /></span>
      </span>
    </header>
  );
}
