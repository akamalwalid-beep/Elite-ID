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
        rounded-[40px]
        border
        border-white/10
        bg-gradient-to-br
        from-[#171717]
        to-[#090909]
        p-10
        backdrop-blur-xl
        "
      >

        {/* Moving Background Glow */}

        <div
          className="
          absolute
          left-1/2
          top-1/2
          h-[500px]
          w-[500px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-lime-400/20
          blur-[130px]
          animate-pulse
          "
        />


        {/* Second Glow */}

        <div
          className="
          absolute
          -right-20
          -top-20
          h-72
          w-72
          rounded-full
          bg-emerald-400/10
          blur-[100px]
          "
        />


        {/* Border Shine */}

        <div
          className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_center,rgba(132,255,0,.18),transparent_65%)]
          "
        />


        <div
          className="
          relative
          z-10
          flex
          items-center
          justify-center
          "
        >

          <Image
            src={product.image}
            alt={product.title}
            width={900}
            height={900}
            priority
            className="
            drop-shadow-[0_40px_80px_rgba(0,0,0,.7)]
            transition-all
            duration-700
            group-hover:scale-105
            group-hover:-translate-y-2
            animate-[float_4s_ease-in-out_infinite]
            "
          />

        </div>


      </div>


      <style jsx>{`
        @keyframes float {
          0%,100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-12px);
          }
        }
      `}</style>


    </div>
  );
}