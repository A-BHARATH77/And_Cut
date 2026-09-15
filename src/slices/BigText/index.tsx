"use client";

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

export type BigTextProps = SliceComponentProps<Content.BigTextSlice>;

/* ─── Bunny embed helper ──────────────────────────────────────────────────── */
function toBunnyEmbed(
  url: string,
  params = "autoplay=true&loop=true&muted=true&preload=true&controls=false&disableRum=true"
): string {
  const m = url.match(/player\.mediadelivery\.net\/play\/(\d+)\/([a-f0-9-]+)/i);
  if (m) return `https://iframe.mediadelivery.net/embed/${m[1]}/${m[2]}?${params}`;
  if (url.includes("mediadelivery.net")) {
    const upgraded = url.replace(
      "player.mediadelivery.net/play/",
      "iframe.mediadelivery.net/embed/"
    );
    // Append full params (autoplay, loop, muted, controls=false, etc.)
    return upgraded.includes("?")
      ? `${upgraded}&${params}`
      : `${upgraded}?${params}`;
  }
  return url;
}

/* ─── Bunny silent autoplay iframe ───────────────────────────────────────── */
function BunnyIframe({ src, className }: { src: string; className?: string }) {
  const embedSrc = toBunnyEmbed(
    src,
    "autoplay=true&loop=true&muted=true&preload=true&controls=false&disableRum=true"
  );
  return (
    <iframe
      src={embedSrc}
      allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen;"
      style={{ pointerEvents: "none" }}
      className={clsx(className, "border-0 w-full h-full absolute inset-0")}
    />
  );
}

/* ─── Local video lazy-play helper ───────────────────────────────────────── */
function LocalLazyVideo({ src, className }: { src: string; className?: string }) {
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
      { threshold: 0.2 }
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
      preload="metadata"
      className={clsx(className, "transform-gpu will-change-transform")}
    />
  );
}

/* ─── Decides which renderer to use for preview ──────────────────────────── */
function LazyVideo({ src, className }: { src: string; className?: string }) {
  if (src.includes("mediadelivery.net")) {
    return <BunnyIframe src={src} className={className} />;
  }
  return <LocalLazyVideo src={src} className={className} />;
}

