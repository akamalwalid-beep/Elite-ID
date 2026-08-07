"use client";

import { useCart } from "@/context/CartContext";

import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import EmptyCart from "@/components/cart/EmptyCart";

import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/translations";


export default function CartPage() {


  const { cart } = useCart();


  const { language } = useLanguage();


  const t = translations[language];




  return (


    <main

      dir={language === "ar" ? "rtl" : "ltr"}

      className="
      relative
      min-h-screen
      overflow-hidden
      bg-[#090909]
      py-20
      text-white
      "


    >





      <div className="pointer-events-none absolute inset-0 overflow-hidden">


        <div

          className="
          absolute
          -left-52
          top-0
          h-[700px]
          w-[700px]
          rounded-full
          bg-lime-400/20
          blur-[150px]
          animate-[pulse_8s_ease-in-out_infinite]
          "

        />



        <div

          className="
          absolute
          right-[-200px]
          top-[20%]
          h-[750px]
          w-[750px]
          rounded-full
          bg-green-400/20
          blur-[170px]
          animate-[pulse_10s_ease-in-out_infinite]
          "

        />



      </div>







      <div className="relative z-10 mx-auto max-w-7xl px-6">



        {cart.length === 0 ? (

          <EmptyCart />

        ) : (


          <>

            <h1 className="mb-12 text-5xl font-bold">

              {t.cart}

            </h1>





            <div className="grid gap-10 lg:grid-cols-3">



              <div className="space-y-6 lg:col-span-2">



                {cart.map((item) => (


                  <CartItem

                    key={item.id}

                    id={item.id}

                    title={item.title}

                    image={item.image}

                    country={item.country}

                    price={item.price}

                    currency={item.currency}

                    quantity={item.quantity}


                  />


                ))}



              </div>





              <CartSummary />



            </div>



          </>


        )}



      </div>




    </main>


  );

}