"use client";

import { useLanguage } from "@/context/LanguageContext";


export default function RelatedTitle() {

  const { language } = useLanguage();


  return (

    <div className="mb-10 flex items-center justify-between">


      <h2 className="text-4xl font-black">

        {
          language === "ar"
            ? "منتجات مشابهة"
            : language === "zh"
            ? "相关产品"
            : "Related Products"
        }

      </h2>



      <span
        className="text-lime-400"
      >

        {
          language === "ar"
            ? "عرض الكل →"
            : language === "zh"
            ? "查看全部 →"
            : "View All →"
        }

      </span>


    </div>

  );
}