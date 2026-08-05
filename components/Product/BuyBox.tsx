"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { ShieldCheck, Zap } from "lucide-react";
import { Product } from "@/types/product";
import AddToCartModal from "@/components/Modal/AddToCartModal";


type BuyBoxProps = {
  product: Product;
};


export default function BuyBox({
  product,
}: BuyBoxProps) {

  const { addToCart } = useCart();

  const [isModalOpen, setIsModalOpen] = useState(false);



  return (
    <>
      <div
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
                Secure Checkout
              </p>

              <h2 className="mt-1 text-2xl font-black">
                Buy Now
              </h2>
            </div>


            <div
              className="
              flex
              items-center
              gap-2
              rounded-full
              border
              border-lime-400/30
              bg-lime-400/10
              px-3
              py-1.5
              text-xs
              font-bold
              text-lime-400
              "
            >
              <Zap size={14}/>
              In Stock
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
              Total Price
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



          <button
            onClick={() => setIsModalOpen(true)}
            className="
            mt-5
            w-full
            rounded-2xl
            bg-lime-400
            py-4
            text-lg
            font-black
            text-black
            transition
            hover:scale-[1.03]
            hover:shadow-[0_0_40px_rgba(132,255,0,.4)]
            "
          >

            🛒 Add To Cart

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

              Secure payment & instant delivery

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
                Delivery
              </span>
              <span className="font-semibold">
                Instant
              </span>
            </div>


            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">
                Warranty
              </span>
              <span className="font-semibold">
                Lifetime
              </span>
            </div>


            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">
                Support
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
        onConfirm={(quantity) => {

          for(let i = 0; i < quantity; i++){
            addToCart(product);
          }

        }}
      />


    </>
  );
}