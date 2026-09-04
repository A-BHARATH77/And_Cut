"use client";

/**
 * ServicesPreloader
 *
 * Mounted in ROOT LAYOUT — lives the entire page session.
 *
 * Responsibilities:
 * ─────────────────────────────────────────────────────────────────
 * 1. Calls `prefetchVideos` for all useLocalCard entries (UGC + DVC webm files)
 *    as early as possible (both at module evaluation time AND inside useEffect
 *    as a safety net). This starts Range requests in parallel during the
 *    preloader animation, so blobs are ready before the user reaches Services.
 *
 * 2. Preloads non-local-card local video assets via hidden <video> elements.
 *
 * 3. Injects <link rel="preload" as="image"> for Photoshoot images.
 *
 * Vimeo videos (Micro Drama) use VimeoFacadeCard:
 *   Phase 1 — pre-baked thumbnail shown immediately (no blank boxes)
 *   Phase 2 — iframe injected when section is ~500 px from viewport
 *   Phase 3 — thumbnail cross-fades out once iframe fires "ready"
 */

import { useEffect } from "react";
import { FORMATS_DATA } from "@/data/services";
import { prefetchVideos } from "@/lib/videoCache";

const allItems = Object.values(FORMATS_DATA).flat();

// Local blob-fetch paths — all entries with useLocalCard: true (UGC + DVC)
const localCardVideoPaths = Array.from(
  new Set(
    allItems
      .filter((v) => v.useLocalCard)
      .map((v) => v.videoPath)
  )
);

// Non-UGC local videos (no vimeoId, no useLocalCard) — warm via hidden <video>
const otherLocalVideos = Array.from(
  new Set(
    allItems
      .filter((v) => !v.vimeoId && !v.useLocalCard)
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

// ── Fire at module-evaluation time (runs before React renders) ────────────────
if (typeof window !== "undefined" && localCardVideoPaths.length > 0) {
  prefetchVideos(localCardVideoPaths);
}

export default function ServicesPreloader() {
  // Safety-net: also fire inside useEffect for SSR hydration scenarios
  useEffect(() => {
    if (localCardVideoPaths.length > 0) {
      prefetchVideos(localCardVideoPaths);
    }
  }, []);

  // Inject <link rel="preload"> for local images
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
    <div
      aria-hidden="true"
      style={{
        position:      "fixed",
        top:           "-9999px",
        left:          "-9999px",
        opacity:       0,
        pointerEvents: "none",
        zIndex:        -1,
      }}
    >
      {/* Non-UGC local videos — hidden autoPlay to warm the HTTP cache */}
      {otherLocalVideos.map((src) => (
        <video
          key={src}
          src={src}
          muted
          autoPlay
          playsInline
          preload="auto"
          tabIndex={-1}
          style={{ width: 1, height: 1, display: "block" }}
        />
      ))}
    </div>
  );
}
