/**
 * VimeoIframeRegistry
 *
 * Manages Vimeo iframe DOM nodes pre-warmed by ServicesPreloader.
 * ServicesPreloader registers TWO iframes per vimeoId (primary + duplicate)
 * so that the infinite-loop marquee — which renders each video twice — can
 * claim a live iframe for EVERY card slot with no re-init.
 *
 * Performance Optimization:
 * To prevent browser CPU/GPU stuttering and network congestion from 50 simultaneous
 * video decoders, only the IFRAMES BELONGING TO THE ACTIVE TAB ARE PLAYED.
 * Inactive tabs' iframes are paused via Vimeo postMessage.
 *
 * Switching tabs sends instant postMessage `play`/`pause` commands with 0ms DOM overhead.
 */

class VimeoIframeRegistry {
  private iframes = new Map<string, HTMLIFrameElement>();
  private iframeTabs = new Map<string, string>();
  private bankContainer: HTMLElement | null = null;
  private currentHolder = new Map<string, HTMLElement>();
  private activeTab = "UGC";

  private readyResolve: (() => void) | null = null;
  readonly ready = new Promise<void>((resolve) => {
    this.readyResolve = resolve;
  });

  signalReady() {
    this.readyResolve?.();
    this.setActiveTab(this.activeTab);
  }

  setBank(el: HTMLElement) {
    this.bankContainer = el;
  }

  register(key: string, iframe: HTMLIFrameElement, tabKey: string) {
    this.iframes.set(key, iframe);
    this.iframeTabs.set(key, tabKey);
  }

  claim(key: string, slotEl: HTMLElement): boolean {
    const iframe = this.iframes.get(key);
    if (!iframe) return false;

    const holder = this.currentHolder.get(key);
    if (holder === slotEl) return true;  // already ours — no-op
    if (holder)            return false; // claimed by another slot

    iframe.style.cssText =
      "position:absolute;top:0;left:0;width:100%;height:100%;border:none;";
    slotEl.appendChild(iframe);
    this.currentHolder.set(key, slotEl);
    return true;
  }

  release(key: string, slotEl: HTMLElement) {
    if (this.currentHolder.get(key) !== slotEl) return;

    const iframe = this.iframes.get(key);
    if (!iframe || !this.bankContainer) return;

    iframe.style.cssText = "width:1px;height:1px;border:none;display:block;";
    this.bankContainer.appendChild(iframe);
    this.currentHolder.delete(key);
  }

  setActiveTab(tabKey: string) {
    this.activeTab = tabKey;
    this.iframes.forEach((iframe, key) => {
      const tab = this.iframeTabs.get(key);
      const shouldPlay = tab === tabKey;
      try {
        iframe.contentWindow?.postMessage(
          JSON.stringify({ method: shouldPlay ? "play" : "pause" }),
          "https://player.vimeo.com"
        );
      } catch {
        // ignore iframe postMessage errors
      }
    });
  }
}

export const vimeoIframeRegistry = new VimeoIframeRegistry();
