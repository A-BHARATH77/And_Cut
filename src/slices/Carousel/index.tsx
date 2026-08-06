"use client";

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";
import { FORMATS_DATA, FORMAT_TABS, FORMAT_PRICES, VideoData } from "../../data/services";
import dynamic from "next/dynamic";

// Loaded client-side only — keeps Vimeo SDK off the critical path
const VimeoPlayer = dynamic(() => import("../../components/VimeoPlayer"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 flex items-center justify-center bg-black"><div className="w-10 h-10 border-2 border-[#6EE7FF]/30 border-t-[#6EE7FF] rounded-full animate-spin" /></div>,
});

export type CarouselProps = SliceComponentProps<Content.CarouselSlice>;

const isVideo = (path: string) => /\.(mp4|webm|mov)$/i.test(path);

const Carousel = ({ slice }: CarouselProps): JSX.Element => {
  const [activeTab, setActiveTab] = useState<string>("UGC");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [modalData, setModalData] = useState<{ section: string; idx: number } | null>(null);
  const [simpleVideoSrc, setSimpleVideoSrc] = useState<string | null>(null);

  useEffect(() => {
    if (modalData || simpleVideoSrc) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [modalData, simpleVideoSrc]);

  const activeVideos = FORMATS_DATA[activeTab];

  // Auto-scroll (Infinite loop)
  useEffect(() => {
    let animId: number;
    const scroll = () => {
      if (scrollContainerRef.current && !isHovered) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        if (scrollLeft >= scrollWidth - clientWidth - 2) {
          scrollContainerRef.current.scrollLeft = 0;
        } else {
          scrollContainerRef.current.scrollLeft += 0.6;
        }
      }
      animId = requestAnimationFrame(scroll);
    };
    animId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animId);
  }, [isHovered, activeTab]);

  // Reset on tab change
  useEffect(() => {
    if (scrollContainerRef.current) scrollContainerRef.current.scrollLeft = 0;
  }, [activeTab]);

  return (
    <>
      {/* ── Services Carousel Section ── */}
      <section
        id="format"
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="relative w-full bg-[#050508] py-0 md:py-2 overflow-hidden"
      >
        <style>{`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>

        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-1/4 left-1/4 w-[50%] max-w-[600px] h-[300px] bg-[#6EE7FF]/8 blur-[130px] rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-[50%] max-w-[600px] h-[300px] bg-[#C084FC]/8 blur-[130px] rounded-full" />
        </div>

        <div className="relative z-10 w-full max-w-[1800px] mx-auto flex flex-col items-center px-4">

          {/* Title */}
          <div className="text-center mb-6 md:mb-10 px-4">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400 uppercase mb-2 md:mb-3">
              OUR SERVICES
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm md:text-base font-medium">
              Tailored visual storytelling designed to capture attention.
            </p>
          </div>

          {/* Tabs — horizontal scroll on mobile */}
          <div className="w-full overflow-x-auto hide-scrollbar mb-6 md:mb-10">
            <div className="flex items-center gap-2 md:gap-3 p-1.5 bg-white/5 border border-white/10 rounded-2xl md:rounded-full backdrop-blur-xl w-max mx-auto px-3 md:px-2">
              {FORMAT_TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={clsx(
                    "px-4 sm:px-5 md:px-8 py-2 md:py-3 rounded-xl md:rounded-full text-xs sm:text-sm md:text-base font-bold tracking-wide transition-all duration-300 shrink-0 whitespace-nowrap",
                    activeTab === tab
                      ? "bg-[#6EE7FF] text-[#050508] shadow-[0_4px_20px_rgba(110,231,255,0.4)]"
                      : "text-white/60 hover:text-white hover:bg-white/10"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Scroll Area */}
          <div
            className="w-full relative group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Fade masks */}
            <div className="absolute top-0 left-0 bottom-0 w-6 md:w-16 bg-gradient-to-r from-[#050508] to-transparent z-20 pointer-events-none" />
            <div className="absolute top-0 right-0 bottom-0 w-6 md:w-16 bg-gradient-to-l from-[#050508] to-transparent z-20 pointer-events-none" />

            {/* Left Arrow Button */}
            <button
              onClick={() => {
                if (scrollContainerRef.current) {
                  scrollContainerRef.current.scrollBy({ left: -320, behavior: "smooth" });
                }
              }}
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all hover:bg-black/90 hover:scale-110 active:scale-95 shadow-lg"
              aria-label="Scroll Left"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Right Arrow Button */}
            <button
              onClick={() => {
                if (scrollContainerRef.current) {
                  scrollContainerRef.current.scrollBy({ left: 320, behavior: "smooth" });
                }
              }}
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all hover:bg-black/90 hover:scale-110 active:scale-95 shadow-lg"
              aria-label="Scroll Right"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto hide-scrollbar gap-3 sm:gap-4 md:gap-6 pb-4 w-full px-4"
              style={{ scrollBehavior: "auto" }}
            >
              <AnimatePresence mode="wait">
                {activeVideos.map((video, idx) => {
                  const serviceSlug = encodeURIComponent(activeTab.toLowerCase());
                  return (
                    <motion.div
                      key={`${activeTab}-${idx}`}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.3 }}
                      className={clsx(
                        "shrink-0",
                        video.isHorizontal
                          ? "w-[75vw] sm:w-[60vw] md:w-[500px] lg:w-[650px]"
                          : "w-[48vw] sm:w-[40vw] md:w-[280px] lg:w-[320px]"
                      )}
                    >
                      <div className="cursor-pointer" onClick={() => setModalData({ section: activeTab, idx })}>
                        <VideoCard video={video} />
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Swipe hint on mobile */}
          <p className="mt-2 text-white/30 text-[10px] tracking-widest uppercase md:hidden">
            ← swipe to browse →
          </p>
        </div>
      </section>

      {/* ── Beyond Vertical Section ── */}
      <section id="beyond-vertical" className="relative w-full bg-[#050508] pt-10 pb-0 md:pt-18 md:pb-2 overflow-hidden flex flex-col items-center">
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
            We don&apos;t just shoot for the social feed. We also produce high-impact ad films, genuine customer testimonials, and clean corporate films when your brand needs a bigger, we write, shoot, and edit it all.
          </p>
        </motion.div>

        {/* Horizontal video cards */}
        <div className="w-full max-w-[1400px] px-3 sm:px-6 md:px-12 lg:px-20 relative z-10 flex flex-col gap-4 md:gap-8">
          {FORMATS_DATA["Horizontal"].map((video, idx) => (
            <div key={`horizontal-${idx}`} className="w-full relative group">
              <HorizontalVideoCard video={video} onClick={() => setSimpleVideoSrc(video.videoPath)} />
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {modalData && (
          <ModalContent 
            modalData={modalData} 
            setModalData={setModalData} 
          />
        )}
      </AnimatePresence>

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
};

export default Carousel;

function ModalContent({
  modalData,
  setModalData
}: {
  modalData: { section: string; idx: number };
  setModalData: (data: { section: string; idx: number } | null) => void;
}) {
  const sidebarRef = useRef<HTMLDivElement>(null);

  const scrollUp = () => {
    if (sidebarRef.current) {
      sidebarRef.current.scrollBy({ top: -200, behavior: "smooth" });
    }
  };

  const scrollDown = () => {
    if (sidebarRef.current) {
      sidebarRef.current.scrollBy({ top: 200, behavior: "smooth" });
    }
  };

  const isLandscapeModal = modalData.section === "Ad films & others" || modalData.section === "Photoshoot";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl p-3 sm:p-6 md:p-10 overflow-y-auto"
    >
      <div className="w-full max-w-[1600px] h-full md:h-[85vh] flex flex-col md:flex-row items-center gap-4 md:gap-6 relative pt-10 md:pt-0">
        {/* Arrows and Thumbnails container - Hidden on mobile screen */}
        <div className="hidden md:flex items-center gap-2 xl:gap-4 h-full order-1 min-h-0">
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

          {/* Left side thumbnails */}
          <div 
            ref={sidebarRef}
            className="w-[150px] px-2 shrink-0 flex-col gap-4 overflow-y-auto hide-scrollbar overscroll-contain h-full justify-start pb-4 flex pointer-events-auto scroll-smooth"
            data-lenis-prevent="true"
          >
          {FORMATS_DATA[modalData.section].map((video, idx) => {
            const isSelected = idx === modalData.idx;
            return (
              <motion.div
                key={`modal-thumb-${idx}`}
                onClick={() => setModalData({ section: modalData.section, idx })}
                className={clsx(
                  "shrink-0 cursor-pointer rounded-xl overflow-hidden border transition-all duration-300 bg-black w-[120px] h-[120px] aspect-square relative",
                  isSelected ? "border-[#6EE7FF] ring-2 ring-[#6EE7FF]/50 scale-105" : "border-white/20 hover:border-white/50 opacity-60 hover:opacity-100"
                )}
              >
                {isVideo(video.videoPath) ? (
                  <video 
                    src={video.videoPath} 
                    autoPlay
                    loop 
                    muted 
                    playsInline 
                    preload="metadata"
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <img src={video.videoPath} loading="lazy" className="w-full h-full object-cover" alt={video.title} />
                )}
                {!video.videoPath.includes('/UGC/') && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-1.5">
                    <span className="text-[10px] text-white font-medium truncate">{video.title}</span>
                  </div>
                )}
              </motion.div>
            )
          })}
          </div>
        </div>

        {/* Center Active Playing Video */}
        <div className={clsx(
          "h-[50vh] sm:h-[60vh] md:h-full flex items-center justify-center order-1 md:order-2 bg-black/60 rounded-2xl md:rounded-[2rem] border border-white/10 overflow-hidden relative shadow-2xl shrink-0",
          isLandscapeModal ? "flex-1 w-full" : "aspect-[9/16] mx-auto md:mx-0"
        )}>
          {(() => {
            const active = FORMATS_DATA[modalData.section][modalData.idx];
            if (active.vimeoId) {
              return (
                <VimeoPlayer
                  key={`vimeo-${active.vimeoId}`}
                  vimeoId={active.vimeoId}
                  playing
                  controls
                />
              );
            }
            return isVideo(active.videoPath) ? (
              <video
                key={`modal-active-vid-${modalData.idx}`}
                src={active.videoPath}
                autoPlay
                loop
                controls
                playsInline
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={active.videoPath}
                alt={active.title}
                loading="lazy"
                className="w-full h-full object-contain"
              />
            );
          })()}
        </div>

        {/* Right Side Text Component */}
        <div className={clsx(
          "shrink-0 order-2 md:order-3 flex flex-col justify-between rounded-2xl md:rounded-[2rem] bg-[#0A0A0F] border border-white/10 p-5 sm:p-6 md:p-8 relative overflow-hidden h-auto md:h-full",
          isLandscapeModal ? "w-full md:w-[320px] lg:w-[360px]" : "w-full md:flex-1"
        )}>
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#6EE7FF]/10 blur-[60px] rounded-full pointer-events-none" />
          
          {/* Close button positioned top right */}
          <button 
            onClick={() => setModalData(null)}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 text-white/50 hover:text-white transition-all hover:scale-110 p-2 rounded-full hover:bg-white/10"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="relative z-10 flex flex-col gap-4 sm:gap-6 my-auto pt-2 md:pt-0">
            <div>
              <div className="inline-block px-3 py-1 mb-2 sm:mb-3 text-[10px] font-black tracking-widest uppercase bg-[#6EE7FF]/10 text-[#6EE7FF] rounded-full border border-[#6EE7FF]/20">
                {modalData.section} Format
              </div>
              {modalData.section !== "UGC" && (
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white capitalize mb-2 sm:mb-3 pr-8">
                  {FORMATS_DATA[modalData.section][modalData.idx].title}
                </h3>
              )}
              <p className="text-neutral-400 text-xs md:text-sm leading-relaxed">
                Premium, high-converting visual storytelling designed specifically for {modalData.section} placement to drive maximum engagement.
              </p>
            </div>

            {FORMAT_PRICES[modalData.section] && (
              <>
                <div className="h-px bg-gradient-to-r from-white/20 to-transparent" />
                <div>
                  <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">Starting At</div>
                  <div className="text-2xl sm:text-3xl font-black text-white">
                    {FORMAT_PRICES[modalData.section]}/-
                  </div>
                </div>
              </>
            )}

            <a
              href="https://tally.so/r/EkNRrX"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 md:py-4 rounded-2xl bg-gradient-to-r from-[#6EE7FF] to-[#3B82F6] text-[#050508] font-black uppercase tracking-widest text-xs md:text-sm transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(110,231,255,0.3)] mt-1"
            >
              Connect With Us
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function VideoCard({ video }: { video: VideoData }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVimeoInView, setIsVimeoInView] = useState(false);

  // Track visibility for Vimeo iframes to play/pause automatically
  useEffect(() => {
    if (!video.vimeoId) return;
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setIsVimeoInView(entries[0].isIntersecting);
      },
      { rootMargin: "1000px" } // Buffer zone: start playing 1000px before entering viewport
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [video.vimeoId]);

  // Lazy-load + play when in viewport; reload whenever src changes
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    let inView = false;

    const tryPlay = () => {
      if (!inView) return;
      el.play().catch(() => {});
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          inView = entry.isIntersecting;
          if (entry.isIntersecting) {
            // Always reload src when entering view so tab-switches load correctly
            el.load();
            el.addEventListener("canplay", tryPlay, { once: true });
          } else {
            el.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      inView = false;
    };
  }, [video.videoPath]); // re-run when src changes (tab switch)

  if (!video) return null;

  return (
    <div
      ref={containerRef}
      className={clsx(
        "relative rounded-xl md:rounded-[2rem] overflow-hidden group border border-white/5 w-full bg-neutral-900",
        video.isHorizontal ? "aspect-video" : "aspect-[9/16]"
      )}
    >
      {video.vimeoId ? (
        <VimeoPlayer
          vimeoId={video.vimeoId}
          playing={isVimeoInView}
          muted
          loop
          controls={false}
          background={true}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
        />
      ) : isVideo(video.videoPath) ? (
        <video
          ref={videoRef}
          src={video.videoPath}
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <img
          src={video.videoPath}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />

      {/* Title */}
      {!video.videoPath.includes('/UGC/') && (
        <div className="absolute bottom-0 left-0 right-0 p-3 md:p-5 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none">
          <h3 className="text-white text-sm md:text-lg font-bold capitalize select-none truncate">
            {video.title}
          </h3>
        </div>
      )}
    </div>
  );
}

function HorizontalVideoCard({ video, onClick }: { video: VideoData, onClick: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    let inView = false;
    const tryPlay = () => { if (inView) el.play().catch(() => {}); };

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
    return () => { observer.disconnect(); inView = false; };
  }, [video.videoPath]);

  return (
    <div
      className="w-full aspect-video rounded-2xl md:rounded-3xl overflow-hidden bg-black shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] border border-white/10 relative cursor-pointer group-hover:border-white/20 transition-all duration-500"
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
          <svg className="w-5 h-5 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.907L5.586 15z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        </div>
      </div>
      {/* Text Overlay */}
      {!video.videoPath.includes('/UGC/') && (
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
