"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Copy, CheckCircle } from "lucide-react";
import { useState, Suspense } from "react";

import { useLanguage } from "@/context/LanguageContext";


function SuccessContent() {

  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  const { language } = useLanguage();

  const [copied, setCopied] = useState(false);



  const text = {

    title:
      language === "ar"
        ? "تم إنشاء الطلب"
        : language === "zh"
        ? "订单创建成功"
        : "Order Created",


    desc:
      language === "ar"
        ? "تم استلام طلبك بنجاح."
        : language === "zh"
        ? "您的订单已成功提交。"
        : "Your order has been received successfully.",


    order:
      language === "ar"
        ? "رقم الطلب"
        : language === "zh"
        ? "订单编号"
        : "Order Number",


    copy:
      language === "ar"
        ? "نسخ"
        : language === "zh"
        ? "复制"
        : "Copy",


    copied:
      language === "ar"
        ? "تم النسخ"
        : language === "zh"
        ? "已复制"
        : "Copied",


    payment:
      language === "ar"
        ? "يرجى إكمال الدفع باستخدام طريقة الدفع المختارة."
        : language === "zh"
        ? "请使用选择的付款方式完成付款。"
        : "Please complete your payment using the selected method.",


    home:
      language === "ar"
        ? "العودة للرئيسية"
        : language === "zh"
        ? "返回首页"
        : "Back To Home",


    products:
      language === "ar"
        ? "تصفح المنتجات"
        : language === "zh"
        ? "浏览产品"
        : "Browse Products",

  };




  function copyOrder(){

    if(!id) return;

    navigator.clipboard.writeText(id);

    setCopied(true);


    setTimeout(()=>{

      setCopied(false);

    },2000);

  }




  return (

    <main

      dir={language === "ar" ? "rtl" : "ltr"}

      className="
      flex
      min-h-screen
      items-center
      justify-center
      bg-[#090909]
      px-6
      text-white
      "

    >



      <div

        className="
        relative
        w-full
        max-w-xl
        overflow-hidden
        rounded-[35px]
        border
        border-white/10
        bg-white/[0.04]
        p-10
        text-center
        backdrop-blur-xl
        "

      >


        <div
          className="
          absolute
          -right-32
          -top-32
          h-80
          w-80
          rounded-full
          bg-lime-400/20
          blur-[120px]
          "
        />



        <div className="relative z-10">


          <CheckCircle
            size={90}
            className="mx-auto text-lime-400"
          />



          <h1 className="mt-6 text-5xl font-black">

            {text.title}

          </h1>



          <p className="mt-5 text-zinc-400">

            {text.desc}

          </p>




          {id && (

            <div
              className="
              mt-8
              rounded-3xl
              border
              border-lime-400/30
              bg-lime-400/10
              p-6
              "
            >


              <p className="text-sm text-zinc-400">

                {text.order}

              </p>



              <div className="mt-3 flex items-center justify-center gap-3">


                <p className="text-4xl font-black text-lime-400">

                  #{id}

                </p>



                <button

                  onClick={copyOrder}

                  className="
                  rounded-xl
                  border
                  border-white/10
                  bg-black/30
                  p-3
                  text-zinc-300
                  transition
                  hover:border-lime-400
                  hover:text-lime-400
                  "

                >

                  {
                    copied
                    ? <CheckCircle size={20}/>
                    : <Copy size={20}/>
                  }


                </button>


              </div>




              <p className="mt-3 text-sm text-zinc-500">

                {copied ? text.copied : text.copy}

              </p>



            </div>

          )}





          <p className="mt-8 text-zinc-500">

            {text.payment}

          </p>





          <div className="mt-10 flex flex-col gap-4 sm:flex-row">



            <Link

              href="/"

              className="
              flex-1
              rounded-xl
              bg-lime-400
              px-8
              py-4
              font-bold
              text-black
              transition
              hover:scale-105
              "

            >

              {text.home}


            </Link>





            <Link

              href="/products"

              className="
              flex-1
              rounded-xl
              border
              border-white/10
              bg-white/5
              px-8
              py-4
              font-bold
              transition
              hover:border-lime-400
              "

            >

              {text.products}


            </Link>



          </div>




        </div>



      </div>



    </main>

  );

}





export default function SuccessPage(){

  return (

    <Suspense

      fallback={

        <main className="flex min-h-screen items-center justify-center bg-[#090909] text-white">

          Loading...

        </main>

      }

    >

      <SuccessContent />

    </Suspense>

  );

}