/* ─── Single video block in the grid ─────────────────────────────────────── */
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
        "relative overflow-hidden rounded-xl md:rounded-[2rem] bg-gray-900 shadow-sm border border-white/5 cursor-pointer transform-gpu will-change-transform group",
        aspect === "H" ? "w-full aspect-video" : "flex-1 aspect-[9/16]"
      )}
    >
      {/* Bunny silent autoplay — no controls, no UI, pure preview */}
      {src && (
        <LazyVideo
          src={src}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      {/* Play button — appears on hover, plain circle like Hero section */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center z-10 pointer-events-none">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-90 group-hover:scale-100">
          <svg className="w-5 h-5 md:w-7 md:h-7 ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Video data ──────────────────────────────────────────────────────────── */
/** Bunny CDN MP4 streaming URLs — used in the silent background <video> tags */
const VIDEOS = {
  h1: "https://vz-4a9f7a4f-4d6.b-cdn.net/38ddffbb-502c-456e-964f-af2d8e2c373f/play_480p.mp4",
  h2: "https://vz-4a9f7a4f-4d6.b-cdn.net/0a84b805-dca1-46dc-98bb-808314c0877f/play_480p.mp4",
  h3: "https://vz-4a9f7a4f-4d6.b-cdn.net/a5cf98cd-c6ee-4344-b0c5-e8ad37bfe6d5/play_480p.mp4",
  h4: "https://vz-4a9f7a4f-4d6.b-cdn.net/20dd0407-524e-42d3-b380-dc6807f4174c/play_480p.mp4",
  h5: "https://vz-4a9f7a4f-4d6.b-cdn.net/ee8af89b-370a-4f7c-893f-72957b6e2bbb/play_480p.mp4",
  v1:  "https://vz-4a9f7a4f-4d6.b-cdn.net/03e6b436-c430-46bf-ba67-c166a49322d2/play_480p.mp4",
  v2:  "https://vz-4a9f7a4f-4d6.b-cdn.net/d778c2a1-13c3-4e9a-a9fb-f2a3fe636857/play_480p.mp4",
  v3:  "https://vz-4a9f7a4f-4d6.b-cdn.net/550effd9-6365-46b3-82ba-aeb488651dc1/play_480p.mp4",
  v4:  "https://vz-4a9f7a4f-4d6.b-cdn.net/3b80ad57-c5bf-45f4-81d8-40fbad5494fd/play_480p.mp4",
  v5:  "https://vz-4a9f7a4f-4d6.b-cdn.net/2128b332-21e3-47b7-8e1b-ac7c16afc4ca/play_480p.mp4",
  v6:  "https://vz-4a9f7a4f-4d6.b-cdn.net/5ee4f7f2-ba8a-4af1-8485-c71de974041b/play_480p.mp4",
  v7:  "https://vz-4a9f7a4f-4d6.b-cdn.net/87bf6b34-4b0e-43e1-9fb5-b83ee2874eb4/play_480p.mp4",
  v8:  "https://vz-4a9f7a4f-4d6.b-cdn.net/c3507f10-18af-4aca-9a4e-41f3cc0f6b78/play_480p.mp4",
  v9:  "https://vz-4a9f7a4f-4d6.b-cdn.net/749819dd-08c9-4e92-8ff2-5d5f45f92ac7/play_480p.mp4",
  v10: "https://vz-4a9f7a4f-4d6.b-cdn.net/112f18bf-9a51-43fb-900a-6b153fb37aa3/play_480p.mp4",
  v11: "https://vz-4a9f7a4f-4d6.b-cdn.net/f55890ca-992f-4d20-b881-a5ff02b09cac/play_480p.mp4",
  v12: "https://vz-4a9f7a4f-4d6.b-cdn.net/edcf35fc-86dc-4d51-913e-12eddf1e88da/play_480p.mp4",
};

/** Bunny player URLs — used in the on-click lightbox <iframe> */
const PLAYER_SRCS: Record<string, string> = {
  h1: "https://player.mediadelivery.net/play/753159/38ddffbb-502c-456e-964f-af2d8e2c373f",
  h2: "https://player.mediadelivery.net/play/753159/0a84b805-dca1-46dc-98bb-808314c0877f",
  h3: "https://player.mediadelivery.net/play/753159/a5cf98cd-c6ee-4344-b0c5-e8ad37bfe6d5",
  h4: "https://player.mediadelivery.net/play/753159/20dd0407-524e-42d3-b380-dc6807f4174c",
  h5: "https://player.mediadelivery.net/play/753159/ee8af89b-370a-4f7c-893f-72957b6e2bbb",
  v1:  "https://player.mediadelivery.net/play/753159/03e6b436-c430-46bf-ba67-c166a49322d2",
  v2:  "https://player.mediadelivery.net/play/753159/d778c2a1-13c3-4e9a-a9fb-f2a3fe636857",
  v3:  "https://player.mediadelivery.net/play/753159/550effd9-6365-46b3-82ba-aeb488651dc1",
  v4:  "https://player.mediadelivery.net/play/753159/3b80ad57-c5bf-45f4-81d8-40fbad5494fd",
  v5:  "https://player.mediadelivery.net/play/753159/2128b332-21e3-47b7-8e1b-ac7c16afc4ca",
  v6:  "https://player.mediadelivery.net/play/753159/5ee4f7f2-ba8a-4af1-8485-c71de974041b",
  v7:  "https://player.mediadelivery.net/play/753159/87bf6b34-4b0e-43e1-9fb5-b83ee2874eb4",
  v8:  "https://player.mediadelivery.net/play/753159/c3507f10-18af-4aca-9a4e-41f3cc0f6b78",
  v9:  "https://player.mediadelivery.net/play/753159/749819dd-08c9-4e92-8ff2-5d5f45f92ac7",
  v10: "https://player.mediadelivery.net/play/753159/112f18bf-9a51-43fb-900a-6b153fb37aa3",
  v11: "https://player.mediadelivery.net/play/753159/f55890ca-992f-4d20-b881-a5ff02b09cac",
  v12: "https://player.mediadelivery.net/play/753159/edcf35fc-86dc-4d51-913e-12eddf1e88da",
};

/* ─── Comments data ───────────────────────────────────────────────────────── */
const COMMENTS_DATA = [
  { user: "only4scroll", avatar: "/Comments/only4scroll.PNG", time: "16w", text: "One of the best ad I have ever seen", pos: "top-[-6%] md:top-[2%] -left-[30%] md:-left-[55%] lg:-left-[85%]", rotate: "-rotate-[4deg]", delay: 0 },
  { user: "ab83_official", avatar: "/Comments/ab_83.PNG", time: "16w", text: "Damn good ad man, but ho will anyone pay a particular price for gpay or something?", pos: "top-[14%] md:top-[24%] -left-[20%] md:-left-[64%] lg:-left-[85%]", rotate: "rotate-[2deg]", delay: 0.2 },
  { user: "aasthabahri", avatar: "/Comments/aasatha.PNG", time: "18w", text: "what a sickk video 🔥", pos: "top-[72%] md:top-[48%] -left-[32%] md:-left-[55%] lg:-left-[80%]", rotate: "-rotate-[6deg]", delay: 0.4, authorLiked: true },
  { user: "kushal__17", avatar: "/Comments/kushal.PNG", time: "5w", text: "What a crazy way to explain this 😂", pos: "top-[88%] md:top-[72%] -left-[18%] md:-left-[48%] lg:-left-[68%]", rotate: "rotate-[3deg]", delay: 0.6, authorLiked: true },
  { user: "deepanjwanii", avatar: "/Comments/deepan.PNG", time: "18w", text: "This is sooo cooll", pos: "top-[4%] md:top-[12%] -right-[28%] md:-right-[60%] lg:-right-[90%]", rotate: "rotate-[5deg]", delay: 0.1, authorLiked: true },
  { user: "_theyellowskirt_", avatar: "/Comments/yellow_skirt.PNG", time: "8w", text: "Haha what a good way to educate & entertain.Love your series.", pos: "top-[24%] md:top-[36%] -right-[20%] md:-right-[64%] lg:-right-[85%]", rotate: "-rotate-[2deg]", delay: 0.3, authorLiked: true },
  { user: "indianskinblog", avatar: "/Comments/indianskinblog.png", time: "15w", text: "This is what i pay mu internet bills for", pos: "top-[80%] md:top-[60%] -right-[38%] md:-right-[68%] lg:-right-[92%]", rotate: "rotate-[7deg]", delay: 0.5, authorLiked: true },
  { user: "aeishady", time: "1w", text: "Holy shit that's nice marketing 😩", pos: "top-[96%] md:top-[84%] -right-[18%] md:-right-[50%] lg:-right-[72%]", rotate: "-rotate-[4deg]", delay: 0.7, authorLiked: true },
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
      "absolute z-30 flex items-center gap-2 md:gap-3 p-2 md:p-3 pr-3 md:pr-5 bg-[#181818]/95 backdrop-blur-md rounded-xl md:rounded-2xl shadow-2xl border border-white/10 w-max max-w-[180px] md:max-w-[280px] lg:max-w-[320px] transition-transform hover:scale-[1.02] hover:z-40 cursor-default transform-gpu will-change-transform",
      "scale-[0.75] sm:scale-90 md:scale-100",
      data.pos,
      data.rotate
    )}
    style={{ transformOrigin: data.pos.includes('left') ? 'right center' : 'left center' }}
  >
    <img 
      src={data.avatar || `https://ui-avatars.com/api/?name=${data.user}&background=random&color=fff&size=100`} 
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

/* ─── Bunny video lightbox modal ───────────────────────────────────────────── */
function VideoLightbox({
  videoSrc,
  aspect,
  onClose,
}: {
  videoSrc: string;
  aspect: "H" | "V";
  onClose: () => void;
}) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Convert player.mediadelivery.net/play/LIB/ID → iframe embed with controls
  const embedSrc = (() => {
    const m = videoSrc.match(/player\.mediadelivery\.net\/play\/(\d+)\/([a-f0-9-]+)/i);
    if (m) return `https://iframe.mediadelivery.net/embed/${m[1]}/${m[2]}?autoplay=true&controls=true&loop=false&disableRum=true`;
    return videoSrc;
  })();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/92 backdrop-blur-md p-3 sm:p-6 md:p-12 cursor-pointer"
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
          aspect === "H"
            ? "w-full max-w-[95vw] md:max-w-[1100px] aspect-video"
            : "h-[80vh] max-h-[700px] aspect-[9/16]"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          src={embedSrc}
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen;"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      </motion.div>
    </motion.div>
  );
}

