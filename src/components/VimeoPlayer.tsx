"use client";

/**
 * VimeoPlayer — direct Vimeo iframe embed (no react-player SDK overhead).
 * Using a raw <iframe> with autoplay=1 in the URL means Vimeo starts
 * playing immediately on load — no JS postMessage round-trip delay.
 *
 * Props:
 *  vimeoId   — numeric Vimeo video ID (e.g. "1216196958")
 *  playing   — when true, adds autoplay=1 to the iframe URL
 *  controls  — show native player controls
 *  className — applied to the outer wrapper div
 *  muted     — mute the video (required for autoplay in most browsers)
 *  loop      — loop the video
 *  background — enable background/ambient mode (hides all controls)
 */

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
  const params = new URLSearchParams({
    autoplay: playing ? "1" : "0",
    muted: muted ? "1" : "0",
    loop: loop ? "1" : "0",
    controls: background ? "0" : controls ? "1" : "0",
    background: background ? "1" : "0",
    autopause: "0",
    title: "0",
    byline: "0",
    portrait: "0",
    dnt: "1",
    transparent: "1",
    playsinline: "1",
    // Start at t=0 so there's no seek delay
    t: "0",
  });

  const src = `https://player.vimeo.com/video/${vimeoId}?${params.toString()}`;

  return (
    <div className={`relative w-full h-full ${className}`}>
      <iframe
        src={src}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          border: "none",
        }}
        title={`Vimeo video ${vimeoId}`}
      />
    </div>
  );
}
