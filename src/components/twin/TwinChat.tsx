"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { siteConfig } from "@/data/site";
import styles from "./twin-chat.module.css";

type ChatMode = "default" | "interview" | "skills";

type Message = {
  role: "user" | "assistant";
  content: string;
  fallback?: boolean;
};

const GREETING_TR =
  "Merhaba, ben Dilber'in yapay zeka temsilcisiyim. Dilber hakkında merak ettiğiniz her şeyi bana sorabilirsiniz.";

export function TwinChat() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: GREETING_TR },
  ]);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<ChatMode>("default");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
    });
  }, []);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setError("");
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setLoading(true);
    scrollToBottom();

    try {
      const response = await fetch("/api/twin/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, mode, locale: "tr" }),
      });

      const data = (await response.json()) as {
        reply?: string;
        error?: string;
        fallback?: boolean;
      };

      if (!response.ok) {
        throw new Error(data.error ?? "Yanıt alınamadı.");
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply ?? "Yanıt boş geldi.",
          fallback: data.fallback,
        },
      ]);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Bağlantı hatası.";
      setError(msg);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Şu an backend'e bağlanamıyorum. `backend` klasöründe uvicorn çalıştırın ve Ollama'yı açın. Detay: backend/README.md",
          fallback: true,
        },
      ]);
    } finally {
      setLoading(false);
      scrollToBottom();
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    void sendMessage(input);
  }

  return (
    <div className={styles.layout}>
      <aside className={styles.avatarPanel} aria-label="AI representative">
        <div className={styles.avatarWrap}>
          <Image
            src={siteConfig.profileImage}
            alt="Dilber Özer"
            fill
            className={styles.avatarImage}
            sizes="280px"
            priority
          />
        </div>
        <p className={styles.avatarCaption}>
          AI Digital Twin · Phase 1 (text)
        </p>
        <p className={styles.avatarNote}>
          Ses ve avatar animasyonu Phase 2–3&apos;te eklenecek (open-source STT/TTS).
        </p>
      </aside>

      <section className={styles.chatPanel}>
        <div className={styles.modeBar}>
          <span className={styles.modeLabel}>Mod:</span>
          {(
            [
              ["default", "Genel"],
              ["interview", "Mülakat"],
              ["skills", "Yetenekler"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              className={`${styles.modeBtn} ${mode === value ? styles.modeBtnActive : ""}`}
              onClick={() => setMode(value)}
              disabled={loading}
            >
              {label}
            </button>
          ))}
        </div>

        <div className={styles.messages} ref={listRef} role="log" aria-live="polite">
          {messages.map((msg, i) => (
            <div
              key={`${msg.role}-${i}`}
              className={`${styles.bubble} ${msg.role === "user" ? styles.bubbleUser : styles.bubbleAssistant}`}
            >
              {msg.content}
              {msg.fallback && <span className={styles.fallbackTag}> (offline / fallback)</span>}
            </div>
          ))}
          {loading && <div className={styles.typing}>Yanıt hazırlanıyor…</div>}
        </div>

        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Örn: Dilber hangi AI projelerini geliştirdi?"
            disabled={loading}
            autoComplete="off"
          />
          <button type="submit" className={styles.send} disabled={loading || !input.trim()}>
            Gönder
          </button>
        </form>

        <p className={styles.hint}>
          Open-source LLM: Ollama · Bilgi: CV + portföy (RAG Phase 1)
        </p>
      </section>
    </div>
  );
}
