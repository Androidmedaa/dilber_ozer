"use client";

import { useState, type FormEvent } from "react";
import styles from "@/components/pages/static-page.module.css";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(formData.get("name") ?? ""),
          email: String(formData.get("email") ?? ""),
          message: String(formData.get("message") ?? ""),
        }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "Could not send your message. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Could not send your message. Please try again.",
      );
    }
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <label className={styles.label}>
          Name
          <input
            className={styles.input}
            type="text"
            name="name"
            required
            autoComplete="name"
            disabled={status === "submitting"}
          />
        </label>
        <label className={styles.label}>
          Email
          <input
            className={styles.input}
            type="email"
            name="email"
            required
            autoComplete="email"
            disabled={status === "submitting"}
          />
        </label>
        <label className={styles.label}>
          Message
          <textarea
            className={styles.textarea}
            name="message"
            required
            disabled={status === "submitting"}
          />
        </label>
        <button type="submit" className={styles.submit} disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Send Message"}
        </button>
      </form>

      {status === "success" && (
        <p className={styles.formFeedback} role="status">
          Thanks — your message was sent. I will get back to you soon.
        </p>
      )}
      {status === "error" && (
        <p className={`${styles.formFeedback} ${styles.formFeedbackError}`} role="alert">
          {errorMessage}
        </p>
      )}
    </>
  );
}
