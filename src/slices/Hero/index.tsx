"use client";

import { useRef, useState, useEffect } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

export type HeroProps = SliceComponentProps<Content.HeroSlice>;

const Hero = ({ slice }: HeroProps): JSX.Element => {
  const container = useRef<HTMLDivElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  useEffect(() => {
    // Show scroll indicator after 2 seconds
    const scrollTimer = setTimeout(() => {
      setShowScrollIndicator(true);
    }, 2000);

    // Imperatively trigger play on the mobile video after the preloader fades.
    // Browsers often suspend <video> elements that are covered by another element
    // during page load. We retry play() after the preloader is gone (~2.5s).
    const playTimer = setTimeout(() => {
      const vid = mobileVideoRef.current;
      if (vid) {
        vid.muted = true;
        vid.play().catch(() => {
          // Second attempt after user interaction or after a longer delay
          setTimeout(() => vid.play().catch(() => {}), 1000);
        });
      }
    }, 2800);

    return () => {
      clearTimeout(scrollTimer);
      clearTimeout(playTimer);
    };
  }, []);

  return (
    <>
      <section
        ref={container}
        className="relative min-h-[100svh] w-full bg-black overflow-hidden"
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
      >
        {/* Desktop Background Video */}
        <video
          src="/ANDCUT_VDS/Header.webm"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="hidden md:block absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Mobile Background Video — local file for reliable autoplay on iOS/Android.
            autoPlay alone may not fire if the element was suspended during preloader.
            We also call .play() imperatively after the preloader fades (see useEffect). */}
        <video
          ref={mobileVideoRef}
          src="/ANDCUT_VDS/MobileHero.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="block md:hidden absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Bottom gradient for text readability */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent pointer-events-none z-10" />

        {/* Content Container */}
        <div className="absolute inset-0 z-20 w-full flex flex-col justify-end items-start pb-6 md:pb-10 pointer-events-none">
          {/*
          <h1 className="hero-text-line w-full text-left pl-5 sm:pl-8 md:pl-12 text-[16vw] sm:text-[13vw] md:text-[8.2vw] font-black tracking-tight leading-[0.85] select-none">
            <span className="text-white block">ANDCUT</span>
            <span className="text-white block md:inline md:ml-4">STUDIOS</span>
          </h1>
          */}
        </div>

        {/* Scroll Down Indication for Mobile */}
        <div
          className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 pointer-events-none md:hidden transition-all duration-1000 ease-out ${
            showScrollIndicator ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="text-white/85 text-[9px] tracking-[0.2em] uppercase font-bold">Scroll Down</span>
          <svg className="w-4 h-4 text-white/85 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" style={{ animationDuration: '2s' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </section>

      {/* Companies Worked With Marquee */}
      <div className="w-full relative bg-black py-6 md:py-14 overflow-hidden">
        <style>{`
          @keyframes logoMarquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-logo-marquee {
            display: flex;
            width: max-content;
            animation: logoMarquee 30s linear infinite;
          }
        `}</style>

        {/* Edge fades */}
        <div className="absolute top-0 left-0 bottom-0 w-10 md:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-10 md:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        <div className="animate-logo-marquee items-center">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 sm:gap-12 md:gap-20 pr-8 sm:pr-12 md:pr-20">
              <img src="/companies_worked_with/7rings.webp" alt="7 Rings" loading="lazy" className="h-8 sm:h-10 md:h-16 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 invert brightness-0" />
              <img src="/companies_worked_with/archish.webp" alt="Archish" loading="lazy" className="h-[36px] sm:h-[44px] md:h-[72px] w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 invert brightness-0" />
              <img src="/companies_worked_with/bluetea.webp" alt="Blue Tea" loading="lazy" className="h-[44px] sm:h-[54px] md:h-[84px] w-auto object-contain scale-x-[1.15] transform-gpu opacity-60 hover:opacity-100 transition-opacity duration-300 invert brightness-0" />
              <img src="/companies_worked_with/cdd.webp" alt="CDD" loading="lazy" className="h-8 sm:h-10 md:h-16 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 invert brightness-0" />
              <img src="/companies_worked_with/cnbc.webp" alt="CNBC" loading="lazy" className="h-10 sm:h-12 md:h-20 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 invert brightness-0" />
              <img src="/companies_worked_with/hula.webp" alt="Hula" loading="lazy" className="h-10 sm:h-12 md:h-20 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 invert brightness-0" />
              <img src="/companies_worked_with/sanfe.webp" alt="Sanfe" loading="lazy" className="h-6 sm:h-8 md:h-12 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 invert brightness-0" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Hero;
