import { useEffect, useRef } from "react";

/**
 * A hook that returns a ref for a <video> element.
 *
 * Behaviour:
 * - The video starts paused and does NOT preload anything until it enters the
 *   viewport. This saves significant bandwidth on page load.
 * - Once at least 10 % of the element is visible, the video plays.
 * - When it leaves the viewport it pauses again (saves CPU/GPU/battery).
 *
 * Usage:
 *   const videoRef = useLazyVideo();
 *   <video ref={videoRef} src="..." loop muted playsInline />
 */
export function useLazyVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    // Start paused — let the IntersectionObserver decide when to play.
    video.pause();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Load and play only when in view
            if (video.paused) {
              video.load(); // ensures the browser starts buffering
              video.play().catch(() => {
                // Autoplay may be blocked in some browsers; ignore silently.
              });
            }
          } else {
            if (!video.paused) {
              video.pause();
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount — the ref is stable

  return ref;
}
