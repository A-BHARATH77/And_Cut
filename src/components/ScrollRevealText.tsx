"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import clsx from "clsx";

interface WordData {
  text: string;
  type: "white" | "gradient-blue" | "gradient-cyan";
}

const WORDS: WordData[] = [
  { text: "WE", type: "white" },
  { text: "CREATE", type: "white" },
  { text: "EYE-CANDY", type: "gradient-blue" },
  { text: "ADS", type: "gradient-blue" },
  { text: "SO", type: "white" },
  { text: "RIDICULOUSLY", type: "white" },
  { text: "GOOD,", type: "white" },
  { text: "PEOPLE", type: "white" },
  { text: "FORGET", type: "white" },
  { text: "THEY'RE", type: "white" },
  { text: "BEING", type: "gradient-cyan" },
  { text: "SOLD", type: "gradient-cyan" },
  { text: "TO", type: "gradient-cyan" },
];

// Random order sequence to apply staggered delay to each word index
const RANDOM_ORDER = [4, 0, 8, 2, 11, 5, 9, 1, 7, 3, 12, 6, 10];

const wordVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: delay,
      ease: [0.25, 1, 0.5, 1] as any,
    },
  }),
};

// Lighter variant for mobile — shorter distance, faster duration
const wordVariantsMobile = {
  hidden: { opacity: 0, y: 18 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      delay: delay * 0.75, // compress stagger timing on mobile
      ease: [0.25, 1, 0.5, 1] as any,
    },
  }),
};

export default function ScrollRevealText() {
  const containerRef = useRef<HTMLDivElement>(null);
  // Detect mobile on mount to pick the right variant + viewport margin
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: isMobile ? "-40px" : "-120px" }}
      className="relative w-full py-12 sm:py-16 md:py-20 bg-[#050508] flex items-center justify-center px-4 overflow-hidden"
    >
      {/* Soft background ambient glow */}
      <div className="absolute w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-blue-900/10 rounded-full blur-[100px] md:blur-[160px] pointer-events-none" />
      
      <div className="max-w-6xl w-full text-center px-2 md:px-6 z-10">
        <p className="flex flex-wrap items-center justify-center gap-x-2 md:gap-x-4 gap-y-1 md:gap-y-3 text-xl sm:text-3xl md:text-4xl lg:text-6xl font-sans font-black tracking-tight leading-[1.1] md:leading-[1.15] select-none text-center">
          {WORDS.map((word, idx) => {
            const wordDelay = RANDOM_ORDER[idx] * 0.06;
            return (
              <Word
                key={idx}
                word={word}
                delay={wordDelay}
                isMobile={isMobile}
              />
            );
          })}
        </p>
      </div>
    </motion.div>
  );
}

function Word({ word, delay, isMobile }: { word: WordData; delay: number; isMobile: boolean }) {
  return (
    <motion.span
      custom={delay}
      variants={isMobile ? wordVariantsMobile : wordVariants}
      className={clsx(
        "inline-block transition-colors duration-300",
        word.type === "white" && "text-white",
        word.type === "gradient-blue" && "text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-[#6EE7FF]",
        word.type === "gradient-cyan" && "text-transparent bg-clip-text bg-gradient-to-r from-[#6EE7FF] to-[#3B82F6]"
      )}
      style={{ willChange: "transform, opacity" }}
    >
      {word.text}
    </motion.span>
  );
}
