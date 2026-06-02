import { SocialLinks } from "@/components/ui/SocialLinks";
import styles from "./site-footer.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer} aria-label="Site footer">
      <SocialLinks className={styles.social} variant="footer" />
    </footer>
  );
}
