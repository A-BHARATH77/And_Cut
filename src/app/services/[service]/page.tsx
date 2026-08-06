import { Suspense } from "react";
import { FORMATS_DATA, FORMAT_TABS } from "@/data/services";
import ServiceGalleryClient from "./ServiceGalleryClient";

// ─── Normalise a tab name to a URL-safe slug ──────────────────────────────────
// Uses encodeURIComponent so spaces → %20 and & → %26, which is what
// Next.js provides back as params.service after decoding.
function toSlug(tab: string) {
  return tab.toLowerCase();
}

// ─── Static params: tell Next.js every valid [service] slug at build time ─────
export async function generateStaticParams() {
  return FORMAT_TABS.map((tab) => ({
    // encodeURIComponent keeps Next.js happy with special chars in the path
    service: encodeURIComponent(toSlug(tab)),
  }));
}

// ─── Resolve the incoming slug back to a FORMAT_TABS entry ───────────────────
function resolveFormatName(rawSlug: string): string | null {
  // Next.js hands us the decoded path segment; normalise both sides.
  const slug = decodeURIComponent(rawSlug).toLowerCase().trim();
  return FORMAT_TABS.find((tab) => tab.toLowerCase().trim() === slug) ?? null;
}

// ─── SEO metadata ─────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: { service: string };
}) {
  const formatName = resolveFormatName(params.service) ?? "Service";
  return {
    title: `${formatName} | ANDCUT Studios`,
    description: `Explore our ${formatName} portfolio — premium visual storytelling by ANDCUT Studios.`,
  };
}

// ─── Page (Server Component) ──────────────────────────────────────────────────
export default function ServicePage({
  params,
}: {
  params: { service: string };
}) {
  const formatName = resolveFormatName(params.service);

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#050508] text-white flex flex-col items-center justify-center gap-6">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400 uppercase animate-pulse">
            {formatName ?? "Loading…"}
          </h2>
        </div>
      }
    >
      {/* Pass resolved formatName and videos straight from the server */}
      <ServiceGalleryClient
        formatName={formatName}
        activeVideos={formatName ? (FORMATS_DATA[formatName] ?? []) : []}
      />
    </Suspense>
  );
}
