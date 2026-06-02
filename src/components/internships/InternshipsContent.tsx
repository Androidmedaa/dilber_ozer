"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { internshipExperiences, internshipsPageIntro } from "@/data/internships";
import { siteConfig } from "@/data/site";
import { ImageLightbox, type LightboxImage } from "@/components/ui/ImageLightbox";
import { HighlightText } from "./HighlightText";
import styles from "./internships-content.module.css";

export function InternshipsContent() {
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const lightboxImages = useMemo<LightboxImage[]>(
    () =>
      internshipExperiences.flatMap((item) =>
        (item.images ?? [])
          .filter((image) => !image.href)
          .map((image) => ({ src: image.src, alt: image.alt, caption: image.caption })),
      ),
    [],
  );
  const lightboxIndexMap = useMemo(() => {
    const map = new Map<object, number>();
    let index = 0;

    for (const item of internshipExperiences) {
      for (const image of item.images ?? []) {
        if (!image.href) {
          map.set(image, index);
          index += 1;
        }
      }
    }

    return map;
  }, []);

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Internships &amp; Work Experience</h1>
        <p className={styles.intro}>{internshipsPageIntro}</p>
        <Link
          href={siteConfig.social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.linkedinBanner}
        >
          <svg className={styles.linkedinIcon} viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          View my profile on LinkedIn
        </Link>
      </header>

      <div className={styles.list}>
        {internshipExperiences.map((item, index) => (
          <article
            key={item.id}
            className={styles.card}
            aria-labelledby={`internship-${item.id}-title`}
          >
            <div className={styles.cardHeader}>
              <span className={styles.index}>{index + 1}</span>
              <div className={styles.cardMeta}>
                <h2 className={styles.company} id={`internship-${item.id}-title`}>
                  {item.company}
                </h2>
                <p className={styles.role}>{item.role}</p>
                <p className={styles.periodLocation}>
                  <span>{item.period}</span>
                  <span className={styles.dot} aria-hidden="true">
                    ·
                  </span>
                  <span>{item.location}</span>
                </p>
              </div>
            </div>

            {item.roleDescription && (
              <>
                <h3 className={styles.subheading}>Role overview</h3>
                <p className={styles.roleDescription}>{item.roleDescription}</p>
              </>
            )}

            {item.companyAbout && (
              <>
                <h3 className={styles.subheading}>What CallMetric does</h3>
                <p className={styles.roleDescription}>{item.companyAbout}</p>
              </>
            )}

            <h3 className={styles.subheading}>What I worked on</h3>
            <ul className={styles.highlights}>
              {item.highlights.map((line) => (
                <li key={line}>
                  <HighlightText
                    text={line}
                    internshipId={item.id}
                    technologies={item.technologies}
                  />
                </li>
              ))}
            </ul>

            {item.teamAndProcess && item.teamAndProcess.length > 0 && (
              <>
                <h3 className={styles.subheading}>
                  Team, process &amp; startup experience
                </h3>
                <ul className={styles.highlights}>
                  {item.teamAndProcess.map((line) => (
                    <li key={line}>
                      <HighlightText
                        text={line}
                        internshipId={item.id}
                        technologies={[...item.technologies, "Jira", "Trello", "ClickUp"]}
                      />
                    </li>
                  ))}
                </ul>
              </>
            )}

            <h3 className={styles.subheading}>Key technologies</h3>
            <ul className={styles.techList}>
              {item.technologies.map((tech) => (
                <li key={tech} className={styles.techTag}>
                  {tech}
                </li>
              ))}
            </ul>

            {item.images && item.images.length > 0 && (
              <>
                <h3 className={styles.subheading}>Photos</h3>
                <div className={styles.imageGrid}>
                  {item.images.map((image) => (
                    <figure key={image.src} className={styles.figure}>
                      {image.href ? (
                        <a
                          href={image.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.imageLink}
                        >
                          <div
                            className={`${styles.imageWrap} ${image.objectFit === "contain" ? styles.imageWrapContain : ""}`}
                          >
                            <Image
                              src={image.src}
                              alt={image.alt}
                              fill
                              className={`${styles.image} ${image.objectFit === "contain" ? styles.imageContain : ""}`}
                              style={{
                                objectFit: image.objectFit ?? "cover",
                              }}
                              sizes="(max-width: 932px) 100vw, 360px"
                            />
                          </div>
                        </a>
                      ) : (
                        <button
                          type="button"
                          className={styles.imageButton}
                          onClick={() => {
                            const index = lightboxIndexMap.get(image) ?? -1;
                            if (index >= 0) setActiveLightboxIndex(index);
                          }}
                          aria-label={`Open image: ${image.alt}`}
                        >
                          <div
                            className={`${styles.imageWrap} ${image.objectFit === "contain" ? styles.imageWrapContain : ""}`}
                          >
                            <Image
                              src={image.src}
                              alt={image.alt}
                              fill
                              className={`${styles.image} ${image.objectFit === "contain" ? styles.imageContain : ""}`}
                              style={{
                                objectFit: image.objectFit ?? "cover",
                              }}
                              sizes="(max-width: 932px) 100vw, 360px"
                            />
                          </div>
                        </button>
                      )}
                      {image.caption && (
                        <figcaption className={styles.caption}>{image.caption}</figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              </>
            )}
          </article>
        ))}
      </div>

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
    </div>
  );
}
