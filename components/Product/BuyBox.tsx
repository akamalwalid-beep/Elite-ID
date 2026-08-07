"use client";

import { useState } from "react";

import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/translations";

import { ShieldCheck, Zap, Package } from "lucide-react";

import { Product } from "@/types/product";

import AddToCartModal from "@/components/Modal/AddToCartModal";



type BuyBoxProps = {
  product: Product;
};



export default function BuyBox({
  product,
}: BuyBoxProps) {


  const { addToCart } = useCart();

  const { language } = useLanguage();

  const t = translations[language];



  const [isModalOpen, setIsModalOpen] =
    useState(false);



  const inStock = product.stock > 0;




  const text = {

    secureCheckout:
      language === "ar"
        ? "دفع آمن"
        : language === "zh"
        ? "安全结账"
        : "Secure Checkout",


    buyNow:
      language === "ar"
        ? "شراء الآن"
        : language === "zh"
        ? "立即购买"
        : "Buy Now",


    inStock:
      language === "ar"
        ? "متوفر"
        : language === "zh"
        ? "有库存"
        : "In Stock",


    outStock:
      language === "ar"
        ? "غير متوفر"
        : language === "zh"
        ? "缺货"
        : "Out Of Stock",


    available:
      language === "ar"
        ? "قطعة متاحة"
        : language === "zh"
        ? "可用"
        : "Available",


    totalPrice:
      language === "ar"
        ? "السعر الإجمالي"
        : language === "zh"
        ? "总价格"
        : "Total Price",


    securePayment:
      language === "ar"
        ? "دفع آمن وتسليم فوري"
        : language === "zh"
        ? "安全支付和即时交付"
        : "Secure payment & instant delivery",


    instant:
      language === "ar"
        ? "فوري"
        : language === "zh"
        ? "即时"
        : "Instant",


    lifetime:
      language === "ar"
        ? "مدى الحياة"
        : language === "zh"
        ? "终身"
        : "Lifetime",


    support:
      language === "ar"
        ? "الدعم"
        : language === "zh"
        ? "支持"
        : "Support",

  };






  return (

    <>


      <div
        dir={language === "ar" ? "rtl" : "ltr"}
        className="
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-white/10
        bg-gradient-to-br
        from-white/[0.06]
        to-white/[0.02]
        p-5
        backdrop-blur-xl
        "
      >



        <div
          className="
          absolute
          -right-24
          -top-24
          h-64
          w-64
          rounded-full
          bg-lime-400/20
          blur-[90px]
          animate-pulse
          "
        />




        <div className="relative z-10">



          <div className="flex items-center justify-between">


            <div>

              <p className="text-sm text-zinc-500">
                {text.secureCheckout}
              </p>


              <h2 className="mt-1 text-2xl font-black">
                {text.buyNow}
              </h2>

            </div>





            <div
              className={`
              flex
              items-center
              gap-2
              rounded-full
              px-3
              py-1.5
              text-xs
              font-bold

              ${
                inStock
                  ? `
                    border
                    border-lime-400/30
                    bg-lime-400/10
                    text-lime-400
                  `
                  : `
                    border
                    border-red-400/30
                    bg-red-400/10
                    text-red-400
                  `
              }
              `}
            >

              <Zap size={14}/>

              {inStock
                ? text.inStock
                : text.outStock
              }

            </div>


          </div>






          <div
            className="
            mt-5
            rounded-2xl
            border
            border-white/10
            bg-black/30
            p-4
            "
          >


            <p className="text-sm text-zinc-500">
              {text.totalPrice}
            </p>


            <div className="mt-2 flex items-end gap-2">


              <h3 className="text-4xl font-black text-lime-400">
                ${product.price}
              </h3>


              <span className="mb-1 text-sm text-zinc-400">
                {product.currency}
              </span>


            </div>


          </div>







          <div
            className="
            mt-4
            flex
            items-center
            gap-2
            rounded-xl
            border
            border-white/10
            bg-black/20
            px-4
            py-3
            text-sm
            text-zinc-300
            "
          >

            <Package
              size={17}
              className="text-lime-400"
            />


            {product.stock} {text.available}


          </div>







          <button

            disabled={!inStock}

            onClick={() => setIsModalOpen(true)}

            className={`
            mt-5
            w-full
            rounded-2xl
            py-4
            text-lg
            font-black
            transition

            ${
              inStock
                ? `
                  bg-lime-400
                  text-black
                  hover:scale-[1.03]
                  hover:shadow-[0_0_40px_rgba(132,255,0,.4)]
                `
                : `
                  cursor-not-allowed
                  bg-zinc-700
                  text-zinc-400
                `
            }

            `}
          >

            🛒 {t.addCart}

          </button>








          <div
            className="
            mt-5
            rounded-2xl
            border
            border-white/10
            bg-black/20
            p-4
            "
          >

            <div className="flex items-center gap-3 text-sm text-zinc-300">

              <ShieldCheck
                size={18}
                className="text-lime-400"
              />

              {text.securePayment}

            </div>

          </div>








          <div
            className="
            mt-5
            space-y-3
            border-t
            border-white/10
            pt-5
            "
          >



            <div className="flex justify-between text-sm">

              <span className="text-zinc-500">
                {t.delivery}
              </span>

              <span className="font-semibold">
                {text.instant}
              </span>

            </div>





            <div className="flex justify-between text-sm">

              <span className="text-zinc-500">
                {t.warranty}
              </span>

              <span className="font-semibold">
                {text.lifetime}
              </span>

            </div>





            <div className="flex justify-between text-sm">

              <span className="text-zinc-500">
                {text.support}
              </span>

              <span className="font-semibold">
                24 / 7
              </span>

            </div>



          </div>




        </div>


      </div>







      <AddToCartModal

        product={product}

        isOpen={isModalOpen}

        onClose={() => setIsModalOpen(false)}

        onConfirm={(quantity)=>{

          for(let i = 0; i < quantity; i++){

            addToCart(product);

          }

          setIsModalOpen(false);

        }}

      />



    </>

  );

}