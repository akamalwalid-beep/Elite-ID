"use client";

import { Product } from "@/types/product";
import { Crown, Check, Sparkles } from "lucide-react";

type Props = {
  product: Product;
};

export default function ProductInfo({
  product,
}: Props) {


  return (

    <div className="space-y-8">


      {/* Badges */}

      <div className="flex flex-wrap gap-3">


        {product.featured && (
          <Badge text="Featured" />
        )}


        {product.topRated && (
          <Badge text="⭐ Top Rated" />
        )}


        {product.bestSeller && (
          <Badge text="🔥 Best Seller" />
        )}


        {product.rare && (
          <Badge text="💎 Rare" />
        )}


      </div>





      <div>


        <h1 className="text-5xl font-black">

          {product.title}

        </h1>



        <p className="mt-4 text-zinc-400 text-lg">

          {product.description ||
            "Premium Apple ID ready for instant delivery."}

        </p>


      </div>







      {/* Features */}


      {product.features &&
        product.features.length > 0 && (

        <div
          className="
          rounded-3xl
          border
          border-white/10
          bg-white/[0.04]
          p-8
          backdrop-blur-xl
          "
        >


          <h2 className="text-3xl font-black flex items-center gap-3">

            <Sparkles
              className="text-lime-400"
            />

            Included Features

          </h2>




          <div className="mt-6 space-y-4">


            {product.features.map((feature)=>(

              <div
                key={feature}
                className="
                flex
                items-center
                gap-3
                text-zinc-300
                "
              >

                <Check
                  size={20}
                  className="text-lime-400"
                />


                {feature}


              </div>


            ))}


          </div>



        </div>

      )}



    </div>

  );

}





function Badge({
  text,
}:{
  text:string;
}){


  return (

    <div
      className="
      flex
      items-center
      gap-2
      rounded-full
      border
      border-yellow-400/30
      bg-yellow-400/10
      px-4
      py-2
      text-sm
      font-bold
      text-yellow-400
      "
    >

      <Crown size={14}/>

      {text}

    </div>

  );

}