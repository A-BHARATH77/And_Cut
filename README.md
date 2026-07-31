# ANDCUT Studios Portfolio

ANDCUT Studios is a premium, high-conversion UGC agency portfolio website. Built on top of Next.js 14+, GSAP, Three.js (React Three Fiber), and Prismic CMS, it showcases custom UGC formats and interactive pricing stages.

## ⚡ Key Modernizations & Features

### 🎬 Cinematic UGC Preloader
- Seamless, quote-based UGC preloader featuring the ultimate UGC rule: *&ldquo;Don't make ads. Make TikToks.&rdquo;*
- Integrates custom asset tracking loader with percentage indicators.
- Transition dynamics powered by high-performance GSAP animations.

### 📱 "Growth Stages" 3-Phone Pricing fan
- High-impact pricing section showing 3 simultaneous video-playing mobile device mockups.
- Features custom 3D rotation offsets, depth layouts, and colored interactive tier rings on hover.

### 🌀 Interactive 3D Work Collage Grid
- An asymmetric masonry work grid that responds beautifully to user cursor movements.
- **3D Tilt effect** on all card hover actions with real parallax depth (`translateZ` popups).
- Scroll-triggered cascading entrances and horizontal scrub-parallax strips on page scroll.

### 🚀 Media Optimization Pipeline
- All legacy, heavyweight GIF assets have been compressed to H.264 HVC1 `.mp4` video format using `ffmpeg`.
- Native browser-supported autoplay, loops, and custom silent playback parameters to guarantee 100% video playrates on mobile and desktop without viewport stutters.

---

## 🛠️ Stack & Technologies
- **Core**: Next.js 14+ (App Router), React, TypeScript
- **Animations**: GSAP, `@gsap/react`, ScrollTrigger
- **3D Renderers**: Three.js, React Three Fiber, `@react-three/drei`
- **CMS**: Prismic Slices + Slice Machine
- **Styling**: Tailwind CSS & Vanilla custom HSL accent values

---

## 💻 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Slice Simulator & Local Server**:
   ```bash
   npm run dev
   ```
   - App running at: `http://localhost:3000`
   - Slice Machine running at: `http://localhost:9999`

3. **Deploy & Production Build**:
   ```bash
   npm run build
   ```
