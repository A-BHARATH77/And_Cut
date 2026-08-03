import { useEffect, useRef } from "react";

/**
 * A hook that returns a ref for a video element.
 * The video will only start playing when it enters the viewport
 * and will pause when it leaves, saving CPU/GPU/bandwidth.
 */
export function useLazyVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    // Don't autoplay eagerly — let the observer decide
    video.pause();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [ref.current?.src]);

  return ref;
}
