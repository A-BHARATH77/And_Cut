"use client";

/**
 * VimeoPlayer — a thin wrapper around react-player loaded client-side only.
 * Import this via next/dynamic with { ssr: false } to avoid hydration issues
 * and keep Vimeo's heavy SDK off the critical path.
 *
 * Props:
 *  vimeoId  — numeric Vimeo video ID (e.g. "1216196958")
 *  playing  — whether to autoplay
 *  controls — show native player controls
 *  className — applied to the outer wrapper div
 */

import ReactPlayer from "react-player";

interface VimeoPlayerProps {
  vimeoId: string;
  playing?: boolean;
  controls?: boolean;
  className?: string;
  muted?: boolean;
  loop?: boolean;
  background?: boolean;
}

export default function VimeoPlayer({
  vimeoId,
  playing = false,
  controls = true,
  className = "",
  muted = false,
  loop = false,
  background = false,
}: VimeoPlayerProps) {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <ReactPlayer
        src={`https://vimeo.com/${vimeoId}`}
        playing={playing}
        controls={controls}
        muted={muted}
        loop={loop}
        playsInline={true}
        width="100%"
        height="100%"
        config={{
          vimeo: {
            // @ts-ignore - aggressively disable all Vimeo UI elements
            playerOptions: {
              background: background,
              controls: false,
              title: false,
              byline: false,
              portrait: false,
              dnt: true,
              transparent: true
            },
            // Fallback for newer react-player v3 versions
            background: background,
            controls: false,
            dnt: true
          } as any,
        }}
        style={{ position: "absolute", top: 0, left: 0 }}
      />
    </div>
  );
}
