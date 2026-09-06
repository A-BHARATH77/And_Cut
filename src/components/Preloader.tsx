"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Header from "@/components/Header";
import { FORMATS_DATA } from "@/data/services";
import { prefetchVideos } from "@/lib/videoCache";

// ─────────────────────────────────────────────────────────────────────────────
// CRITICAL ASSETS — must be ready before the intro animation plays
// ─────────────────────────────────────────────────────────────────────────────
const CRITICAL_IMAGES = [
  "/preloader1.webp",
  "/preloader2.webp",
  "/preloader3.webp",
  "/preloader4.webp",
  "/and_cut_logo.webp",
  "/companies_worked_with/7rings.webp",
  "/companies_worked_with/archish.webp",
  "/companies_worked_with/bluetea.webp",
  "/companies_worked_with/cdd.webp",
  "/companies_worked_with/cnbc.webp",
  "/companies_worked_with/hula.webp",
  "/companies_worked_with/sanfe.webp",
];

// Desktop hero now uses Vimeo (ID 1223932662) which buffers itself —
// we only preload the showreel that plays INSIDE the preloader animation.
// On mobile we skip all video preloading; MobileHero.mp4 buffers via its
// own <video preload="auto"> element in Hero.
const CRITICAL_VIDEOS_DESKTOP = [
  "https://res.cloudinary.com/dxz4iwsv8/video/upload/f_auto,q_auto:best/v1781069499/showreel_ey580t.webm",
];
const CRITICAL_VIDEOS_MOBILE: string[] = [];

// UGC video previews (750KB clips) to pre-cache into memory during preloader
const UGC_PREVIEW_VIDEOS = Array.from(
  new Set(
    (FORMATS_DATA["UGC"] ?? [])
      .filter((v) => v.useLocalCard)
      .map((v) => v.videoPath)
  )
);

// Per-asset timeout — shorter on mobile to avoid blocking on slow connections
const isMobileDevice = () => typeof window !== "undefined" && window.innerWidth < 768;
const ASSET_TIMEOUT_MS = isMobileDevice() ? 3000 : 8000;
// Hard ceiling — unblock even if nothing loads
const HARD_TIMEOUT_MS = isMobileDevice() ? 8000 : 20000;

function loadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const timer = setTimeout(resolve, ASSET_TIMEOUT_MS);
    const img = new Image();
    img.onload = () => { clearTimeout(timer); resolve(); };
    img.onerror = () => { clearTimeout(timer); resolve(); };
    img.src = src;
  });
}

function loadVideo(src: string): Promise<void> {
  // Use a lightweight <video> probe instead of fetch() — fetch downloads the
  // entire file into memory as a detached blob that the actual <video> element
  // in Hero cannot reuse. The probe just waits for enough data to play.
  return new Promise((resolve) => {
    const timer = setTimeout(resolve, ASSET_TIMEOUT_MS);
    const done = () => { clearTimeout(timer); resolve(); };

    const vid = document.createElement("video");
    vid.muted = true;
    vid.playsInline = true;
    vid.preload = "auto";
    if (vid.readyState >= 3) { done(); return; }
    vid.addEventListener("canplay", done, { once: true });
    vid.addEventListener("error", done, { once: true });
    vid.src = src;
    vid.load();
  });
}

