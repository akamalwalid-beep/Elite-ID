"use client";

import Image from "next/image";
import { Flame, Eye } from "lucide-react";

import { countryThemes } from "../../lib/countryThemes";
import { useLanguage } from "@/context/LanguageContext";


type Props = {
  title: string;
  country: string;
  featured: boolean;
  topRated: boolean;
  bestSeller: boolean;
  rare: boolean;
  views: number;
  image: string;
};



export default function ProductHeader({
  title,
  country,
  featured,
  topRated,
  bestSeller,
  rare,
  views,
  image,
}: Props) {


  const { language } = useLanguage();


  const theme =
    countryThemes[country] ?? countryThemes.default;



  const isTrending = views >= 1000;



  const text = {

    featured:
      language === "ar"
        ? "مميز"
        : language === "zh"
        ? "精选"
        : "Featured",


    trending:
      language === "ar"
        ? "الأكثر طلباً"
        : language === "zh"
        ? "热门"
        : "Trending",


    topRated:
      language === "ar"
        ? "الأعلى تقييماً"
        : language === "zh"
        ? "高评分"
        : "Top Rated",


    bestSeller:
      language === "ar"
        ? "الأكثر مبيعاً"
        : language === "zh"
        ? "畅销"
        : "Best Seller",


    rare:
      language === "ar"
        ? "نادر"
        : language === "zh"
        ? "稀有"
        : "Rare",


    views:
      language === "ar"
        ? "مشاهدة"
        : language === "zh"
        ? "浏览"
        : "Views",


    premium:
      language === "ar"
        ? "Apple ID مميز"
        : language === "zh"
        ? "高级 Apple ID"
        : "Premium Apple ID",

  };





  const finalImage =
    image && image.startsWith("/")
      ? image
      : "/images/products/apple.png";






  return (

    <>


      <div
        className={`
        absolute
        inset-0
        bg-gradient-to-br
        ${theme.gradient}
        `}
      />



      <div
        className={`
        absolute
        -right-20
        -top-20
        h-60
        w-60
        rounded-full
        ${theme.glow}
        blur-[120px]
        opacity-60
        `}
      />





      <div
        className="
        absolute
        left-5
        right-5
        top-5
        z-40
        flex
        items-start
        justify-between
        "
      >



        <div
          className="
          flex
          items-center
          gap-2
          rounded-full
          border
          border-white/10
          bg-black/40
          px-3
          py-1
          text-xs
          font-bold
          text-zinc-300
          "
        >

          <Eye
            size={13}
            className="text-lime-400"
          />

          {views.toLocaleString()} {text.views}

        </div>






        <div
          className="
          flex
          flex-col
          items-end
          gap-2
          "
        >



          {rare && (
            <div className="rounded-full border border-yellow-400/40 bg-yellow-400/10 px-3 py-1 text-xs font-bold text-yellow-400">
              👑 {text.rare}
            </div>
          )}



          {bestSeller && (
            <div className="rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3 py-1 text-xs font-bold text-yellow-400">
              ⭐ {text.bestSeller}
            </div>
          )}



          {featured && (
            <div className="flex items-center gap-1 rounded-full border border-lime-400/30 bg-lime-400/10 px-3 py-1 text-xs font-bold text-lime-400">

              <Flame size={13}/>

              {text.featured}

            </div>
          )}



          {isTrending && (
            <div className="rounded-full border border-orange-400/20 bg-orange-500/10 px-3 py-1 text-xs font-bold text-orange-400">

              🔥 {text.trending}

            </div>
          )}



          {topRated && (
            <div className="rounded-full border border-yellow-400/20 bg-yellow-500/10 px-3 py-1 text-xs font-bold text-yellow-400">

              ⭐ {text.topRated}

            </div>
          )}



        </div>


      </div>







      <div className="relative z-20 flex justify-center pt-10">


        <div className="relative h-36 w-36">


          <Image

            src={finalImage}

            alt={title}

            fill

            className="
            object-contain
            drop-shadow-[0_20px_40px_rgba(0,0,0,.5)]
            transition-all
            duration-700
            group-hover:scale-105
            "

          />


        </div>


      </div>








      <div
        className="
        relative
        z-20
        mt-4
        text-center
        "
      >


        <h2 className="text-3xl font-black">

          {title.toUpperCase()}

        </h2>




        <p
          className={`
          mt-2
          text-sm
          font-semibold
          uppercase
          tracking-[0.25em]
          ${theme.accent}
          `}
        >

          {text.premium}

        </p>


      </div>



    </>

  );

}