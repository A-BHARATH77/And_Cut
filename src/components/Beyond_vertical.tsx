"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { FORMATS_DATA, VideoData } from "@/data/services";

function HorizontalVideoCard({
  video,
  onClick,
}: {
  video: VideoData;
  onClick: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    let inView = false;
    const tryPlay = () => {
      if (inView) el.play().catch(() => {});
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          inView = entry.isIntersecting;
          if (entry.isIntersecting) {
            el.load();
            el.addEventListener("canplay", tryPlay, { once: true });
          } else {
            el.pause();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      inView = false;
    };
  }, [video.videoPath]);

  return (
    <div
      className="w-full aspect-video rounded-2xl md:rounded-3xl overflow-hidden bg-black shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] border border-white/10 relative cursor-pointer hover:border-white/20 transition-all duration-500 group"
      onClick={onClick}
    >
      <video
        ref={videoRef}
        src={video.videoPath}
        loop
        muted
        playsInline
        preload="metadata"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      {/* Tap to unmute hint on mobile */}
      <div className="absolute inset-0 bg-black/10 flex items-center justify-center pointer-events-none">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 opacity-0 group-hover:opacity-100 transition-all">
          <svg
            className="w-5 h-5 md:w-8 md:h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.907L5.586 15z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
            />
          </svg>
        </div>
      </div>
      {/* Text Overlay */}
      {!video.videoPath.includes("/UGC/") && (
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none flex flex-col sm:flex-row sm:items-end justify-between gap-2">
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
  const [simpleVideoSrc, setSimpleVideoSrc] = useState<string | null>(null);

  useEffect(() => {
    if (simpleVideoSrc) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [simpleVideoSrc]);

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

        {/* Horizontal video cards */}
        <div className="w-full max-w-[1600px] px-3 sm:px-6 md:px-12 lg:px-20 relative z-10 flex flex-col gap-4 md:gap-8">
          {FORMATS_DATA["Horizontal"]?.map((video, idx) => (
            <div key={`horizontal-${idx}`} className="w-full relative group">
              <HorizontalVideoCard
                video={video}
                onClick={() => setSimpleVideoSrc(video.videoPath)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Simple Full Screen Lightbox for Beyond Vertical */}
      <AnimatePresence>
        {simpleVideoSrc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/92 backdrop-blur-md p-3 sm:p-6 md:p-12 cursor-pointer"
            onClick={() => setSimpleVideoSrc(null)}
          >
            <button
              className="absolute top-4 right-4 md:top-8 md:right-8 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 z-50 transition-colors"
              onClick={() => setSimpleVideoSrc(null)}
            >
              <X size={28} />
            </button>

            <motion.div
              className="relative w-full max-w-[95vw] md:max-w-[1100px] aspect-video overflow-hidden rounded-xl md:rounded-[2rem] shadow-2xl bg-black cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                src={simpleVideoSrc}
                autoPlay
                controls
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
