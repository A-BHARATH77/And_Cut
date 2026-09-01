"use client";

/**
 * PreloadedVideo
 *
 * Fetches a video file over the network, converts it to a Blob, and plays it
 * from a local object URL — bypassing browser streaming throttle and preventing
 * the white-flash / blank-box issue that occurs when a <video src="..."> hits
 * a cold network path.
 *
 * Lifecycle:
 *   1. Component mounts → fetch(src) starts in the background
 *   2. While fetching → renders a transparent placeholder div (no layout shift)
 *   3. Blob ready    → URL.createObjectURL(blob) → renders <video> instantly
 *   4. Unmount       → URL.revokeObjectURL() frees the blob memory
 *
 * Props:
 *   src       — Direct URL to the video file (local /public path or CDN URL)
 *   className — Tailwind / CSS classes forwarded to both the placeholder and the <video>
 */

import { useEffect, useRef, useState } from "react";

interface PreloadedVideoProps {
  /** Direct video URL — a /public path or a CDN .mp4 / .webm URL */
  src: string;
  /** Tailwind className forwarded to both the placeholder div and the <video> */
  className?: string;
}

export default function PreloadedVideo({ src, className = "" }: PreloadedVideoProps) {
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  // Keep a ref so the cleanup function (closure over the old value) can always
  // revoke the correct URL even if the component unmounts before setState runs.
  const objectUrlRef = useRef<string | null>(null);

  useEffect(() => {
    // Guard against setting state after unmount or after src changes
    let cancelled = false;

    fetch(src)
      .then((res) => {
        if (!res.ok) throw new Error(`[PreloadedVideo] HTTP ${res.status} for ${src}`);
        return res.blob();
      })
      .then((blob) => {
        if (cancelled) return; // component already unmounted — skip

        const url = URL.createObjectURL(blob);
        objectUrlRef.current = url;
        setObjectUrl(url);
      })
      .catch((err) => {
        // Non-fatal: fall back to a blank placeholder rather than crashing
        if (!cancelled) {
          console.warn("[PreloadedVideo] fetch failed, falling back to blank placeholder:", err);
        }
      });

    return () => {
      cancelled = true;

      // Revoke the blob URL to release memory
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
    };
  }, [src]); // Re-run if the src prop changes

  // ── Phase 1 & 2: transparent placeholder while fetching ───────────────────
  // bg-transparent keeps the card background (#0C0C12) visible underneath
  // so there is never a white flash — just the dark card color until ready.
  if (!objectUrl) {
    return <div className={`bg-transparent ${className}`} />;
  }

  // ── Phase 3: video ready — render from local blob URL ────────────────────
  return (
    <video
      src={objectUrl}
      autoPlay
      muted
      loop
      playsInline
      className={className}
    />
  );
}
