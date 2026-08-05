import { useEffect, useRef } from "react";

/**
 * A hook that returns a ref for a <video> element.
 *
 * Behaviour:
 * - The video starts paused and does NOT preload anything until it enters the
 *   viewport. This saves significant bandwidth on page load.
 * - Once at least 10 % of the element is visible, the video loads and plays.
 * - When it leaves the viewport it pauses again (saves CPU/GPU/battery).
 *
 * Usage:
 *   const videoRef = useLazyVideo();
 *   <video ref={videoRef} src="..." loop muted playsInline preload="none" />
 */
export function useLazyVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    let isInView = false;

    const tryPlay = () => {
      if (!isInView) return;
      video.play().catch(() => {
        // Autoplay may be blocked in some browsers; ignore silently.
      });
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        isInView = entry.isIntersecting;
        if (entry.isIntersecting) {
          if (video.readyState === 0) {
            // preload="none": need to trigger network fetch first
            video.addEventListener("canplay", tryPlay, { once: true });
            video.load();
          } else {
            tryPlay();
          }
        } else {
          video.pause();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
      root: null, // use the document viewport
    });

    observer.observe(video);
    return () => {
      observer.disconnect();
      isInView = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount — the ref is stable

  return ref;
}
