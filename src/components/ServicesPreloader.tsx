"use client";

/**
 * ServicesPreloader
 *
 * Mounts as an invisible background element immediately on page load.
 * It has two jobs:
 *
 * 1. LOCAL MEDIA PRELOAD — injects <link rel="preload"> tags for every .webp
 *    image and .webm/.mp4 video in the services data, so the browser fetches
 *    and caches them before the user ever scrolls to the carousel.
 *
 * 2. VIMEO IFRAME WARM-UP — renders hidden Vimeo iframes for every vimeoId
 *    in the services data with the background=1 query parameter.  Vimeo begins
 *    buffering the first frame immediately on mount.  When the visible carousel
 *    later mounts its own copy, Vimeo's own internal CDN cache means the video
 *    starts nearly instantly.
 *
 * The whole component is visually hidden (aria-hidden, pointer-events-none,
 * position absolute, size-0 overflow-hidden) so it has zero layout impact.
 */

import { useEffect, useRef } from "react";
import { FORMATS_DATA } from "@/data/services";

// Collect all unique vimeoIds and all local asset paths across all categories
const allItems = Object.values(FORMATS_DATA).flat();

const allVimeoIds = Array.from(
  new Set(allItems.map((v) => v.vimeoId).filter(Boolean) as string[])
);

const allLocalAssets = Array.from(
  new Set(
    allItems
      .filter((v) => !v.vimeoId)
      .map((v) => v.videoPath)
  )
);

export default function ServicesPreloader() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Inject <link rel="preload"> tags into <head> for local media assets
  useEffect(() => {
    const injected: HTMLLinkElement[] = [];

    allLocalAssets.forEach((src) => {
      const ext = src.split(".").pop()?.toLowerCase() ?? "";
      const asType = ["webp", "jpg", "jpeg", "png", "gif"].includes(ext)
        ? "image"
        : "video";

      const link = document.createElement("link");
      link.rel = "preload";
      link.href = src;
      link.as = asType;
      link.setAttribute("crossorigin", "anonymous");
      document.head.appendChild(link);
      injected.push(link);
    });

    return () => {
      injected.forEach((l) => l.parentNode?.removeChild(l));
    };
  }, []);

  if (allVimeoIds.length === 0) return null;

  return (
    <div
      ref={containerRef}
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
      {allVimeoIds.map((id) => {
        const src =
          `https://player.vimeo.com/video/${id}` +
          `?autoplay=1&muted=1&loop=1&background=1&controls=0` +
          `&autopause=0&title=0&byline=0&portrait=0&dnt=1&playsinline=1&quality=360p`;

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
