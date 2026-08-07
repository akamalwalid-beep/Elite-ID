"use client";

import Link from "next/link";

import { useLanguage } from "@/context/LanguageContext";


export default function EmptyCart() {


  const { language } = useLanguage();




  const text = {


    title:

      language === "ar"

        ? "السلة فارغة"

        : language === "zh"

        ? "购物车为空"

        : "Your Cart is Empty",




    desc:

      language === "ar"

        ? "يبدو أنك لم تضف أي حسابات Apple ID بعد."

        : language === "zh"

        ? "您还没有添加任何 Apple ID。"

        : "Looks like you haven't added any Apple IDs yet.",




    button:

      language === "ar"

        ? "متابعة التسوق"

        : language === "zh"

        ? "继续购物"

        : "Continue Shopping",


  };







  return (

    <div

      dir={language === "ar" ? "rtl" : "ltr"}

      className="
      flex
      min-h-[60vh]
      flex-col
      items-center
      justify-center
      text-center
      "

    >



      <h2 className="text-5xl font-bold">

        {text.title}

      </h2>





      <p className="mt-4 text-zinc-400">

        {text.desc}

      </p>







      <Link

        href="/"

        className="
        mt-10
        rounded-xl
        bg-lime-400
        px-8
        py-4
        text-lg
        font-bold
        text-black
        transition
        hover:scale-105
        "

      >

        {text.button}


      </Link>




    </div>


  );

}