import type { Metadata } from "next";
import { getProjects, sortByDate } from "@/lib/projects";
import { ProjectGrid } from "@/components/work/ProjectGrid";
import { work } from "@/resources";

export const metadata: Metadata = { title: work.title, description: work.description };

export default function Work() {
  const projects = sortByDate(getProjects());
  return (
    <section style={{ paddingTop: "120px" }}>
      <ProjectGrid projects={projects} />
    </section>
  );
}
