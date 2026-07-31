"use client";

import { Bounded } from "@/components/Bounded";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

export type AlternatingTextProps =
  SliceComponentProps<Content.AlternatingTextSlice>;

const PRICING_PLANS = [
  {
    title: "PLAN 1: UGC ESSENTIAL",
    price: "75,000/-",
    videos: ["/ANDCUT_GIFs/1.mp4", "/ANDCUT_GIFs/2.mp4", "/ANDCUT_GIFs/3.mp4"],
    gradient: "from-pink-500 to-rose-500",
    glow: "hover:shadow-pink-500/30",
    accent: "bg-pink-400/50",
    textHover: "group-hover:text-pink-500",
    btnHover: "hover:bg-pink-500 hover:border-pink-500 hover:shadow-pink-500/30 hover:text-white"
  },
  {
    title: "PLAN 2: PERFORMANCE",
    price: "1,50,000/-",
    videos: ["/ANDCUT_GIFs/5.mp4", "/ANDCUT_GIFs/6.mp4", "/ANDCUT_GIFs/7.mp4"],
    gradient: "from-cyan-400 to-blue-500",
    glow: "hover:shadow-cyan-500/30",
    accent: "bg-cyan-400/50",
    textHover: "group-hover:text-cyan-500",
    btnHover: "hover:bg-cyan-500 hover:border-cyan-500 hover:shadow-cyan-500/30 hover:text-white"
  },
  {
    title: "PLAN 3: CREATIVE LED",
    price: "2,25,000/-",
    videos: ["/ANDCUT_GIFs/9.mp4", "/ANDCUT_GIFs/10.mp4", "/ANDCUT_GIFs/11.mp4"],
    gradient: "from-orange-400 to-amber-500",
    glow: "hover:shadow-orange-500/30",
    accent: "bg-orange-400/50",
    textHover: "group-hover:text-orange-500",
    btnHover: "hover:bg-orange-500 hover:border-orange-500 hover:shadow-orange-500/30 hover:text-white"
  },
];

function PhoneMockup({ src, style }: { src: string; style: React.CSSProperties }) {
  return (
    <div style={{ width: 100, ...style }}>
      {/* Phone shell */}
      <div
        style={{
          width: "100%",
          aspectRatio: "9/19.5",
          borderRadius: 20,
          background: "#111",
          padding: 4,
          boxShadow: "0 20px 50px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.12)",
        }}
      >
        {/* Screen */}
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 16,
            overflow: "hidden",
            position: "relative",
            background: "#000",
          }}
        >
          <video
            src={src}
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          {/* Screen glare */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%)",
              pointerEvents: "none",
              borderRadius: 16,
            }}
          />
        </div>

        {/* Side buttons */}
        <div style={{ position: "absolute", right: -3, top: "28%", width: 3, height: 30, background: "#222", borderRadius: "0 3px 3px 0" }} />
        <div style={{ position: "absolute", left: -3, top: "22%", width: 3, height: 20, background: "#222", borderRadius: "3px 0 0 3px" }} />
        <div style={{ position: "absolute", left: -3, top: "32%", width: 3, height: 20, background: "#222", borderRadius: "3px 0 0 3px" }} />

        {/* Notch */}
        <div style={{ position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)", width: 36, height: 5, background: "#111", borderRadius: 10 }} />
      </div>
    </div>
  );
}

function PhoneFan({ videos, accent }: { videos: string[], accent: string }) {
  return (
    <div
      className="relative flex-grow overflow-hidden bg-[#f8f8fa]"
      style={{
        height: 400,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: "radial-gradient(#d1d5db 1.5px, transparent 1.5px)",
        backgroundSize: "24px 24px"
      }}
    >
      {/* Subtle background radial */}
      <div className={`absolute w-[280px] h-[280px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:opacity-80 opacity-40 ${accent}`} />

      {/* Phones Container - Grid overlay */}
      <div className="absolute inset-0 grid place-items-center">
        {/* Left phone */}
        <div className="col-start-1 row-start-1 z-[1] transition-all duration-700 ease-out group-hover:-translate-x-8 group-hover:-translate-y-2 group-hover:-rotate-6 group-hover:scale-105">
          <PhoneMockup
            src={videos[0]}
            style={{
              transform: "rotate(-14deg) translateX(-95px) translateY(28px)",
              filter: "brightness(0.85)",
              width: 88,
            }}
          />
        </div>

        {/* Center phone — largest, upfront */}
        <div className="col-start-1 row-start-1 z-[3] transition-all duration-700 ease-out group-hover:-translate-y-6 group-hover:scale-110">
          <PhoneMockup
            src={videos[1]}
            style={{
              transform: "rotate(0deg) translateY(-8px)",
              width: 110,
            }}
          />
        </div>

        {/* Right phone */}
        <div className="col-start-1 row-start-1 z-[2] transition-all duration-700 ease-out group-hover:translate-x-8 group-hover:-translate-y-2 group-hover:rotate-6 group-hover:scale-105">
          <PhoneMockup
            src={videos[2]}
            style={{
              transform: "rotate(14deg) translateX(95px) translateY(28px)",
              filter: "brightness(0.85)",
              width: 88,
            }}
          />
        </div>
      </div>
    </div>
  );
}

const AlternatingText = ({ slice }: AlternatingTextProps): JSX.Element => {
  return (
    <></>
  );
};

export default AlternatingText;

