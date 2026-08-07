"use client";

import { CheckCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";


type Props = {
  features?: string[];
};



export default function ProductFeatures({
  features = [],
}: Props) {


  const { language } = useLanguage();



  const defaultFeatures = [

    language === "ar"
      ? "تسليم فوري"
      : language === "zh"
      ? "即时交付"
      : "Instant Delivery",



    language === "ar"
      ? "تسجيل دخول آمن"
      : language === "zh"
      ? "安全登录"
      : "Secure Login",



    language === "ar"
      ? "ضمان كامل"
      : language === "zh"
      ? "完整保修"
      : "Full Warranty",



    language === "ar"
      ? "دعم مدى الحياة"
      : language === "zh"
      ? "终身支持"
      : "Lifetime Support",



    language === "ar"
      ? "جاهز للاستخدام"
      : language === "zh"
      ? "可立即使用"
      : "Ready To Use",

  ];



  const finalFeatures =
    features.length > 0
      ? features
      : defaultFeatures;



  const title =
    language === "ar"
      ? "المميزات"
      : language === "zh"
      ? "功能"
      : "Features";




  return (

    <div

      dir={language === "ar" ? "rtl" : "ltr"}

      className="
      mt-12
      rounded-3xl
      border
      border-zinc-800
      bg-[#111111]
      p-8
      "

    >


      <h2 className="text-3xl font-bold">

        {title}

      </h2>





      <div className="mt-8 space-y-4">


        {finalFeatures.map((item) => (


          <div

            key={item}

            className="
            flex
            items-center
            gap-3
            rounded-2xl
            border
            border-white/10
            bg-white/[0.03]
            p-4
            text-zinc-300
            "

          >


            <CheckCircle

              size={20}

              className="text-lime-400"

            />


            <span>

              {item}

            </span>


          </div>


        ))}



      </div>




    </div>

  );

}