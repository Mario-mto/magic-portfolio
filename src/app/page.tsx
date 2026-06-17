import { getProjects, sortByDate } from "@/lib/projects";
import { HeroLatentSpace } from "@/components/home/HeroLatentSpace";
import { ManifestoMarquee } from "@/components/home/ManifestoMarquee";
import { SelectedWorkCarousel } from "@/components/home/SelectedWorkCarousel";
import { CapabilitiesGrid } from "@/components/home/CapabilitiesGrid";
import { DeploymentLog } from "@/components/home/DeploymentLog";
import { ContactCTA } from "@/components/home/ContactCTA";
import { PipelineRail } from "@/components/layout/PipelineRail";

export default function Home() {
  const projects = sortByDate(getProjects());
  return (
    <>
      <PipelineRail />
      <HeroLatentSpace projects={projects.map((p) => ({ slug: p.slug, title: p.title }))} />
      <ManifestoMarquee />
      <SelectedWorkCarousel projects={projects} />
      <CapabilitiesGrid />
      <DeploymentLog />
      <ContactCTA />
    </>
  );
}
