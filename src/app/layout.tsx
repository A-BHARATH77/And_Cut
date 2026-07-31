import localFont from "next/font/local";
import type { Metadata } from "next";

import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";

import "./app.css";
import Header from "@/components/Header";
import ViewCanvas from "@/components/ViewCanvas";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
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
    "Stop blending in. Our creators deliver native, high-energy content built specifically for TikTok, Reels, and Shorts. We are ANDCUT Studios.",
};

import LenisProvider from "@/components/LenisProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", alpino.variable)}>
      <body className="overflow-x-hidden bg-[#0A0A0F]">
        <LenisProvider>
          <div id="app-root">
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
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
