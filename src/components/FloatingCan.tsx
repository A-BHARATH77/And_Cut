"use client";

import { forwardRef, ReactNode } from "react";
import { Float } from "@react-three/drei";
import { Group } from "three";

type FloatingObjectProps = {
  floatSpeed?: number;
  rotationIntensity?: number;
  floatIntensity?: number;
  floatingRange?: [number, number];
  children?: ReactNode;
};

/**
 * Generic floating wrapper — applies the drei <Float> animation to any 3D child.
 * Drop any mesh/model as children and it will float automatically.
 */
const FloatingObject = forwardRef<Group, FloatingObjectProps>(
  (
    {
      floatSpeed = 1.5,
      rotationIntensity = 1,
      floatIntensity = 1,
      floatingRange = [-0.1, 0.1],
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <group ref={ref} {...props}>
        <Float
          speed={floatSpeed}
          rotationIntensity={rotationIntensity}
          floatIntensity={floatIntensity}
          floatingRange={floatingRange}
        >
          {children}
        </Float>
      </group>
    );
  },
);

FloatingObject.displayName = "FloatingObject";

export default FloatingObject;
