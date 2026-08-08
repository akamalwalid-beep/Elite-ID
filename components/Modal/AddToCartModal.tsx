"use client";

import { useEffect, useRef, useState } from "react";
import { ShieldCheck, X } from "lucide-react";

import { Product } from "../../types/product";
import { useLanguage } from "@/context/LanguageContext";


type AddToCartModalProps = {
  product: Product | null;
  isOpen: boolean;
  mode: "cart" | "buy";
  onClose: () => void;
  onConfirm: (quantity: number, mode: "cart" | "buy") => void;
};



export default function AddToCartModal({
  product,
  isOpen,
  mode,
  onClose,
  onConfirm,
}: AddToCartModalProps) {


  const [quantity, setQuantity] = useState("1");


  const inputRef = useRef<HTMLInputElement>(null);


  const { language } = useLanguage();




  const text = {

    choose:
      language === "ar"
        ? "اختر الكمية وأضفها إلى السلة."
        : language === "zh"
        ? "选择数量并加入购物车。"
        : "Choose quantity and add to your cart.",



    unit:
      language === "ar"
        ? "سعر الوحدة"
        : language === "zh"
        ? "单价"
        : "Unit Price",



    quantity:
      language === "ar"
        ? "الكمية"
        : language === "zh"
        ? "数量"
        : "Quantity",



    total:
      language === "ar"
        ? "الإجمالي"
        : language === "zh"
        ? "总计"
        : "Total",



    secure:
      language === "ar"
        ? "دفع آمن وتسليم فوري"
        : language === "zh"
        ? "安全支付和即时交付"
        : "Secure & instant delivery",



    cancel:
      language === "ar"
        ? "إلغاء"
        : language === "zh"
        ? "取消"
        : "Cancel",



    add:
      language === "ar"
        ? "إضافة للسلة"
        : language === "zh"
        ? "加入购物车"
        : "Add To Cart",

  };






  useEffect(() => {

    if (!isOpen) return;


    setQuantity("1");


    setTimeout(() => {

      inputRef.current?.focus();

      inputRef.current?.select();

    }, 50);


  }, [isOpen, product]);






  if (!isOpen || !product) return null;





  const qty = Math.min(

    product.stock,

    Math.max(
      1,
      Number(quantity) || 1
    )

  );




  const total = (

    product.price * qty

  ).toFixed(2);







  return (

    <div

      dir={language === "ar" ? "rtl" : "ltr"}

      className="
      fixed
      inset-0
      z-50
      flex
      items-center
      justify-center
      bg-black/80
      px-5
      backdrop-blur-md
      "

    >




      <div
        className="
        relative
        w-full
        max-w-md
        overflow-hidden
        rounded-[32px]
        border
        border-white/10
        bg-[#111111]
        p-8
        text-white
        shadow-2xl
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
          blur-[100px]
          "
        />





        <div className="relative z-10">





          <div className="flex items-start justify-between">



            <div>


              <h2 className="text-3xl font-black">

                {product.country} Apple ID

              </h2>



              <p className="mt-2 text-zinc-400">

                {text.choose}

              </p>



            </div>






            <button

              onClick={onClose}

              className="
              rounded-xl
              border
              border-white/10
              p-2
              text-zinc-400
              transition
              hover:border-red-400/40
              hover:text-red-400
              "

            >

              <X size={20}/>

            </button>



          </div>








          <div
            className="
            mt-8
            rounded-3xl
            border
            border-white/10
            bg-black/30
            p-6
            "
          >


            <p className="text-sm text-zinc-500">

              {text.unit}

            </p>




            <h3 className="mt-2 text-3xl font-black text-lime-400">

              {product.price.toFixed(2)} {product.currency}

            </h3>



          </div>








          <div className="mt-8">


            <label className="mb-3 block text-sm text-zinc-400">

              {text.quantity}

            </label>





            <input

              ref={inputRef}

              type="number"

              min={1}

              max={product.stock}

              step={1}

              value={quantity}

              onFocus={(e)=>e.target.select()}

              onChange={(e)=>setQuantity(e.target.value)}

              className="
              w-full
              rounded-2xl
              border
              border-white/10
              bg-black/40
              p-4
              text-xl
              outline-none
              transition
              focus:border-lime-400
              "

            />


          </div>









          <div
            className="
            mt-8
            rounded-3xl
            border
            border-lime-400/20
            bg-lime-400/5
            p-6
            "
          >


            <p className="text-sm text-zinc-400">

              {text.total}

            </p>



            <h3 className="mt-2 text-4xl font-black text-lime-400">

              {total} {product.currency}

            </h3>



          </div>








          <div
            className="
            mt-6
            flex
            items-center
            gap-3
            rounded-2xl
            border
            border-white/10
            bg-white/[0.03]
            p-4
            text-sm
            text-zinc-300
            "
          >


            <ShieldCheck
              size={20}
              className="text-lime-400"
            />


            {text.secure}



          </div>









          <div className="mt-8 flex gap-4">





            <button

              onClick={()=>{

                setQuantity("1");

                onClose();

              }}

              className="
              flex-1
              rounded-2xl
              border
              border-white/10
              py-4
              font-bold
              transition
              hover:border-red-400/40
              hover:text-red-400
              "

            >

              {text.cancel}


            </button>







            <button

              onClick={()=>{

                onConfirm(qty, mode);

                setQuantity("1");

                onClose();

              }}

              className="
              flex-1
              rounded-2xl
              bg-lime-400
              py-4
              font-black
              text-black
              transition
              hover:scale-105
              hover:shadow-[0_0_40px_rgba(132,255,0,.4)]
              "

            >

              {text.add}


            </button>





          </div>





        </div>




      </div>




    </div>

  );

}