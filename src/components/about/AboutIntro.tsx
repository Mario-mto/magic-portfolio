"use client";
import Image from "next/image";
import { useLang, tr } from "@/lib/i18n";
import { site } from "@/resources/site";
import styles from "./AboutIntro.module.css";

export function AboutIntro() {
  const { lang } = useLang();
  return (
    <div className={`container ${styles.intro}`}>
      <Image src={site.person.avatar} alt={site.person.name} width={120} height={120} className={styles.avatar} />
      <div>
        <h1>{site.person.name}</h1>
        <p className={styles.role}>{tr(lang, site.person.role)} · {tr(lang, site.person.location)}</p>
        <p className={styles.bio}>{tr(lang, site.about.intro)}</p>
        <p className={`mono ${styles.permit}`}>{tr(lang, site.about.workPermit)}</p>
      </div>
    </div>
  );
}
