import { ArtificialIntelligenceContent } from "@/components/artificial-intelligence/ArtificialIntelligenceContent";
import { ProjectGallery } from "@/components/home/ProjectGallery";
import { getProjectsByGallery } from "@/data/projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Software Engineering",
};

export default function ArtificialIntelligencePage() {
  const projects = getProjectsByGallery("ai");

  return (
    <>
      <ArtificialIntelligenceContent />
      <ProjectGallery projects={projects} />
    </>
  );
}
