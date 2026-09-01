/**
 * videoCache.ts — Partial blob cache for local video files
 *
 * Fetches only the FIRST `PARTIAL_BYTES` bytes of each video using an HTTP
 * Range request and stores the result as a blob: URL. This means:
 *
 *   • Only ~3 MB downloaded per file (instead of 10–22 MB)
 *   • Total for 12 UGC files ≈ 36 MB (feasible within preloader window)
 *   • The blob covers the first 4–8 seconds at typical UGC bitrates
 *   • <video src={blobUrl}> plays from memory — zero network buffering
 *   • When the partial video "ends", the card loops it back to 0
 *
 * Usage:
 *   prefetchVideos(paths)   — call once early to start all fetches in parallel
 *   getBlobUrl(path)        — returns cached blob: URL or null
 *   onBlobReady(path, cb)   — subscribe; callback fires with url when ready
 */

/** How many bytes to fetch per file (3 MB → covers ≥4 s at ≤6 Mbps). */
const PARTIAL_BYTES = 3 * 1024 * 1024; // 3 MB

type ReadyCallback = (blobUrl: string) => void;

const cache   = new Map<string, string>();                   // path → blob: URL
const pending = new Map<string, Promise<string | null>>();   // in-flight fetches
const subs    = new Map<string, Set<ReadyCallback>>();       // waiting listeners

/** Returns the cached blob URL for a path, or null if not ready yet. */
export function getBlobUrl(path: string): string | null {
  return cache.get(path) ?? null;
}

/**
 * Subscribe to be notified when a blob URL becomes ready.
 * Returns an unsubscribe function.
 * If already cached, the callback fires asynchronously on the next microtask.
 */
export function onBlobReady(path: string, cb: ReadyCallback): () => void {
  if (!subs.has(path)) subs.set(path, new Set());
  subs.get(path)!.add(cb);

  const existing = cache.get(path);
  if (existing) Promise.resolve().then(() => cb(existing));

  return () => subs.get(path)?.delete(cb);
}

/**
 * Start fetching partial blobs for a list of video paths in parallel.
 * Safe to call multiple times — already running/completed paths are skipped.
 */
export function prefetchVideos(paths: string[]): void {
  for (const path of paths) {
    if (cache.has(path) || pending.has(path)) continue;

    const p = fetch(path, {
      headers: { Range: `bytes=0-${PARTIAL_BYTES - 1}` },
    })
      .then((res) => {
        // Accept 200 (full file, smaller than PARTIAL_BYTES) or 206 (partial)
        if (!res.ok) throw new Error(`HTTP ${res.status} for ${path}`);
        return res.blob();
      })
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        cache.set(path, url);
        pending.delete(path);
        // Notify all waiting subscribers
        subs.get(path)?.forEach((cb) => cb(url));
        subs.delete(path);
        console.log(`[videoCache] ✓ ${path.split("/").pop()} (${(blob.size / 1024).toFixed(0)} KB)`);
        return url;
      })
      .catch((err) => {
        console.warn(`[videoCache] ✗ ${path}:`, err);
        pending.delete(path);
        return null;
      });

    pending.set(path, p);
  }
}
