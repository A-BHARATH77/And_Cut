"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import clsx from "clsx";

type Props = {};

export default function Header({}: Props) {
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string) => {
    const element = document.getElementById(id);
    if (element) {
      e.preventDefault();
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex flex-col pointer-events-none bg-gradient-to-b from-black/80 via-black/40 to-transparent pb-6">
      
      {/* Main Navbar Elements */}
      <div className="w-full transition-all flex items-start justify-between px-4 md:px-8 pt-3 md:pt-5 max-w-[1800px] mx-auto">
        
        {/* Top Left: Logo */}
        <div className="z-30 w-auto md:w-[300px] flex-shrink-0 pointer-events-auto -mt-2 md:-mt-6">
          <Link href="/" className="inline-block">
            <img 
              src="/and_cut_logo.webp" 
              alt="Andcut Logo" 
              className="header-logo-img h-14 sm:h-16 md:h-32 w-auto object-contain object-left-top cursor-pointer transition-transform duration-300 hover:scale-105" 
            />
          </Link>
        </div>
        
        {/* Right Side: Floating Pill Nav */}
        <div 
          className={clsx(
            "z-20 flex-shrink-0 transition-transform duration-500 ease-in-out pointer-events-auto",
            isHidden ? "-translate-y-[250%]" : "translate-y-0"
          )}
        >
          <header className="flex items-center gap-2 md:gap-4 px-2 py-2 bg-[#2C3C97]/20 backdrop-blur-[20px] saturate-150 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.1)] rounded-full">
            
            <nav className="hidden md:flex items-center gap-1 pl-4 md:pl-6">
              {[
                { name: "Service", id: "format" },
                { name: "Work", id: "works" },
              ].map((item) => (
                <Link 
                  key={item.name} 
                  href={`/#${item.id}`} 
                  onClick={(e) => handleSmoothScroll(e, item.id)}
                  className="text-white/90 text-sm font-medium px-4 py-1.5 rounded-full hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <Link 
              href="https://tally.so/r/EkNRrX" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white text-xs md:text-sm font-bold px-5 py-2 md:px-6 md:py-2.5 rounded-full bg-[#0066FF] border border-[#0066FF] hover:bg-[#0088FF] hover:border-[#0088FF] transition-all duration-300 shadow-[0_0_20px_rgba(0,102,255,0.8)] hover:shadow-[0_0_30px_rgba(0,102,255,1)] hover:-translate-y-0.5"
            >
              Connect
            </Link>

            {/* Mobile Hamburger Button */}
            <button 
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 mr-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className={clsx("w-4 h-0.5 bg-white transition-all duration-300 rounded-full", isMobileMenuOpen ? "rotate-45 translate-y-[3px]" : "-translate-y-1")} />
              <span className={clsx("w-4 h-0.5 bg-white transition-all duration-300 rounded-full", isMobileMenuOpen ? "-rotate-45 -translate-y-[3px]" : "translate-y-1")} />
            </button>

          </header>
        </div>

      </div>

      {/* Full Screen Mobile Menu */}
      <div 
        className={clsx(
          "fixed inset-0 z-10 bg-[#0A0A0F]/95 backdrop-blur-3xl flex flex-col items-center justify-center transition-all duration-500 ease-in-out md:hidden",
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none translate-y-8"
        )}
      >
        <nav className="flex flex-col items-center gap-8">
          {[
            { name: "Service", id: "format" },
            { name: "Work", id: "works" },
          ].map((item) => (
            <Link 
              key={item.name} 
              href={`/#${item.id}`} 
              onClick={(e) => {
                setIsMobileMenuOpen(false);
                handleSmoothScroll(e, item.id);
              }}
              className="text-white text-4xl font-black uppercase tracking-widest hover:text-[#0066FF] transition-colors duration-300"
            >
              {item.name}
            </Link>
          ))}
          <Link 
            href="https://tally.so/r/EkNRrX" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-4 text-white text-lg font-bold px-8 py-4 rounded-full bg-[#0066FF] shadow-[0_0_20px_rgba(0,102,255,0.8)]"
          >
            Connect With Us
          </Link>
        </nav>
      </div>
    </div>
  );
}
