"use client";

/**
 * VimeoFacadeCard — Facade Pattern for Vimeo background videos
 *
 * PHASE 1 (immediate): Shows a static Vimeo thumbnail fetched from the public
 *   oEmbed API. The thumbnail appears instantly with zero blank-box flash.
 *
 * PHASE 2 (lazy):  When `shouldLoad` becomes true (set by the parent's
 *   IntersectionObserver once the services section is ~500px away), the real
 *   Vimeo iframe is injected on top of the thumbnail.
 *
 * PHASE 3 (playing): Once Vimeo fires the "ready" postMessage the thumbnail
 *   cross-fades out over 0.8s revealing the playing video underneath.
 *
 * Result: The user NEVER sees a blank box. Worst case they see a thumbnail.
 */

import { useState, useEffect, useRef } from "react";

// ─── Thumbnail fetch with module-level cache ──────────────────────────────────
// Fetched once per unique vimeoId per browser session — result is reused
// for every duplicate card in the infinite-loop marquee.

const thumbnailCache = new Map<string, string>();
const pendingFetch  = new Map<string, Promise<string | null>>();

function getVimeoThumbnail(vimeoId: string): Promise<string | null> {
  if (thumbnailCache.has(vimeoId)) return Promise.resolve(thumbnailCache.get(vimeoId)!);
  if (pendingFetch.has(vimeoId))   return pendingFetch.get(vimeoId)!;

  const p = fetch(
    `https://vimeo.com/api/oembed.json?url=https://vimeo.com/${vimeoId}&width=400`
  )
    .then((r) => (r.ok ? r.json() : null))
    .then((d: { thumbnail_url?: string } | null) => {
      const url = d?.thumbnail_url ?? null;
      if (url) thumbnailCache.set(vimeoId, url);
      return url;
    })
    .catch(() => null);

  pendingFetch.set(vimeoId, p);
  return p;
}

// ─── Vimeo src builder ────────────────────────────────────────────────────────

function buildVimeoSrc(vimeoId: string) {
  return (
    `https://player.vimeo.com/video/${vimeoId}` +
    `?autoplay=1&muted=1&loop=1&controls=0&background=1` +
    `&autopause=0&title=0&byline=0&portrait=0&dnt=1&playsinline=1&quality=360p`
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

interface VimeoFacadeCardProps {
  vimeoId: string;
  thumbnailUrl?: string;
  /** Set true when the services section is near the viewport. */
  shouldLoad: boolean;
  className?: string;
}

export default function VimeoFacadeCard({
  vimeoId,
  thumbnailUrl,
  shouldLoad,
  className = "",
}: VimeoFacadeCardProps) {
  const [thumbnail, setThumbnail]     = useState<string | null>(thumbnailUrl || null);
  const [iframeActive, setIframeActive] = useState(false);
  const [iframeReady, setIframeReady]  = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // ── Phase 1: fetch thumbnail if pre-baked URL was not provided ───────────
  useEffect(() => {
    if (thumbnailUrl) {
      setThumbnail(thumbnailUrl);
      return;
    }
    let alive = true;
    getVimeoThumbnail(vimeoId).then((url) => {
      if (alive && url) setThumbnail(url);
    });
    return () => { alive = false; };
  }, [vimeoId, thumbnailUrl]);

  // ── Phase 2: mount iframe when section is near the viewport ───────────────
  useEffect(() => {
    if (shouldLoad && !iframeActive) {
      setIframeActive(true);
    }
  }, [shouldLoad, iframeActive]);

  // ── Phase 3: listen for Vimeo "ready" postMessage ─────────────────────────
  useEffect(() => {
    if (!iframeActive) return;

    // Fallback: reveal the iframe after 5 s even if "ready" never fires
    const fallback = setTimeout(() => setIframeReady(true), 5000);

    const handler = (e: MessageEvent) => {
      if (e.origin !== "https://player.vimeo.com") return;
      // Only react to THIS iframe's messages
      if (iframeRef.current && e.source !== iframeRef.current.contentWindow) return;
      try {
        const data = JSON.parse(e.data as string);
        if (data.event === "ready" || data.event === "play") {
          clearTimeout(fallback);
          setIframeReady(true);
        }
      } catch { /* non-JSON postMessage from other sources — ignore */ }
    };

    window.addEventListener("message", handler);
    return () => {
      window.removeEventListener("message", handler);
      clearTimeout(fallback);
    };
  }, [iframeActive]);

  return (
    <div
      className={`relative w-full h-full ${className}`}
      style={{ overflow: "hidden", backgroundColor: "#0C0C12" }}
    >
      {/* ── Thumbnail (Phase 1 & 2) ───────────────────────────────────────────
          Always present until the iframe is confirmed playing.
          Prevents ANY blank-box flash — the user sees a real frame from the
          video immediately, even on slow connections. */}
      {thumbnail ? (
        <img
          src={thumbnail}
          alt=""
          draggable={false}
          style={{
            position:   "absolute",
            inset:      0,
            width:      "100%",
            height:     "100%",
            objectFit:  "cover",
            zIndex:     1,
            opacity:    iframeReady ? 0 : 1,
            transition: "opacity 0.8s ease",
            pointerEvents: "none",
            userSelect: "none",
          }}
        />
      ) : (
        /* Placeholder gradient while thumbnail is fetching */
        <div
          style={{
            position:   "absolute",
            inset:      0,
            background: "linear-gradient(135deg, #0C0C18 0%, #12121F 100%)",
            zIndex:     0,
          }}
        />
      )}

      {/* ── Iframe (Phase 2 → 3) ──────────────────────────────────────────────
          Only injected once `shouldLoad` is true (section within ~500px).
          Fades in once Vimeo fires "ready". While loading the thumbnail
          above remains fully visible — never a blank box. */}
      {iframeActive && (
        <iframe
          ref={iframeRef}
          src={buildVimeoSrc(vimeoId)}
          allow="autoplay; fullscreen; picture-in-picture"
          tabIndex={-1}
          title={`vimeo-${vimeoId}`}
          style={{
            position:   "absolute",
            inset:      0,
            width:      "100%",
            height:     "100%",
            border:     "none",
            zIndex:     2,
            opacity:    iframeReady ? 1 : 0,
            transition: "opacity 0.8s ease",
          }}
        />
      )}
    </div>
  );
}
