"use client";

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

export type BigTextProps = SliceComponentProps<Content.BigTextSlice>;

function LazyVideo({ src, className }: { src: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.pause();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      loop
      muted
      playsInline
      preload="none"
      className={className}
    />
  );
}

const VideoBlock = ({
  src,
  aspect,
  empty,
  id,
  onClick,
}: {
  src?: string;
  aspect: "H" | "V";
  empty?: boolean;
  id?: string;
  onClick?: () => void;
}) => {
  if (empty) {
    return <div className="w-1/2 bg-transparent" />;
  }

  return (
    <motion.div
      layoutId={id}
      onClick={onClick}
      whileHover={{ scale: 0.98 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={clsx(
        "relative overflow-hidden rounded-xl md:rounded-[2rem] bg-gray-900 shadow-sm border border-white/5 cursor-pointer flex-1",
        aspect === "H" ? "aspect-video" : "aspect-[9/16]"
      )}
    >
      {src && (
        <LazyVideo
          src={src}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-black/0 hover:bg-black/20 active:bg-black/30 transition-colors duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-lg">
          <svg className="w-5 h-5 md:w-8 md:h-8 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
        </div>
      </div>
    </motion.div>
  );
};

const VIDEOS = {
  h1: "/ANDCUT_VDS/4.webm",
  h2: "/ANDCUT_VDS/horizontal2.webm",
  h3: "/ANDCUT_VDS/CNBC.webm",
  h4: "/ANDCUT_VDS/4.webm",
  v1: "/ANDCUT_VDS/1.webm",
  v2: "/ANDCUT_VDS/2.webm",
  v3: "/ANDCUT_VDS/3.webm",
  v4: "/ANDCUT_VDS/5.webm",
  v5: "/ANDCUT_VDS/6.webm",
  v6: "/ANDCUT_VDS/7.webm",
  v7: "/ANDCUT_VDS/9.webm",
  v8: "/ANDCUT_VDS/8.webm",
  v9: "/ANDCUT_VDS/10.webm",
  v10: "/ANDCUT_VDS/11.webm",
  v11: "/ANDCUT_VDS/13.webm",
  v12: "/ANDCUT_VDS/14.webm",
};

const COMMENTS_DATA = [
  { user: "_faraz___khan", time: "5w", text: "Kya baat hai 😂 Sahi bande dhunda hai marketing ke liye 👏", pos: "top-[2%] md:-left-[55%] lg:-left-[85%]", rotate: "-rotate-[4deg]", delay: 0 },
  { user: "theaveragemallu", time: "2w", text: "Great ad", pos: "top-[25%] md:-left-[40%] lg:-left-[60%]", rotate: "rotate-[2deg]", delay: 0.2 },
  { user: "laksakhala111", time: "2w", text: "Bc marketing koi inse seekho 😂", pos: "top-[48%] md:-left-[50%] lg:-left-[80%]", rotate: "-rotate-[6deg]", delay: 0.4, authorLiked: true },
  { user: "yj.lol.haha", time: "2w", text: "Nice marketing ha...", pos: "top-[75%] md:-left-[35%] lg:-left-[55%]", rotate: "rotate-[3deg]", delay: 0.6, authorLiked: true },
  
  { user: "kapilkhandelwal_kp", time: "2w", text: "Wow...this ad video, smartly executed 🔥", pos: "top-[8%] md:-right-[60%] lg:-right-[90%]", rotate: "rotate-[5deg]", delay: 0.1, authorLiked: true },
  { user: "imgyancho", time: "1w", text: "Ise kehte hai Ad.", pos: "top-[32%] md:-right-[40%] lg:-right-[65%]", rotate: "-rotate-[2deg]", delay: 0.3, authorLiked: true },
  { user: "itzz_harshil_009", time: "4w", text: "Sahii marketing kar raha hai 😂", pos: "top-[55%] md:-right-[55%] lg:-right-[85%]", rotate: "rotate-[7deg]", delay: 0.5, authorLiked: true },
  { user: "aeishady", time: "1w", text: "Holy shit that's nice marketing 😩", pos: "top-[80%] md:-right-[45%] lg:-right-[70%]", rotate: "-rotate-[4deg]", delay: 0.7, authorLiked: true },
];

const FloatingComment = ({ data }: { data: any }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    animate={{ y: [0, -8, 0] }}
    transition={{
      y: { duration: 4, repeat: Infinity, delay: data.delay, ease: "easeInOut" },
      opacity: { duration: 0.5, delay: data.delay * 0.3 },
      scale: { duration: 0.5, delay: data.delay * 0.3, type: "spring", stiffness: 200 }
    }}
    viewport={{ once: true, margin: "-100px" }}
    className={clsx(
      "absolute z-30 flex items-center gap-2 md:gap-3 p-2 md:p-3 pr-3 md:pr-5 bg-[#181818]/95 backdrop-blur-md rounded-xl md:rounded-2xl shadow-2xl border border-white/10 w-max max-w-[180px] md:max-w-[280px] lg:max-w-[320px] transition-transform hover:scale-[1.02] hover:z-40 cursor-default",
      "scale-[0.75] sm:scale-90 md:scale-100", // Scale down heavily on mobile
      data.pos,
      data.rotate
    )}
    style={{ transformOrigin: data.pos.includes('left') ? 'right center' : 'left center' }}
  >
    <img 
      src={`https://ui-avatars.com/api/?name=${data.user}&background=random&color=fff&size=100`} 
      className="w-6 h-6 md:w-9 md:h-9 rounded-full object-cover shrink-0 border border-white/20" 
      alt={data.user}
    />
    <div className="flex flex-col justify-center">
      <div className="flex items-center gap-1 md:gap-1.5 text-[8px] md:text-[10px] text-white/50">
        <span className="font-bold text-white/90 text-[9px] md:text-xs tracking-tight">{data.user}</span>
        <span>{data.time}</span>
        {data.authorLiked && (
          <>
            <span className="text-[#FF2D55] text-[10px] md:text-xs leading-none">♥</span>
            <span className="hidden sm:inline">by author</span>
          </>
        )}
      </div>
      <p className="text-[10px] md:text-[13px] lg:text-sm text-white/90 leading-tight mt-0.5 md:mt-1 whitespace-normal font-medium">{data.text}</p>
    </div>
  </motion.div>
);

const BigText = ({ slice }: BigTextProps): JSX.Element => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedSrc, setSelectedSrc] = useState<string | null>(null);
  const [selectedAspect, setSelectedAspect] = useState<"H" | "V" | null>(null);

  const open = (id: string, src: string, aspect: "H" | "V") => {
    setSelectedId(id); setSelectedSrc(src); setSelectedAspect(aspect);
  };
  const close = () => { setSelectedId(null); setSelectedSrc(null); setSelectedAspect(null); };

  return (
    <section
      id="works"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full bg-[#050508] text-[#6EE7FF] py-0 md:py-2"
    >
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        className="w-full text-center mt-12 mb-6 md:mt-20 md:mb-12 max-w-2xl px-4 mx-auto relative z-10"
      >
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400 uppercase mb-3 md:mb-4">
          OUR WORK
        </h2>
        <p className="text-neutral-400 text-xs sm:text-sm md:text-base font-medium max-w-[800px] mx-auto">
          A curated selection of our highest-converting and most visually striking projects.
        </p>
      </motion.div>

      {/* Video Grid */}
      <div className="max-w-[1300px] mx-auto px-3 sm:px-4 md:px-8 pb-4">

        {/* ── MOBILE layout (< md) ── */}
        <div className="flex flex-col gap-3 md:hidden">
          {/* Wide */}
          <VideoBlock id="h1" src={VIDEOS.h1} aspect="H" onClick={() => open("h1", VIDEOS.h1, "H")} />
          {/* 2 portrait */}
          <div className="flex gap-3">
            <VideoBlock id="v1" src={VIDEOS.v1} aspect="V" onClick={() => open("v1", VIDEOS.v1, "V")} />
            <VideoBlock id="v2" src={VIDEOS.v2} aspect="V" onClick={() => open("v2", VIDEOS.v2, "V")} />
          </div>
          {/* Wide */}
          <VideoBlock id="h3" src={VIDEOS.h3} aspect="H" onClick={() => open("h3", VIDEOS.h3, "H")} />
          {/* 2 portrait */}
          <div className="flex gap-3">
            <VideoBlock id="v5" src={VIDEOS.v5} aspect="V" onClick={() => open("v5", VIDEOS.v5, "V")} />
            <VideoBlock id="v6" src={VIDEOS.v6} aspect="V" onClick={() => open("v6", VIDEOS.v6, "V")} />
          </div>
          {/* 2 portrait */}
          <div className="flex gap-3">
            <VideoBlock id="v3" src={VIDEOS.v3} aspect="V" onClick={() => open("v3", VIDEOS.v3, "V")} />
            <VideoBlock id="v4" src={VIDEOS.v4} aspect="V" onClick={() => open("v4", VIDEOS.v4, "V")} />
          </div>
          {/* Wide */}
          <VideoBlock id="h2" src={VIDEOS.h2} aspect="H" onClick={() => open("h2", VIDEOS.h2, "H")} />
          {/* 2 portrait */}
          <div className="flex gap-3">
            <VideoBlock id="v7" src={VIDEOS.v7} aspect="V" onClick={() => open("v7", VIDEOS.v7, "V")} />
            <VideoBlock id="v8" src={VIDEOS.v8} aspect="V" onClick={() => open("v8", VIDEOS.v8, "V")} />
          </div>
        </div>

        {/* ── DESKTOP layout (md+) ── */}
        <div className="hidden md:flex gap-6 w-full">
          {/* Left Column */}
          <div className="flex flex-col gap-6 w-1/2">
            <VideoBlock id="h1" src={VIDEOS.h1} aspect="H" onClick={() => open("h1", VIDEOS.h1, "H")} />
            <div className="flex gap-6">
              <VideoBlock id="v1" src={VIDEOS.v1} aspect="V" onClick={() => open("v1", VIDEOS.v1, "V")} />
              <VideoBlock id="v2" src={VIDEOS.v2} aspect="V" onClick={() => open("v2", VIDEOS.v2, "V")} />
            </div>
            <div className="flex gap-6">
              <VideoBlock id="v3" src={VIDEOS.v3} aspect="V" onClick={() => open("v3", VIDEOS.v3, "V")} />
              <VideoBlock id="v4" src={VIDEOS.v4} aspect="V" onClick={() => open("v4", VIDEOS.v4, "V")} />
            </div>
            <VideoBlock id="h2" src={VIDEOS.h2} aspect="H" onClick={() => open("h2", VIDEOS.h2, "H")} />
            <div className="flex gap-6">
              <VideoBlock id="v11" src={VIDEOS.v11} aspect="V" onClick={() => open("v11", VIDEOS.v11, "V")} />
              <VideoBlock id="v12" src={VIDEOS.v12} aspect="V" onClick={() => open("v12", VIDEOS.v12, "V")} />
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6 w-1/2">
            <div className="flex gap-6">
              <VideoBlock id="v5" src={VIDEOS.v5} aspect="V" onClick={() => open("v5", VIDEOS.v5, "V")} />
              <VideoBlock id="v6" src={VIDEOS.v6} aspect="V" onClick={() => open("v6", VIDEOS.v6, "V")} />
            </div>
            <VideoBlock id="h3" src={VIDEOS.h3} aspect="H" onClick={() => open("h3", VIDEOS.h3, "H")} />
            <div className="flex gap-6">
              <VideoBlock id="v7" src={VIDEOS.v7} aspect="V" onClick={() => open("v7", VIDEOS.v7, "V")} />
              <VideoBlock id="v8" src={VIDEOS.v8} aspect="V" onClick={() => open("v8", VIDEOS.v8, "V")} />
            </div>
            <div className="flex gap-6">
              <VideoBlock id="v9" src={VIDEOS.v9} aspect="V" onClick={() => open("v9", VIDEOS.v9, "V")} />
              <VideoBlock id="v10" src={VIDEOS.v10} aspect="V" onClick={() => open("v10", VIDEOS.v10, "V")} />
            </div>
            <VideoBlock id="h4" src={VIDEOS.h4} aspect="H" onClick={() => open("h4", VIDEOS.h4, "H")} />
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="w-full min-h-[100svh] py-12 flex flex-col items-center justify-center bg-[#050508]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="w-full text-center mb-8 md:mb-12 max-w-2xl px-4 mx-auto relative z-10"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400 uppercase mb-2">
            COMMENTS
          </h2>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="w-full mx-auto px-4 flex justify-center relative z-10"
        >
          <style>{`
            @keyframes phone-gradient {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            .animate-phone-gradient {
              background-size: 200% 200%;
              animation: phone-gradient 5s ease infinite;
            }
          `}</style>
          
          {/* Black Background Circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] md:w-[600px] md:h-[600px] lg:w-[800px] lg:h-[800px] bg-black rounded-full z-0 opacity-80" />

          <div className="relative flex justify-center items-center">
            {/* Floating Comments */}
            {COMMENTS_DATA.map((comment, i) => (
              <FloatingComment key={i} data={comment} />
            ))}

            {/* CSS Phone Frame (Replaces the watermarked image) */}
            <div className="relative w-[240px] h-[500px] md:w-[270px] md:h-[560px] rounded-[2.5rem] md:rounded-[3rem] border-[3px] md:border-[4px] border-white/80 overflow-hidden hover:scale-[1.02] transition-transform duration-500 bg-gradient-to-br from-[#6EE7FF] via-[#3B82F6] to-[#6EE7FF] animate-phone-gradient shadow-[0_20px_50px_-12px_rgba(59,130,246,0.5),inset_0_0_20px_rgba(255,255,255,0.3)] flex flex-col z-20">
              
              {/* Dynamic Island */}
              <div className="absolute top-3 md:top-4 left-1/2 -translate-x-1/2 w-[80px] h-[24px] bg-black rounded-full border-[2px] border-white/80 z-20 shadow-sm" />
              
              {/* Home Indicator */}
              <div className="absolute bottom-2 md:bottom-3 left-1/2 -translate-x-1/2 w-[100px] h-[4px] bg-white/80 rounded-full z-20" />

              {/* Inner Content Area for Comments */}
              <div className="flex-1 w-full h-full pt-14 pb-8 px-6 relative z-10 flex flex-col items-center justify-center text-center">
                <div className="text-6xl md:text-7xl mb-4 md:mb-6 animate-bounce" style={{ animationDuration: '3s' }}>
                  🤔
                </div>
                <span className="text-[#050508] text-xl md:text-2xl font-bold leading-snug tracking-tight">
                  Still thinking? <br/><br/> Here&apos;s what people are saying.
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Full Screen Lightbox */}
      <AnimatePresence>
        {selectedId && selectedSrc && selectedAspect && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/92 backdrop-blur-md p-3 sm:p-6 md:p-12 cursor-pointer"
            onClick={close}
          >
            <button
              className="absolute top-4 right-4 md:top-8 md:right-8 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 z-50 transition-colors"
              onClick={close}
            >
              <X size={28} />
            </button>

            <motion.div
              layoutId={selectedId}
              className={clsx(
                "relative overflow-hidden rounded-xl md:rounded-[2rem] shadow-2xl bg-black cursor-default",
                selectedAspect === "H"
                  ? "w-full max-w-[95vw] md:max-w-[1100px] aspect-video"
                  : "h-[80vh] max-h-[700px] aspect-[9/16]"
              )}
              onClick={(e) => e.stopPropagation()}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <video
                src={selectedSrc}
                autoPlay
                controls
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default BigText;
