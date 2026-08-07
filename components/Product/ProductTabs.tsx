"use client";

import { Product } from "@/types/product";

import {
  ShieldCheck,
  Truck,
  RefreshCcw,
  Lock,
} from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";


type Props = {
  product: Product;
};



export default function ProductTabs({
  product,
}: Props) {


  const { language } = useLanguage();



  const text = {

    title:
      language === "ar"
        ? "تفاصيل المنتج"
        : language === "zh"
        ? "产品详情"
        : "Product Details",



    subtitle:
      language === "ar"
        ? "كل ما تحتاج معرفته"
        : language === "zh"
        ? "你需要知道的一切"
        : "Everything you need to know",



    description:
      language === "ar"
        ? "الوصف"
        : language === "zh"
        ? "描述"
        : "Description",



    defaultDescription:
      language === "ar"
        ? "Apple ID مميز جاهز للتسليم الفوري."
        : language === "zh"
        ? "高级 Apple ID，可立即交付。"
        : "Premium Apple ID ready for instant delivery.",



    verified:
      language === "ar"
        ? "حساب موثق"
        : language === "zh"
        ? "已验证账户"
        : "Verified account",



    instant:
      language === "ar"
        ? "تسليم فوري"
        : language === "zh"
        ? "即时交付"
        : "Instant delivery",



    quality:
      language === "ar"
        ? "جودة ممتازة"
        : language === "zh"
        ? "高级质量"
        : "Premium quality",

  };





  return (

    <section

      dir={language === "ar" ? "rtl" : "ltr"}

      className="mx-auto mt-24 max-w-[1700px] px-10"

    >



      <div
        className="
        relative
        overflow-hidden
        rounded-[40px]
        border
        border-white/10
        bg-white/[0.04]
        p-10
        backdrop-blur-xl
        "
      >




        <div
          className="
          absolute
          -left-40
          -top-40
          h-96
          w-96
          rounded-full
          bg-lime-400/10
          blur-[120px]
          "
        />





        <div className="relative z-10">





          <div className="flex items-center gap-3">



            <div
              className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-lime-400/10
              text-lime-400
              "
            >

              <Lock size={24}/>

            </div>





            <div>


              <h2 className="text-4xl font-black">

                {text.title}

              </h2>



              <p className="mt-1 text-zinc-500">

                {text.subtitle}

              </p>


            </div>


          </div>







          <div className="mt-12 grid gap-12 lg:grid-cols-2">





            <div
              className="
              rounded-3xl
              border
              border-white/10
              bg-black/20
              p-8
              "
            >



              <h3 className="text-2xl font-bold">

                {text.description}

              </h3>





              <p className="mt-5 leading-8 text-zinc-400">

                {product.description || text.defaultDescription}

              </p>







              <div
                className="
                mt-8
                rounded-2xl
                border
                border-lime-400/20
                bg-lime-400/5
                p-5
                text-sm
                text-zinc-300
                "
              >

                ✓ {text.verified}

                <br />

                ✓ {text.instant}

                <br />

                ✓ {text.quality}


              </div>



            </div>








            <div className="space-y-5">


              <Feature

                icon={<ShieldCheck size={24}/>}

                title={
                  language === "ar"
                    ? "حساب آمن"
                    : language === "zh"
                    ? "安全账户"
                    : "Secure Account"
                }

                text={
                  language === "ar"
                    ? "يتم التحقق من جميع الحسابات قبل التسليم."
                    : language === "zh"
                    ? "所有 Apple ID 在交付前都会验证。"
                    : "All Apple IDs are verified before delivery."
                }

              />





              <Feature

                icon={<Truck size={24}/>}

                title={
                  language === "ar"
                    ? "تسليم فوري"
                    : language === "zh"
                    ? "即时交付"
                    : "Instant Delivery"
                }

                text={
                  language === "ar"
                    ? "استلم حسابك مباشرة بعد الدفع."
                    : language === "zh"
                    ? "付款后立即收到您的账户。"
                    : "Receive your account immediately after payment."
                }

              />





              <Feature

                icon={<RefreshCcw size={24}/>}

                title={
                  language === "ar"
                    ? "ضمان الاستبدال"
                    : language === "zh"
                    ? "更换保证"
                    : "Replacement Guarantee"
                }

                text={
                  language === "ar"
                    ? "يتوفر الاستبدال إذا حدثت أي مشكلة."
                    : language === "zh"
                    ? "如果出现问题，可以更换。"
                    : "Replacement available if there is any issue."
                }

              />



            </div>





          </div>





        </div>




      </div>



    </section>

  );

}






function Feature({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {


  return (

    <div
      className="
      group
      flex
      gap-5
      rounded-3xl
      border
      border-white/10
      bg-black/20
      p-6
      transition
      duration-300
      hover:-translate-y-1
      hover:border-lime-400/30
      "
    >


      <div
        className="
        flex
        h-12
        w-12
        shrink-0
        items-center
        justify-center
        rounded-2xl
        bg-lime-400/10
        text-lime-400
        transition
        group-hover:bg-lime-400/20
        "
      >

        {icon}

      </div>




      <div>

        <h4 className="text-lg font-bold">

          {title}

        </h4>


        <p className="mt-2 text-sm leading-6 text-zinc-400">

          {text}

        </p>


      </div>



    </div>

  );

}