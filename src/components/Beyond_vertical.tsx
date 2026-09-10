"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FORMATS_DATA, VideoData } from "@/data/services";

/**
 * Convert player.mediadelivery.net/play/LIB/ID
 *       → iframe.mediadelivery.net/embed/LIB/ID?params
 *
 * The /play/ URL is a Bunny Stream standalone watch page — it CANNOT be used
 * in a <video src="..."> or embedded as an iframe. The /embed/ URL is the
 * correct Bunny Stream iframe endpoint that supports autoplay, loop, muted.
 */
function toBunnyEmbed(url: string, params = "autoplay=true&loop=true&muted=true&preload=true") {
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

/* ─── BunnyCard: thumbnail facade that cross-fades to live iframe ──────────── */
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
      {/* Thumbnail facade — visible immediately while iframe boots */}
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

      {/* Bunny embed iframe — muted autoplay loop for background preview */}
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
          pointerEvents: "none", // card click passes through
        }}
      />

      {/* No play overlay — pure autoplay preview, click opens Vimeo */}

      {/* Text overlay */}
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

export default function BeyondVertical() {
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

        {/* Horizontal video cards — click opens Vimeo in a new tab */}
        <div className="w-full max-w-[1600px] px-3 sm:px-6 md:px-12 lg:px-20 relative z-10 flex flex-col gap-4 md:gap-8">
          {FORMATS_DATA["Horizontal"]?.map((video, idx) => (
            <div key={`horizontal-${idx}`} className="w-full relative group">
              <BunnyCard
                video={video}
                onClick={() => {
                  if (video.vimeoId) {
                    window.open(`https://vimeo.com/${video.vimeoId}`, "_blank", "noopener,noreferrer");
                  }
                }}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
