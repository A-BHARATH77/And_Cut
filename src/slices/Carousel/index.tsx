"use client";

import { useState, useRef, useEffect } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { motion } from "motion/react";
import clsx from "clsx";
import gsap from "gsap";
import { FORMATS_DATA } from "@/data/services";
import VimeoFacadeCard from "@/components/VimeoFacadeCard";
import PreloadedVideo from "@/components/PreloadedVideo";
import LocalBlobVideoCard from "@/components/LocalBlobVideoCard";
import BeyondVertical from "@/components/Beyond_vertical";
import UGCModal from "@/components/UGCModal";
import DVCModal from "@/components/DVCModal";
import MicroDramaModal from "@/components/MicroDramaModal";
import AdFilmsModal from "@/components/AdFilmsModal";
import PhotoshootModal from "@/components/PhotoshootModal";

/* ──────────────────────────────────────────────────────────────────────────────
  TabMarquee

  Self-contained infinite marquee for ONE tab. Always in the DOM so that
  display:none on inactive tabs doesn't destroy any iframes (they remain
  mounted and buffering while hidden).

  Each Vimeo card uses VimeoFacadeCard:
    • Shows a static Vimeo thumbnail immediately (no blank box ever)
    • Injects the iframe only when `sectionNearVisible` is true
    • Cross-fades thumbnail → playing video once Vimeo fires "ready"
──────────────────────────────────────────────────────────────────────────────── */
interface TabMarqueeProps {
  tabKey: string;
  isActive: boolean;
  sectionNearVisible: boolean;
  onCardClick: (realIndex: number) => void;
}

