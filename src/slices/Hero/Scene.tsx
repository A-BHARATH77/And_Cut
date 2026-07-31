/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef, useEffect, createRef } from "react";
import { Environment, Html } from "@react-three/drei";
import { Group } from "three";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useFrame } from "@react-three/fiber";

import FloatingObject from "@/components/FloatingCan";
import { useStore } from "@/hooks/useStore";
import { useMediaQuery } from "@/hooks/useMediaQuery";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ALL_GIFS = Array.from({ length: 14 }, (_, i) => {
  if (i === 3) return `/ANDCUT_GIFs/8.webm`; // Swap top right
  if (i === 7) return `/ANDCUT_GIFs/4.webm`; // Swap to prevent duplicate
  return `/ANDCUT_GIFs/${i + 1}.webm`;
});
const NUM_CARDS = 14;
const CARD_SPACING = 1.25;
const TOTAL_WIDTH = NUM_CARDS * CARD_SPACING; // 17.5

export default function Scene() {
  const isReady = useStore((state) => state.isReady);
  const isDesktop = useMediaQuery("(min-width: 768px)", true);

  const canRefs = useRef(Array.from({ length: NUM_CARDS }, () => createRef<Group>()));
  const marqueeRefs = useRef(Array.from({ length: NUM_CARDS }, () => createRef<Group>()));
  const groupRefs = useRef(Array.from({ length: NUM_CARDS }, () => createRef<Group>()));

  const mainGroupRef = useRef<Group>(null);
  const parallaxRef = useRef<Group>(null);
  const horizontalVidGroupRef = useRef<Group>(null);
  const horizontalVidRef = useRef<Group>(null);

  const FLOAT_SPEED = 1.5;
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (!parallaxRef.current) return;

    // Significantly reduced parallax to keep layout clean and justified
    const targetX = (mousePos.current.x * Math.PI) / 48;
    const targetY = (mousePos.current.y * Math.PI) / 48;

    parallaxRef.current.rotation.y = THREE.MathUtils.lerp(
      parallaxRef.current.rotation.y,
      targetX,
      delta * 4
    );
    parallaxRef.current.rotation.x = THREE.MathUtils.lerp(
      parallaxRef.current.rotation.x,
      -targetY,
      delta * 4
    );

    // Continuous Infinite Marquee
    // Only engage when scrolled past 50%
    const isMarquee = window.scrollY > window.innerHeight * 0.5;

    marqueeRefs.current.forEach((marqueeRefObj, index) => {
      const marqueeRef = marqueeRefObj.current;
      const canRef = canRefs.current[index].current;
      if (!marqueeRef || !canRef) return;

      if (isMarquee) {
        marqueeRef.position.x -= delta * 1.5;

        // Check relative world bounds to loop seamlessly
        const localWorldX = canRef.position.x + marqueeRef.position.x;

        // -6 is the starting position of the leftmost card
        const leftBound = -6 - (CARD_SPACING / 2);

        if (localWorldX < leftBound) {
          marqueeRef.position.x += TOTAL_WIDTH;
        }
      } else {
        // Smoothly restore offset when scrolling back up
        marqueeRef.position.x = THREE.MathUtils.lerp(
          marqueeRef.position.x,
          0,
          delta * 4
        );
      }
    });
  });

  useGSAP(() => {
    if (!mainGroupRef.current) return;

    // Check if refs are mounted
    if (canRefs.current.some(ref => !ref.current) || groupRefs.current.some(ref => !ref.current)) return;

    isReady();

    // Tighter, deliberate arrangement framing the text closely
    // Perfectly mirrored, no-overlap layout
    const initialPositions = isDesktop ? [
      { x: -1.2, y: -0.2, z: 0 }, // Close Left
      { x: 1.2, y: -0.2, z: 0 }, // Close Right
      { x: -1.6, y: 1.1, z: -0.3 }, // Outer Left Top
      { x: 1.6, y: 1.1, z: -0.3 }, // Outer Right Top
      { x: -1.7, y: -1.4, z: -0.4 }, // Outer Left Bottom
      { x: 1.7, y: -1.4, z: -0.4 }, // Outer Right Bottom
    ] : [
      { x: -0.4, y: 1.6, z: -0.2 }, // Top Left
      { x: 0.4, y: 1.6, z: -0.2 }, // Top Right
      { x: -0.5, y: -1.6, z: -0.2 }, // Bottom Left
      { x: 0.5, y: -1.6, z: -0.2 }, // Bottom Right
      { x: -0.6, y: 2.4, z: -0.4 }, // Higher Top Left
      { x: 0.6, y: -2.4, z: -0.4 }, // Lower Bottom Right
    ];

    // Horizontal Video initial setup
    if (horizontalVidGroupRef.current && horizontalVidRef.current) {
      // Place it perfectly centered in the middle behind the text, shifted slightly right
      gsap.set(horizontalVidRef.current.position, { x: 0.7, y: 0, z: -1.5 });
    }

    // Set initial layout
    for (let i = 0; i < NUM_CARDS; i++) {
      const can = canRefs.current[i].current!;
      if (i < initialPositions.length) {
        gsap.set(can.position, initialPositions[i]);

        // Beautifully fanned out rotations
        let rotZ = 0;
        if (i === 0) rotZ = -0.05; // Close Left tilts slightly right
        if (i === 1) rotZ = 0.05;  // Close Right tilts slightly left
        if (i === 2) rotZ = -0.15; // Top Left tilts right
        if (i === 3) rotZ = 0.15;  // Top Right tilts left
        if (i === 4) rotZ = 0.1;   // Bottom Left tilts OUTWARD to avoid overlap
        if (i === 5) rotZ = -0.1;  // Bottom Right tilts OUTWARD to avoid overlap

        gsap.set(can.rotation, { z: rotZ });
      } else {
        // Hide the extra 9 cards offscreen to the right
        gsap.set(can.position, { x: 25 });
      }
    }

    const introTl = gsap.timeline({
      defaults: {
        duration: 3,
        ease: "power3.out",
      },
    });

    if (window.scrollY < 20) {
      // Gentle, subtle entrance
      for (let i = 0; i < initialPositions.length; i++) {
        const grp = groupRefs.current[i].current!;
        const startY = i % 2 === 0 ? -3 : 3;
        introTl.from(grp.position, { y: startY, opacity: 0 }, 0);
        introTl.from(grp.rotation, { z: i % 2 === 0 ? 0.5 : -0.5 }, 0);
      }
      if (horizontalVidGroupRef.current) {
        introTl.from(horizontalVidGroupRef.current.position, { y: 3, opacity: 0 }, 0);
      }
    }

    if (isDesktop) {
      const scrollTl = gsap.timeline({
        defaults: { duration: 2 },
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      });

      // Rotate main group by 360 degrees to create a 3D spin effect before forming line
      // We explicitly do NOT shift the position.x to keep it perfectly symmetrical!
      scrollTl.to(mainGroupRef.current.rotation, { y: Math.PI * 2 }, 0);

      // Move horizontal video up and scale/fade back to stay symmetric but out of the line's way
      if (horizontalVidRef.current) {
        scrollTl.to(horizontalVidRef.current.position, { y: 2.5, z: -2 }, 0);
      }

      // Create a beautifully symmetrical mapping for the line formation
      // The line has 14 cards, perfectly centered at x=0
      for (let i = 0; i < NUM_CARDS; i++) {
        const can = canRefs.current[i].current!;

        // Map the 6 initial visible cards to the absolute center of the horizontal line
        let lineIndex = i;
        if (i === 0) lineIndex = 6;  // Close Left -> Center Left
        if (i === 1) lineIndex = 7;  // Close Right -> Center Right
        if (i === 2) lineIndex = 5;  // Outer Left Top -> Farther Left
        if (i === 3) lineIndex = 8;  // Outer Right Top -> Farther Right
        if (i === 4) lineIndex = 4;  // Outer Left Bottom -> Farthest Left
        if (i === 5) lineIndex = 9;  // Outer Right Bottom -> Farthest Right
        // Map the hidden offscreen cards symmetrically to the outer edges
        if (i === 6) lineIndex = 3;
        if (i === 7) lineIndex = 10;
        if (i === 8) lineIndex = 2;
        if (i === 9) lineIndex = 11;
        if (i === 10) lineIndex = 1;
        if (i === 11) lineIndex = 12;
        if (i === 12) lineIndex = 0;
        if (i === 13) lineIndex = 13;

        // Calculate a perfectly centered target X
        const targetX = -((NUM_CARDS - 1) * CARD_SPACING) / 2 + (lineIndex * CARD_SPACING);

        scrollTl.to(can.position, { x: targetX, y: 0, z: 0 }, 0);
        scrollTl.to(can.rotation, { x: 0, y: 0, z: (Math.random() - 0.5) * 0.08 }, 0);
      }
    }
  }, { dependencies: [isDesktop] });

  return (
    <group ref={parallaxRef}>
      <group ref={mainGroupRef}>

        {/* Central Symmetrical Horizontal Video */}
        <group ref={horizontalVidGroupRef}>
          <FloatingObject ref={horizontalVidRef} floatSpeed={FLOAT_SPEED * 0.4}>
            <Html transform distanceFactor={2.5}>
              <div style={{
                width: '288px',
                height: '162px',
                borderRadius: '8px',
                overflow: 'hidden',
                pointerEvents: 'none',
                boxShadow: '0px 20px 50px rgba(0,0,0,0.6)',
                opacity: 0.9,
              }}>
                <video
                  src="/ANDCUT_VDS/4_comp.webm"
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </Html>
          </FloatingObject>
        </group>

        {Array.from({ length: NUM_CARDS }).map((_, i) => (
          <group ref={groupRefs.current[i]} key={i}>
            <FloatingObject ref={canRefs.current[i]} floatSpeed={FLOAT_SPEED}>
              <group ref={marqueeRefs.current[i]}>
                <Html transform distanceFactor={2.5}>
                  {/* Smaller cards: 90px x 160px for a tighter, neater cluster */}
                  <div style={{
                    width: '90px',
                    height: '160px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    pointerEvents: 'none',
                    boxShadow: '0px 10px 30px rgba(0,0,0,0.4)'
                  }}>
                    <video
                      src={ALL_GIFS[i]}
                      autoPlay
                      muted
                      loop
                      playsInline
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                </Html>
              </group>
            </FloatingObject>
          </group>
        ))}

        <Environment files="/hdr/lobby.hdr" environmentIntensity={1.5} />
      </group>
    </group>
  );
}
