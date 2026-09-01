"use client";

/**
 * LocalBlobVideoCard — Seamless preview card for local webm videos
 *
 * Flow:
 *   1. On mount  → check blob cache (videoCache.ts)
 *      a. Blob ready   → show <video> immediately, play from memory (zero buffering)
 *      b. Blob loading → show thumbnail image; subscribe to onBlobReady
 *   2. Blob arrives  → switch thumbnail → video with 0.6s cross-fade
 *   3. Video "ended" → loop back to currentTime = 0 and play again
 *      (the partial blob naturally ends at ~4–8 s depending on video bitrate;
 *       we use the native ended event instead of a fixed timer so the loop
 *       point is always correct regardless of bitrate)
 *
 * Result: the thumbnail guarantees ZERO black boxes while the blob loads.
 *         Once playing, the video loops seamlessly from memory with no
 *         additional network requests.
 *
 * On click (handled by parent Carousel): opens Vimeo modal for full video.
 */

import { useEffect, useRef, useState } from "react";
import { getBlobUrl, onBlobReady } from "@/lib/videoCache";

interface LocalBlobVideoCardProps {
  videoPath: string;
  thumbnailUrl?: string;
  className?: string;
}

export default function LocalBlobVideoCard({
  videoPath,
  thumbnailUrl,
  className = "",
}: LocalBlobVideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [blobUrl,      setBlobUrl]      = useState<string | null>(() => getBlobUrl(videoPath));
  const [videoVisible, setVideoVisible] = useState<boolean>(() => !!getBlobUrl(videoPath));

  // ── Subscribe to blob-ready event if not yet cached ─────────────────────
  useEffect(() => {
    if (blobUrl) {
      setVideoVisible(true);
      return;
    }
    const unsub = onBlobReady(videoPath, (url) => {
      setBlobUrl(url);
      // Small double-rAF so <video> mounts and decodes first frame before fade
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setVideoVisible(true))
      );
    });
    return unsub;
  }, [videoPath, blobUrl]);

  // ── Loop: when partial blob ends, restart from 0 ──────────────────────────
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !blobUrl) return;

    const handleEnded = () => {
      video.currentTime = 0;
      video.play().catch(() => {});
    };

    // Also autoplay once the blob is set and video has loaded enough
    const handleCanPlay = () => {
      video.play().catch(() => {});
    };

    video.addEventListener("ended",   handleEnded);
    video.addEventListener("canplay", handleCanPlay, { once: true });

    return () => {
      video.removeEventListener("ended",   handleEnded);
      video.removeEventListener("canplay", handleCanPlay);
    };
  }, [blobUrl]);

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={{ backgroundColor: "#0C0C12" }}
    >
      {/* ── Thumbnail: visible until blob video is playing ── */}
      {thumbnailUrl && (
        <img
          src={thumbnailUrl}
          alt=""
          draggable={false}
          style={{
            position:      "absolute",
            inset:         0,
            width:         "100%",
            height:        "100%",
            objectFit:     "cover",
            zIndex:        1,
            opacity:       videoVisible ? 0 : 1,
            transition:    "opacity 0.6s ease",
            pointerEvents: "none",
            userSelect:    "none",
          }}
        />
      )}

      {/* ── Video: rendered only when blob URL is ready ── */}
      {blobUrl && (
        <video
          ref={videoRef}
          src={blobUrl}
          muted
          playsInline
          // Do NOT set loop — we handle looping via the `ended` event
          style={{
            position:   "absolute",
            inset:      0,
            width:      "100%",
            height:     "100%",
            objectFit:  "cover",
            zIndex:     2,
            opacity:    videoVisible ? 1 : 0,
            transition: "opacity 0.6s ease",
          }}
        />
      )}

      {/* ── Dark gradient fallback: no thumbnail + blob not ready ── */}
      {!thumbnailUrl && !blobUrl && (
        <div
          style={{
            position:   "absolute",
            inset:      0,
            background: "linear-gradient(135deg, #0C0C18 0%, #12121F 100%)",
            zIndex:     0,
          }}
        />
      )}
    </div>
  );
}
