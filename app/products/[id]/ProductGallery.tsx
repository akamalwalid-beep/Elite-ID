"use client";

import Image from "next/image";

type Props = {
  product: {
    image: string;
    title: string;
  };
};

export default function ProductGallery({
  product,
}: Props) {
  return (
    <div className="sticky top-24">

      <div
        className="
          group
          relative
          overflow-hidden
          rounded-[32px]
          border
          border-zinc-800
          bg-gradient-to-br
          from-[#171717]
          to-[#0b0b0b]
          p-10
        "
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(132,255,0,.08),transparent_70%)]" />

        <Image
          src={product.image}
          alt={product.title}
          width={900}
          height={900}
          priority
          className="
            mx-auto
            transition-all
            duration-500
            group-hover:scale-110
            group-hover:-translate-y-3
          "
        />

      </div>

    </div>
  );
}