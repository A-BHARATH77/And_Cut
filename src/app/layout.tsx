import localFont from "next/font/local";
import type { Metadata } from "next";

import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";

import "./app.css";
import Header from "@/components/Header";
import ViewCanvas from "@/components/ViewCanvas";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import ServicesPreloader from "@/components/ServicesPreloader";
import { cn } from "@/lib/utils";



const alpino = localFont({
  src: "../../public/fonts/Alpino-Variable.woff2",
  display: "swap",
  weight: "100 900",
  variable: "--font-alpino",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://andcut.in"),
  title: "ANDCUT Studios — The UGC Video Agency",
  description:
    "Have a project in mind or just want to chat about what kind of video your brand needs next? Drop us a line and let’s figure it out.",
};

import LenisProvider from "@/components/LenisProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", alpino.variable)}>
      <head>
        {/* Critical preloader assets — fetched as early as possible */}
        <link rel="preload" href="/and_cut_logo.webp" as="image" />
        <link rel="preload" href="/preloader1.webp" as="image" />
        <link rel="preload" href="/preloader2.webp" as="image" />
        <link rel="preload" href="/preloader3.webp" as="image" />
        <link rel="preload" href="/preloader4.webp" as="image" />
        {/* Showreel video shown in the preloader centre card */}
        <link rel="preload" href="https://res.cloudinary.com/dxz4iwsv8/video/upload/f_auto,q_auto:best/v1781069499/showreel_ey580t.webp" as="image" />
      </head>
      <body className="overflow-x-hidden bg-[#0A0A0F]">
        <LenisProvider>
          <div id="app-root">
            {/* ServicesPreloader stays mounted the ENTIRE session — keeps Vimeo iframes
                warm so carousel videos load instantly instead of showing blank boxes. */}
            <ServicesPreloader />
            <Preloader />
            <Header />
            <main>
              {children}
              <ViewCanvas />
            </main>
            <Footer />
          </div>
        </LenisProvider>
      </body>
      {/* <PrismicPreview repositoryName={repositoryName} /> */}
    </html>
  );
}
