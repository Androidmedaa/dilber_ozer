import { siteConfig } from "@/data/site";
import styles from "./hero.module.css";

export function Hero() {
  const lines = [
    `📍 ${siteConfig.location}`,
    `💼 ${siteConfig.role}`,
    `🎓 ${siteConfig.education}`,
    `👩‍💻 ${siteConfig.experience}`,
    ...(siteConfig.bio ? [`🌎 ${siteConfig.bio}`] : []),
  ];

  return (
    <section className={styles.masthead} aria-labelledby="hero-title">
      <div className={styles.contents}>
        <h1 id="hero-title" className={styles.title}>
          {siteConfig.title}
        </h1>
        <p className={styles.text}>
          {lines.map((line) => (
            <span key={line} className={styles.line}>
              {line}
              {"\n"}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
