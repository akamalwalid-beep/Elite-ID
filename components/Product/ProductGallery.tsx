"use client";

import Image from "next/image";
import { Eye, Crown, Flame } from "lucide-react";

import { countryThemes } from "@/lib/countryThemes";



type Product = {
  image: string;
  title: string;
  country: string;

  views: number;

  featured: boolean;
  bestSeller: boolean;
  rare: boolean;
};



export default function ProductGallery({
  product,
}: {
  product: Product;
}) {



  const theme =
    countryThemes[product.country] ??
    countryThemes.default;




  const finalImage =
    product.image &&
    product.image.startsWith("http")

      ? product.image

      : "/images/products/apple.png";






  return (

    <div
      className="
      relative
      overflow-hidden
      rounded-3xl
      border
      border-zinc-800
      bg-gradient-to-br
      from-[#1b1b1b]
      to-[#101010]
      p-10
      "
    >






      {/* Background Glow */}

      <div
        className={`
        absolute
        inset-0
        bg-gradient-to-br
        ${theme.gradient}
        opacity-40
        `}
      />




      <div
        className={`
        absolute
        -right-32
        -top-32
        h-80
        w-80
        rounded-full
        ${theme.glow}
        blur-[120px]
        `}
      />









      {/* Views */}

      <div
        className="
        absolute
        left-6
        top-6
        z-20
        flex
        items-center
        gap-2
        rounded-full
        border
        border-white/10
        bg-black/40
        px-4
        py-2
        text-xs
        font-bold
        text-zinc-300
        "
      >

        <Eye
          size={14}
          className="text-lime-400"
        />


        {product.views} Views


      </div>









      {/* Badges */}

      <div
        className="
        absolute
        right-6
        top-6
        z-20
        flex
        flex-col
        items-end
        gap-2
        "
      >




        {product.rare && (

          <div
            className="
            flex
            items-center
            gap-1
            rounded-full
            border
            border-yellow-400/40
            bg-yellow-400/10
            px-3
            py-1
            text-xs
            font-bold
            text-yellow-400
            "
          >

            <Crown size={13}/>

            Rare

          </div>

        )}






        {product.bestSeller && (

          <div
            className="
            rounded-full
            border
            border-yellow-400/30
            bg-yellow-400/10
            px-3
            py-1
            text-xs
            font-bold
            text-yellow-400
            "
          >

            ⭐ Best Seller

          </div>

        )}







        {product.featured && (

          <div
            className="
            flex
            items-center
            gap-1
            rounded-full
            border
            border-lime-400/30
            bg-lime-400/10
            px-3
            py-1
            text-xs
            font-bold
            text-lime-400
            "
          >

            <Flame size={13}/>

            Featured

          </div>

        )}



      </div>









      <div
        className="
        relative
        z-10
        flex
        h-[600px]
        items-center
        justify-center
        "
      >


        <Image

          src={finalImage}

          alt={product.title}

          width={420}

          height={420}

          priority

          className="
          object-contain
          drop-shadow-[0_0_60px_rgba(132,255,0,.35)]
          "
        />


      </div>






    </div>

  );

}