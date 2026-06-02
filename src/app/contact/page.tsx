import { ContactForm } from "@/components/contact/ContactForm";
import type { Metadata } from "next";
import styles from "@/components/pages/static-page.module.css";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <>
      <header className={styles.masthead}>
        <h1 className={styles.title}>Contact</h1>
        <p className={styles.lead}>
          Open to collaborations, internships, and full-time opportunities.
        </p>
      </header>
      <div className={styles.content}>
        <ContactForm />
      </div>
    </>
  );
}
