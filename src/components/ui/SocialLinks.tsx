import { siteConfig } from "@/data/site";
import styles from "./social-links.module.css";

type SocialLinksProps = {
  variant?: "default" | "large" | "footer";
  className?: string;
};

export function SocialLinks({ variant = "default", className }: SocialLinksProps) {
  const { social } = siteConfig;

  const variantClass =
    variant === "large" ? styles.large : variant === "footer" ? styles.footer : "";

  return (
    <ul
      className={`${styles.list} ${variantClass} ${className ?? ""}`}
      aria-label="Social media links"
    >
      <li className={styles.item}>
        <a
          href={social.github}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
          aria-label="GitHub"
        >
          <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
        </a>
      </li>
      <li className={styles.item}>
        <a
          href={social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
          aria-label="LinkedIn"
        >
          <svg className={styles.icon} viewBox="0 0 30 24" aria-hidden="true">
            <path d="M19.6 19v-5.8c0-1.4-.5-2.4-1.7-2.4-1 0-1.5.7-1.8 1.3-.3.5-.3.8-.3 1.3V19h-3.4V8.2H16v1.5h0C16.4 9 17.2 7.9 19 7.9c2.3 0 4 1.5 4 4.9V19h-3.4zM8.9 6.7C7.7 6.7 7 5.9 7 4.9 7 3.8 7.8 3 8.9 3s1.9.8 1.9 1.9c0 1.1-.8 1.9-1.9 1.9zM10.6 19H7.2V8.2h3.4V19z" />
          </svg>
        </a>
      </li>
      <li className={styles.item}>
        <a
          href={social.medium}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
          aria-label="Medium"
        >
          <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
            <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zm7.42 0c0 3.77-1.12 6.82-2.5 6.82-1.38 0-2.5-3.05-2.5-6.82s1.12-6.82 2.5-6.82 2.5 3.05 2.5 6.82zm2.5 0c0 3.45-.5 6.25-1.12 6.25-.62 0-1.12-2.8-1.12-6.25s.5-6.25 1.12-6.25 1.12 2.8 1.12 6.25z" />
          </svg>
        </a>
      </li>
    </ul>
  );
}
