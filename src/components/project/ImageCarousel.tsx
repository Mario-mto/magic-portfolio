"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./ImageCarousel.module.css";

export function ImageCarousel({ images, title }: { images: string[]; title: string }) {
  const [open, setOpen] = useState<string | null>(null);
  const rest = images.slice(1);
  if (rest.length === 0) return null;
  return (
    <>
      <div className={styles.row}>
        {rest.map((src) => (
          <button key={src} className={styles.thumb} onClick={() => setOpen(src)}>
            <Image src={src} alt={title} width={640} height={400} className={styles.img} />
          </button>
        ))}
      </div>
      {open && (
        <div
          className={styles.lightbox}
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
        >
          <Image src={open} alt={title} width={1600} height={900} className={styles.full} />
        </div>
      )}
    </>
  );
}
