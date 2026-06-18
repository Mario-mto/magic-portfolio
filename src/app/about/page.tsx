import type { Metadata } from "next";
import Image from "next/image";
import { about, person } from "@/resources";
import { CapabilitiesGrid } from "@/components/home/CapabilitiesGrid";
import { DeploymentLog } from "@/components/home/DeploymentLog";
import { ContactCTA } from "@/components/home/ContactCTA";
import styles from "./about.module.css";

export const metadata: Metadata = { title: about.title, description: about.description };

export default function About() {
  return (
    <section style={{ paddingTop: "120px" }}>
      <div className={`container ${styles.intro}`}>
        <Image src={person.avatar} alt={person.name} width={120} height={120} className={styles.avatar} />
        <div>
          <h1>{person.name}</h1>
          <p className={styles.role}>{person.role} · {about.title.replace("About – ", "")}</p>
          <p className={styles.bio}>{about.intro.description}</p>
        </div>
      </div>
      <DeploymentLog />
      <CapabilitiesGrid />
      <ContactCTA />
    </section>
  );
}
