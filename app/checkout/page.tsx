"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/translations";


export default function CheckoutPage() {


  const { cart, clearCart } = useCart();


  const router = useRouter();


  const { language } = useLanguage();


  const t = translations[language];



  const [loading, setLoading] = useState(false);




  const [form, setForm] = useState({

    telegram: "",

    whatsapp: "",

    paymentMethod: "USDT (TRC20)",

  });






  const total = cart.reduce(

    (sum, item) =>
      sum + item.price * item.quantity,

    0

  );







  const text = {


    telegram:

      language === "ar"

        ? "اسم مستخدم تيليجرام"

        : language === "zh"

        ? "Telegram 用户名"

        : "Telegram Username",





    whatsapp:

      language === "ar"

        ? "رقم واتساب"

        : language === "zh"

        ? "WhatsApp号码"

        : "WhatsApp Number",





    error:

      language === "ar"

        ? "حدث خطأ أثناء إنشاء الطلب"

        : language === "zh"

        ? "创建订单时发生错误"

        : "Something went wrong while creating order",





    info:

      language === "ar"

        ? "يرجى إدخال بياناتك الحقيقية حتى نتمكن من التواصل معك عند الحاجة."

        : language === "zh"

        ? "请输入真实信息，以便我们需要时联系您。"

        : "Please enter your real information so we can contact you if needed.",





    saveOrder:

      language === "ar"

        ? "احتفظ برقم الطلب بعد الإنشاء."

        : language === "zh"

        ? "请保存订单编号。"

        : "Please save your order number.",


  };








  async function handleSubmit(
    e: React.FormEvent
  ) {


    e.preventDefault();



    if (cart.length === 0) return;



    try {


      setLoading(true);




      const res = await fetch(
        "/api/orders",
        {

          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },


          body: JSON.stringify({

            telegram: form.telegram,

            whatsapp: form.whatsapp,

            paymentMethod: form.paymentMethod,



            items: cart.map((item)=>({


              productId: item.id,


              country: item.country,


              quantity: item.quantity,


              price: item.price,


            })),


          }),


        }

      );





      if (!res.ok) {

        throw new Error("Order failed");

      }






      const order = await res.json();




      clearCart();




      router.push(
        `/success?id=${order.id}`
      );





    } catch(error){


      console.error(error);


      alert(text.error);



    } finally {


      setLoading(false);


    }


  }









  const currency =

    form.paymentMethod === "TRX"

      ? "TRX"

      : "USDT";









  if(cart.length === 0){


    return (

      <main className="flex min-h-screen items-center justify-center bg-[#090909] text-white">

        <p className="text-3xl font-bold">

          {language === "ar"
            ? "السلة فارغة"
            : language === "zh"
            ? "购物车为空"
            : "Cart is empty"}

        </p>

      </main>

    );

  }








  return (

    <main

      dir={language === "ar" ? "rtl" : "ltr"}

      className="
      min-h-screen
      bg-[#090909]
      px-6
      py-24
      text-white
      "

    >




      <div className="mx-auto max-w-3xl">





        <h1 className="mb-8 text-5xl font-black">

          {t.checkout}

        </h1>







        <div
          className="
          mb-6
          rounded-2xl
          border
          border-lime-400/20
          bg-lime-400/10
          p-5
          text-sm
          text-zinc-300
          "
        >


          <p>

            {text.info}

          </p>




          <p className="mt-2 font-bold text-lime-400">

            {text.saveOrder}

          </p>


        </div>









        <form

          onSubmit={handleSubmit}

          className="
          rounded-3xl
          border
          border-white/10
          bg-white/[0.04]
          p-8
          backdrop-blur-xl
          "

        >






          <div className="space-y-5">






            <input

              required

              placeholder={text.telegram}

              value={form.telegram}

              onChange={(e)=>

                setForm({

                  ...form,

                  telegram:e.target.value

                })

              }

              className="
              w-full
              rounded-xl
              border
              border-zinc-700
              bg-black/30
              p-4
              outline-none
              focus:border-lime-400
              "

            />







            <input

              required

              placeholder={text.whatsapp}

              value={form.whatsapp}

              onChange={(e)=>

                setForm({

                  ...form,

                  whatsapp:e.target.value

                })

              }

              className="
              w-full
              rounded-xl
              border
              border-zinc-700
              bg-black/30
              p-4
              outline-none
              focus:border-lime-400
              "

            />








            <select

              value={form.paymentMethod}

              onChange={(e)=>

                setForm({

                  ...form,

                  paymentMethod:e.target.value

                })

              }

              className="
              w-full
              rounded-xl
              border
              border-zinc-700
              bg-black/30
              p-4
              "

            >

              <option>
                USDT (BEP20)
              </option>


              <option>
                USDT (TRC20)
              </option>


              <option>
                TRX
              </option>


            </select>





          </div>









          <div
            className="
            mt-8
            rounded-2xl
            bg-black/30
            p-5
            "
          >


            <div className="flex justify-between text-xl">


              <span>

                {t.total}

              </span>




              <span className="font-black text-lime-400">

                {total.toFixed(2)} {currency}

              </span>




            </div>


          </div>








          <button

            disabled={loading}

            className="
            mt-8
            w-full
            rounded-2xl
            bg-lime-400
            py-5
            text-xl
            font-black
            text-black
            transition
            hover:scale-105
            disabled:bg-zinc-700
            "

          >


            {loading

              ? language === "ar"

                ? "جاري إنشاء الطلب..."

                : language === "zh"

                ? "正在创建订单..."

                : "Creating Order..."

              : t.placeOrder

            }



          </button>






        </form>





      </div>





    </main>

  );

}