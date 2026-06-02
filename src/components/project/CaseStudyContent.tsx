"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CASE_STUDY_SECTION_ORDER,
  type Project,
  type CaseStudySection,
} from "@/data/projects";
import { ImageLightbox, type LightboxImage } from "@/components/ui/ImageLightbox";
import styles from "./case-study.module.css";

type CaseStudyContentProps = {
  project: Project;
};

type SectionBlockProps = {
  section: CaseStudySection;
  getLightboxIndex: (image: NonNullable<CaseStudySection["images"]>[number]) => number;
  onOpenLightbox: (index: number) => void;
};

function SectionBlock({ section, getLightboxIndex, onOpenLightbox }: SectionBlockProps) {
  return (
    <section className={styles.section} id={section.id} aria-labelledby={`${section.id}-title`}>
      <h2 className={styles.sectionTitle} id={`${section.id}-title`}>
        {section.title}
      </h2>
      <p className={styles.sectionBody}>{section.content}</p>
      {section.bullets && section.bullets.length > 0 && (
        <ul className={styles.bulletList}>
          {section.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
      {section.images && section.images.length > 0 && (
        <div className={styles.imageGrid}>
          {section.images.map((image, idx) => (
            <figure key={image.src} className={styles.figure}>
              {image.href ? (
                <a
                  href={image.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.imageLink}
                >
                  <Image src={image.src} alt={image.alt} width={1920} height={1080} />
                </a>
              ) : (
                <button
                  type="button"
                  className={styles.imageButton}
                  onClick={() => onOpenLightbox(getLightboxIndex(section.images![idx]))}
                  aria-label={`Open image: ${image.alt}`}
                >
                  <Image src={image.src} alt={image.alt} width={1920} height={1080} />
                </button>
              )}
              {image.caption && (
                <figcaption className={styles.caption}>{image.caption}</figcaption>
              )}
            </figure>
          ))}
        </div>
      )}
    </section>
  );
}

function MiniProjectBlock({
  index,
  mini,
}: {
  index: number;
  mini: NonNullable<Project["miniProjects"]>[number];
}) {
  return (
    <section
      className={styles.miniProject}
      id={`mini-project-${index + 1}`}
      aria-labelledby={`mini-project-${index + 1}-title`}
    >
      <h2 className={styles.miniProjectTitle} id={`mini-project-${index + 1}-title`}>
        {index + 1}. {mini.title}
      </h2>
      <p className={styles.sectionBody}>{mini.description}</p>
      {mini.repository && (
        <p className={styles.miniRepo}>
          <strong>Repository:</strong>{" "}
          <a
            href={mini.repository}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.repoLink}
          >
            {mini.repository.replace("https://github.com/", "")}
          </a>
        </p>
      )}
      <p className={styles.miniTechLabel}>
        <strong>Technologies:</strong>
      </p>
      <ul className={styles.techList}>
        {mini.technologies.map((tech) => (
          <li key={tech} className={styles.techTag}>
            {tech}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function CaseStudyContent({ project }: CaseStudyContentProps) {
  const { sections } = project;
  const isCollection = project.miniProjects && project.miniProjects.length > 0;
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const fitContain = project.coverFit === "contain";
  const renderedSections = useMemo(
    () =>
      isCollection
        ? [sections.projectOverview]
        : CASE_STUDY_SECTION_ORDER.map((key) => sections[key]),
    [isCollection, sections],
  );

  const lightboxImages = useMemo<LightboxImage[]>(
    () =>
      renderedSections.flatMap((section) =>
        (section.images ?? [])
          .filter((image) => !image.href)
          .map((image) => ({
            src: image.src,
            alt: image.alt,
            caption: image.caption,
          })),
      ),
    [renderedSections],
  );

  const lightboxIndexMap = useMemo(() => {
    const map = new Map<object, number>();
    let index = 0;

    for (const section of renderedSections) {
      for (const image of section.images ?? []) {
        if (!image.href) {
          map.set(image, index);
          index += 1;
        }
      }
    }

    return map;
  }, [renderedSections]);

  const openLightboxAt = (index: number) => {
    if (index >= 0 && index < lightboxImages.length) {
      setActiveLightboxIndex(index);
    }
  };

  return (
    <article className={`${styles.page} ${fitContain ? styles.pageContainCovers : ""}`}>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>{project.title}</h1>
      </header>

      <div className={`${styles.heroImage} ${fitContain ? styles.heroImageContain : ""}`}>
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          className={`${styles.heroImg} ${fitContain ? styles.heroImgContain : ""}`}
          sizes="(max-width: 932px) 100vw, 80vw"
          quality={90}
          style={{
            objectFit: project.coverFit ?? "cover",
            objectPosition: project.coverObjectPosition ?? "center",
          }}
          priority
        />
      </div>

      <div className={styles.header}>
        <div className={styles.meta}>
          <p>
            <strong>Role:</strong> <span>{project.role}</span>
          </p>
          <p>
            <strong>Duration:</strong> <span>{project.duration}</span>
          </p>
          {project.course && (
            <p>
              <strong>Course:</strong> <span>{project.course}</span>
            </p>
          )}
          {project.team && (
            <p>
              <strong>Team:</strong> <span>{project.team}</span>
            </p>
          )}
          {project.repository && (
            <p>
              <strong>Repository:</strong>{" "}
              <a
                href={project.repository}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.repoLink}
              >
                {project.repository.replace("https://github.com/", "")}
              </a>
            </p>
          )}
          <p>
            <strong>Category:</strong> <span>{project.category}</span>
          </p>
          <p>
            <strong>Technologies:</strong>
          </p>
          <ul className={styles.techList}>
            {project.technologies.map((tech) => (
              <li key={tech} className={styles.techTag}>
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {isCollection ? (
        <>
          <SectionBlock
            section={sections.projectOverview}
            getLightboxIndex={(image) => lightboxIndexMap.get(image) ?? -1}
            onOpenLightbox={openLightboxAt}
          />
          <div className={styles.miniProjectsList}>
            {project.miniProjects!.map((mini, index) => (
              <MiniProjectBlock key={mini.title} index={index} mini={mini} />
            ))}
          </div>
        </>
      ) : (
        CASE_STUDY_SECTION_ORDER.map((key) => (
          <SectionBlock
            key={key}
            section={sections[key]}
            getLightboxIndex={(image) => lightboxIndexMap.get(image) ?? -1}
            onOpenLightbox={openLightboxAt}
          />
        ))
      )}

      <Link href="/" className={styles.backLink}>
        ← Back to Projects
      </Link>

      {activeLightboxIndex !== null && (
        <ImageLightbox
          images={lightboxImages}
          currentIndex={activeLightboxIndex}
          onClose={() => setActiveLightboxIndex(null)}
          onPrev={() =>
            setActiveLightboxIndex((prev) =>
              prev === null ? null : (prev - 1 + lightboxImages.length) % lightboxImages.length,
            )
          }
          onNext={() =>
            setActiveLightboxIndex((prev) =>
              prev === null ? null : (prev + 1) % lightboxImages.length,
            )
          }
        />
      )}
    </article>
  );
}
