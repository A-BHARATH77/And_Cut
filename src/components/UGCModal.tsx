"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronUp, ChevronDown } from "lucide-react";
import clsx from "clsx";
import VimeoPlayer from "@/components/VimeoPlayer";
import { VideoData, FORMAT_PRICES } from "@/data/services";

/* ─────────────────────────────────────────────────────────────
   Types & constants
───────────────────────────────────────────────────────────── */
interface UGCModalProps {
  videos: VideoData[];
  initialIndex: number;
  onClose: () => void;
}

const UGC_PACKAGES = [
  { label: "5 Video Ads",  value: "5" },
  { label: "10 Video Ads", value: "10" },
  { label: "20 Video Ads", value: "20" },
];

/* ─────────────────────────────────────────────────────────────
   Sub-component A: Thumbnail Sidebar (floats on backdrop)
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
    sidebarRef.current?.scrollBy({ top: dir === "up" ? -180 : 180, behavior: "smooth" });

  useEffect(() => {
    const el = sidebarRef.current;
    if (!el) return;
    const THUMB_H = 100;
    el.scrollTo({
      top: activeIdx * THUMB_H - el.clientHeight / 2 + THUMB_H / 2,
      behavior: "smooth",
    });
  }, [activeIdx]);

  return (
    <div className="flex items-center gap-2 shrink-0 h-full py-4">
      {/* Arrows */}
      <div className="flex flex-col gap-3 shrink-0">
        <button
          onClick={() => scroll("up")}
          className="w-8 h-8 rounded-full bg-white/10 border border-white/15 text-white flex items-center justify-center hover:bg-white/20 hover:scale-110 active:scale-95 transition-all"
          aria-label="Scroll Up"
        >
          <ChevronUp size={14} />
        </button>
        <button
          onClick={() => scroll("down")}
          className="w-8 h-8 rounded-full bg-white/10 border border-white/15 text-white flex items-center justify-center hover:bg-white/20 hover:scale-110 active:scale-95 transition-all"
          aria-label="Scroll Down"
        >
          <ChevronDown size={14} />
        </button>
      </div>

      {/* Thumbnail list */}
      <div
        ref={sidebarRef}
        className="flex flex-col gap-2 overflow-y-auto hide-scrollbar h-full py-1"
        style={{ width: "78px" }}
        data-lenis-prevent="true"
      >
        {videos.map((v, idx) => (
          <motion.button
            key={idx}
            onClick={() => onSelect(idx)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={clsx(
              "shrink-0 w-full rounded-2xl overflow-hidden border-2 transition-all cursor-pointer",
              idx === activeIdx
                ? "border-[#6EE7FF] shadow-[0_0_12px_rgba(110,231,255,0.45)]"
                : "border-white/15 opacity-50 hover:opacity-80 hover:border-white/30"
            )}
            style={{ aspectRatio: "9/16", minHeight: "72px" }}
          >
            <VimeoPlayer
              vimeoId={v.vimeoId!}
              playing={false}
              muted={true}
              loop={false}
              background={true}
              quality="360p"
              className="w-full h-full pointer-events-none"
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Sub-component B: Video Player (floats on backdrop)
───────────────────────────────────────────────────────────── */
function VideoColumn({
  activeIdx,
  activeVideo,
}: {
  activeIdx: number;
  activeVideo: VideoData;
}) {
  return (
    <div className="shrink-0 h-full flex items-center justify-center py-5 pr-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={`main-${activeIdx}`}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.25 }}
          className="rounded-3xl overflow-hidden bg-black shadow-[0_20px_60px_-10px_rgba(0,0,0,0.95)] h-full"
          style={{ aspectRatio: "9/16", maxWidth: "280px" }}
        >
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
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Sub-component C: Info Panel Card (its own independent card)
───────────────────────────────────────────────────────────── */
function InfoPanelCard({ onClose }: { onClose: () => void }) {
  const [activePackage, setActivePackage] = useState("5");

  return (
    /* This IS its own separate card — background, border, rounded corners */
    <div className="relative flex-1 min-w-0 h-full bg-[#0D0D14] border border-white/10 rounded-3xl overflow-hidden shadow-[0_20px_60px_-10px_rgba(0,0,0,0.8)] flex flex-col">
      {/* Glow decoration */}
      <div className="pointer-events-none absolute top-0 right-0 w-72 h-72 bg-[#6EE7FF]/6 blur-[120px] rounded-full" />

      {/* Close button — top-right of THIS card */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/8 border border-white/10 text-white/60 hover:text-white hover:bg-white/15 transition-all"
        aria-label="Close"
      >
        <X size={18} />
      </button>

      {/* Scrollable content inside the card */}
      <div
        className="relative z-10 flex-1 overflow-y-auto hide-scrollbar px-10 py-8"
        data-lenis-prevent="true"
      >
        <div className="flex flex-col gap-6">
          {/* Badge */}
          <div className="inline-flex items-center w-fit px-3 py-1.5 text-[11px] font-black tracking-widest uppercase bg-[#6EE7FF]/10 text-[#6EE7FF] rounded-full border border-[#6EE7FF]/25">
            UGC FORMAT
          </div>

          {/* Headline */}
          <div>
            <h2 className="text-3xl lg:text-4xl font-black text-white leading-tight mb-3">
              People buy from people,&nbsp;not logos.
            </h2>
            <p className="text-neutral-400 text-sm lg:text-base leading-relaxed">
              Authentic videos out-convert polished ads every day. Plus, with 2 unique hooks
              for every video, you get total freedom to run creative testing and optimize your ad spend.
            </p>
          </div>

          {/* How it works */}
          <div className="rounded-xl bg-white/4 border border-white/8 p-5 flex flex-col gap-3">
            <p className="text-white text-sm lg:text-base font-bold tracking-wide">
              How It&apos;s Shot &amp; What&apos;s Included
            </p>
            {[
              {
                label: "The Setup:",
                text: "Shot entirely on the latest iPhone models so the footage feels completely native, relatable, and authentic to the feed.",
              },
              {
                label: "The Talent:",
                text: "We bring in up to 3 different creators or actors for every batch of 5 videos to give your brand variety.",
              },
              {
                label: "The Pipeline:",
                text: "We handle everything. Concept, Scripting, Locations, Shooting, and final Editing are all fully included. No hidden creative fees.",
              },
            ].map(({ label, text }) => (
              <p key={label} className="text-neutral-400 text-sm lg:text-base leading-relaxed">
                <span className="text-white font-bold">{label}</span> {text}
              </p>
            ))}
          </div>

          {/* Packages */}
          <div>
            <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-3">
              The Packages
            </p>
            <div className="flex gap-2 lg:gap-3 flex-wrap">
              {UGC_PACKAGES.map((pkg) => (
                <button
                  key={pkg.value}
                  onClick={() => setActivePackage(pkg.value)}
                  className={clsx(
                    "px-4 lg:px-5 py-2 lg:py-2.5 rounded-full text-sm lg:text-base font-bold border transition-all",
                    activePackage === pkg.value
                      ? "bg-[#6EE7FF] text-[#050508] border-[#6EE7FF] shadow-[0_0_12px_rgba(110,231,255,0.35)]"
                      : "bg-transparent text-white/70 border-white/15 hover:border-[#6EE7FF]/40 hover:text-white"
                  )}
                >
                  {pkg.label}
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div>
            <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">
              Package Total
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl lg:text-5xl font-black text-white">
                ₹{FORMAT_PRICES["UGC"]}
              </span>
              <span className="text-neutral-500 text-sm lg:text-base font-bold">+ GST</span>
            </div>
          </div>

          {/* CTA */}
          <a
            href="https://tally.so/r/EkNRrX"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-[#6EE7FF] to-[#3B82F6] text-[#050508] font-black uppercase tracking-widest text-base lg:text-lg transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_24px_rgba(110,231,255,0.35)]"
          >
            CONNECT
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Sub-component D: Mobile Info Panel
───────────────────────────────────────────────────────────── */
function MobileInfoPanel() {
  const [activePackage, setActivePackage] = useState("5");
  return (
    <div className="p-4 flex flex-col gap-5">
      <div className="inline-flex items-center w-fit px-3 py-1 text-[10px] font-black tracking-widest uppercase bg-[#6EE7FF]/10 text-[#6EE7FF] rounded-full border border-[#6EE7FF]/25">
        UGC Format
      </div>
      <div>
        <h2 className="text-xl font-black text-white leading-tight mb-2">People buy from people, not logos.</h2>
        <p className="text-neutral-400 text-sm leading-relaxed">
          Authentic videos out-convert polished ads every day. Plus, with 2 unique hooks for every video, you get total freedom to run creative testing and optimize your ad spend.
        </p>
      </div>
      <div className="rounded-xl bg-white/4 border border-white/8 p-4 flex flex-col gap-2">
        <p className="text-white text-sm font-bold">How It&apos;s Shot &amp; What&apos;s Included</p>
        {[
          { label: "The Setup:", text: "Shot on iPhone so footage feels native and authentic." },
          { label: "The Talent:", text: "Up to 3 creators per batch of 5 videos." },
          { label: "The Pipeline:", text: "Concept, Script, Shoot, Edit — all included." },
        ].map(({ label, text }) => (
          <p key={label} className="text-neutral-400 text-xs leading-relaxed">
            <span className="text-white font-bold">{label}</span> {text}
          </p>
        ))}
      </div>
      <div>
        <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2">The Packages</p>
        <div className="flex gap-2 flex-wrap">
          {UGC_PACKAGES.map((pkg) => (
            <button
              key={pkg.value}
              onClick={() => setActivePackage(pkg.value)}
              className={clsx(
                "px-3 py-1.5 rounded-full text-xs font-bold border transition-all",
                activePackage === pkg.value
                  ? "bg-[#6EE7FF] text-[#050508] border-[#6EE7FF]"
                  : "bg-transparent text-white/70 border-white/15"
              )}
            >
              {pkg.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">Package Total</p>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-black text-white">₹{FORMAT_PRICES["UGC"]}</span>
          <span className="text-neutral-500 text-xs font-bold ml-1">+ GST</span>
        </div>
      </div>
      <a
        href="https://tally.so/r/EkNRrX"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-[#6EE7FF] to-[#3B82F6] text-[#050508] font-black uppercase tracking-widest text-sm"
      >
        CONNECT →
      </a>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Root: UGCModal
───────────────────────────────────────────────────────────── */
export default function UGCModal({ videos, initialIndex, onClose }: UGCModalProps) {
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
      {/* Full-screen dark backdrop — clicking closes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[9999] bg-black/88 backdrop-blur-md flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* ── MOBILE: single stacked card ───────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="md:hidden relative w-full max-h-[calc(100vh-32px)] bg-[#0D0D14] border border-white/10 rounded-2xl overflow-y-auto hide-scrollbar shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-50 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
          >
            <X size={18} />
          </button>
          <div className="w-full bg-black" style={{ aspectRatio: "9/16", maxHeight: "55vh" }}>
            <VimeoPlayer
              key={`mob-${activeIdx}`}
              vimeoId={activeVideo.vimeoId!}
              playing={true} muted={false} loop={true} controls={true} background={false} quality="auto"
              className="w-full h-full"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto hide-scrollbar px-3 py-2" data-lenis-prevent="true">
            {videos.map((v, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIdx(idx)}
                className={clsx("shrink-0 w-14 rounded-lg overflow-hidden border-2 transition-all", idx === activeIdx ? "border-[#6EE7FF]" : "border-white/10 opacity-50")}
                style={{ aspectRatio: "9/16" }}
              >
                <VimeoPlayer vimeoId={v.vimeoId!} playing={false} muted={true} loop={false} background={true} quality="360p" className="w-full h-full" />
              </button>
            ))}
          </div>
          <MobileInfoPanel />
        </motion.div>

        {/* ── DESKTOP: 3 INDEPENDENT floating elements ─────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="hidden md:flex flex-row items-stretch gap-4"
          style={{ height: "calc(100vh - 112px)", maxWidth: "min(98vw, 1600px)", width: "100%" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* A: Sidebar — floats directly on backdrop, no card */}
          <SidebarColumn
            videos={videos}
            activeIdx={activeIdx}
            onSelect={setActiveIdx}
          />

          {/* B: Video — floats directly on backdrop, no card */}
          <VideoColumn
            activeIdx={activeIdx}
            activeVideo={activeVideo}
          />

          {/* C: Info Panel — its OWN independent card */}
          <InfoPanelCard onClose={onClose} />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
