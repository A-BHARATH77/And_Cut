"use client";

import React from "react";
import Link from "next/link";

export default function FloatingCTA() {
  return (
    <Link
      href="https://tally.so/r/EkNRrX" target="_blank" rel="noopener noreferrer"
      className="fixed z-[100] bottom-6 right-6 md:top-6 md:bottom-auto md:right-8 bg-[#6EE7FF] text-[#050508] font-bold uppercase tracking-widest text-xs md:text-sm px-6 py-3 md:px-8 md:py-4 rounded-full shadow-[0_10px_30px_rgba(110,231,255,0.3)] hover:bg-white hover:shadow-[0_10px_40px_rgba(255,255,255,0.4)] hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 group backdrop-blur-sm"
    >
      Contact Us
      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </Link>
  );
}
