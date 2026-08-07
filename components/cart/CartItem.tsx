"use client";

import Image from "next/image";

import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/translations";


type CartItemProps = {
  id: number;
  title: string;
  image: string;
  country: string;
  price: number;
  quantity: number;
  currency?: string;
};



export default function CartItem({
  id,
  title,
  image,
  country,
  price,
  quantity,
  currency = "USDT",
}: CartItemProps) {


  const {
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();



  const { language } = useLanguage();


  const t = translations[language];




  return (

    <div

      dir={language === "ar" ? "rtl" : "ltr"}

      className="
      rounded-3xl
      border
      border-white/10
      bg-white/[0.04]
      p-6
      backdrop-blur-xl
      "

    >




      <div className="flex items-center gap-6">





        <div
          className="
          relative
          h-28
          w-28
          overflow-hidden
          rounded-2xl
          bg-black/30
          "
        >

          <Image

            src={image}

            alt={title}

            fill

            className="object-contain"

          />

        </div>







        <div className="flex-1">


          <h2 className="text-2xl font-black">

            {title}

          </h2>





          <p className="mt-2 text-zinc-400">

            {country}

          </p>





          <p className="mt-3 text-3xl font-black text-lime-400">

            {price.toFixed(2)} {currency}

          </p>




        </div>









        <button

          onClick={() => removeFromCart(id)}

          className="
          rounded-xl
          bg-red-500/20
          px-4
          py-2
          font-bold
          text-red-400
          hover:bg-red-500/30
          "

        >

          {t.remove}

        </button>





      </div>









      <div className="mt-8 flex items-center gap-4">





        <button

          onClick={() => decreaseQuantity(id)}

          className="
          h-10
          w-10
          rounded-lg
          bg-zinc-800
          text-xl
          "

        >

          −

        </button>






        <span className="text-2xl font-bold">

          {quantity}

        </span>







        <button

          onClick={() => increaseQuantity(id)}

          className="
          h-10
          w-10
          rounded-lg
          bg-lime-400
          font-bold
          text-black
          "

        >

          +

        </button>





      </div>





    </div>

  );

}