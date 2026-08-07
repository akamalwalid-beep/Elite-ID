"use client";

import { useEffect, useRef, useState } from "react";
import {
  Globe,
  ChevronDown,
  Check,
} from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";


export default function LanguageSwitcher() {


  const [open, setOpen] = useState(false);

  const boxRef = useRef<HTMLDivElement>(null);


  const {
    language,
    setLanguage,
  } = useLanguage();





  useEffect(() => {

    function handleClickOutside(e: MouseEvent) {

      if (
        boxRef.current &&
        !boxRef.current.contains(e.target as Node)
      ) {

        setOpen(false);

      }

    }


    document.addEventListener(
      "mousedown",
      handleClickOutside
    );


    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };


  }, []);







  const languages = [

    {
      id: "en",
      label: "🇬🇧 English",
    },


    {
      id: "ar",
      label: "🇪🇬 العربية",
    },


    {
      id: "zh",
      label: "🇨🇳 中文",
    },

  ];






  const currentLanguage =
    languages.find(
      (item) => item.id === language
    )?.label;







  return (

    <div
      ref={boxRef}
      className="relative"
    >



      <button

        onClick={() => setOpen(!open)}

        className="
        flex
        h-12
        items-center
        gap-3
        rounded-2xl
        border
        border-zinc-800
        bg-white/[0.04]
        px-5
        text-sm
        font-semibold
        text-white
        transition
        hover:border-lime-400
        hover:bg-lime-400/10
        "

      >


        <Globe
          size={18}
          className="text-lime-400"
        />


        {currentLanguage}


        <ChevronDown

          size={16}

          className={`
          transition
          duration-300
          ${open ? "rotate-180" : ""}
          `}

        />


      </button>







      {open && (

        <div

          className="
          absolute
          right-0
          mt-3
          w-56
          overflow-hidden
          rounded-2xl
          border
          border-zinc-800
          bg-[#111111]/95
          backdrop-blur-xl
          shadow-xl
          "

        >



          {languages.map((item) => (


            <button

              key={item.id}


              onClick={() => {

                setLanguage(
                  item.id as "en" | "ar" | "zh"
                );


                setOpen(false);

              }}


              className="
              flex
              w-full
              items-center
              justify-between
              px-5
              py-4
              text-sm
              transition
              hover:bg-lime-400/10
              "

            >



              <span>

                {item.label}

              </span>





              {language === item.id && (

                <Check

                  size={18}

                  className="text-lime-400"

                />

              )}



            </button>



          ))}



        </div>


      )}



    </div>


  );

}