function TabMarquee({ tabKey, isActive, sectionNearVisible, onCardClick }: TabMarqueeProps) {
  const activeItems = FORMATS_DATA[tabKey] ?? [];
  const isHorizontalLayout =
    tabKey === "Photoshoot" || tabKey === "Ad films & others";
  const isClickable = [
    "UGC",
    "DVC",
    "Micro Drama",
    "Ad films & others",
    "Photoshoot",
  ].includes(tabKey);
  const showPlayHint = isClickable && tabKey !== "Photoshoot";

  // Build infinite loop: at least 12 base items, then doubled
  let baseItems = [...activeItems];
  while (baseItems.length < 12 && activeItems.length > 0) {
    baseItems = [...baseItems, ...activeItems];
  }
  const loopItems = [...baseItems, ...baseItems];

  const getItemWidth = (v: typeof activeItems[0]) => {
    if (v.isHorizontal === false) return 170; // vertical photoshoot card matching row height
    return isHorizontalLayout ? 560 : 298;
  };
  const halfWidth = baseItems.reduce((acc, v) => acc + getItemWidth(v), 0);

  const xRef             = useRef(0);
  const isAutoScrollRef  = useRef(true);
  const activeTweenRef   = useRef<gsap.core.Tween | null>(null);
  const trackRef         = useRef<HTMLDivElement>(null);
  const isActiveRef      = useRef(isActive);

  useEffect(() => { isActiveRef.current = isActive; }, [isActive]);

  // Reset scroll position when this tab becomes active
  useEffect(() => {
    if (!isActive) return;
    activeTweenRef.current?.kill();
    xRef.current = 0;
    isAutoScrollRef.current = true;
    if (trackRef.current) trackRef.current.style.transform = "translateX(0px)";
  }, [isActive]);

  // RAF auto-scroll loop
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();
    const speed = 0.042; // px per ms

    const tick = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;
      if (trackRef.current && isAutoScrollRef.current && isActiveRef.current && halfWidth > 0) {
        let x = xRef.current - speed * delta;
        if (x <= -halfWidth) x += halfWidth;
        xRef.current = x;
        trackRef.current.style.transform = `translateX(${x}px)`;
      }
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(animId);
      activeTweenRef.current?.kill();
    };
  }, [halfWidth]);

  const handleArrowScroll = (direction: "left" | "right") => {
    if (!trackRef.current || halfWidth <= 0) return;
    isAutoScrollRef.current = false;
    activeTweenRef.current?.kill();

    const shift = isHorizontalLayout ? 1120 : 596;
    const targetX = xRef.current + (direction === "left" ? shift : -shift);

    activeTweenRef.current = gsap.to(xRef, {
      current: targetX,
      duration: 0.8,
      ease: "power3.out",
      onUpdate: () => {
        if (!trackRef.current) return;
        let x = xRef.current;
        if (x <= -halfWidth * 1.5) { x += halfWidth; xRef.current = x; }
        else if (x > 0)            { x -= halfWidth; xRef.current = x; }
        trackRef.current.style.transform = `translateX(${x}px)`;
      },
      onComplete: () => {
        let x = xRef.current;
        while (x <= -halfWidth) x += halfWidth;
        while (x > 0)           x -= halfWidth;
        xRef.current = x;
        if (trackRef.current)
          trackRef.current.style.transform = `translateX(${x}px)`;
        isAutoScrollRef.current = true;
      },
    });
  };

  return (
    <div
      style={{ display: isActive ? "block" : "none" }}
      className="w-full relative py-4 overflow-hidden"
    >
      {/* Left Arrow */}
      <button
        onClick={() => handleArrowScroll("left")}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/60 border border-white/10 text-white flex items-center justify-center hover:bg-black/90 hover:scale-110 active:scale-95 transition-all shadow-lg cursor-pointer"
        aria-label="Scroll Left"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Right Arrow */}
      <button
        onClick={() => handleArrowScroll("right")}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/60 border border-white/10 text-white flex items-center justify-center hover:bg-black/90 hover:scale-110 active:scale-95 transition-all shadow-lg cursor-pointer"
        aria-label="Scroll Right"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="w-full overflow-hidden">
        <div
          ref={trackRef}
          className="flex flex-row gap-3 sm:gap-4 md:gap-5 will-change-transform"
          style={{ width: "max-content" }}
        >
          {loopItems.map((video, idx) => {
            const isWebp     = video.videoPath.endsWith(".webp");
            const realIndex  = idx % activeItems.length;

            return (
              <div
                key={`${tabKey}-card-${idx}`}
                onClick={() => isClickable && onCardClick(realIndex)}
                className={clsx(
                  "shrink-0 rounded-xl sm:rounded-2xl overflow-hidden bg-[#0C0C12] border border-white/5 relative shadow-md hover:border-[#6EE7FF]/30 transition-colors duration-300",
                  video.isHorizontal === false
                    ? "h-[180px] sm:h-[247px] md:h-[281px] lg:h-[303px] aspect-[9/16]"
                    : isHorizontalLayout
                      ? "w-[320px] sm:w-[440px] md:w-[500px] lg:w-[540px] aspect-video"
                      : "w-[160px] sm:w-[230px] md:w-[250px] lg:w-[278px] lg:h-[496px] aspect-[9/16]",
                  isClickable && "cursor-pointer"
                )}
              >
                {video.useLocalCard ? (
                  /* ── Local blob card (UGC) ─────────────────────────────────
                     Thumbnail shows instantly (no black box ever).
                     Switches to the local mp4 blob once prefetch completes. */
                  <LocalBlobVideoCard
                    videoPath={video.videoPath}
                    thumbnailUrl={video.thumbnailUrl}
                    className="w-full h-full"
                  />
                ) : video.vimeoId ? (
                  /* ── Vimeo facade (DVC, Micro Drama) ───────────────────────
                     Phase 1: thumbnail image (immediate, no blank box)
                     Phase 2: iframe injected when section is ~500px away
                     Phase 3: thumbnail fades out, video plays seamlessly     */
                  <VimeoFacadeCard
                    vimeoId={video.vimeoId}
                    thumbnailUrl={video.thumbnailUrl}
                    shouldLoad={sectionNearVisible}
                  />
                ) : isWebp ? (
                  <img
                    src={video.videoPath}
                    alt={video.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  /* Local .mp4 / .webm — fetched as a Blob for instant gapless playback */
                  <PreloadedVideo
                    src={video.videoPath}
                    className="w-full h-full object-cover"
                  />
                )}

                {showPlayHint && (
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/25 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100 z-10">
                    <div className="w-12 h-12 rounded-full bg-black/60 border border-white/25 backdrop-blur-sm flex items-center justify-center">
                      <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────────
  Carousel — Root Component
──────────────────────────────────────────────────────────────────────────────── */

export type CarouselProps = SliceComponentProps<Content.CarouselSlice>;

const TABS = ["UGC", "DVC", "Micro Drama", "Ad films & others", "Photoshoot"];

const DISPLAY_LABELS: Record<string, string> = {
  "UGC":              "UGC",
  "DVC":              "DVC",
  "Micro Drama":      "Micro drama",
  "Ad films & others":"Ad films & others",
  "Photoshoot":       "Photoshoot",
};

const Carousel = ({ slice }: CarouselProps): JSX.Element => {
  const [activeTab, setActiveTab]           = useState("UGC");
  const [mobilePage, setMobilePage]         = useState(0);
  // True once the #format section is within ~500px of the viewport.
  // Triggers VimeoFacadeCard to inject iframes (Phase 2 → 3).
  const [sectionNearVisible, setSectionNearVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // ── IntersectionObserver: trigger iframe loading before section is visible ──
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      // Fallback for environments without IntersectionObserver
      setSectionNearVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionNearVisible(true);
          observer.disconnect(); // once triggered, never revert
        }
      },
      {
        // rootMargin: "500px" means we fire 500px BEFORE the section
        // enters the viewport — giving Vimeo a head-start on loading.
        rootMargin: "500px 0px",
        threshold:  0,
      }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setMobilePage(
      activeTab === "Ad films & others" || activeTab === "Photoshoot" ? 1 : 0
    );
  }, [activeTab]);

  const [ugcModal,        setUgcModal]        = useState<{ open: boolean; index: number }>({ open: false, index: 0 });
  const [dvcModal,        setDvcModal]        = useState<{ open: boolean; index: number }>({ open: false, index: 0 });
  const [microDramaModal, setMicroDramaModal] = useState<{ open: boolean; index: number }>({ open: false, index: 0 });
  const [adFilmsModal,    setAdFilmsModal]    = useState<{ open: boolean; index: number }>({ open: false, index: 0 });
  const [photoshootModal, setPhotoshootModal] = useState<{ open: boolean; index: number }>({ open: false, index: 0 });

  const getCardClickHandler = (tab: string) => (idx: number) => {
    if      (tab === "UGC")              setUgcModal({ open: true, index: idx });
    else if (tab === "DVC")              setDvcModal({ open: true, index: idx });
    else if (tab === "Micro Drama")      setMicroDramaModal({ open: true, index: idx });
    else if (tab === "Ad films & others") setAdFilmsModal({ open: true, index: idx });
    else if (tab === "Photoshoot")       setPhotoshootModal({ open: true, index: idx });
  };

  return (
    <>
      <section
        ref={sectionRef}
        id="format"
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="w-full bg-[#050508] text-white py-12 md:py-20 overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="w-full text-center max-w-7xl px-4 mx-auto relative z-10"
        >
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400 uppercase mb-3 md:mb-4">
            OUR SERVICES
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm md:text-base font-medium max-w-[800px] mx-auto leading-relaxed mb-8 md:mb-12">
            From the first script to the final edit, we tell your brand&apos;s story across different video formats so it feels authentic and ready to watch.
          </p>

          {/* Category tabs — Desktop / Tablet */}
          <div
            data-lenis-prevent="true"
            className="hidden sm:flex w-fit max-w-full overflow-x-auto hide-scrollbar flex-nowrap sm:flex-wrap sm:justify-center items-center gap-2.5 sm:gap-3.5 mx-auto p-2.5 sm:p-3 px-6 sm:px-8 bg-[#0C0C12]/80 border border-white/5 backdrop-blur-md rounded-full select-none"
          >
            {TABS.map((tab) => {
              const isActive = tab === activeTab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  onTouchStart={(e) => { e.preventDefault(); setActiveTab(tab); }}
                  className={clsx(
                    "px-5 py-2.5 sm:px-7 sm:py-3 rounded-full text-xs sm:text-sm md:text-[15px] font-black tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 whitespace-nowrap cursor-pointer relative z-20",
                    isActive
                      ? "bg-[#6EE7FF] text-[#050508] shadow-[0_0_20px_rgba(110,231,255,0.4)]"
                      : "bg-transparent text-white/70 hover:bg-[#6EE7FF]/20 hover:text-white"
                  )}
                >
                  {DISPLAY_LABELS[tab]}
                </button>
              );
            })}
          </div>

          {/* Category tabs — Mobile */}
          <div className="flex sm:hidden items-center justify-center gap-2 mx-auto w-fit max-w-full relative z-20">
            <div
              data-lenis-prevent="true"
              className="w-fit max-w-full overflow-x-auto hide-scrollbar flex flex-nowrap items-center gap-2 bg-[#0C0C12]/80 border border-white/5 backdrop-blur-md rounded-full p-2 px-4 select-none"
            >
              {(mobilePage === 0
                ? ["UGC", "DVC", "Micro Drama"]
                : ["Ad films & others", "Photoshoot"]
              ).map((tab) => {
                const isActive = tab === activeTab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    onTouchStart={(e) => { e.preventDefault(); setActiveTab(tab); }}
                    className={clsx(
                      "px-6 py-2.5 rounded-full text-xs font-black tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 whitespace-nowrap cursor-pointer",
                      isActive
                        ? "bg-[#6EE7FF] text-[#050508] shadow-[0_0_20px_rgba(110,231,255,0.4)]"
                        : "bg-transparent text-white/70 hover:bg-[#6EE7FF]/20 hover:text-white"
                    )}
                  >
                    {DISPLAY_LABELS[tab]}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => {
                if (mobilePage === 0) { setMobilePage(1); setActiveTab("Ad films & others"); }
                else                 { setMobilePage(0); setActiveTab("UGC"); }
              }}
              className="p-2.5 bg-[#0C0C12]/80 border border-white/5 backdrop-blur-md rounded-full text-[#6EE7FF] hover:bg-[#6EE7FF]/20 hover:text-white transition-all cursor-pointer flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(110,231,255,0.15)]"
              aria-label={mobilePage === 0 ? "Next Tabs" : "Previous Tabs"}
            >
              {mobilePage === 0 ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                </svg>
              )}
            </button>
          </div>
        </motion.div>

        {/* All 5 tab marquees always in DOM.
            display:none on inactive ones keeps components alive. */}
        <div className="mt-6 md:mt-8">
          {TABS.map((tab) => (
            <TabMarquee
              key={tab}
              tabKey={tab}
              isActive={tab === activeTab}
              sectionNearVisible={sectionNearVisible}
              onCardClick={getCardClickHandler(tab)}
            />
          ))}
        </div>
      </section>

      <BeyondVertical />

      {ugcModal.open && (
        <UGCModal
          videos={FORMATS_DATA["UGC"]}
          initialIndex={ugcModal.index}
          onClose={() => setUgcModal({ open: false, index: 0 })}
        />
      )}
      {dvcModal.open && (
        <DVCModal
          videos={FORMATS_DATA["DVC"]}
          initialIndex={dvcModal.index}
          onClose={() => setDvcModal({ open: false, index: 0 })}
        />
      )}
      {microDramaModal.open && (
        <MicroDramaModal
          videos={FORMATS_DATA["Micro Drama"]}
          initialIndex={microDramaModal.index}
          onClose={() => setMicroDramaModal({ open: false, index: 0 })}
        />
      )}
      {adFilmsModal.open && (
        <AdFilmsModal
          videos={FORMATS_DATA["Ad films & others"]}
          initialIndex={adFilmsModal.index}
          onClose={() => setAdFilmsModal({ open: false, index: 0 })}
        />
      )}
      {photoshootModal.open && (
        <PhotoshootModal
          videos={FORMATS_DATA["Photoshoot"]}
          initialIndex={photoshootModal.index}
          onClose={() => setPhotoshootModal({ open: false, index: 0 })}
        />
      )}
    </>
  );
};

export default Carousel;
