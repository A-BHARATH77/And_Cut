"use client";

import { useRef } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export type HeroProps = SliceComponentProps<Content.HeroSlice>;

const Hero = ({ slice }: HeroProps): JSX.Element => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".hero-text-line", {
      y: 60,
      opacity: 0,
      duration: 1.1,
      stagger: 0.15,
      ease: "power4.out",
      delay: 0.2,
    });
  }, { scope: container });

  return (
    <>
      <section
        ref={container}
        className="relative min-h-[100svh] w-full bg-black overflow-hidden"
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
      >
        {/* Background Video */}
        <video
          src="https://res.cloudinary.com/dxz4iwsv8/video/upload/f_auto,q_auto:best/v1781069499/showreel_ey580t.webm"
          poster="https://res.cloudinary.com/dxz4iwsv8/video/upload/f_auto,q_auto:best/v1781069499/showreel_ey580t.webp"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Bottom gradient for text readability */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent pointer-events-none z-10" />

        {/* Content Container */}
        <div className="absolute inset-0 z-20 w-full flex flex-col justify-end items-start pb-6 md:pb-10 pointer-events-none">
          <h1 className="hero-text-line w-full text-left pl-5 sm:pl-8 md:pl-12 text-[16vw] sm:text-[13vw] md:text-[8.2vw] font-black tracking-tight leading-[0.85] select-none">
            <span className="text-white block">ANDCUT</span>
            <span className="text-white block md:inline md:ml-4">STUDIOS</span>
          </h1>
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
              <img src="/companies_worked_with/7rings.webp" alt="7 Rings" className="h-8 sm:h-10 md:h-16 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 invert brightness-0" />
              <img src="/companies_worked_with/archish.webp" alt="Archish" className="h-8 sm:h-10 md:h-16 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 invert brightness-0" />
              <img src="/companies_worked_with/bluetea.webp" alt="Blue Tea" className="h-8 sm:h-10 md:h-16 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 invert brightness-0" />
              <img src="/companies_worked_with/cdd.webp" alt="CDD" className="h-8 sm:h-10 md:h-16 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 invert brightness-0" />
              <img src="/companies_worked_with/cnbc.webp" alt="CNBC" className="h-8 sm:h-10 md:h-16 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 invert brightness-0" />
              <img src="/companies_worked_with/hula.webp" alt="Hula" className="h-8 sm:h-10 md:h-16 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 invert brightness-0" />
              <img src="/companies_worked_with/sanfe.webp" alt="Sanfe" className="h-8 sm:h-10 md:h-16 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 invert brightness-0" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Hero;
