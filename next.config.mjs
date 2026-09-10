/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable gzip/brotli compression
  compress: true,

  // Optimize images
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // Add proper HTTP headers for video streaming and caching
  async headers() {
    return [
      // ── Global security + iframe permissions ─────────────────────────────
      // frame-src: allows Vimeo and Bunny CDN iframes embedded in the site.
      // Without this, Vercel's default headers may block cross-origin iframes.
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://player.vimeo.com https://f.vimeocdn.com https://*.mediadelivery.net https://*.bunnycdn.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https: http: https://*.bunnyinfra.net",
              "media-src 'self' blob: https:",
              // frame-src: the critical one — allows Vimeo + Bunny CDN iframes
              "frame-src 'self' https://player.vimeo.com https://vimeo.com https://*.mediadelivery.net",
              "connect-src 'self' https://player.vimeo.com https://fresnel.vimeocdn.com https://vod-progressive.akamaized.net https://*.mediadelivery.net https://*.bunnycdn.com https://*.bunnyinfra.net wss:",
              "worker-src 'self' blob:",
            ].join("; "),
          },
          {
            key: "Permissions-Policy",
            value: "autoplay=*, fullscreen=*",
          },
        ],
      },
      // ── Hero / showreel videos ───────────────────────────────────────────
      {
        source: "/ANDCUT_VDS/:file*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
          { key: "Accept-Ranges", value: "bytes" },
        ],
      },
      {
        source: "/ANDCUT_GIFs/:file*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
          { key: "Accept-Ranges", value: "bytes" },
        ],
      },
      // ── Service section videos ───────────────────────────────────────────
      {
        source: "/UGC/:file*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
          { key: "Accept-Ranges", value: "bytes" },
        ],
      },
      {
        source: "/DVC/:file*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
          { key: "Accept-Ranges", value: "bytes" },
        ],
      },
      {
        source: "/micro_drama/:file*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
          { key: "Accept-Ranges", value: "bytes" },
        ],
      },
      {
        source: "/ad_films/:file*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
          { key: "Accept-Ranges", value: "bytes" },
        ],
      },
      {
        source: "/Photoshoot/:file*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
          { key: "Accept-Ranges", value: "bytes" },
        ],
      },
      // ── Static assets ────────────────────────────────────────────────────
      {
        source: "/fonts/:file*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/hdr/:file*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/companies_worked_with/:file*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;

