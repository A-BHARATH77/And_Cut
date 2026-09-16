"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import Link from "next/link";
import { X } from "lucide-react";
import { FORMAT_PRICES, VideoData } from "@/data/services";

/* ─── helpers ────────────────────────────────────────────────────────────── */
const isLocalVideo = (path: string) => /\.(mp4|webm|mov)$/i.test(path);

const isBunnyEmbed = (path: string) =>
  path.includes("player.mediadelivery.net") ||
  path.includes("iframe.mediadelivery.net");

function toBunnyEmbedUrl(url: string, params: string): string {
  let base = url;
  const m = url.match(/player\.mediadelivery\.net\/play\/(\d+)\/([a-f0-9-]+)/i);
  if (m) {
    base = `https://iframe.mediadelivery.net/embed/${m[1]}/${m[2]}`;
  } else if (url.includes("player.mediadelivery.net")) {
    base = url.replace(
      "player.mediadelivery.net/play/",
      "iframe.mediadelivery.net/embed/"
    );
  }
  const paramObj = new URLSearchParams(params);
  paramObj.set("disableRum", "true");
  const queryStr = paramObj.toString();
  return base.includes("?") ? `${base}&${queryStr}` : `${base}?${queryStr}`;
}

/* ─── Vimeo in-page lightbox ─────────────────────────────────────────────── */
function VimeoLightbox({
  vimeoId,
  isVertical,
  onClose,
}: {
  vimeoId: string;
  isVertical: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const vimeoSrc =
    `https://player.vimeo.com/video/${vimeoId}` +
    `?autoplay=1&controls=1&loop=0&dnt=1&title=0&byline=0&portrait=0&playsinline=1`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-md p-3 sm:p-6 md:p-12 cursor-pointer"
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
        className={clsx(
          "relative overflow-hidden rounded-xl md:rounded-[2rem] shadow-2xl bg-black cursor-default",
          isVertical
            ? "h-[80vh] max-h-[700px] aspect-[9/16]"
            : "w-full max-w-[95vw] md:max-w-[1100px] aspect-video"
        )}
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

/* ─── Props ──────────────────────────────────────────────────────────────── */
interface Props {
  formatName: string | null;
  activeVideos: VideoData[];
}

/* ─── Main page component ────────────────────────────────────────────────── */
export default function ServiceGalleryClient({ formatName, activeVideos }: Props) {
  const searchParams = useSearchParams();
  const initialIdx = parseInt(searchParams.get("videoIdx") || "0", 10);

  const [activeVideoIdx, setActiveVideoIdx] = useState<number>(
    isNaN(initialIdx) || initialIdx < 0 || initialIdx >= activeVideos.length
      ? 0
      : initialIdx
  );

  // Vimeo lightbox state
  const [vimeoOpen, setVimeoOpen] = useState<{ id: string; isVertical: boolean } | null>(null);

  const sidebarRef = useRef<HTMLDivElement>(null);
  const mobileSidebarRef = useRef<HTMLDivElement>(null);

  const scrollUp = () => sidebarRef.current?.scrollBy({ top: -200, behavior: "smooth" });
  const scrollDown = () => sidebarRef.current?.scrollBy({ top: 200, behavior: "smooth" });

  // Open Vimeo modal for the given video
  const openVimeo = (video: VideoData) => {
    if (video.vimeoId) {
      setVimeoOpen({ id: video.vimeoId, isVertical: !video.isHorizontal });
    }
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

        {/* ── MOBILE layout: sidebar (left) + video (right), side-by-side ── */}
        <div className="flex flex-col gap-4 lg:hidden">
          {/* Row: sidebar (left) + active video (right) */}
          <div className="flex flex-row gap-2 items-start">
            {/* Mobile sidebar — vertical scrollable thumbnails with arrows */}
            <div className="flex flex-col items-center gap-1.5 shrink-0">
              {/* Up arrow */}
              <button
                onClick={() => mobileSidebarRef.current?.scrollBy({ top: -160, behavior: "smooth" })}
                className="w-7 h-7 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center active:scale-95 shadow-md"
                aria-label="Scroll Up"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
                </svg>
              </button>

              {/* Thumbnail list */}
              <div
                ref={mobileSidebarRef}
                className="flex flex-col gap-2 overflow-y-auto hide-scrollbar overscroll-contain scroll-smooth"
                style={{ maxHeight: "65vh" }}
                data-lenis-prevent="true"
              >
                {activeVideos.map((video, idx) => {
                  if (idx === activeVideoIdx) return null;
                  return (
                    <motion.div
                      key={`mthumb-${idx}`}
                      onClick={() => setActiveVideoIdx(idx)}
                      whileTap={{ scale: 0.95 }}
                      className={clsx(
                        "shrink-0 cursor-pointer rounded-xl overflow-hidden border transition-all duration-300",
                        "border-white/20 hover:border-white/50",
                        video.isHorizontal ? "w-[68px]" : "w-[56px]"
                      )}
                    >
                      <VideoCard video={video} isThumbnail />
                    </motion.div>
                  );
                })}
              </div>

              {/* Down arrow */}
              <button
                onClick={() => mobileSidebarRef.current?.scrollBy({ top: 160, behavior: "smooth" })}
                className="w-7 h-7 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center active:scale-95 shadow-md"
                aria-label="Scroll Down"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Active video — takes remaining width */}
            <div className="flex-1 min-w-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`main-${activeVideoIdx}`}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35 }}
                  className="w-full"
                >
                  <VideoCard
                    video={activeVideo}
                    isActive
                    onVimeoClick={() => openVimeo(activeVideo)}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Info card — below the video row */}
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
        </div>

        {/* ── DESKTOP layout: side-by-side ── */}
        <div className="hidden lg:flex gap-8 xl:gap-12 h-[80vh] flex-row">
          {/* Sidebar */}
          <div className="flex items-center gap-2 xl:gap-4 h-full min-h-0">
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

          {/* Main video — Bunny autoplay, click opens Vimeo in-page */}
          <div className="flex-1 min-w-0 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={`dmain-${activeVideoIdx}`}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
                className="w-full h-full flex items-center justify-center"
              >
                <VideoCard
                  video={activeVideo}
                  isActive
                  onVimeoClick={() => openVimeo(activeVideo)}
                />
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

      {/* ── Vimeo in-page lightbox ── */}
      <AnimatePresence>
        {vimeoOpen && (
          <VimeoLightbox
            vimeoId={vimeoOpen.id}
            isVertical={vimeoOpen.isVertical}
            onClose={() => setVimeoOpen(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── VideoCard ──────────────────────────────────────────────────────────── */
function VideoCard({
  video,
  isThumbnail = false,
  isActive = false,
  onVimeoClick,
}: {
  video: VideoData;
  isThumbnail?: boolean;
  isActive?: boolean;
  onVimeoClick?: () => void;
}) {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Local video: play when active, pause when thumbnail
  useEffect(() => {
    if (isActive && videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
    if (isThumbnail && videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.pause();
    }
  }, [isActive, isThumbnail]);

  if (!video) return null;

  // Bunny silent-autoplay src (muted, no controls)
  const bunnyIframeSrc = isBunnyEmbed(video.videoPath)
    ? toBunnyEmbedUrl(video.videoPath, "autoplay=true&loop=true&muted=true&preload=true&controls=false")
    : null;

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
    >
      {isBunnyEmbed(video.videoPath) ? (
        <div className="relative w-full h-full" style={{ backgroundColor: "#0C0C12" }}>
          {/* Thumbnail facade — fades out once iframe loads */}
          {video.thumbnailUrl ? (
            <img
              src={video.thumbnailUrl}
              alt={video.title}
              draggable={false}
              className={clsx(
                "absolute inset-0 w-full h-full object-cover transition-all duration-700",
                isThumbnail && "opacity-70 group-hover:opacity-100"
              )}
              style={{
                zIndex: 1,
                opacity: isActive && iframeLoaded ? 0 : undefined,
                transition: isActive ? "opacity 0.8s ease" : undefined,
                pointerEvents: "none",
              }}
            />
          ) : (
            <div className="absolute inset-0 bg-[#0C0C12] flex items-center justify-center" style={{ zIndex: 1 }}>
              <svg className="w-8 h-8 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          )}

          {/* Bunny silent autoplay — only for the active (main) card */}
          {isActive && bunnyIframeSrc && (
            <iframe
              src={bunnyIframeSrc}
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
                pointerEvents: "none", // clicks pass to the overlay below
              }}
            />
          )}

          {/* Clickable Vimeo overlay — sits above the iframe, intercepts clicks */}
          {isActive && video.vimeoId && (
            <div
              className="absolute inset-0 cursor-pointer group/vimeo flex items-end justify-start p-4 z-20"
              style={{ background: "transparent" }}
              onClick={(e) => {
                e.stopPropagation();
                onVimeoClick?.();
              }}
            >
              {/* Hover cue — bottom-left badge */}
              <div className="opacity-0 group-hover/vimeo:opacity-100 transition-all duration-300 translate-y-2 group-hover/vimeo:translate-y-0 flex items-center gap-2 px-3.5 py-2 rounded-full bg-black/80 border border-white/20 text-white text-xs font-semibold backdrop-blur-md shadow-lg">
                <svg className="w-3.5 h-3.5 text-[#6EE7FF]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.396 7.164c-.093 2.026-1.507 4.8-4.245 8.32-2.817 3.643-5.2 5.465-7.149 5.465-1.206 0-2.227-.887-3.064-2.66-.558-2.046-1.116-4.093-1.674-6.14-.62-2.261-1.286-3.393-2.001-3.393-.155 0-.698.326-1.629.977L1.4 8.242c1.272-1.116 2.528-2.233 3.768-3.35 1.69-1.458 2.962-2.233 3.815-2.326 2.016-.186 3.256.961 3.722 3.44.527 2.822.884 4.575 1.07 5.257.559 2.294 1.163 3.441 1.815 3.441.527 0 1.256-.822 2.186-2.465.93-1.644 1.442-2.885 1.535-3.723.186-1.488-.418-2.233-1.814-2.233-.652 0-1.334.14-2.047.419 1.349-4.416 3.907-6.527 7.675-6.333 2.76.14 4.047 1.845 3.86 5.114z"/>
                </svg>
                Watch on Vimeo
              </div>
            </div>
          )}
        </div>
      ) : isLocalVideo(video.videoPath) ? (
        <video
          ref={videoRef}
          src={video.videoPath}
          autoPlay
          loop
          muted
          playsInline
          preload={isThumbnail ? "metadata" : "auto"}
          onClick={() => {
            if (videoRef.current) {
              if (videoRef.current.paused) {
                videoRef.current.play().catch(() => {});
              } else {
                videoRef.current.pause();
              }
            }
          }}
          className={clsx(
            "w-full h-full object-cover transition-transform duration-700 cursor-pointer",
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

      {/* No mute/unmute controls — videos play silently like the hero section */}

      {/* Title overlay for non-thumbnail cards */}
      {!isThumbnail && !video.videoPath.includes("/UGC/") && (
        <div className="absolute bottom-0 left-0 right-0 p-3 md:p-5 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none z-10">
          <h3 className="text-white text-sm md:text-lg font-bold capitalize select-none truncate">{video.title}</h3>
        </div>
      )}
    </div>
  );
}
