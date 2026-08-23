"use client";

import { useState, useRef, useEffect } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { motion } from "motion/react";
import clsx from "clsx";
import gsap from "gsap";
import { FORMATS_DATA } from "@/data/services";
import VimeoPlayer from "@/components/VimeoPlayer";
import BeyondVertical from "@/components/Beyond_vertical";

export type CarouselProps = SliceComponentProps<Content.CarouselSlice>;

const TABS = ["UGC", "DVC", "Micro Drama", "Ad films & others", "Photoshoot"];

const DISPLAY_LABELS: Record<string, string> = {
  "UGC": "UGC",
  "DVC": "DVC",
  "Micro Drama": "Micro drama",
  "Ad films & others": "Ad films & others",
  "Photoshoot": "Photoshoot",
};

const Carousel = ({ slice }: CarouselProps): JSX.Element => {
  const [activeTab, setActiveTab] = useState("UGC");
  const trackRef = useRef<HTMLDivElement>(null);
  
  // Keep track of the current horizontal position (translateX)
  const xRef = useRef(0);
  const isAutoScrollingRef = useRef(true);
  const activeTweenRef = useRef<gsap.core.Tween | null>(null);

  const activeItems = FORMATS_DATA[activeTab] ?? [];
  const isHorizontalLayout = activeTab === "Photoshoot" || activeTab === "Ad films & others";

  // Double the items to make the infinite loop seamless
  let baseItems = [...activeItems];
  while (baseItems.length < 12 && activeItems.length > 0) {
    baseItems = [...baseItems, ...activeItems];
  }
  const loopItems = [...baseItems, ...baseItems];

  const cardWidth = isHorizontalLayout ? 560 : 298; // card width + gap (540+20 / 278+20)
  const halfWidth = baseItems.length * cardWidth;

  // Reset positioning when tab changes
  useEffect(() => {
    if (activeTweenRef.current) activeTweenRef.current.kill();
    xRef.current = 0;
    isAutoScrollingRef.current = true;
    if (trackRef.current) {
      trackRef.current.style.transform = "translateX(0px)";
    }
  }, [activeTab]);

  // Handle manual arrow click scrolling with smooth GSAP transition
  const handleArrowScroll = (direction: "left" | "right") => {
    if (trackRef.current && halfWidth > 0) {
      isAutoScrollingRef.current = false;
      if (activeTweenRef.current) activeTweenRef.current.kill();

      const shiftAmount = isHorizontalLayout ? 1120 : 596; // Shift by 2 cards (298 * 2)
      const targetShift = direction === "left" ? shiftAmount : -shiftAmount;
      
      // Calculate target X position
      const targetX = xRef.current + targetShift;

      activeTweenRef.current = gsap.to(xRef, {
        current: targetX,
        duration: 0.8,
        ease: "power3.out",
        onUpdate: () => {
          if (trackRef.current) {
            let x = xRef.current;
            // Seamlessly wrap position during the animation if it exceeds bounds
            if (x <= -halfWidth * 1.5) {
              x += halfWidth;
              xRef.current = x;
            } else if (x > 0) {
              x -= halfWidth;
              xRef.current = x;
            }
            trackRef.current.style.transform = `translateX(${x}px)`;
          }
        },
        onComplete: () => {
          // Normalize position back to [-halfWidth, 0] range
          let x = xRef.current;
          while (x <= -halfWidth) x += halfWidth;
          while (x > 0) x -= halfWidth;
          xRef.current = x;
          
          if (trackRef.current) {
            trackRef.current.style.transform = `translateX(${x}px)`;
          }
          isAutoScrollingRef.current = true;
        }
      });
    }
  };

  // Infinite auto-scroll animation frame loop
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();
    const speed = 0.042; // pixels per millisecond

    const animate = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      if (trackRef.current && isAutoScrollingRef.current && halfWidth > 0) {
        let x = xRef.current - speed * delta;
        if (x <= -halfWidth) {
          x += halfWidth;
        }
        xRef.current = x;
        trackRef.current.style.transform = `translateX(${x}px)`;
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animationFrameId);
      if (activeTweenRef.current) activeTweenRef.current.kill();
    };
  }, [activeTab, halfWidth]);

  return (
    <>
      <section
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

          {/* Category tabs */}
          <div
            data-lenis-prevent="true"
            className="w-fit max-w-full overflow-x-auto hide-scrollbar flex flex-nowrap sm:flex-wrap sm:justify-center items-center gap-1.5 sm:gap-3 mx-auto p-1.5 px-4 sm:px-6 bg-[#0C0C12]/80 border border-white/5 backdrop-blur-md rounded-full select-none"
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
                    "px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm md:text-[15px] font-black tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 whitespace-nowrap cursor-pointer relative z-20",
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
        </motion.div>

        {/* Infinite Marquee */}
        {loopItems.length > 0 && (
          <div className="w-full relative mt-12 md:mt-16 overflow-hidden py-4 select-none group/marquee">
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

            {/* Viewport container */}
            <div className="w-full overflow-hidden">
              {/* The infinite marquee track */}
              <div
                ref={trackRef}
                className="flex flex-row gap-3 sm:gap-4 md:gap-5 will-change-transform"
                style={{ width: "max-content" }}
              >
                {loopItems.map((video, idx) => {
                  const isWebp = video.videoPath.endsWith(".webp");
                  return (
                    <div
                      key={`${activeTab}-${idx}`}
                      className={clsx(
                        "shrink-0 rounded-xl sm:rounded-2xl overflow-hidden bg-[#0C0C12] border border-white/5 relative shadow-md hover:border-[#6EE7FF]/30 transition-colors duration-300",
                        isHorizontalLayout
                          ? "w-[320px] sm:w-[440px] md:w-[500px] lg:w-[540px] aspect-video"
                          : "w-[160px] sm:w-[230px] md:w-[250px] lg:w-[278px] lg:h-[496px] aspect-[9/16]"
                      )}
                    >
                      {video.vimeoId ? (
                        <VimeoPlayer
                          vimeoId={video.vimeoId}
                          playing={true}
                          muted={true}
                          loop={true}
                          controls={false}
                          background={true}
                          quality="360p"
                          className="w-full h-full pointer-events-none scale-105"
                        />
                      ) : isWebp ? (
                        <img
                          src={video.videoPath}
                          alt={video.title}
                          className="w-full h-full object-cover animate-fade-in"
                          loading="lazy"
                        />
                      ) : (
                        <video
                          src={video.videoPath}
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload="metadata"
                          className="w-full h-full object-cover animate-fade-in"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </section>
      <BeyondVertical />
    </>
  );
};

export default Carousel;
