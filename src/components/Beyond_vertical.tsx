"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { FORMATS_DATA, VideoData } from "@/data/services";

/**
 * Convert player.mediadelivery.net/play/LIB/ID
 *       → iframe.mediadelivery.net/embed/LIB/ID?params
 */
function toBunnyEmbed(
  url: string,
  params = "autoplay=true&loop=true&muted=true&preload=true&controls=false"
) {
  let base = url;
  const m = url.match(/player\.mediadelivery\.net\/play\/(\d+)\/([a-f0-9-]+)/i);
  if (m) {
    base = `https://iframe.mediadelivery.net/embed/${m[1]}/${m[2]}`;
  } else if (url.includes("player.mediadelivery.net")) {
    base = url.replace("player.mediadelivery.net/play/", "iframe.mediadelivery.net/embed/");
  }

  const paramObj = new URLSearchParams(params);
  paramObj.set("disableRum", "true");
  const queryStr = paramObj.toString();

  return base.includes("?") ? `${base}&${queryStr}` : `${base}?${queryStr}`;
}

/* ─── BunnyCard: silent autoplay preview — no play button ─────────────────── */
function BunnyCard({
  video,
  onClick,
}: {
  video: VideoData;
  onClick: () => void;
}) {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const embedSrc = toBunnyEmbed(video.videoPath);

  return (
    <div
      className="w-full aspect-video rounded-2xl md:rounded-3xl overflow-hidden bg-black shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] border border-white/10 relative cursor-pointer hover:border-white/20 transition-all duration-500 group"
      onClick={onClick}
    >
      {/* Thumbnail facade — visible until iframe loads */}
      {video.thumbnailUrl && (
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          draggable={false}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 1,
            opacity: iframeLoaded ? 0 : 1,
            transition: "opacity 0.8s ease",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Bunny embed — muted autoplay loop, no controls, pure preview */}
      <iframe
        src={embedSrc}
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen;"
        onLoad={() => setIframeLoaded(true)}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          border: "none",
          zIndex: 2,
          opacity: iframeLoaded ? 1 : 0,
          transition: "opacity 0.8s ease",
          pointerEvents: "none", // let outer div receive the click
        }}
      />

      {/* Hover overlay — subtle Vimeo cue, no big play button */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-end justify-start p-4 sm:p-6 md:p-10 z-10 opacity-0 group-hover:opacity-100">
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-black/75 border border-white/20 text-white text-xs font-semibold backdrop-blur-md shadow-md">
          <svg className="w-4 h-4 text-[#6EE7FF]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22.396 7.164c-.093 2.026-1.507 4.8-4.245 8.32-2.817 3.643-5.2 5.465-7.149 5.465-1.206 0-2.227-.887-3.064-2.66-.558-2.046-1.116-4.093-1.674-6.14-.62-2.261-1.286-3.393-2.001-3.393-.155 0-.698.326-1.629.977L1.4 8.242c1.272-1.116 2.528-2.233 3.768-3.35 1.69-1.458 2.962-2.233 3.815-2.326 2.016-.186 3.256.961 3.722 3.44.527 2.822.884 4.575 1.07 5.257.559 2.294 1.163 3.441 1.815 3.441.527 0 1.256-.822 2.186-2.465.93-1.644 1.442-2.885 1.535-3.723.186-1.488-.418-2.233-1.814-2.233-.652 0-1.334.14-2.047.419 1.349-4.416 3.907-6.527 7.675-6.333 2.76.14 4.047 1.845 3.86 5.114z"/>
          </svg>
          <span>Watch on Vimeo</span>
        </div>
      </div>

      {/* Title overlay */}
      {!video.videoPath.includes("/UGC/") && (
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none flex flex-col sm:flex-row sm:items-end justify-between gap-2 z-10">
          <div>
            <div className="inline-block px-2 py-0.5 mb-2 text-[9px] md:text-[10px] font-bold tracking-wider uppercase bg-[#6EE7FF]/10 text-[#6EE7FF] rounded-full border border-[#6EE7FF]/20">
              Horizontal Format
            </div>
            <h3 className="text-white text-lg sm:text-2xl md:text-4xl font-bold tracking-wide capitalize">
              {video.title}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Vimeo in-page lightbox ──────────────────────────────────────────────── */
function VimeoLightbox({
  vimeoId,
  onClose,
}: {
  vimeoId: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const vimeoSrc =
    `https://player.vimeo.com/video/${vimeoId}` +
    `?autoplay=1&controls=1&loop=0&dnt=1&title=0&byline=0&portrait=0`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/92 backdrop-blur-md p-3 sm:p-6 md:p-12 cursor-pointer"
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 md:top-8 md:right-8 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 z-50 transition-colors"
        onClick={onClose}
      >
        <X size={28} />
      </button>

      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative w-full max-w-[95vw] md:max-w-[1100px] aspect-video overflow-hidden rounded-xl md:rounded-[2rem] shadow-2xl bg-black cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          src={vimeoSrc}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      </motion.div>
    </motion.div>
  );
}

/* ─── Main component ──────────────────────────────────────────────────────── */
export default function BeyondVertical() {
  const [activeVideo, setActiveVideo] = useState<VideoData | null>(null);

  return (
    <>
      <section
        id="beyond-vertical"
        className="hidden lg:flex relative w-full bg-[#050508] pt-10 pb-0 md:pt-18 md:pb-2 overflow-hidden flex-col items-center"
      >
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] max-w-[800px] h-[400px] bg-[#6EE7FF]/5 blur-[150px] rounded-full" />
        </div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-6 md:mb-12 max-w-2xl px-4 relative z-10"
        >
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400 uppercase mb-3 md:mb-4">
            BEYOND VERTICAL
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm md:text-base font-medium max-w-[800px] mx-auto">
            We don&apos;t just shoot for the social feed. We also produce high-impact
            ad films, genuine customer testimonials, and clean corporate films
            when your brand needs a bigger, we write, shoot, and edit it all.
          </p>
        </motion.div>

        {/* Cards — click opens Vimeo in-page */}
        <div className="w-full max-w-[1600px] px-3 sm:px-6 md:px-12 lg:px-20 relative z-10 flex flex-col gap-4 md:gap-8">
          {FORMATS_DATA["Horizontal"]?.map((video, idx) => (
            <div key={`horizontal-${idx}`} className="w-full relative">
              <BunnyCard
                video={video}
                onClick={() => video.vimeoId && setActiveVideo(video)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Vimeo in-page lightbox */}
      <AnimatePresence>
        {activeVideo?.vimeoId && (
          <VimeoLightbox
            vimeoId={activeVideo.vimeoId}
            onClose={() => setActiveVideo(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
