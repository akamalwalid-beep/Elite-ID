"use client";

import { Product } from "@/types/product";

import {
  ShieldCheck,
  Truck,
  RefreshCcw,
  Lock,
  Eye,
  Package,
  Crown,
  Flame,
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




    views:
      language === "ar"
        ? "مشاهدة"
        : language === "zh"
        ? "浏览"
        : "Views",




    stock:
      language === "ar"
        ? "متوفر"
        : language === "zh"
        ? "库存"
        : "Stock",




    rare:
      language === "ar"
        ? "نادر"
        : language === "zh"
        ? "稀有"
        : "Rare",




    bestSeller:
      language === "ar"
        ? "الأكثر مبيعاً"
        : language === "zh"
        ? "畅销"
        : "Best Seller",




    featured:
      language === "ar"
        ? "مميز"
        : language === "zh"
        ? "精选"
        : "Featured",


  };






  return (


    <section

      dir={language === "ar" ? "rtl" : "ltr"}

      className="
      mx-auto
      mt-24
      max-w-[1700px]
      px-10
      "

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






        <div className="relative z-10">






          <div className="flex items-center gap-4">


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









          {/* Badges + Stats */}

          <div
            className="
            mt-10
            flex
            flex-wrap
            gap-3
            "
          >




            {product.rare && (

              <Badge>
                👑 {text.rare}
              </Badge>

            )}



            {product.bestSeller && (

              <Badge>
                ⭐ {text.bestSeller}
              </Badge>

            )}




            {product.featured && (

              <Badge>
                <Flame size={14}/>
                {text.featured}
              </Badge>

            )}






            <Badge>

              <Eye size={14}/>

              {product.views} {text.views}

            </Badge>






            <Badge>

              <Package size={14}/>

              {product.stock} {text.stock}

            </Badge>




          </div>












          <div
            className="
            mt-12
            grid
            gap-12
            lg:grid-cols-2
            "
          >







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




              <p
                className="
                mt-5
                leading-8
                text-zinc-400
                "
              >

                {product.description ||
                "Premium Apple ID ready for instant delivery."}


              </p>







              {product.features &&
              product.features.length > 0 && (

                <div className="mt-8 space-y-3">


                  {product.features.map((feature)=>(

                    <div
                      key={feature}
                      className="
                      flex
                      items-center
                      gap-2
                      text-zinc-300
                      "
                    >

                      ✓ {feature}

                    </div>

                  ))}


                </div>

              )}



            </div>











            <div className="space-y-5">



              <Feature

                icon={<ShieldCheck size={24}/>}

                title="Secure Account"

                text="All accounts are verified before delivery."

              />



              <Feature

                icon={<Truck size={24}/>}

                title="Instant Delivery"

                text="Receive your product immediately after payment."

              />



              <Feature

                icon={<RefreshCcw size={24}/>}

                title="Replacement Guarantee"

                text="Replacement available if any issue happens."

              />



            </div>






          </div>





        </div>



      </div>



    </section>

  );

}







function Badge({
  children,
}: {
  children: React.ReactNode;
}) {


  return (

    <div
      className="
      flex
      items-center
      gap-2
      rounded-full
      border
      border-white/10
      bg-black/20
      px-4
      py-2
      text-sm
      font-bold
      text-zinc-300
      "
    >

      {children}

    </div>

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
      flex
      gap-5
      rounded-3xl
      border
      border-white/10
      bg-black/20
      p-6
      "
    >

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

        {icon}

      </div>



      <div>

        <h4 className="font-bold">

          {title}

        </h4>


        <p className="mt-2 text-sm text-zinc-400">

          {text}

        </p>


      </div>


    </div>

  );

}