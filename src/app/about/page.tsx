import type { Metadata } from "next";
import { about } from "@/resources";
import { AboutIntro } from "@/components/about/AboutIntro";
import { DeploymentLog } from "@/components/home/DeploymentLog";
import { CapabilitiesGrid } from "@/components/home/CapabilitiesGrid";
import { ContactCTA } from "@/components/home/ContactCTA";

export const metadata: Metadata = { title: about.title, description: about.description };

export default function About() {
  return (
    <section style={{ paddingTop: "120px" }}>
      <AboutIntro />
      <DeploymentLog />
      <CapabilitiesGrid />
      <ContactCTA />
    </section>
  );
}
