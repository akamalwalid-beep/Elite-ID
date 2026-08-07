"use client";

import Link from "next/link";
import { useMemo } from "react";

import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/translations";



export default function CartSummary() {


  const { cart } = useCart();


  const { language } = useLanguage();


  const t = translations[language];






  const total = useMemo(() => {


    return cart.reduce(

      (sum, item) =>
        sum + item.price * item.quantity,

      0

    );


  }, [cart]);






  const text = {


    summary:

      language === "ar"

        ? "ملخص الطلب"

        : language === "zh"

        ? "订单摘要"

        : "Order Summary",




    items:

      language === "ar"

        ? "المنتجات"

        : language === "zh"

        ? "商品"

        : "Items",




    subtotal:

      language === "ar"

        ? "المجموع الفرعي"

        : language === "zh"

        ? "小计"

        : "Subtotal",




    fees:

      language === "ar"

        ? "الرسوم"

        : language === "zh"

        ? "费用"

        : "Fees",




    continue:

      language === "ar"

        ? "متابعة الدفع"

        : language === "zh"

        ? "继续结账"

        : "Continue to Checkout",


  };







  const currency =
    cart[0]?.currency ?? "USDT";







  return (


    <div

      dir={language === "ar" ? "rtl" : "ltr"}

      className="
      sticky
      top-24
      rounded-2xl
      border
      border-zinc-800
      bg-[#111111]
      p-8
      "

    >





      <h2 className="text-3xl font-bold">


        {text.summary}


      </h2>








      <div className="mt-8 space-y-5">





        <div className="flex justify-between">


          <span>

            {text.items}

          </span>



          <span>

            {cart.length}

          </span>



        </div>







        <div className="flex justify-between">


          <span>

            {text.subtotal}

          </span>



          <span>

            {total.toFixed(2)} {currency}

          </span>



        </div>







        <div className="flex justify-between">


          <span>

            {text.fees}

          </span>



          <span>

            0.00 {currency}

          </span>



        </div>









        <div
          className="
          flex
          justify-between
          border-t
          border-zinc-700
          pt-5
          text-2xl
          font-bold
          "
        >



          <span>

            {t.total}

          </span>





          <span className="text-lime-400">


            {total.toFixed(2)} {currency}


          </span>





        </div>





      </div>









      <Link

        href="/checkout"

        className={`

        mt-8

        block

        w-full

        rounded-xl

        py-4

        text-center

        text-lg

        font-bold

        transition


        ${
          cart.length === 0

          ? "pointer-events-none bg-zinc-700 text-zinc-400"

          : "bg-lime-400 text-black hover:scale-105"

        }

        `}

      >


        {text.continue}



      </Link>






    </div>


  );

}