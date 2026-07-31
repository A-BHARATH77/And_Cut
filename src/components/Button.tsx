import { LinkField } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";

type Props = {
  buttonLink: LinkField;
  buttonText: string | null;
  className?: string;
};

export default function Button({ buttonLink, buttonText, className }: Props) {
  return (
    <PrismicNextLink
      className={clsx(
        "rounded-xl bg-[#6EE7FF] px-5 py-4 text-center text-xl font-bold uppercase tracking-wide text-[#050508] shadow-[0_0_24px_rgba(110,231,255,0.4)] transition-all duration-150 hover:bg-white hover:shadow-[0_0_32px_rgba(110,231,255,0.7)] md:text-2xl",
        className,
      )}
      field={buttonLink}
    >
      {buttonText}
    </PrismicNextLink>
  );
}