export default function Preloader() {
  const [isDone, setIsDone] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("hasLoaded-steel");
    if (hasLoaded && process.env.NODE_ENV !== "development") {
      setAssetsLoaded(true);
      return;
    }

    let cancelled = false;

    // Hard ceiling
    const hardTimer = setTimeout(() => {
      if (!cancelled) setAssetsLoaded(true);
    }, HARD_TIMEOUT_MS);

    // On mobile, skip all video preloading — the Hero <video> element buffers
    // itself via preload="auto". On desktop, preload the showreel + header.
    const mobile = isMobileDevice();
    const criticalVideos = mobile ? CRITICAL_VIDEOS_MOBILE : CRITICAL_VIDEOS_DESKTOP;

    Promise.all([
      ...CRITICAL_IMAGES.map(loadImage),
      ...criticalVideos.map(loadVideo),
      prefetchVideos(UGC_PREVIEW_VIDEOS),
    ]).then(() => {
      if (!cancelled) {
        clearTimeout(hardTimer);
        setAssetsLoaded(true);
      }
    });

    return () => {
      cancelled = true;
      clearTimeout(hardTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useGSAP(() => {
    if (!assetsLoaded) return;

    const hasLoaded = sessionStorage.getItem("hasLoaded-steel");
    if (hasLoaded && process.env.NODE_ENV !== "development") {
      setIsDone(true);
      return;
    }
    sessionStorage.setItem("hasLoaded-steel", "true");

    if (!containerRef.current) return;

    const introImages = gsap.utils.toArray(".intro-img") as HTMLElement[];
    const introImgScale = 0.2;
    const introImgGap = 40;
    const introImgRotations = [-15, 5, -7.5, 10, -2.5];

    const introImgScaledWidth = window.innerWidth * introImgScale;
    const introImgRowWidth = introImgScaledWidth * 5 + introImgGap * 4;
    const introImgCenteredX = (window.innerWidth - introImgRowWidth) / 2;
    const introImgOffScreenX = introImgCenteredX - window.innerWidth * 1.3;

    introImages.forEach((img, i) => {
      const centeredX =
        introImgCenteredX +
        i * (introImgScaledWidth + introImgGap) +
        introImgScaledWidth / 2 -
        window.innerWidth / 2;

      const offScreenX =
        introImgOffScreenX +
        i * (introImgScaledWidth + introImgGap) +
        introImgScaledWidth / 2 -
        window.innerWidth / 2;

      gsap.set(img, {
        scale: introImgScale,
        x: offScreenX,
        rotation: introImgRotations[i],
        borderRadius: "2.5rem",
      });

      img.dataset.centeredX = centeredX.toString();
    });

    gsap.set(".preloader-text-overlay", { opacity: 0 });
    gsap.set(".preloader-text-overlay .hero-text-line", { opacity: 0, y: 60 });
    gsap.set(".header-logo-img", { opacity: 0 });

    const tl = gsap.timeline({ delay: 0.3 }); // short delay after ready

    tl.to(".fouc-overlay", { opacity: 0, duration: 0.5, ease: "power2.out" }, 0);

    const targetLogo = document.querySelector(".header-logo-img") as HTMLElement;
    const animatedLogo = document.querySelector(".animated-logo") as HTMLElement;

    if (targetLogo && animatedLogo) {
      const targetRect = targetLogo.getBoundingClientRect();
      const startRect = animatedLogo.getBoundingClientRect();

      const scaleTo = targetRect.width / startRect.width;
      const yDistance = (targetRect.top + targetRect.height / 2) - (startRect.top + startRect.height / 2);
      const xDistance = (targetRect.left + targetRect.width / 2) - (startRect.left + startRect.width / 2);

      tl.to(animatedLogo, { y: yDistance, scale: scaleTo, duration: 0.95, ease: "power4.inOut" }, 0);
      tl.to(animatedLogo, { x: xDistance, duration: 0.95, ease: "power4.inOut" }, "spread");
      tl.set(".header-logo-img", { opacity: 1 }, "spread+=0.95");
      tl.set(animatedLogo, { opacity: 0 }, "spread+=0.95");
    }

    introImages.forEach((img) => {
      tl.to(img, { x: parseFloat(img.dataset.centeredX || "0"), duration: 0.95, ease: "power4.inOut" }, 0);
    });

    tl.to(".preloader-text-overlay", { opacity: 1, duration: 0.5, ease: "power3.out" }, 0.4);
    tl.add("spread", 0.95);

    tl.to(
      ".intro-img:nth-child(1), .intro-img:nth-child(2)",
      { x: "-100vw", duration: 0.95, ease: "power4.inOut" },
      "spread"
    );
    tl.to(
      ".intro-img:nth-child(4), .intro-img:nth-child(5)",
      { x: "100vw", duration: 0.95, ease: "power4.inOut" },
      "spread"
    );
    tl.to(
      ".hero-img",
      { scale: 1, x: 0, rotation: 0, borderRadius: 0, duration: 0.95, ease: "power4.inOut" },
      "spread"
    );
    tl.to(
      ".preloader-text-overlay .hero-text-line",
      { opacity: 1, y: 0, duration: 1.1, stagger: 0.15, ease: "power4.out" },
      "spread+=0.5"
    );
    // On mobile, add 1.5 s extra after the animation completes so the Vimeo
    // iframe in the Hero section has time to buffer and start playing before
    // the preloader fades out. On desktop the video is already playing.
    const mobile = isMobileDevice();
    const finalDelay = mobile ? ">+1.8" : ">+0.3"; // 1.5 extra on mobile

    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.7,
      ease: "power2.inOut",
      onComplete: () => {
        // Signal the Hero section's mobile video to play now that it is visible.
        window.dispatchEvent(new CustomEvent("preloader:done"));
        setIsDone(true);
      }
    }, finalDelay);
  }, { scope: containerRef, dependencies: [assetsLoaded] });

  if (isDone) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-[99999] bg-[#050508] font-sans w-full h-[100svh] overflow-hidden text-white">

      {/* FOUC Overlay */}
      <div className="fouc-overlay absolute inset-0 z-[100] bg-[#050508] flex items-center justify-center">
        {!assetsLoaded && (
          <div className="flex flex-col items-center gap-4 transition-opacity duration-300 mt-32 md:mt-40">
            <style>{`
              @keyframes loading-slide {
                0% { transform: translateX(-150%); }
                100% { transform: translateX(250%); }
              }
            `}</style>
            <div className="w-24 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
              <div
                className="absolute top-0 bottom-0 left-0 w-1/2 bg-[#6EE7FF] rounded-full"
                style={{ animation: "loading-slide 1.5s infinite ease-in-out" }}
              />
            </div>
            <p className="text-white/40 text-[9px] tracking-widest uppercase font-bold animate-pulse">Loading Experience</p>
          </div>
        )}

      </div>

      {/* Animated Logo */}
      <img
        src="/and_cut_logo.webp"
        alt="AndCut Logo"
        className="animated-logo fixed z-[110] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 md:w-64 h-auto object-contain"
      />

      {/* Hero Images */}
      <section className="relative w-full h-[100svh] overflow-hidden">
        <div className="intro-img absolute top-0 left-0 w-full h-full overflow-hidden rounded-[2.5rem] origin-center will-change-transform">
          <img src="/preloader1.webp" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="intro-img absolute top-0 left-0 w-full h-full overflow-hidden rounded-[2.5rem] origin-center will-change-transform">
          <img src="/preloader2.webp" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="intro-img hero-img absolute top-0 left-0 w-full h-full overflow-hidden rounded-[2.5rem] origin-center will-change-transform bg-black">
          {/* Desktop: Cloudinary showreel */}
          <video
            src="https://res.cloudinary.com/dxz4iwsv8/video/upload/f_auto,q_auto:best/v1781069499/showreel_ey580t.webm"
            poster="https://res.cloudinary.com/dxz4iwsv8/video/upload/f_auto,q_auto:best/v1781069499/showreel_ey580t.webp"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="hidden md:block w-full h-full object-cover"
          />
          {/* Mobile: Vimeo 1218625128 — same iframe as the Hero mobile bg,
              so by the time the preloader ends it's already buffered & playing */}
          <iframe
            src="https://player.vimeo.com/video/1218625128?background=1&autoplay=1&muted=1&loop=1&autopause=0&controls=0&dnt=1&playsinline=1&quality=auto"
            allow="autoplay; fullscreen; picture-in-picture"
            loading="eager"
            title="Mobile hero preloader video"
            className="block md:hidden"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "177.78vh",
              height: "56.25vw",
              minWidth: "100%",
              minHeight: "100%",
              transform: "translate(-50%, -50%)",
              border: "none",
              pointerEvents: "none",
            }}
          />
        </div>
        <div className="intro-img absolute top-0 left-0 w-full h-full overflow-hidden rounded-[2.5rem] origin-center will-change-transform">
          <img src="/preloader3.webp" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="intro-img absolute top-0 left-0 w-full h-full overflow-hidden rounded-[2.5rem] origin-center will-change-transform">
          <img src="/preloader4.webp" alt="" className="w-full h-full object-cover" />
        </div>

        <div className="preloader-text-overlay opacity-0">
          <div className="relative z-50 pointer-events-none"><Header /></div>
          <div className="absolute inset-0 z-20 w-full flex flex-col justify-end items-start m-0 p-0 overflow-hidden pb-4 md:pb-6 pointer-events-none">
            <h1 className="hero-text-line w-full text-left pl-6 md:pl-12 text-[17vw] sm:text-[14vw] md:text-[8.2vw] font-black tracking-normal leading-[0.85] m-0 p-0 select-none flex flex-col md:block">
              <span className="text-white block md:inline">ANDCUT</span>
              <span className="text-white block md:inline md:ml-4">STUDIOS</span>
            </h1>
          </div>
        </div>
      </section>
    </div>
  );
}
