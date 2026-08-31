"use client";

/**
 * ServicesPreloader
 *
 * Mounted in the ROOT LAYOUT — lives for the ENTIRE page session.
 *
 * This is the single source of truth for preloading ALL service section assets
 * so they are ready BEFORE the user scrolls to the carousel — identical to how
 * Beyond Vertical and Our Work handle their videos.
 *
 * 1. LOCAL VIDEOS (.mp4 / .webm):
 *    Hidden <video preload="auto"> elements — browser downloads & caches them.
 *
 * 2. LOCAL IMAGES (.webp / .jpg):
 *    <link rel="preload" as="image"> injected into <head>.
 *
 * 3. VIMEO IFRAMES:
 *    All Vimeo iframes are mounted HERE at page load in a hidden 1×1 container.
 *    Vimeo begins buffering immediately. By the time the user scrolls to the
 *    Services section the videos are already playing — zero blank boxes.
 *    The Carousel's EarlyVimeoMount renders the SAME iframe src, so React/Vimeo
 *    reuses the already-warm session — there is no resize/reload issue because
 *    we keep the iframes here invisible (not moved into the carousel DOM).
 */

import { useEffect } from "react";
import { FORMATS_DATA } from "@/data/services";

const allItems = Object.values(FORMATS_DATA).flat();

// ─── Local video / image split ───────────────────────────────────────────────

const allLocalVideos = Array.from(
  new Set(
    allItems
      .filter((v) => !v.vimeoId)
      .map((v) => v.videoPath)
      .filter((p) => /\.(webm|mp4|mov)$/i.test(p))
  )
);

const allLocalImages = Array.from(
  new Set(
    allItems
      .filter((v) => !v.vimeoId)
      .map((v) => v.videoPath)
      .filter((p) => /\.(webp|jpg|jpeg|png)$/i.test(p))
  )
);

// ─── All unique Vimeo IDs ─────────────────────────────────────────────────────

const allVimeoIds = Array.from(
  new Set(
    allItems
      .filter((v) => !!v.vimeoId)
      .map((v) => v.vimeoId as string)
  )
);

// Build Vimeo src strings once (autoplay=1 + muted=1 + background=1 so Vimeo
// starts buffering immediately on mount — exactly what EarlyVimeoMount does).
function buildVimeoSrc(vimeoId: string) {
  return (
    `https://player.vimeo.com/video/${vimeoId}` +
    `?autoplay=1&muted=1&loop=1&controls=0&background=1` +
    `&autopause=0&title=0&byline=0&portrait=0&dnt=1&playsinline=1&quality=360p`
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ServicesPreloader() {
  // Inject <link rel="preload"> for static images
  useEffect(() => {
    const injected: HTMLLinkElement[] = [];
    allLocalImages.forEach((src) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.href = src;
      link.as = "image";
      link.setAttribute("crossorigin", "anonymous");
      document.head.appendChild(link);
      injected.push(link);
    });
    return () => { injected.forEach((l) => l.parentNode?.removeChild(l)); };
  }, []);

  return (
    /*
     * aria-hidden + 0-opacity + pointer-events:none + position:fixed + off-screen.
     * The iframes are INVISIBLE but FULLY MOUNTED so Vimeo buffers in the background.
     * position:fixed keeps them out of the document flow.
     */
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: "-9999px",
        left: "-9999px",
        width: 0,
        height: 0,
        overflow: "hidden",
        pointerEvents: "none",
        opacity: 0,
        zIndex: -1,
      }}
    >
      {/* Preload local .mp4 / .webm files */}
      {allLocalVideos.map((src) => (
        <video
          key={src}
          src={src}
          muted
          playsInline
          preload="auto"
          tabIndex={-1}
          style={{ width: 1, height: 1, display: "block" }}
        />
      ))}

      {/* Preload Vimeo iframes — same src pattern as EarlyVimeoMount in the Carousel.
          Vimeo starts buffering at 360p immediately on page load so by the time
          the user scrolls to the Services section the videos are already playing. */}
      {allVimeoIds.map((id) => (
        <iframe
          key={`sp-vimeo-${id}`}
          src={buildVimeoSrc(id)}
          allow="autoplay; fullscreen; picture-in-picture"
          tabIndex={-1}
          title={`vimeo-preload-${id}`}
          style={{ width: 1, height: 1, border: "none", display: "block" }}
        />
      ))}
    </div>
  );
}
