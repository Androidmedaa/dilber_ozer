"use client";

import { useEffect } from "react";
import Image from "next/image";
import styles from "./image-lightbox.module.css";

export type LightboxImage = {
  src: string;
  alt: string;
  caption?: string;
};

type ImageLightboxProps = {
  images: LightboxImage[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export function ImageLightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: ImageLightboxProps) {
  const current = images[currentIndex];

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrev();
      if (event.key === "ArrowRight") onNext();
    };

    document.addEventListener("keydown", onKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose, onNext, onPrev]);

  if (!current) return null;

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Image preview">
      <button
        type="button"
        className={styles.backdrop}
        aria-label="Close image preview"
        onClick={onClose}
      />

      <div className={styles.content}>
        <button type="button" className={styles.close} aria-label="Close" onClick={onClose}>
          ×
        </button>

        {images.length > 1 && (
          <>
            <button
              type="button"
              className={`${styles.nav} ${styles.navPrev}`}
              aria-label="Previous image"
              onClick={onPrev}
            >
              ‹
            </button>
            <button
              type="button"
              className={`${styles.nav} ${styles.navNext}`}
              aria-label="Next image"
              onClick={onNext}
            >
              ›
            </button>
          </>
        )}

        <figure className={styles.figure}>
          <div className={styles.imageWrap}>
            <Image
              src={current.src}
              alt={current.alt}
              fill
              sizes="100vw"
              className={styles.image}
              priority
            />
          </div>
          {current.caption && <figcaption className={styles.caption}>{current.caption}</figcaption>}
        </figure>
      </div>
    </div>
  );
}
