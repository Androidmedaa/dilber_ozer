import {
  aiFocusAreas,
  aiFoundationsText,
  aiLearningStory,
  aiPageIntro,
  aiStudyTopics,
} from "@/data/artificial-intelligence";
import styles from "./artificial-intelligence-content.module.css";

export function ArtificialIntelligenceContent() {
  return (
    <section className={styles.section} aria-labelledby="ai-expertise-title">
      <div className={styles.inner}>
        <h2 id="ai-expertise-title" className={styles.title}>
          How I Translate AI into Impact
        </h2>
        <p className={styles.intro}>{aiPageIntro}</p>

        <div className={styles.grid}>
          {aiFocusAreas.map((area) => (
            <article key={area.title} className={styles.card}>
              <h3 className={styles.cardTitle}>{area.title}</h3>
              <p className={styles.cardDescription}>{area.description}</p>
              <ul className={styles.list}>
                {area.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p className={styles.foundations}>{aiFoundationsText}</p>

        <article className={styles.storyCard} aria-labelledby="ai-learning-story-title">
          <h3 id="ai-learning-story-title" className={styles.storyTitle}>
            My Learning Journey in AI
          </h3>
          <p className={styles.storyText}>{aiLearningStory}</p>
          <h4 className={styles.topicsTitle}>Topics I actively study and practice</h4>
          <ul className={styles.topicsList}>
            {aiStudyTopics.map((topic) => (
              <li key={topic} className={styles.topicItem}>
                {topic}
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
