"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import Link from "next/link";
import { FORMAT_PRICES, VideoData } from "@/data/services";

const isVideo = (path: string) => /\.(mp4|webm|mov)$/i.test(path);

interface Props {
  formatName: string | null;
  activeVideos: VideoData[];
}

export default function ServiceGalleryClient({ formatName, activeVideos }: Props) {
  const searchParams = useSearchParams();
  const initialIdx = parseInt(searchParams.get("videoIdx") || "0", 10);

  const [activeVideoIdx, setActiveVideoIdx] = useState<number>(
    isNaN(initialIdx) || initialIdx < 0 || initialIdx >= activeVideos.length
      ? 0
      : initialIdx
  );

  const sidebarRef = useRef<HTMLDivElement>(null);

  const scrollUp = () => {
    sidebarRef.current?.scrollBy({ top: -200, behavior: "smooth" });
  };

  const scrollDown = () => {
    sidebarRef.current?.scrollBy({ top: 200, behavior: "smooth" });
  };

  // ── Not-found state ──────────────────────────────────────────────────────
  if (!formatName || activeVideos.length === 0) {
    return (
      <div className="min-h-screen bg-[#050508] flex items-center justify-center flex-col gap-6 text-white">
        <h1 className="text-4xl font-bold">Service Not Found</h1>
        <Link href="/#format" className="px-6 py-3 bg-[#6EE7FF] text-[#050508] font-bold rounded-full">
          Return Home
        </Link>
      </div>
    );
  }

  const activeVideo = activeVideos[activeVideoIdx];

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[50%] max-w-[600px] h-[300px] bg-[#6EE7FF]/8 blur-[130px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[50%] max-w-[600px] h-[300px] bg-[#C084FC]/8 blur-[130px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-4 pt-20 md:pt-28 pb-10">

        {/* Header */}
        <div className="w-full flex items-center justify-between mb-4 md:mb-6">
          <Link
            href="/#format"
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-semibold text-xs md:text-sm uppercase tracking-wider">Back</span>
          </Link>

          <h1 className="text-lg sm:text-xl md:text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400 uppercase">
            {formatName}
          </h1>
        </div>

        {/* ── MOBILE layout: stacked ── */}
        <div className="flex flex-col gap-4 lg:hidden">
          {/* Active video - main */}
          <div className="w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={`main-${activeVideoIdx}`}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
                className="w-full"
              >
                <VideoCard video={activeVideo} isActive />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Info card */}
          <div className="w-full rounded-2xl bg-[#0A0A0F] border border-white/10 p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#6EE7FF]/10 blur-[60px] rounded-full pointer-events-none" />
            <div className="relative z-10 flex flex-col gap-4">
              <div>
                <div className="inline-block px-3 py-1 mb-2 text-[10px] font-black tracking-widest uppercase bg-[#6EE7FF]/10 text-[#6EE7FF] rounded-full border border-[#6EE7FF]/20">
                  {formatName} Format
                </div>
                {formatName !== "UGC" && (
                  <h3 className="text-xl font-black text-white capitalize mb-1">{activeVideo?.title}</h3>
                )}
                <p className="text-neutral-400 text-xs leading-relaxed">
                  High-quality, native content built for maximum engagement and performance.
                </p>
              </div>
              {formatName !== "Photoshoot" && (
                <div>
                  <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">Starting At</div>
                  <div className="text-2xl font-black text-white">
                    {FORMAT_PRICES[formatName] ?? "75,000"}/-
                  </div>
                </div>
              )}
              <a
                href="https://tally.so/r/EkNRrX"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#6EE7FF] to-[#3B82F6] text-[#050508] font-black uppercase tracking-widest text-sm transition-all active:scale-95 shadow-[0_0_20px_rgba(110,231,255,0.3)]"
              >
                Connect With Us
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Thumbnails — horizontal scroll */}
          <div>
            <p className="text-white/30 text-[10px] uppercase tracking-widest mb-2">More in this series</p>
            <div
              className="flex gap-3 overflow-x-auto hide-scrollbar overscroll-contain pb-2"
              data-lenis-prevent="true"
            >
              {activeVideos.map((video, idx) => {
                if (idx === activeVideoIdx) return null;
                return (
                  <motion.div
                    key={`thumb-${idx}`}
                    onClick={() => setActiveVideoIdx(idx)}
                    whileTap={{ scale: 0.95 }}
                    className={clsx(
                      "shrink-0 cursor-pointer rounded-xl overflow-hidden border border-white/10",
                      video.isHorizontal ? "w-[130px]" : "w-[72px]"
                    )}
                  >
                    <VideoCard video={video} isThumbnail />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── DESKTOP layout: side-by-side ── */}
        <div className="hidden lg:flex gap-8 xl:gap-12 h-[80vh] flex-row">
          {/* Arrows and Thumbnails sidebar container */}
          <div className="flex items-center gap-2 xl:gap-4 h-full min-h-0">
            {/* Scroll Arrows */}
            <div className="flex flex-col gap-4">
              <button
                onClick={scrollUp}
                className="w-10 h-10 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center transition-all hover:bg-black/90 hover:scale-110 active:scale-95 shadow-lg"
                aria-label="Scroll Up"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
                </svg>
              </button>
              <button
                onClick={scrollDown}
                className="w-10 h-10 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center transition-all hover:bg-black/90 hover:scale-110 active:scale-95 shadow-lg"
                aria-label="Scroll Down"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Thumbnails sidebar */}
            <div
              ref={sidebarRef}
              className="w-[120px] xl:w-[140px] shrink-0 flex flex-col gap-4 overflow-y-auto hide-scrollbar overscroll-contain h-full min-h-0 pb-10 pointer-events-auto scroll-smooth"
              data-lenis-prevent="true"
            >
              {activeVideos.map((video, idx) => {
                if (idx === activeVideoIdx) return null;
                return (
                  <motion.div
                    key={`dthumb-${idx}`}
                    onClick={() => setActiveVideoIdx(idx)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full shrink-0 cursor-pointer rounded-xl overflow-hidden border border-white/10"
                  >
                    <VideoCard video={video} isThumbnail />
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Main video */}
          <div className="flex-1 min-w-0 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={`dmain-${activeVideoIdx}`}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
                className="w-full h-full flex items-center justify-center"
              >
                <VideoCard video={activeVideo} isActive />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Info panel */}
          <div
            className={clsx(
              "shrink-0 flex flex-col justify-center rounded-[2.5rem] bg-[#0A0A0F] border border-white/10 relative overflow-hidden p-6 xl:p-8",
              activeVideo?.isHorizontal ? "w-[220px] xl:w-[260px]" : "w-[260px] xl:w-[320px]"
            )}
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#6EE7FF]/10 blur-[60px] rounded-full pointer-events-none" />
            <div className="relative z-10 flex flex-col gap-6">
              <div>
                <div className="inline-block px-3 py-1.5 mb-3 text-[10px] font-black tracking-widest uppercase bg-[#6EE7FF]/10 text-[#6EE7FF] rounded-full border border-[#6EE7FF]/20">
                  {formatName} Format
                </div>
                {formatName !== "UGC" && (
                  <h3 className="text-2xl xl:text-3xl font-black text-white capitalize mb-2">{activeVideo?.title}</h3>
                )}
                <p className="text-neutral-400 text-xs leading-relaxed">
                  High-quality, native content built for maximum engagement and performance.
                </p>
              </div>
              {formatName !== "Photoshoot" && (
                <>
                  <div className="h-px bg-gradient-to-r from-white/20 to-transparent" />
                  <div>
                    <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">Starting At</div>
                    <div className="text-3xl font-black text-white">
                      {FORMAT_PRICES[formatName] ?? "75,000"}/-
                    </div>
                  </div>
                </>
              )}
              <a
                href="https://tally.so/r/EkNRrX"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 xl:py-4 rounded-2xl bg-gradient-to-r from-[#6EE7FF] to-[#3B82F6] text-[#050508] font-black uppercase tracking-widest text-xs xl:text-sm transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(110,231,255,0.3)]"
              >
                Connect With Us
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── VideoCard sub-component ──────────────────────────────────────────────────
function VideoCard({
  video,
  isThumbnail = false,
  isActive = false,
}: {
  video: VideoData;
  isThumbnail?: boolean;
  isActive?: boolean;
}) {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isThumbnail && videoRef.current) {
      videoRef.current.muted = true;
      setIsMuted(true);
      videoRef.current.pause();
    }
  }, [isThumbnail]);

  useEffect(() => {
    if (isActive && videoRef.current) {
      videoRef.current.muted = false;
      setIsMuted(false);
      videoRef.current.play().catch(() => {});
    }
  }, [isActive]);

  if (!video) return null;

  return (
    <div
      className={clsx(
        "relative overflow-hidden group",
        isActive
          ? clsx(
              "w-full h-full rounded-2xl md:rounded-[2rem] bg-black shadow-2xl",
              video.isHorizontal ? "aspect-video" : "aspect-[9/16] max-h-[75vh]"
            )
          : isThumbnail
          ? clsx("w-full bg-black/40 rounded-xl", video.isHorizontal ? "aspect-video" : "aspect-[9/16]")
          : clsx("w-full bg-black/20 rounded-xl", video.isHorizontal ? "aspect-video" : "aspect-[9/16]")
      )}
      onClick={() => {
        if (isActive && isVideo(video.videoPath) && videoRef.current) {
          videoRef.current.muted = !videoRef.current.muted;
          setIsMuted(videoRef.current.muted);
        }
      }}
    >
      {isVideo(video.videoPath) ? (
        <video
          ref={videoRef}
          src={video.videoPath}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload={isThumbnail ? "metadata" : "auto"}
          className={clsx(
            "w-full h-full object-cover transition-transform duration-700",
            !isActive && "group-hover:scale-105",
            isThumbnail && "opacity-70 group-hover:opacity-100"
          )}
        />
      ) : (
        <img
          src={video.videoPath}
          alt={video.title}
          className={clsx(
            "w-full h-full object-cover transition-transform duration-700",
            !isActive && "group-hover:scale-105",
            isThumbnail && "opacity-70 group-hover:opacity-100"
          )}
        />
      )}

      {/* Mute/unmute button for active video */}
      {isActive && isVideo(video.videoPath) && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (videoRef.current) {
              videoRef.current.muted = !videoRef.current.muted;
              setIsMuted(videoRef.current.muted);
            }
          }}
          className="absolute bottom-3 right-3 md:bottom-4 md:right-4 z-30 p-2 rounded-full bg-black/60 border border-white/10 text-white/80 hover:text-white transition-all"
        >
          {isMuted ? (
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.907L5.586 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
          ) : (
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.907L5.586 15z" />
            </svg>
          )}
        </button>
      )}

      {/* Title for non-thumbnail cards */}
      {!isThumbnail && !video.videoPath.includes('/UGC/') && (
        <div className="absolute bottom-0 left-0 right-0 p-3 md:p-5 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none">
          <h3 className="text-white text-sm md:text-lg font-bold capitalize select-none truncate">{video.title}</h3>
        </div>
      )}
    </div>
  );
}
