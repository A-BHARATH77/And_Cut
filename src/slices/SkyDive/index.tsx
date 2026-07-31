"use client";

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { View, Html } from "@react-three/drei";

const Scene = dynamic(() => import("./Scene"), { 
  ssr: false,
  loading: () => (
    <Html center>
      <div className="absolute inset-0 flex items-center justify-center z-50">
        <div className="w-8 h-8 border-4 border-[#6EE7FF] border-t-transparent rounded-full animate-spin"></div>
      </div>
    </Html>
  )
});

/**
 * Props for `SkyDive`.
 */
export type SkyDiveProps = SliceComponentProps<Content.SkyDiveSlice>;

/**
 * Component for "SkyDive" Slices.
 */
const SkyDive = ({ slice }: SkyDiveProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="skydive relative h-[100svh] w-full overflow-hidden bg-[#050A18]"
    >
      <h2 className="sr-only">{slice.primary.sentence}</h2>
      
      <View className="h-[100svh] w-full">
        <Suspense fallback={null}>
          <Scene
            flavor={slice.primary.flavor} 
            sentence="UGC DVC BRANDFILM CORPORATEFILM PHOTOSHOOT"
          />
        </Suspense>
      </View>
    </section>
  );
};

export default SkyDive;
