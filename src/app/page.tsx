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

export default async function Index() {
  const client = createClient();
  const home = await client.getByUID("page", "home");

  return (
    <SliceZone slices={home.data.slices} components={components} />
  );
}
