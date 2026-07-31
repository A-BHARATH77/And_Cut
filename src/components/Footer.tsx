"use client";

import React, { useState } from "react";
import { AndcutLogo } from "./AndcutLogo";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

export default function Footer() {
  const [modalType, setModalType] = useState<"privacy" | "terms" | null>(null);

  return (
    <>
      <footer className="relative overflow-hidden bg-[#050508] text-white pt-20 pb-6 px-6 md:px-12">
        {/* Funky ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] max-w-5xl aspect-square bg-[#1A0630] rounded-full blur-[120px] opacity-30 pointer-events-none" />

        <div className="mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
            
            {/* Brand & Description */}
            <div className="md:col-span-5 flex flex-col items-start">
              <img src="/and_cut_logo.png" alt="ANDCUT Studios" className="h-12 md:h-20 w-auto object-contain" />
              <p className="mt-5 md:mt-8 text-white/60 text-base md:text-lg max-w-sm text-balance font-light leading-relaxed">
                Stop blending in. We deliver native, high-energy UGC content built specifically to dominate TikTok, Reels, and Shorts.
              </p>
              <a 
                href="https://tally.so/r/EkNRrX" target="_blank" rel="noopener noreferrer"
                className="mt-6 md:mt-8 inline-flex items-center justify-center rounded-full bg-white/5 border border-white/10 px-6 py-3 md:px-8 md:py-3.5 text-sm md:text-base font-semibold tracking-wide hover:bg-white hover:text-black transition-all duration-300"
              >
                Let&apos;s Make It Viral
              </a>
            </div>

            {/* Quick Links + Socials: side by side on mobile, separate cols on desktop */}
            <div className="grid grid-cols-2 gap-8 md:contents">
              {/* Quick Links */}
              <div className="md:col-span-3 md:col-start-7">
                <h3 className="font-bold uppercase tracking-widest text-[#6EE7FF] mb-4 md:mb-6 text-xs md:text-sm">Explore</h3>
                <ul className="space-y-3 md:space-y-4">
                  <li><a href="/#home" className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all font-medium text-sm md:text-lg">Home</a></li>
                  <li><a href="/#works" className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all font-medium text-sm md:text-lg">Our Work</a></li>
                  <li><a href="/#format" className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all font-medium text-sm md:text-lg">Services</a></li>
                  <li><a href="https://tally.so/r/EkNRrX" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all font-medium text-sm md:text-lg">Contact Us</a></li>
                </ul>
              </div>

              {/* Socials & Contacts */}
              <div className="md:col-span-3">
                <h3 className="font-bold uppercase tracking-widest text-[#6EE7FF] mb-4 md:mb-6 text-xs md:text-sm">Connect</h3>
                <ul className="space-y-3 md:space-y-4">
                  <li>
                    <a href="https://www.instagram.com/andcut.contentstudio/" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-white/80 hover:text-white transition-colors font-medium text-sm md:text-lg">
                      Instagram
                      <span className="opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0">↗</span>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/company/andcut-content-studio/" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-white/80 hover:text-white transition-colors font-medium text-sm md:text-lg">
                      LinkedIn
                      <span className="opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0">↗</span>
                    </a>
                  </li>
                  <li>
                    <a href="mailto:kushal.andcut@gmail.com" className="group flex items-center gap-2 text-white/80 hover:text-white transition-colors font-medium text-sm md:text-lg">
                      Email Us
                      <span className="opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0">↗</span>
                    </a>
                  </li>
                  <li>
                    <a href="tel:+918805678857" className="group flex items-center gap-2 text-white/80 hover:text-white transition-colors font-medium text-sm md:text-lg">
                      +91 88056 78857
                      <span className="opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0">↗</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

          </div>

          {/* Big Background Text */}
          <div className="mt-16 md:mt-20 -mb-4 md:-mb-10 w-full flex justify-center pointer-events-none select-none overflow-hidden">
            <span className="text-[20vw] sm:text-[18vw] font-black uppercase leading-[0.75] tracking-tighter text-white">
              ANDCUT
            </span>
          </div>

          {/* Legal Footer */}
          <div className="relative z-20 mt-8 md:mt-0 pt-6 md:pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left">
              <p className="text-sm text-white/40 font-light">
                © {new Date().getFullYear()} ANDCUT Studios. All rights reserved.
              </p>
              <span className="hidden md:inline text-white/20">|</span>
              <p className="text-sm text-white/40 font-light flex items-center gap-1.5">
                Built in partnership with
                <a 
                  href="https://wa.me/916385751370?text=Hi%20Raghav!%20I%20would%20love%20to%20get%20a%20website%20built%20for%20my%20business." 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white/60 hover:text-[#6EE7FF] transition-colors duration-300"
                >
                  Raghav
                </a>
              </p>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-white/40 font-light">
              <button onClick={() => setModalType("privacy")} className="hover:text-white transition-colors">Privacy Policy</button>
              <button onClick={() => setModalType("terms")} className="hover:text-white transition-colors">Terms of Service</button>
            </div>
          </div>
        </div>
      </footer>

      {/* Legal Modal Popup */}
      <AnimatePresence>
        {modalType && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8"
            onClick={() => setModalType(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[85vh] bg-[#0A0A0F] border border-white/10 rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-6 md:p-8 border-b border-white/10">
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  {modalType === "privacy" ? "Privacy Policy" : "Terms of Service"}
                </h2>
                <button
                  onClick={() => setModalType(null)}
                  className="text-white/50 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-6 md:p-8 overflow-y-auto text-white/70 space-y-6 flex-1 text-sm md:text-base leading-relaxed">
                {modalType === "privacy" ? (
                  <>
                    <h3 className="text-xl font-semibold text-white">1. Information We Collect</h3>
                    <p>
                      We collect information you provide directly to us, such as when you create or modify your account, request on-demand services, contact customer support, or otherwise communicate with us.
                    </p>
                    <h3 className="text-xl font-semibold text-white">2. Use of Information</h3>
                    <p>
                      We may use the information we collect about you to provide, maintain, and improve our services, including to facilitate payments, send receipts, provide products and services you request, develop new features, provide customer support, and send updates and administrative messages.
                    </p>
                    <h3 className="text-xl font-semibold text-white">3. Sharing of Information</h3>
                    <p>
                      We may share the information we collect about you as described in this Statement or as described at the time of collection or sharing, including with vendors, consultants, marketing partners, and other service providers who need access to such information to carry out work on our behalf.
                    </p>
                    <p>
                      <i>Last Updated: {new Date().toLocaleDateString()}</i>
                    </p>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-semibold text-white">1. Acceptance of Terms</h3>
                    <p>
                      By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
                    </p>
                    <h3 className="text-xl font-semibold text-white">2. Provision of Services</h3>
                    <p>
                      You agree and acknowledge that we are entitled to modify, improve or discontinue any of our services at its sole discretion and without notice to you even if it may result in you being prevented from accessing any information contained in it.
                    </p>
                    <h3 className="text-xl font-semibold text-white">3. Proprietary Rights</h3>
                    <p>
                      You acknowledge and agree that our website may contain proprietary and confidential information including trademarks, service marks and patents protected by intellectual property laws and international intellectual property treaties.
                    </p>
                    <p>
                      <i>Last Updated: {new Date().toLocaleDateString()}</i>
                    </p>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
