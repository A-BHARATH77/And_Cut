/* eslint-disable @next/next/no-img-element */
"use client";


import { Cloud, Clouds, Text, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import FloatingObject from "@/components/FloatingCan";
import { useMediaQuery } from "@/hooks/useMediaQuery";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type SkyDiveProps = {
  sentence: string | null;
  flavor?: string;
};

export default function Scene({ sentence, flavor }: SkyDiveProps) {
  const isDesktop = useMediaQuery("(min-width: 950px)", true);
  const groupRef = useRef<THREE.Group>(null);
  const canRef = useRef<THREE.Group>(null);
  const cloud1Ref = useRef<THREE.Group>(null);
  const cloud2Ref = useRef<THREE.Group>(null);
  const cloudsRef = useRef<THREE.Group>(null);
  const wordsRef = useRef<THREE.Group>(null);
  const logoRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (logoRef.current) {
      logoRef.current.rotation.y += delta * 2;
    }
  });

  const ANGLE = 75 * (Math.PI / 180);

  const getXPosition = (distance: number) => distance * Math.cos(ANGLE);
  const getYPosition = (distance: number) => distance * Math.sin(ANGLE);

  const getXYPositions = (distance: number) => ({
    x: getXPosition(distance),
    y: getYPosition(-1 * distance),
  });

  useGSAP(() => {

    if (
      !cloudsRef.current ||
      !canRef.current ||
      !wordsRef.current ||
      !cloud1Ref.current ||
      !cloud2Ref.current
    )
      return;

    // Set initial positions: first word is in the center, logo starts off-screen top-left
    gsap.set(cloudsRef.current.position, { z: 0 });
    gsap.set(canRef.current.position, { x: -12, y: 8 });

    const words = wordsRef.current.children;
    if (words.length > 0) {
      // First word is visible in center
      gsap.set(words[0].position, { x: 0, y: 0, z: -1 });
      // Rest start off-screen
      for (let i = 1; i < words.length; i++) {
        gsap.set(words[i].position, { x: 0, y: -3.5, z: 2 });
      }
    }

    // The floating is already handled by the FloatingObject wrapper,
    // so we don't need manual continuous GSAP tweens here which conflict with scrollTl.

    // Infinite cloud movement
    const DISTANCE = 15;
    const DURATION = 6;

    gsap.set([cloud2Ref.current.position, cloud1Ref.current.position], {
      ...getXYPositions(DISTANCE),
    });

    gsap.to(cloud1Ref.current.position, {
      y: `+=${getYPosition(DISTANCE * 2)}`,
      x: `+=${getXPosition(DISTANCE * -2)}`,
      ease: "none",
      repeat: -1,
      duration: DURATION,
    });

    gsap.to(cloud2Ref.current.position, {
      y: `+=${getYPosition(DISTANCE * 2)}`,
      x: `+=${getXPosition(DISTANCE * -2)}`,
      ease: "none",
      repeat: -1,
      delay: DURATION / 2,
      duration: DURATION,
    });

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".skydive",
        pin: true,
        start: "top top",
        end: "+=800",
        scrub: 0.8,
        onLeave: () => {
          // Fly out to bottom-right when the section unpins and starts scrolling up
          if (canRef.current) gsap.to(canRef.current.position, { x: 12, y: -8, duration: 0.5, ease: "power2.in", overwrite: "auto" });
          if (cloudsRef.current) gsap.to(cloudsRef.current.position, { z: 7, duration: 0.5, overwrite: "auto" });
        },
        onEnterBack: () => {
          // Fly back to center if user scrolls back up into the pinned section
          if (canRef.current) gsap.to(canRef.current.position, { x: 0, y: 0, duration: 0.5, ease: "power2.out", overwrite: "auto" });
          if (cloudsRef.current) gsap.to(cloudsRef.current.position, { z: 0, duration: 0.5, overwrite: "auto" });
        }
      },
    });

    scrollTl
      .to("body", { backgroundColor: "#050A18", overwrite: "auto", duration: 0.1 }, 0);

    // Emerge from top-left into the center as soon as section hits the top
    scrollTl.to(canRef.current.position, {
      x: 0,
      y: 0,
      duration: 0.2,
      ease: "power2.out",
    }, 0);

    if (words.length > 0) {
      // First word flies out
      scrollTl.to(words[0].position, { ...getXYPositions(-7), z: -7, duration: 0.3 }, 0);
      
      // Rest of the words cycle through
      if (words.length > 1) {
        const otherWords = Array.from(words).slice(1);
        scrollTl.to(
          otherWords.map(w => w.position),
          {
            keyframes: [
              { x: 0, y: 0, z: -1 },
              { ...getXYPositions(-7), z: -7 },
            ],
            stagger: 0.3,
            duration: 0.6,
          },
          0
        );
      }
    }
    
    // Note: Logo and clouds exit animation is handled by onLeave in the scrollTrigger above
    // This allows them to fly out dynamically while the section is unpinning and revealing the next section.
  }, { dependencies: [] });

  return (
    <group ref={groupRef}>
      {/* Phone placeholder — swap with <IPhoneMockup /> when ready */}
      <group rotation={[0, 0, 0.5]}>
        <FloatingObject
          ref={canRef}
          rotationIntensity={2}
          floatIntensity={3}
          floatSpeed={3}
        >
          {/* Render the logo as a WebGL Plane for perfect Z-depth sorting with the 3D Text */}
          <mesh ref={logoRef} position={[0, 0, 0]} scale={isDesktop ? [1.8, 1.8, 1] : [1.3, 1.3, 1]} renderOrder={1}>
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial 
              map={useTexture("/and_cut_logo.webp")} 
              transparent={true} 
              depthWrite={false}
              depthTest={false}
              side={THREE.DoubleSide}
            />
          </mesh>
          <pointLight intensity={30} color="#6EE7FF" decay={0.6} position={[0, 0, 1]} />
        </FloatingObject>
      </group>

      {/* Clouds */}
      <Clouds ref={cloudsRef}>
        <Cloud ref={cloud1Ref} bounds={[10, 10, 2]} />
        <Cloud ref={cloud2Ref} bounds={[10, 10, 2]} />
      </Clouds>

      {/* Text */}
      <group ref={wordsRef}>
        {sentence && <ThreeText sentence={sentence} color="#6EE7FF" />}
      </group>

      {/* Lights */}
      <ambientLight intensity={2} color="#9DDEFA" />

    </group>
  );
}

useTexture.preload("/and_cut_logo.webp");

function ThreeText({
  sentence,
  color = "white",
}: {
  sentence: string;
  color?: string;
}) {
  const words = sentence.toUpperCase().split(" ");

  const isDesktop = useMediaQuery("(min-width: 950px)", true);

  const GIFS = [
    "/ANDCUT_GIFs/1.webm",
    "/ANDCUT_GIFs/2.webm",
    "/ANDCUT_GIFs/3.webm",
    "/ANDCUT_GIFs/6.webm",
    "/ANDCUT_GIFs/5.webm"
  ];

  return words.map((word: string, wordIndex: number) => {
    const isEven = wordIndex % 2 === 0;
    const xPos = isDesktop ? (isEven ? 2.5 : -2.5) : (isEven ? 1.2 : -1.2);
    const rotation = isEven ? '6deg' : '-6deg';

    return (
      <group key={`${wordIndex}-${word}`}>
        <Text
          scale={isDesktop ? 0.5 : 0.18}
          color={color}
          fontWeight={900}
          anchorX={"center"}
          anchorY={"middle"}
        >
          {word}
        </Text>
      </group>
    );
  });
}