/* ─── Main BigText component ───────────────────────────────────────────── */
const BigText = ({ slice }: BigTextProps): JSX.Element => {
  const [activeVideo, setActiveVideo] = useState<{ src: string; aspect: "H" | "V" } | null>(null);

  const openVideo = (key: string, aspect: "H" | "V") => {
    const src = PLAYER_SRCS[key];
    if (src) setActiveVideo({ src, aspect });
  };

  const closeVideo = () => setActiveVideo(null);

  return (
    <section
      id="works"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full bg-[#050508] text-[#6EE7FF] py-0 md:py-2 overflow-hidden"
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

        {/* 📱 MOBILE layout (< md) */}
        <div className="flex flex-col gap-3 md:hidden">
          <VideoBlock id="h1" src={VIDEOS.h1} aspect="H" onClick={() => openVideo("h1", "H")} />
          <div className="flex gap-3">
            <VideoBlock id="v1" src={VIDEOS.v1} aspect="V" onClick={() => openVideo("v1", "V")} />
            <VideoBlock id="v2" src={VIDEOS.v2} aspect="V" onClick={() => openVideo("v2", "V")} />
          </div>
          <VideoBlock id="h2" src={VIDEOS.h2} aspect="H" onClick={() => openVideo("h2", "H")} />
          <div className="flex gap-3">
            <VideoBlock id="v3" src={VIDEOS.v3} aspect="V" onClick={() => openVideo("v3", "V")} />
            <VideoBlock id="v4" src={VIDEOS.v4} aspect="V" onClick={() => openVideo("v4", "V")} />
          </div>
          <VideoBlock id="h3" src={VIDEOS.h3} aspect="H" onClick={() => openVideo("h3", "H")} />
          <div className="flex gap-3">
            <VideoBlock id="v5" src={VIDEOS.v5} aspect="V" onClick={() => openVideo("v5", "V")} />
            <VideoBlock id="v6" src={VIDEOS.v6} aspect="V" onClick={() => openVideo("v6", "V")} />
          </div>
          <VideoBlock id="h4" src={VIDEOS.h4} aspect="H" onClick={() => openVideo("h4", "H")} />
          <div className="flex gap-3">
            <VideoBlock id="v7" src={VIDEOS.v7} aspect="V" onClick={() => openVideo("v7", "V")} />
            <VideoBlock id="v8" src={VIDEOS.v8} aspect="V" onClick={() => openVideo("v8", "V")} />
          </div>
          <VideoBlock id="h5" src={VIDEOS.h5} aspect="H" onClick={() => openVideo("h5", "H")} />
          <div className="flex gap-3">
            <VideoBlock id="v9"  src={VIDEOS.v9}  aspect="V" onClick={() => openVideo("v9",  "V")} />
            <VideoBlock id="v10" src={VIDEOS.v10} aspect="V" onClick={() => openVideo("v10", "V")} />
          </div>
        </div>

        {/* 🖥️ DESKTOP layout (md+) */}
        <div className="hidden md:flex gap-6 w-full">
          {/* Left Column */}
          <div className="flex flex-col gap-6 w-1/2">
            <VideoBlock id="h1" src={VIDEOS.h1} aspect="H" onClick={() => openVideo("h1", "H")} />
            <div className="flex gap-6">
              <VideoBlock id="v1" src={VIDEOS.v1} aspect="V" onClick={() => openVideo("v1", "V")} />
              <VideoBlock id="v2" src={VIDEOS.v2} aspect="V" onClick={() => openVideo("v2", "V")} />
            </div>
            <div className="flex gap-6">
              <VideoBlock id="v3" src={VIDEOS.v3} aspect="V" onClick={() => openVideo("v3", "V")} />
              <VideoBlock id="v4" src={VIDEOS.v4} aspect="V" onClick={() => openVideo("v4", "V")} />
            </div>
            <VideoBlock id="h2" src={VIDEOS.h2} aspect="H" onClick={() => openVideo("h2", "H")} />
            <div className="flex gap-6">
              <VideoBlock id="v11" src={VIDEOS.v11} aspect="V" onClick={() => openVideo("v11", "V")} />
              <VideoBlock id="v12" src={VIDEOS.v12} aspect="V" onClick={() => openVideo("v12", "V")} />
            </div>
            <div className="lg:hidden w-full">
              <VideoBlock id="h5" src={VIDEOS.h5} aspect="H" onClick={() => openVideo("h5", "H")} />
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6 w-1/2">
            <div className="flex gap-6">
              <VideoBlock id="v5" src={VIDEOS.v5} aspect="V" onClick={() => openVideo("v5", "V")} />
              <VideoBlock id="v6" src={VIDEOS.v6} aspect="V" onClick={() => openVideo("v6", "V")} />
            </div>
            <VideoBlock id="h3" src={VIDEOS.h3} aspect="H" onClick={() => openVideo("h3", "H")} />
            <div className="flex gap-6">
              <VideoBlock id="v7" src={VIDEOS.v7} aspect="V" onClick={() => openVideo("v7", "V")} />
              <VideoBlock id="v8" src={VIDEOS.v8} aspect="V" onClick={() => openVideo("v8", "V")} />
            </div>
            <div className="flex gap-6">
              <VideoBlock id="v9"  src={VIDEOS.v9}  aspect="V" onClick={() => openVideo("v9",  "V")} />
              <VideoBlock id="v10" src={VIDEOS.v10} aspect="V" onClick={() => openVideo("v10", "V")} />
            </div>
            <VideoBlock id="h4" src={VIDEOS.h4} aspect="H" onClick={() => openVideo("h4", "H")} />
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="relative w-full min-h-[100svh] py-12 flex flex-col items-center justify-center bg-[#050508] overflow-hidden">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="w-full text-center mb-8 md:mb-12 max-w-2xl px-4 mx-auto relative z-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400 uppercase mb-3 md:mb-4">
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
              0% { transform: translate(-50%, -50%) rotate(0deg); }
              100% { transform: translate(-50%, -50%) rotate(360deg); }
            }
            .animate-phone-gradient {
              animation: phone-gradient 15s linear infinite;
            }
          `}</style>
          
          {/* Black Background Circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] md:w-[600px] md:h-[600px] lg:w-[800px] lg:h-[800px] bg-black rounded-full z-0 opacity-80" />

          <div className="relative flex justify-center items-center">
            {/* Floating Comments */}
            {COMMENTS_DATA.map((comment, i) => (
              <FloatingComment key={i} data={comment} />
            ))}

            {/* CSS Phone Frame */}
            <div className="relative w-[240px] h-[500px] md:w-[270px] md:h-[560px] rounded-[2.5rem] md:rounded-[3rem] border-[3px] md:border-[4px] border-white/80 overflow-hidden hover:scale-[1.02] transition-transform duration-500 shadow-[0_20px_50px_-12px_rgba(59,130,246,0.5),inset_0_0_20px_rgba(255,255,255,0.3)] flex flex-col z-20 transform-gpu will-change-transform">
              
              {/* Animated Background */}
              <div className="absolute top-1/2 left-1/2 w-[650px] h-[650px] bg-gradient-to-br from-[#6EE7FF] via-[#3B82F6] to-[#6EE7FF] animate-phone-gradient z-0 transform-gpu will-change-transform" />
              
              {/* Dynamic Island */}
              <div className="absolute top-3 md:top-4 left-1/2 -translate-x-1/2 w-[80px] h-[24px] bg-black rounded-full border-[2px] border-white/80 z-20 shadow-sm" />
              
              {/* Home Indicator */}
              <div className="absolute bottom-2 md:bottom-3 left-1/2 -translate-x-1/2 w-[100px] h-[4px] bg-white/80 rounded-full z-20" />

              {/* Inner Content */}
              <div className="flex-1 w-full h-full pt-14 pb-8 px-6 relative z-10 flex flex-col items-center justify-center text-center">
                <div className="hidden md:block text-6xl md:text-7xl mb-4 md:mb-6 animate-bounce" style={{ animationDuration: '3s' }}>
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

      {/* Video Lightbox — renders in-page when a video is clicked */}
      <AnimatePresence>
        {activeVideo && (
          <VideoLightbox
            videoSrc={activeVideo.src}
            aspect={activeVideo.aspect}
            onClose={closeVideo}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default BigText;
