"use client";

/**
 * VimeoPlayer — native Vimeo iframe embed with postMessage control.
 *
 * Key design decisions:
 * - The iframe src is built ONCE on mount and never changes (no reloads, no black screen).
 * - autoplay=1 is always in the URL so Vimeo begins buffering the moment the iframe mounts.
 * - The `playing` prop controls play/pause via Vimeo's postMessage API — no src rebuild needed.
 * - The Carousel's IntersectionObserver mounts this 1000px before viewport entry, giving the
 *   video ample time to buffer before the user ever sees it.
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
}

export default function VimeoPlayer({
  vimeoId,
  playing = false,
  controls = true,
  className = "",
  muted = false,
  loop = false,
  background = false,
}: VimeoPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isReady, setIsReady] = useState(false);

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
    `&quality=1080p`;

  // Listen for Vimeo's "ready" event so we know postMessage is accepted
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.origin !== "https://player.vimeo.com") return;
      try {
        const data = JSON.parse(e.data as string);
        if (data.event === "ready") {
          setIsReady(true);
        }
      } catch {
        // non-JSON messages from other iframes — safely ignore
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
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
