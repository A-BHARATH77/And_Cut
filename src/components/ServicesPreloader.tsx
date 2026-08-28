"use client";

/**
 * ServicesPreloader
 *
 * Always mounted in the root layout (layout.tsx) — it stays alive the ENTIRE
 * page session, not just during the preloader animation.
 *
 * Jobs:
 * 1. LOCAL MEDIA PRELOAD — injects hidden <video> elements for every .webm/.mp4
 *    in the services data so the browser fetches, decodes, and caches them before
 *    the user scrolls to the carousel. <link rel="preload"> is also injected for
 *    static image assets (.webp / .jpg etc.).
 *
 * 2. VIMEO IFRAME WARM-UP — keeps hidden Vimeo iframes in the DOM for every
 *    vimeoId. Because this component never unmounts, Vimeo maintains its buffered
 *    connection and CDN segment cache across the full session. When the visible
 *    carousel mounts its own iframes, Vimeo's CDN cache is already warm and the
 *    video starts nearly instantly instead of showing a blank box.
 *
 * Visually invisible: aria-hidden, pointer-events-none, position absolute,
 * size-0, overflow-hidden — zero layout impact.
 */

import { useEffect } from "react";
import { FORMATS_DATA } from "@/data/services";

// ─── Collect unique assets across all service categories ─────────────────────

const allItems = Object.values(FORMATS_DATA).flat();

const allVimeoIds = Array.from(
  new Set(allItems.map((v) => v.vimeoId).filter(Boolean) as string[])
);

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

// ─────────────────────────────────────────────────────────────────────────────

export default function ServicesPreloader() {
  // Inject <link rel="preload"> for image assets into <head>
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

    return () => {
      injected.forEach((l) => l.parentNode?.removeChild(l));
    };
  }, []);

  return (
    // Zero-size invisible container — no layout impact
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        width: 0,
        height: 0,
        overflow: "hidden",
        pointerEvents: "none",
        opacity: 0,
        zIndex: -1,
      }}
    >
      {/* ── Hidden <video> elements for local assets ─────────────────────
          preload="auto" tells the browser to fetch + decode the full video.
          This warms the browser HTTP cache so the visible carousel <video>
          elements start playing immediately without blank-frame delays.
      ──────────────────────────────────────────────────────────────────── */}
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

      {/* ── Hidden Vimeo iframes ──────────────────────────────────────────
          These stay alive for the ENTIRE page session (component never
          unmounts). Vimeo buffers the video segments while the preloader
          animation plays. By the time the user scrolls to the carousel, the
          CDN cache is warm and visible iframes load in <1 s.
      ──────────────────────────────────────────────────────────────────── */}
      {allVimeoIds.map((id) => {
        const src =
          `https://player.vimeo.com/video/${id}` +
          `?autoplay=1&muted=1&loop=1&background=1&controls=0` +
          `&autopause=0&title=0&byline=0&portrait=0&dnt=1&playsinline=1&quality=360p` +
          `&player_id=${encodeURIComponent(`services-preload-${id}`)}`;

        return (
          <iframe
            key={id}
            src={src}
            width="1"
            height="1"
            allow="autoplay; fullscreen; picture-in-picture"
            tabIndex={-1}
            title={`preload-${id}`}
            style={{ border: "none", display: "block" }}
            loading="eager"
          />
        );
      })}
    </div>
  );
}
