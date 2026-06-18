import Link from "next/link";
import styles from "./Header.module.css";
import { LangToggle } from "./LangToggle";

export function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>MM<span>.</span></Link>
      <nav className={styles.nav}>
        <Link href="/work">01 Work</Link>
        <Link href="/about">02 About</Link>
        <Link href="/#contact">03 Contact</Link>
      </nav>
      <span className={styles.right}>
        <LangToggle />
        <span className={styles.status}><i />Available · Montréal</span>
      </span>
    </header>
  );
}
