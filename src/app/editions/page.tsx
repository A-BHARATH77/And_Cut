/* eslint-disable @next/next/no-img-element */
import React from "react";

export default function EditionsPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#f4f4f5] font-sans selection:bg-[#6EE7FF] selection:text-black">
      {/* Nav */}
      <header className="fixed top-0 w-full flex items-center justify-between px-10 py-6 z-50 mix-blend-difference">
        <div className="flex items-center gap-4">
          <div className="w-6 h-6 bg-white rounded-sm" />
          <span className="font-bold tracking-tight text-xl">ANDCUT Studios</span>
          <span className="opacity-50 text-sm ml-2">Winter &apos;26</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#sidekick" className="hover:opacity-70 transition-opacity">Sidekick</a>
          <a href="#agentic" className="hover:opacity-70 transition-opacity">Agentic</a>
          <a href="#online" className="hover:opacity-70 transition-opacity">Online</a>
          <a href="#retail" className="hover:opacity-70 transition-opacity">Retail</a>
        </nav>
        <button className="px-5 py-2.5 bg-white text-black font-semibold rounded-full text-sm hover:scale-105 transition-transform">
          Start for free
        </button>
      </header>

      {/* Hero Section */}
      <main className="relative pt-[20vh] px-10 md:px-20 max-w-screen-2xl mx-auto">
        {/* Background Decorative Lines */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="550 208 340 464"
            className="w-full h-full animate-pulse"
          >
            <circle cx="550" cy="886" r="550" stroke="currentColor" strokeWidth="1" className="opacity-20" />
            <circle cx="1440" cy="543" r="550" stroke="currentColor" strokeWidth="1" className="opacity-20" />
            <path d="M-1840 440h5120" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="opacity-30" />
            <path d="M720 -1000v2880" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="opacity-30" />
            <path d="M-1636,-1000L3076,1880" stroke="currentColor" strokeWidth="1" className="opacity-20" />
            <path d="M3076,-1000L-1636,1880" stroke="currentColor" strokeWidth="1" className="opacity-20" />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col">
          <h1 className="text-[12vw] leading-[0.85] font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
            The<br />
            Renaissance<br />
            Edition
          </h1>
          
          <div className="mt-20 md:w-1/2 ml-auto">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-8">
              The commerce renaissance is here.
            </h2>
            <p className="text-xl md:text-2xl text-white/60 leading-relaxed mb-12">
              Explore 150+ product updates across AI, retail, and more. Built to help you defy the ordinary and redefine your brand.
            </p>
            <button className="flex items-center gap-4 text-lg font-medium group">
              <span className="group-hover:underline underline-offset-4">Explore updates</span>
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                ↓
              </div>
            </button>
          </div>
        </div>

        {/* Video / Bento Grid Section */}
        <div className="mt-40 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 pb-40">
          <div className="md:col-span-8 aspect-video bg-[#1A1A24] rounded-2xl overflow-hidden relative group cursor-pointer border border-white/10">
             <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-20 h-20 bg-white text-black rounded-full flex items-center justify-center scale-90 group-hover:scale-100 transition-transform">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                </div>
             </div>
             <img src="https://cdn.shopify.com/s/files/1/0951/3130/4218/files/preview_images/620a0d8735da4d97b040b1cd98693898.thumbnail.0000000000.webp" alt="Video preview" loading="lazy" className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
          </div>
          <div className="md:col-span-4 flex flex-col gap-6">
            <div className="flex-1 bg-[#1A1A24] rounded-2xl p-8 border border-white/10 flex flex-col justify-between hover:bg-[#20202A] transition-colors">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Smart suggestions</h3>
                <p className="text-white/60">Pulse delivers personalized recommendations and next steps for your business.</p>
              </div>
              <button className="self-start mt-6 text-sm flex items-center gap-2 text-[#6EE7FF]">
                Read help doc ↗
              </button>
            </div>
            <div className="flex-1 bg-[#1A1A24] rounded-2xl p-8 border border-white/10 flex flex-col justify-between hover:bg-[#20202A] transition-colors">
               <div>
                <h3 className="text-2xl font-semibold mb-4">Custom app generation</h3>
                <p className="text-white/60">Get Sidekick to build custom apps designed specifically for your business needs.</p>
              </div>
              <button className="self-start mt-6 text-sm flex items-center gap-2 text-[#6EE7FF]">
                Read help doc ↗
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
