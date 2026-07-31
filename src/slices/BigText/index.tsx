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
      className="w-full bg-[#050508] text-[#6EE7FF] pt-16 md:pt-24 pb-10 md:pb-16"
    >
      {/* Section Title */}
      <div className="w-full flex justify-center items-center py-6 md:py-14 px-4">
        <h2 className="text-[14vw] sm:text-[12vw] md:text-[10vw] font-black uppercase leading-[0.85] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400 text-center">
          OUR WORK
        </h2>
      </div>

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
