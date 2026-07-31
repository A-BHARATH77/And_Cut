import { SVGProps } from "react";
import clsx from "clsx";

export function AndcutLogo({ textColor = "white", ...props }: SVGProps<SVGSVGElement> & { textColor?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 72"
      fill="none"
      aria-labelledby="andcut-logo-title"
      {...props}
      className={clsx("andcut-logo", props.className)}
    >
      <title id="andcut-logo-title">ANDCUT Studios</title>


      {/* ANDCUT wordmark */}
      <text
        x="58"
        y="50"
        fontFamily="'Arial Black', 'Arial Bold', sans-serif"
        fontWeight="900"
        fontSize="46"
        letterSpacing="-2"
        fill={textColor}
      >
        ANDCUT
      </text>

      {/* Studios subtitle */}
      <text
        x="60"
        y="68"
        fontFamily="'Arial', sans-serif"
        fontWeight="400"
        fontSize="13"
        letterSpacing="6"
        fill={textColor === "white" ? "#6EE7FF" : "#0099BB"}
      >
        STUDIOS
      </text>
    </svg>
  );
}
