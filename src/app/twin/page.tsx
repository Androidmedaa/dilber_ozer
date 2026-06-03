import { TwinChat } from "@/components/twin/TwinChat";
import type { Metadata } from "next";
import styles from "./twin-page.module.css";

export const metadata: Metadata = {
  title: "AI Digital Twin",
  description:
    "Speak with Dilber Özer's AI representative — powered by open-source LLM and portfolio knowledge.",
};

export default function TwinPage() {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>AI Digital Twin</h1>
        <p className={styles.lead}>
          Dilber hakkında sorularınızı yapay zeka temsilcisine sorun. Yanıtlar yalnızca CV,
          portföy ve proje verilerine dayanır.
        </p>
      </header>
      <TwinChat />
    </>
  );
}
