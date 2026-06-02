import { Hero } from "@/components/home/Hero";
import { MediumOcrFeature } from "@/components/home/MediumOcrFeature";
import { ProjectGallery } from "@/components/home/ProjectGallery";
import { getProjectsByGallery } from "@/data/projects";

export default function HomePage() {
  const projects = getProjectsByGallery("work");

  return (
    <>
      <Hero />
      <ProjectGallery projects={projects} />
      <MediumOcrFeature />
    </>
  );
}
