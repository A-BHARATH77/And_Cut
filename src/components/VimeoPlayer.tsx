"use client";

/**
 * VimeoPlayer — native Vimeo iframe embed with postMessage control.
 *
 * Key design decisions:
 * - The iframe src is built ONCE on mount and never changes (no reloads, no black screen).
 * - autoplay=1 is always in the URL so Vimeo begins buffering the moment the iframe mounts.
 * - The `playing` prop controls play/pause via Vimeo's postMessage API — no src rebuild needed.
 * - A unique `player_id` is baked into the URL and matched on every incoming postMessage so
 *   each instance only reacts to its OWN iframe (avoids mass-triggering with many iframes).
 * - `quality` defaults to "360p" for background thumbnail cards (fast first-frame) and
 *   should be set to "auto" for the modal (quality adapts to bandwidth).
 */

import { useEffect, useRef, useState } from "react";

interface VimeoPlayerProps {
  vimeoId: string;
  playing?: boolean;
  controls?: boolean;
  className?: string;
  muted?: boolean;
  loop?: boolean;
  background?: boolean;
  quality?: string; // e.g. "360p" for thumbnails, "auto" for modal
  onReady?: () => void; // fires when player is ready and showing first frame
}

export default function VimeoPlayer({
  vimeoId,
  playing = false,
  controls = true,
  className = "",
  muted = false,
  loop = false,
  background = false,
  quality,
  onReady,
}: VimeoPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isReady, setIsReady] = useState(true); // Start visible — Vimeo background mode is already dark

  // Stable unique ID for this player instance — used to match postMessages
  // to exactly this iframe and no other.
  const playerIdRef = useRef(`vp-${vimeoId}-${Math.random().toString(36).slice(2, 8)}`);
  const playerId = playerIdRef.current;

  // Resolve quality: if explicitly given use it; otherwise thumbnail cards default
  // to 360p (fast first-frame), non-background players default to auto.
  const resolvedQuality = quality ?? (background ? "360p" : "auto");

  // Build src ONCE — autoplay=1 always so buffering starts on mount immediately.
  // Never recalculated, so the iframe is never reloaded.
  const src = `https://player.vimeo.com/video/${vimeoId}` +
    `?autoplay=1` +
    `&muted=${muted ? 1 : 0}` +
    `&loop=${loop ? 1 : 0}` +
    `&controls=${background ? 0 : controls ? 1 : 0}` +
    `&background=${background ? 1 : 0}` +
    `&autopause=0` +
    `&title=0` +
    `&byline=0` +
    `&portrait=0` +
    `&dnt=1` +
    `&playsinline=1` +
    `&quality=${resolvedQuality}` +
    `&player_id=${encodeURIComponent(playerId)}`;

  // Listen for Vimeo postMessages — filter to only THIS iframe's player_id
  // so multiple instances don't all fire at once.
  useEffect(() => {
    // Fallback: if Vimeo never fires "ready" (e.g. slow/blocked network), 
    // force-show the iframe after 1.5s. Because all iframes are pre-mounted in
    // ServicesPreloader at page load, Vimeo will usually be ready well before this.
    const fallbackTimer = setTimeout(() => {
      setIsReady(true);
      onReady?.();
    }, 1500);

    const handleMessage = (e: MessageEvent) => {
      if (e.origin !== "https://player.vimeo.com") return;
      if (iframeRef.current && e.source !== iframeRef.current.contentWindow) return;
      try {
        const data = JSON.parse(e.data as string);
        if (data.event === "ready") {
          clearTimeout(fallbackTimer);
          setIsReady(true);
          onReady?.();
        }
      } catch {
        // non-JSON messages from other iframes — safely ignore
      }
    };
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
      clearTimeout(fallbackTimer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Control play / pause via postMessage — zero iframe reload
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe || !isReady) return;
    iframe.contentWindow?.postMessage(
      JSON.stringify({ method: playing ? "play" : "pause" }),
      "https://player.vimeo.com"
    );
  }, [playing, isReady]);

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Loading overlay — hides the Vimeo white initialisation screen.
          Fades out once the player fires the "ready" postMessage.
          Since all iframes mount during the preloader animation (which covers the
          viewport), this overlay is invisible to users on normal connections. */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "#0C0C12",
          zIndex: 2,
          opacity: isReady ? 0 : 1,
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
        }}
      />

      <iframe
        ref={iframeRef}
        src={src}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        loading="eager"
        title={`Vimeo ${vimeoId}`}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          border: "none",
        }}
      />

    </div>
  );
}
