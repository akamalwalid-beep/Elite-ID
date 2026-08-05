"use client";

import { Product } from "@/types/product";
import {
  ShieldCheck,
  Truck,
  RefreshCcw,
  Lock,
} from "lucide-react";

type Props = {
  product: Product;
};

export default function ProductTabs({ product }: Props) {
  return (
    <section className="mx-auto mt-24 max-w-[1700px] px-10">

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

        {/* Background Glow */}

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
                Product Details
              </h2>

              <p className="mt-1 text-zinc-500">
                Everything you need to know
              </p>

            </div>

          </div>



          <div className="mt-12 grid gap-12 lg:grid-cols-2">


            {/* Description */}

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
                Description
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

                ✓ Verified account  
                <br />
                ✓ Instant delivery  
                <br />
                ✓ Premium quality  

              </div>


            </div>



            {/* Features */}

            <div className="space-y-5">

              <Feature
                icon={<ShieldCheck size={24}/>}
                title="Secure Account"
                text="All Apple IDs are verified before delivery."
              />


              <Feature
                icon={<Truck size={24}/>}
                title="Instant Delivery"
                text="Receive your account immediately after payment."
              />


              <Feature
                icon={<RefreshCcw size={24}/>}
                title="Replacement Guarantee"
                text="Replacement available if there is any issue."
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