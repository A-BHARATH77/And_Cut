"use client";

import { useInView } from "react-intersection-observer";
import clsx from "clsx";

interface SmartVimeoGridItemProps {
  videoId: string;
  className?: string;
}

export default function SmartVimeoGridItem({
  videoId,
  className = "",
}: SmartVimeoGridItemProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.05,
  });

  // Performance-optimized Vimeo embed URL with 540p quality limit for smooth playback
  const embedUrl = `https://player.vimeo.com/video/${videoId}?autoplay=1&muted=1&loop=1&background=1&quality=540p`;

  return (
    <div
      ref={ref}
      className={clsx(
        "relative w-full h-full overflow-hidden bg-[#0C0C12] transition-opacity duration-700",
        inView ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        className
      )}
    >
      {/* Rendered immediately on mount (NOT lazy-mounted) so streaming starts in background */}
      <iframe
        src={embedUrl}
        allow="autoplay; fullscreen; picture-in-picture"
        tabIndex={-1}
        title={`Vimeo ${videoId}`}
        className="absolute inset-0 w-full h-full border-none pointer-events-none"
      />
    </div>
  );
}
