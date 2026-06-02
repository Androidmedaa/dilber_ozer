import type { Project } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import styles from "./project-gallery.module.css";

type ProjectGalleryProps = {
  projects: Project[];
};

export function ProjectGallery({ projects }: ProjectGalleryProps) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <section className={styles.gallery} aria-label="Project gallery">
      {projects.map((project, index) => (
        <ProjectCard key={project.slug} project={project} index={index} />
      ))}
    </section>
  );
}
