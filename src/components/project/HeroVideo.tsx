"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLang, tr } from "@/lib/i18n";
import { site } from "@/resources/site";
import styles from "./ProjectHero.module.css";

const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Showreel-style hero for landing-page projects. The poster paints first via
 * next/image (so it stays the optimized LCP element); the video itself is only
 * attached and played once the hero is actually on screen AND motion is allowed
 * — so prefers-reduced-motion visitors never download the (large) clip, and the
 * stream never races first paint. It pauses again while off-screen.
 */
export function HeroVideo({ src, poster, title }: { src: string; poster?: string; title: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const { lang } = useLang();
  const [playing, setPlaying] = useState(false);
  // Whether the visitor allows motion — gates both autoplay and the download.
  const wantPlay = useRef(false);

  // Attach the source + play/pause based on real visibility, not on mount.
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    // Read the preference live: useReducedMotion starts false for hydration
    // safety, which would otherwise autoplay for one frame before correcting.
    wantPlay.current = !window.matchMedia(REDUCE_QUERY).matches;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && wantPlay.current) {
          if (!v.currentSrc && !v.src) v.src = src; // begin downloading only when visible
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [src]);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      wantPlay.current = true;
      if (!v.currentSrc && !v.src) v.src = src;
      v.play().catch(() => {});
    } else {
      wantPlay.current = false;
      v.pause();
    }
  };

  const videoLabel =
    lang === "fr"
      ? `Capture vidéo de la landing page ${title}`
      : `Screen recording of the ${title} landing page`;

  return (
    <div className={styles.cover}>
      {poster && (
        <Image src={poster} alt={title} fill priority sizes="100vw" className={styles.img} />
      )}
      {/* biome-ignore lint/a11y/useMediaCaption: silent ambient showreel, no audio track to caption */}
      <video
        ref={ref}
        className={styles.video}
        muted
        loop
        playsInline
        preload="none"
        aria-label={videoLabel}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <button
        type="button"
        className={styles.videoBtn}
        onClick={toggle}
        aria-label={tr(lang, playing ? site.project.pauseVideo : site.project.playVideo)}
      >
        <span aria-hidden="true">{playing ? "❚❚" : "►"}</span>
      </button>
    </div>
  );
}
