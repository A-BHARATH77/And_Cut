/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function CircularGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [previewSrc, setPreviewSrc] = useState("/gallery/img1.webp");
  
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (!containerRef.current || !galleryRef.current) return;

    // Set initial positions
    const numberOfItems = 150;
    const angleIncrement = 360 / numberOfItems;
    const radius = window.innerWidth < 768 ? 300 : 500;

    itemRefs.current.forEach((item, index) => {
      if (!item) return;
      gsap.set(item, {
        rotationY: 90,
        rotationZ: index * angleIncrement - 90,
        transformOrigin: `50% ${radius}px`,
      });
    });

    // Scroll trigger for rotation
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=3000",
      pin: true,
      scrub: 2,
      onUpdate: (self) => {
        const rotationProgress = self.progress * 360 * 1;
        itemRefs.current.forEach((item, index) => {
          if (!item) return;
          const currentAngle = index * angleIncrement - 90 + rotationProgress;
          gsap.to(item, {
            rotationZ: currentAngle,
            duration: 1,
            ease: "power3.out",
            overwrite: "auto",
          });
        });
      },
    });

    // Mousemove for gallery tilt
    const handleMouseMove = (event: MouseEvent) => {
      const x = event.clientX;
      const y = event.clientY;

      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const percentX = (x - centerX) / centerX;
      const percentY = (y - centerY) / centerY;

      const rotateX = 55 + percentY * 2;
      const rotateY = percentX * 2;

      gsap.to(galleryRef.current, {
        duration: 1,
        ease: "power2.out",
        rotateX: rotateX,
        rotateY: rotateY,
        overwrite: "auto",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  });

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#050508] [perspective:1500px]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[200px] md:w-[600px] md:h-[400px] overflow-hidden z-0 rounded-2xl shadow-2xl">
        <img src={previewSrc} alt="Preview" loading="lazy" className="w-full h-full object-cover transition-opacity duration-300" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/80 to-transparent pointer-events-none" />
      </div>

      <div 
        ref={galleryRef} 
        className="absolute top-[19%] left-[50%] transform -translate-x-1/2 z-10"
        style={{ transformStyle: 'preserve-3d', transform: 'translateX(-50%) rotateX(55deg)' }}
      >
        {Array.from({ length: 150 }).map((_, i) => {
          const imgIndex = (i % 15) + 1;
          const imgSrc = `/gallery/img${imgIndex}.webp`;

          return (
            <div
              key={i}
              ref={(el) => { itemRefs.current[i] = el; }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45px] h-[60px] md:w-[50px] md:h-[70px] m-[10px] bg-[#222] rounded-md overflow-hidden shadow-lg cursor-pointer transition-transform"
              style={{ transformStyle: 'preserve-3d' }}
              onMouseEnter={(e) => {
                setPreviewSrc(imgSrc);
                gsap.to(e.currentTarget, {
                  x: 10,
                  y: 10,
                  z: 10,
                  scale: 1.2,
                  ease: "power2.out",
                  duration: 0.5,
                });
              }}
              onMouseLeave={(e) => {
                // Optionally reset to a default image, or just keep the last hovered one.
                // Keeping the last hovered one is a cooler effect!
                gsap.to(e.currentTarget, {
                  x: 0,
                  y: 0,
                  z: 0,
                  scale: 1,
                  ease: "power2.out",
                  duration: 0.5,
                });
              }}
            >
              <img src={imgSrc} alt={`Gallery ${i}`} loading="lazy" className="w-full h-full object-cover" />
            </div>
          );
        })}
      </div>
      
      {/* Overlay Text */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-white text-center pointer-events-none z-20 w-full px-4">
        <h2 className="text-4xl md:text-7xl font-black uppercase tracking-widest text-white">Behind The Scenes</h2>
        <p className="mt-4 text-lg md:text-xl text-white/70 font-light">Hover to explore. Scroll to spin.</p>
      </div>
    </div>
  );
}
