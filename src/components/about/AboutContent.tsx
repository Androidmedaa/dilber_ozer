import {
  aboutCertifications,
  aboutCompetitions,
  aboutEducation,
  aboutProfile,
  aboutReferences,
  cvDownload,
} from "@/data/about";
import Link from "next/link";
import styles from "./about-content.module.css";

export function AboutContent() {
  return (
    <div className={styles.page}>
      <header className={styles.masthead}>
        <h1 className={styles.title}>About</h1>
      </header>

      <div className={styles.content}>
        <section aria-labelledby="about-intro-heading">
          <h2 id="about-intro-heading" className={styles.sectionTitle}>
            Profile
          </h2>
          {aboutProfile.split("\n\n").map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
          <p>
            <strong>Email:</strong>{" "}
            <a href="mailto:dilberozer.ceng@gmail.com" className={styles.link}>
              dilberozer.ceng@gmail.com
            </a>
          </p>
        </section>

        <section aria-labelledby="about-education-heading">
          <h2 id="about-education-heading" className={styles.sectionTitle}>
            Education
          </h2>
          <article className={styles.card}>
            <h3 className={styles.cardTitle}>{aboutEducation.degree}</h3>
            <p className={styles.cardMeta}>
              {aboutEducation.university} · {aboutEducation.location}
            </p>
            <p className={styles.cardMeta}>
              {aboutEducation.period} · CGPA: {aboutEducation.cgpa}
            </p>
          </article>
        </section>

        <section aria-labelledby="about-certifications-heading">
          <h2 id="about-certifications-heading" className={styles.sectionTitle}>
            Certifications &amp; Language
          </h2>
          <ul className={styles.bulletList}>
            {aboutCertifications.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="about-competitions-heading">
          <h2 id="about-competitions-heading" className={styles.sectionTitle}>
            Competitions &amp; Events
          </h2>
          <ul className={styles.entryList}>
            {aboutCompetitions.map((item) => (
              <li key={item.title} className={styles.entry}>
                <strong>{item.title}</strong>
                <span>{item.detail}</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="about-references-heading">
          <h2 id="about-references-heading" className={styles.sectionTitle}>
            References
          </h2>
          <ul className={styles.referenceList}>
            {aboutReferences.map((ref) => (
              <li key={ref.name} className={styles.referenceCard}>
                <p className={styles.referenceName}>
                  <strong>{ref.name}</strong>
                  <span> · {ref.company}</span>
                </p>
                {"email" in ref && ref.email && (
                  <p>
                    <a href={`mailto:${ref.email}`} className={styles.link}>
                      {ref.email}
                    </a>
                  </p>
                )}
                {"phone" in ref && ref.phone && (
                  <p>
                    <a href={`tel:${ref.phone.replace(/\s/g, "")}`} className={styles.link}>
                      {ref.phone}
                    </a>
                  </p>
                )}
                <p>
                  <a
                    href={ref.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    LinkedIn
                  </a>
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.cvSection} aria-labelledby="about-cv-heading">
          <h2 id="about-cv-heading" className={styles.sectionTitle}>
            Resume
          </h2>
          <Link
            href={cvDownload.href}
            download={cvDownload.fileName}
            className={styles.cvButton}
          >
            {cvDownload.label}
          </Link>
        </section>
      </div>
    </div>
  );
}
