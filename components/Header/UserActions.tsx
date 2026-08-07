"use client";

import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";

import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/translations";


export default function UserActions() {


  const { cartCount } = useCart();


  const { language } = useLanguage();


  const t = translations[language];




  return (

    <div
      dir={language === "ar" ? "rtl" : "ltr"}
      className="
      flex
      items-center
      gap-3
      "
    >





      <Link

        href="/cart"

        className="
        group
        relative
        flex
        h-12
        w-12
        items-center
        justify-center
        rounded-2xl
        border
        border-zinc-800
        bg-white/[0.04]
        text-zinc-300
        backdrop-blur-xl
        transition-all
        hover:border-lime-400
        hover:bg-lime-400/10
        hover:text-lime-400
        "

      >


        <ShoppingCart
          size={20}
        />




        {cartCount > 0 && (

          <span

            className="
            absolute
            -right-1
            -top-1
            flex
            h-6
            w-6
            items-center
            justify-center
            rounded-full
            bg-lime-400
            text-xs
            font-black
            text-black
            "

          >

            {cartCount}

          </span>

        )}




      </Link>







      <Link

        href="/login"

        className="
        flex
        items-center
        gap-3
        rounded-2xl
        bg-lime-400
        px-6
        py-3
        font-bold
        text-black
        transition
        hover:scale-105
        "

      >


        <User
          size={20}
        />


        {t.login}


      </Link>





    </div>

  );

}