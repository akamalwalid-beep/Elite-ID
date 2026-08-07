"use client";

import {
  Eye,
  Package,
  Crown,
  Flame,
} from "lucide-react";

import { Product } from "@/types/product";
import ProductFeatures from "./ProductFeatures";

import { useLanguage } from "@/context/LanguageContext";


type Props = {
  product: Product;
};



export default function ProductInfo({
  product,
}: Props) {


  const { language } = useLanguage();




  const text = {

    premium:
      language === "ar"
        ? "Apple ID مميز"
        : language === "zh"
        ? "高级 Apple ID"
        : "Premium Apple ID",


    views:
      language === "ar"
        ? "مشاهدة"
        : language === "zh"
        ? "浏览"
        : "Views",


    available:
      language === "ar"
        ? "متوفر"
        : language === "zh"
        ? "可用"
        : "Available",


    rare:
      language === "ar"
        ? "نادر"
        : language === "zh"
        ? "稀有"
        : "Rare",


    bestSeller:
      language === "ar"
        ? "الأكثر مبيعاً"
        : language === "zh"
        ? "畅销"
        : "Best Seller",


    featured:
      language === "ar"
        ? "مميز"
        : language === "zh"
        ? "精选"
        : "Featured",

  };







  return (


    <div

      dir={language === "ar" ? "rtl" : "ltr"}

      className="
      space-y-10
      "

    >







      <div>


        <div
          className="
          flex
          flex-wrap
          gap-3
          "
        >



          <span
            className="
            inline-flex
            rounded-full
            border
            border-lime-400/30
            bg-lime-400/10
            px-5
            py-2
            text-sm
            font-semibold
            text-lime-400
            "
          >

            {text.premium}

          </span>






          {product.rare && (

            <span
              className="
              inline-flex
              items-center
              gap-1
              rounded-full
              border
              border-yellow-400/30
              bg-yellow-400/10
              px-4
              py-2
              text-sm
              font-bold
              text-yellow-400
              "
            >

              <Crown size={15}/>

              {text.rare}

            </span>

          )}






          {product.bestSeller && (

            <span
              className="
              inline-flex
              rounded-full
              border
              border-yellow-400/30
              bg-yellow-400/10
              px-4
              py-2
              text-sm
              font-bold
              text-yellow-400
              "
            >

              ⭐ {text.bestSeller}

            </span>

          )}







          {product.featured && (

            <span
              className="
              inline-flex
              items-center
              gap-1
              rounded-full
              border
              border-lime-400/30
              bg-lime-400/10
              px-4
              py-2
              text-sm
              font-bold
              text-lime-400
              "
            >

              <Flame size={15}/>

              {text.featured}

            </span>

          )}



        </div>








        <h1
          className="
          mt-7
          text-5xl
          font-black
          tracking-tight
          "
        >

          {product.title}


        </h1>







        <p
          className="
          mt-6
          text-lg
          text-zinc-400
          "
        >

          {product.description ||
          "Premium Apple ID ready for instant delivery."}


        </p>





      </div>









      {/* Stats */}

      <div
        className="
        grid
        grid-cols-2
        gap-4
        "
      >



        <div
          className="
          rounded-2xl
          border
          border-white/10
          bg-white/[0.04]
          p-5
          "
        >

          <Eye
            size={18}
            className="text-lime-400"
          />

          <p className="mt-2 text-sm text-zinc-400">
            {product.views} {text.views}
          </p>


        </div>






        <div
          className="
          rounded-2xl
          border
          border-white/10
          bg-white/[0.04]
          p-5
          "
        >

          <Package
            size={18}
            className="text-lime-400"
          />

          <p className="mt-2 text-sm text-zinc-400">
            {product.stock} {text.available}
          </p>


        </div>



      </div>









      <div

        className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-white/[0.04]
        p-8
        "

      >


        <p className="text-sm text-zinc-500">
          Starting price
        </p>



        <div
          className="
          mt-3
          flex
          items-end
          gap-4
          "
        >

          <div
            className="
            text-6xl
            font-black
            text-lime-400
            "
          >

            ${product.price}

          </div>


          <div className="mb-2 text-zinc-400">

            {product.currency}

          </div>


        </div>



      </div>








      <ProductFeatures
        features={product.features}
      />





    </div>


  );

}