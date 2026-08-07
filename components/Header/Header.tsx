"use client";

import { useEffect, useState } from "react";

import Logo from "./Logo";
import SearchBar from "./SearchBar";
import LanguageSwitcher from "./LanguageSwitcher";
import UserActions from "./UserActions";

import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/translations";


export default function Header() {


  const [scrolled, setScrolled] = useState(false);


  const { language } = useLanguage();

  const t = translations[language];



  useEffect(() => {


    function handleScroll() {

      setScrolled(window.scrollY > 20);

    }


    window.addEventListener(
      "scroll",
      handleScroll
    );


    return () => {

      window.removeEventListener(
        "scroll",
        handleScroll
      );

    };


  }, []);






  return (

    <header

      dir={language === "ar" ? "rtl" : "ltr"}

      className={`
      fixed
      inset-x-0
      top-0
      z-50
      transition-all
      duration-500

      ${
        scrolled
          ? "border-b border-lime-400/20 bg-[#090909]/85 backdrop-blur-2xl shadow-[0_15px_50px_rgba(0,0,0,.45)]"
          : "border-b border-zinc-800/60 bg-[#090909]/70 backdrop-blur-xl"
      }
      `}

    >



      <div
        className="
        absolute
        inset-x-0
        bottom-0
        h-px
        bg-gradient-to-r
        from-transparent
        via-lime-400/40
        to-transparent
        "
      />






      <div
        className="
        mx-auto
        flex
        h-20
        max-w-[1750px]
        items-center
        justify-between
        px-8
        "
      >





        <div
          className="
          flex
          items-center
          gap-8
          "
        >


          <Logo />





          <a

            href="https://t.me/YOUR_USERNAME"

            target="_blank"

            rel="noopener noreferrer"

            className="
            hidden
            xl:flex
            items-center
            gap-3
            rounded-2xl
            border
            border-zinc-800
            bg-white/[0.04]
            px-5
            py-3
            text-sm
            font-semibold
            text-zinc-300
            backdrop-blur-xl
            transition-all
            duration-300
            hover:border-lime-400
            hover:bg-lime-400/10
            hover:text-white
            hover:shadow-[0_0_25px_rgba(132,255,0,.2)]
            "
          >

            💬 {t.liveChat}


          </a>



        </div>







        <div
          className="
          hidden
          flex-1
          justify-center
          px-10
          xl:flex
          "
        >

          <SearchBar />

        </div>








        <div
          className="
          flex
          items-center
          gap-4
          "
        >

          <LanguageSwitcher />

          <UserActions />

        </div>





      </div>



    </header>

  );

}