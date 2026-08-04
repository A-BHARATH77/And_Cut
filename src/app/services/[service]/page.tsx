import { Suspense } from "react";
import { FORMATS_DATA, FORMAT_TABS } from "@/data/services";
import ServiceGalleryClient from "./ServiceGalleryClient";
// Triggering editor refresh for TypeScript server
// ─── Static params: tell Next.js every valid [service] slug at build time ─────
export async function generateStaticParams() {
  return FORMAT_TABS.map((tab) => ({
    service: encodeURIComponent(tab.toLowerCase()),
  }));
}

// ─── SEO metadata ─────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: { service: string };
}) {
  const serviceSlug = decodeURIComponent(params.service);
  const formatName =
    FORMAT_TABS.find((tab) => tab.toLowerCase() === serviceSlug.toLowerCase()) ??
    "Service";

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
  const serviceSlug = decodeURIComponent(params.service);
  const formatName =
    FORMAT_TABS.find((tab) => tab.toLowerCase() === serviceSlug.toLowerCase()) ??
    null;

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
