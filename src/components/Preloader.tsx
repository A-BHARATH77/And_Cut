"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import { FORMATS_DATA } from "@/data/services";

export default function Preloader() {
  const [isDone, setIsDone] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const pathname = usePathname();

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("hasLoaded-steel");
    if (hasLoaded && process.env.NODE_ENV !== "development") {
      setAssetsLoaded(true);
      return;
    }

    const assetsToLoad = [
      "/preloader1.webp",
      "/preloader2.webp",
      "https://res.cloudinary.com/dxz4iwsv8/video/upload/f_auto,q_auto:best/v1781069499/showreel_ey580t.webp",
      "/preloader3.webp",
      "/preloader4.webp",
      "/and_cut_logo.webp",
      "/Photoshoot/Bed sheet 1.webp",
      "/Photoshoot/Bed sheet 2.webp",
      "/Photoshoot/bedsheet 3.webp",
      "/Photoshoot/Bedsheet 4 .webp",
      "/Photoshoot/Bedsheet 5.webp",
      "/Photoshoot/Bedsheet 6.webp",
      "/Photoshoot/Bedsheet 7.webp",
      "/Photoshoot/Bedsheet 8.webp",
      "/Photoshoot/Towel 1.webp",
      "/Photoshoot/Towel 2.webp",
      "/Photoshoot/Towel 3.webp",
      "/Photoshoot/Towel 4.webp",
      "/Photoshoot/Towel 5 .webp",
      "/Photoshoot/Towel 6.webp",
      "/Photoshoot/Towel 7.webp",
      "/Photoshoot/Towel 8.webp",
      "/Photoshoot/Towel 9.webp"
    ];

    // Collect ALL videos from FORMATS_DATA to ensure 100% preloaded before preloader dismisses
    const allServicesVideos: string[] = Object.values(FORMATS_DATA)
      .flat()
      .map((item) => item.videoPath)
      .filter((path) => /\.(webm|mp4|mov)$/i.test(path));

    // Remove duplicates
    const uniqueVideosToPreload = Array.from(new Set(allServicesVideos));

    let loadedCount = 0;
    const totalToLoad = assetsToLoad.length + uniqueVideosToPreload.length;
    
    const checkReady = () => {
       if (loadedCount >= totalToLoad) {
          setAssetsLoaded(true);
       }
    };

    assetsToLoad.forEach(src => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        checkReady();
      };
      img.onerror = () => {
        loadedCount++; 
        checkReady();
      };
      img.src = src;
    });

    uniqueVideosToPreload.forEach(src => {
      const vid = document.createElement("video");
      vid.oncanplaythrough = () => {
        loadedCount++;
        checkReady();
      };
      vid.onerror = () => {
        loadedCount++;
        checkReady();
      };
      vid.src = src;
      vid.load();
    });

    // Fallback timer
    const timeout = setTimeout(() => {
      setAssetsLoaded(true);
    }, 10000);

    return () => clearTimeout(timeout);
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

    gsap.set(".line", { y: "125%" });
    gsap.set(".preloader-text-overlay", { opacity: 0 });
    gsap.set(".preloader-text-overlay .hero-text-line", { opacity: 0, y: 60 });
    // Hide the real header logo inside the preloader until the animated one lands
    gsap.set(".header-logo-img", { opacity: 0 });

    const tl = gsap.timeline({ delay: 0.2 });

    // Hide the FOUC overlay immediately when the animation starts
    tl.to(".fouc-overlay", { opacity: 0, duration: 0.5, ease: "power2.out" }, 0);

    // Get the exact final destination of the logo from the Header
    const targetLogo = document.querySelector(".header-logo-img") as HTMLElement;
    const animatedLogo = document.querySelector(".animated-logo") as HTMLElement;
    
    if (targetLogo && animatedLogo) {
      const targetRect = targetLogo.getBoundingClientRect();
      const startRect = animatedLogo.getBoundingClientRect();
      
      // Calculate exactly how much to scale down
      const scaleTo = targetRect.width / startRect.width;

      // Because the animated logo uses `top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`,
      // its "y: 0" corresponds to the center of the screen. 
      // The distance it needs to travel is the difference between their centers:
      const yDistance = (targetRect.top + targetRect.height / 2) - (startRect.top + startRect.height / 2);
      const xDistance = (targetRect.left + targetRect.width / 2) - (startRect.left + startRect.width / 2);

      // Phase 1: The logo moves UP while the images fan out
      tl.to(
        animatedLogo,
        {
          y: yDistance,
          scale: scaleTo,
          duration: 0.95, // Goldilocks speed
          ease: "power4.inOut"
        },
        0 // Starts exactly when the images start fanning out
      );

      // Phase 2: The logo moves LEFT while the center video scales up
      tl.to(
        animatedLogo,
        {
          x: xDistance,
          duration: 0.95, // Goldilocks speed
          ease: "power4.inOut"
        },
        "spread" // Starts exactly when the center video starts scaling up
      );

      // Once it lands exactly, reveal the real header logo and hide the animated one
      tl.set(".header-logo-img", { opacity: 1 }, "spread+=0.95");
      tl.set(animatedLogo, { opacity: 0 }, "spread+=0.95");
    }

    // Phase 1: Images slide to their positions
    introImages.forEach((img) => {
      tl.to(
        img,
        {
          x: parseFloat(img.dataset.centeredX || "0"),
          duration: 0.95, // Goldilocks speed
          ease: "power4.inOut",
        },
        0 // All start at the beginning of the timeline
      );
    });

    // Phase 2: Fade in the Header and Vignette slightly before they finish placing
    tl.to(
      ".preloader-text-overlay",
      {
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
      },
      0.4 
    );

    // Immediately trigger the center image scale up as soon as they finish placing
    tl.add("spread", 0.95);

    // Phase 3: Center image scales up to take over the screen
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
      {
        scale: 1,
        x: 0,
        rotation: 0,
        borderRadius: 0,
        duration: 0.95, // Goldilocks speed
        ease: "power4.inOut",
      },
      "spread"
    );

    // Phase 4: Stagger in the actual hero text slowly and dramatically!
    tl.to(
      ".preloader-text-overlay .hero-text-line",
      {
        opacity: 1,
        y: 0,
        duration: 1.1, // Goldilocks speed
        stagger: 0.15, // Goldilocks speed
        ease: "power4.out",
      },
      "spread+=0.5" // Starts halfway through the video scaling up
    );

    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.7,
      ease: "power2.inOut",
      onComplete: () => setIsDone(true)
    }, ">+0.3"); // Wait a tiny bit after the text finishes before fading out
  }, { scope: containerRef, dependencies: [assetsLoaded] });

  if (isDone) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-[99999] bg-[#050508] font-sans w-full h-[100svh] overflow-hidden text-white">
      
      {/* FOUC Overlay (solid black to prevent flash) */}
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

      {/* The Animated Logo that travels to the Header */}
      <img 
        src="/and_cut_logo.webp" 
        alt="AndCut Logo" 
        className="animated-logo fixed z-[110] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 md:w-64 h-auto object-contain" 
      />

      {/* Hero Images Area */}
      <section className="relative w-full h-[100svh] overflow-hidden">
        <div className="intro-img absolute top-0 left-0 w-full h-full overflow-hidden rounded-[2.5rem] origin-center will-change-transform">
          <img src="/preloader1.webp" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="intro-img absolute top-0 left-0 w-full h-full overflow-hidden rounded-[2.5rem] origin-center will-change-transform">
          <img src="/preloader2.webp" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="intro-img hero-img absolute top-0 left-0 w-full h-full overflow-hidden rounded-[2.5rem] origin-center will-change-transform bg-black">
          <video
            src="https://res.cloudinary.com/dxz4iwsv8/video/upload/f_auto,q_auto:best/v1781069499/showreel_ey580t.webm"
            poster="https://res.cloudinary.com/dxz4iwsv8/video/upload/f_auto,q_auto:best/v1781069499/showreel_ey580t.webp"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="intro-img absolute top-0 left-0 w-full h-full overflow-hidden rounded-[2.5rem] origin-center will-change-transform">
          <img src="/preloader3.webp" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="intro-img absolute top-0 left-0 w-full h-full overflow-hidden rounded-[2.5rem] origin-center will-change-transform">
          <img src="/preloader4.webp" alt="" className="w-full h-full object-cover" />
        </div>

        {/* Exact same Typography as the actual Hero section so the transition is seamless */}
        <div className="preloader-text-overlay opacity-0">
          <div className="relative z-50 pointer-events-none"><Header /></div>
          {/* Vignette removed to match hero */}
          <div className="absolute inset-0 z-20 w-full flex flex-col justify-end items-start m-0 p-0 overflow-hidden pb-4 md:pb-6 pointer-events-none">
            <h1 className="hero-text-line w-full text-left pl-6 md:pl-12 text-[17vw] sm:text-[14vw] md:text-[8.2vw] font-black tracking-normal leading-[0.85] m-0 p-0 select-none flex flex-col md:block">
              <span className="text-white block md:inline">
                ANDCUT
              </span>
              <span className="text-white block md:inline md:ml-4">
                STUDIOS
              </span>
            </h1>
          </div>
        </div>
      </section>

    </div>
  );
}
