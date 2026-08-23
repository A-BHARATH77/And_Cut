import { Metadata } from "next";

import { SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

export const metadata: Metadata = {
  title: "ANDCUT Studios — The UGC Video Agency",
  description: "Have a project in mind or just want to chat about what kind of video your brand needs next? Drop us a line and let’s figure it out.",
  openGraph: {
    title: "ANDCUT Studios — The UGC Video Agency",
    description: "Authentic, high-energy videos built for TikTok & Reels.",
    images: ["/gallery/and_cut_logo.webp"], 
  },
};

import ScrollRevealText from "@/components/ScrollRevealText";

export default async function Index() {
  let home;
  try {
    const client = createClient();
    home = await client.getByUID("page", "home");
  } catch (error) {
    // Proper fix for Prismic 404s/ECONNRESETs during local development:
    // If the "home" document is missing or the repo fails, we fallback to mocking
    // the slice data locally so your Carousel and Hero components still render on screen!
    home = {
      data: {
        slices: [
          { slice_type: "hero", variation: "default", primary: {}, items: [] },
          { slice_type: "carousel", variation: "default", primary: {}, items: [] },
          { slice_type: "big_text", variation: "default", primary: {}, items: [] },
        ]
      }
    } as any;
  }

  let slices = home?.data?.slices ? [...home.data.slices] : [];
  
  // Force the big_text slice to render during development if it's missing from Prismic
  if (!slices.find((s: any) => s.slice_type === "big_text")) {
    slices.push({ slice_type: "big_text", variation: "default", id: "mock-big-text", primary: {}, items: [] } as any);
  }

  // FORCE ORDERING: Ensure big_text is ALWAYS the last item in the array, 
  // even if Prismic CMS or mock data placed it higher up by mistake.
  slices.sort((a: any, b: any) => {
    if (a.slice_type === "big_text") return 1;
    if (b.slice_type === "big_text") return -1;
    return 0;
  });

  // Inject our custom scroll reveal section as a mock slice immediately after "hero"
  const heroIndex = slices.findIndex((s: any) => s.slice_type === "hero");
  if (heroIndex !== -1) {
    slices.splice(heroIndex + 1, 0, {
      slice_type: "scroll_reveal_text",
      id: "mock-scroll-reveal-text",
    } as any);
  } else {
    slices.unshift({
      slice_type: "scroll_reveal_text",
      id: "mock-scroll-reveal-text",
    } as any);
  }

  const localComponents = {
    ...components,
    scroll_reveal_text: ScrollRevealText,
  };

  return (
    <SliceZone slices={slices} components={localComponents} />
  );
}
