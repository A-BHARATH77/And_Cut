"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import clsx from "clsx";
import VimeoPlayer from "@/components/VimeoPlayer";
import { VideoData } from "@/data/services";

/* ─────────────────────────────────────────────────────────────
   Types & constants
───────────────────────────────────────────────────────────── */
interface PhotoshootModalProps {
  videos: VideoData[];
  initialIndex: number;
  onClose: () => void;
}

/* ─────────────────────────────────────────────────────────────
   Sub-component A: Thumbnail Sidebar (desktop only)
───────────────────────────────────────────────────────────── */
function SidebarColumn({
  videos,
  activeIdx,
  onSelect,
}: {
  videos: VideoData[];
  activeIdx: number;
  onSelect: (idx: number) => void;
}) {
  const sidebarRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "up" | "down") =>
    sidebarRef.current?.scrollBy({ top: dir === "up" ? -160 : 160, behavior: "smooth" });

  useEffect(() => {
    const el = sidebarRef.current;
    if (!el) return;
    const ITEM_H = 144;
    el.scrollTo({
      top: activeIdx * ITEM_H - el.clientHeight / 2 + ITEM_H / 2,
      behavior: "smooth",
    });
  }, [activeIdx]);

  return (
    <div className="hidden md:flex items-start gap-2 xl:gap-4 h-full order-1 min-h-0">
      {/* Arrow buttons */}
      <div className="flex flex-col gap-4">
        <button
          onClick={() => scroll("up")}
          className="w-10 h-10 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center transition-all hover:bg-black/90 hover:scale-110 active:scale-95 shadow-lg"
          aria-label="Scroll Up"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
          </svg>
        </button>
        <button
          onClick={() => scroll("down")}
          className="w-10 h-10 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center transition-all hover:bg-black/90 hover:scale-110 active:scale-95 shadow-lg"
          aria-label="Scroll Down"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Thumbnail list */}
      <div
        ref={sidebarRef}
        className="w-[150px] px-2 shrink-0 flex flex-col gap-6 overflow-y-auto hide-scrollbar overscroll-contain h-full justify-start pb-4 pointer-events-auto scroll-smooth"
        data-lenis-prevent="true"
      >
        {videos.map((v, idx) => {
          const isImage = v.videoPath.match(/\.(webp|jpg|jpeg|png|gif)$/i);
          return (
            <button
              key={idx}
              onClick={() => onSelect(idx)}
              className={clsx(
                "shrink-0 cursor-pointer rounded-xl overflow-hidden border transition-all duration-300 bg-black w-[120px] h-[120px] aspect-square relative",
                idx === activeIdx
                  ? "border-[#6EE7FF] ring-2 ring-[#6EE7FF]/50 scale-105"
                  : "border-white/20 hover:border-white/50 opacity-60 hover:opacity-100"
              )}
            >
              <div className="w-full h-full pointer-events-none overflow-hidden relative">
                <div className="relative w-full h-full scale-[1.5]">
                  {v.vimeoId ? (
                    <VimeoPlayer
                      vimeoId={v.vimeoId!}
                      playing={false}
                      muted={true}
                      loop={false}
                      background={true}
                      quality="360p"
                      className="w-full h-full pointer-events-none"
                    />
                  ) : isImage ? (
                    <img
                      src={v.videoPath}
                      alt={v.title}
                      className="w-full h-full object-cover pointer-events-none"
                    />
                  ) : (
                    <video
                      src={v.videoPath}
                      muted
                      playsInline
                      className="w-full h-full object-cover pointer-events-none"
                    />
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Sub-component B: Main Media Player (Accommodates horizontal images)
───────────────────────────────────────────────────────────── */
function VideoColumn({
  activeIdx,
  activeVideo,
}: {
  activeIdx: number;
  activeVideo: VideoData;
}) {
  const isImage = activeVideo.videoPath.match(/\.(webp|jpg|jpeg|png|gif)$/i);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`main-${activeIdx}`}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.25 }}
        className={clsx(
          "h-[32vh] sm:h-[50vh] md:h-full flex items-center justify-center order-1 md:order-2 bg-black/60 rounded-2xl md:rounded-[2rem] border border-white/10 overflow-hidden relative shadow-2xl shrink-0 mx-auto md:mx-0",
          activeVideo.isHorizontal ? "aspect-video md:w-[42%]" : "aspect-[9/16]"
        )}
      >
        <div className="absolute inset-0 w-full h-full bg-black">
          <div className="relative w-full h-full flex items-center justify-center">
            {activeVideo.vimeoId ? (
              <VimeoPlayer
                key={`vp-${activeIdx}`}
                vimeoId={activeVideo.vimeoId!}
                playing={true}
                muted={false}
                loop={true}
                controls={true}
                background={false}
                quality="auto"
                className="w-full h-full"
              />
            ) : isImage ? (
              <img
                key={`img-${activeIdx}`}
                src={activeVideo.videoPath}
                alt={activeVideo.title}
                className="w-full h-full object-contain"
              />
            ) : (
              <video
                key={`vp-local-${activeIdx}`}
                src={activeVideo.videoPath}
                autoPlay
                loop
                muted
                controls
                playsInline
                className="w-full h-full object-contain"
              />
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────────────────────
   Sub-component C: Info Panel
───────────────────────────────────────────────────────────── */
function InfoPanelCard() {
  return (
    <div className="order-2 md:order-3 flex flex-col justify-between rounded-2xl md:rounded-[2rem] bg-[#0A0A0F] border border-white/10 p-5 sm:p-6 md:p-6 relative overflow-hidden max-h-[48vh] md:max-h-none md:h-full w-full md:flex-1 min-w-0">
      <style>{`
        .thin-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .thin-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .thin-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.25);
          border-radius: 4px;
        }
        .thin-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.45);
        }
        .thin-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.25) transparent;
        }
      `}</style>
      {/* Glow */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-[#6EE7FF]/10 blur-[60px] rounded-full pointer-events-none" />

      {/* Scrollable content */}
      <div
        className="relative z-10 flex-1 min-h-0 flex flex-col gap-3 sm:gap-4 pt-2 md:pt-4 pb-4 pr-1 thin-scrollbar overflow-y-auto"
        data-lenis-prevent="true"
      >
        <div className="flex flex-col gap-4">

          {/* Badge + Headline + Description */}
          <div>
            <div className="inline-block px-4 py-1.5 mb-2 text-xs font-black tracking-widest uppercase bg-[#6EE7FF]/10 text-[#6EE7FF] rounded-full border border-[#6EE7FF]/20">
              Photoshoot Format
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2 leading-tight">
              Product Shoot
            </h3>
            <p className="hidden sm:block text-neutral-300 text-sm sm:text-base md:text-lg leading-relaxed">
              Premium, high-converting visual storytelling designed specifically for Photoshoot placement to drive maximum engagement.
            </p>
          </div>

          <div className="h-px bg-gradient-to-r from-white/20 to-transparent my-1" />

          {/* Price Header + Starting At + CTA */}
          <div>
            <div className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-1.5">
              Starting At
            </div>
            <div className="text-3xl md:text-4xl font-black text-white mb-4">
              50,000/-/-
            </div>

            <a
              href="https://tally.so/r/EkNRrX"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 md:py-3.5 rounded-2xl bg-gradient-to-r from-[#6EE7FF] to-[#3B82F6] text-[#050508] font-black uppercase tracking-widest text-xs md:text-sm transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(110,231,255,0.3)]"
            >
              Connect
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Root: PhotoshootModal
───────────────────────────────────────────────────────────── */
export default function PhotoshootModal({ videos, initialIndex, onClose }: PhotoshootModalProps) {
  const [activeIdx, setActiveIdx] = useState(initialIndex);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowUp")   setActiveIdx((i) => Math.max(0, i - 1));
      if (e.key === "ArrowDown") setActiveIdx((i) => Math.min(videos.length - 1, i + 1));
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [videos.length, onClose]);

  const activeVideo = videos[activeIdx];

  return (
    <AnimatePresence>
      {/* Full-screen dark backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
        onClick={onClose}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="fixed top-4 right-4 md:top-8 md:right-8 z-[200] text-white/75 hover:text-white transition-all hover:scale-110 p-2.5 md:p-3 rounded-full bg-[#0A0A0F]/80 border border-white/10 backdrop-blur-md hover:bg-[#0A0A0F]"
          aria-label="Close modal"
        >
          <X className="w-6 h-6 md:w-7 md:h-7" />
        </button>

        {/* Main layout container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[1600px] h-full md:h-[90vh] flex flex-col md:flex-row items-center gap-4 md:gap-6 relative pt-10 md:pt-0"
          onClick={(e) => e.stopPropagation()}
        >
          {/* A: Sidebar */}
          <SidebarColumn
            videos={videos}
            activeIdx={activeIdx}
            onSelect={setActiveIdx}
          />

          {/* B: Video/Image player */}
          <VideoColumn
            activeIdx={activeIdx}
            activeVideo={activeVideo}
          />

          {/* C: Info panel */}
          <InfoPanelCard />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
