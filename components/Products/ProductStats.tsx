"use client";

import {
  Package,
  AlertTriangle,
} from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";


type Props = {
  stock: number;
};


export default function ProductStats({
  stock,
}: Props) {


  const { language } = useLanguage();


  const inStock = stock > 0;

  const lowStock = stock > 0 && stock <= 5;



  const text = {


    unavailable:
      language === "ar"
        ? "غير متوفر"
        : language === "zh"
        ? "不可用"
        : "Unavailable",



    available:
      language === "ar"
        ? "متوفر"
        : language === "zh"
        ? "可用"
        : "Available",


  };





  return (

    <div className="relative z-10 mt-6">


      <div
        className={`
        flex
        items-center
        justify-center
        gap-3
        rounded-2xl
        border
        px-5
        py-3
        text-sm
        font-semibold
        backdrop-blur-xl

        ${
          !inStock

          ? "border-red-400/20 bg-red-500/10 text-red-400"

          : lowStock

          ? "border-orange-400/20 bg-orange-500/10 text-orange-400"

          :

          "border-lime-400/20 bg-lime-400/10 text-lime-400"
        }
        `}
      >


        {!inStock || lowStock ? (

          <AlertTriangle size={17}/>

        ) : (

          <Package size={17}/>

        )}



        <span>


          {!inStock

          ?

          text.unavailable

          :

          lowStock

          ?

          language === "ar"

            ? `متبقي ${stock} فقط`

            : language === "zh"

            ? `只剩 ${stock}`

            : `Only ${stock} Left`


          :

          `${stock} ${text.available}`


          }


        </span>


      </div>


    </div>

  );

}