"use client";

import Link from "next/link";
import { ShoppingCart, ArrowRight } from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";


type Props = {
  id: number;
  inStock: boolean;
  onAddToCart: () => void;
};


export default function ProductActions({
  id,
  inStock,
  onAddToCart,
}: Props) {


  const { language } = useLanguage();



  const text = {

    addCart:
      language === "ar"
        ? "إضافة للسلة"
        : language === "zh"
        ? "加入购物车"
        : "Add To Cart",


    unavailable:
      language === "ar"
        ? "غير متوفر"
        : language === "zh"
        ? "不可用"
        : "Unavailable",


    view:
      language === "ar"
        ? "عرض"
        : language === "zh"
        ? "查看"
        : "View",

  };



  return (

    <div className="relative z-10 mt-8 flex gap-3">


      <button

        disabled={!inStock}

        onClick={onAddToCart}

        className="
        group
        relative
        flex-1
        overflow-hidden
        rounded-2xl
        bg-lime-400
        py-4
        font-black
        text-black
        transition-all
        duration-300
        hover:scale-[1.02]
        hover:shadow-[0_0_45px_rgba(132,255,0,.35)]
        active:scale-95
        disabled:cursor-not-allowed
        disabled:bg-zinc-800
        disabled:text-zinc-500
        "

      >


        <span
          className="
          absolute
          inset-0
          -translate-x-full
          bg-gradient-to-r
          from-transparent
          via-white/40
          to-transparent
          transition-transform
          duration-1000
          group-hover:translate-x-full
          "
        />



        <span
          className="
          relative
          flex
          items-center
          justify-center
          gap-2
          "
        >

          <ShoppingCart size={20} />


          {inStock
            ? text.addCart
            : text.unavailable}


        </span>


      </button>





      <Link

        href={`/products/${id}`}

        className="
        group
        flex
        items-center
        justify-center
        gap-2
        rounded-2xl
        border
        border-white/10
        bg-white/[0.04]
        px-6
        text-sm
        font-bold
        backdrop-blur-xl
        transition-all
        duration-300
        hover:border-lime-400/40
        hover:bg-lime-400/10
        "

      >


        {text.view}



        <ArrowRight

          size={18}

          className="
          transition-transform
          duration-300
          group-hover:translate-x-1
          "

        />


      </Link>


    </div>

  );

}