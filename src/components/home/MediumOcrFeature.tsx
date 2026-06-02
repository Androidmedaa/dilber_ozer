import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import styles from "./medium-ocr-feature.module.css";

export function MediumOcrFeature() {
  const { mediumOcrArticle } = siteConfig;

  return (
    <section
      className={styles.feature}
      aria-label={`Medium article: ${mediumOcrArticle.title}`}
    >
      <Link
        href={mediumOcrArticle.url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.card}
        aria-label={`Read on Medium: ${mediumOcrArticle.title}`}
      >
        <div className={styles.imageWrap}>
          <Image
            src={mediumOcrArticle.image}
            alt={mediumOcrArticle.imageAlt}
            fill
            className={styles.image}
            sizes="(max-width: 932px) 100vw, 80vw"
          />
        </div>
        <div className={styles.cardFooter}>
          <span className={styles.articleTitle}>{mediumOcrArticle.title}</span>
          <span className={styles.cta}>Read on Medium →</span>
        </div>
      </Link>
    </section>
  );
}
