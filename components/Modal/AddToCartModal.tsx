"use client";

import { useEffect, useRef, useState } from "react";
import { ShieldCheck, X } from "lucide-react";
import { Product } from "../../types/product";

type AddToCartModalProps = {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (quantity: number) => void;
};

export default function AddToCartModal({
  product,
  isOpen,
  onClose,
  onConfirm,
}: AddToCartModalProps) {
  const [quantity, setQuantity] = useState("1");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    setQuantity("1");

    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 50);

  }, [isOpen, product]);


  if (!isOpen || !product) return null;


  const qty = Math.max(1, Number(quantity) || 1);
  const total = (product.price * qty).toFixed(2);


  return (
    <div
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


        {/* Glow */}

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


          {/* Header */}

          <div className="flex items-start justify-between">

            <div>

              <h2 className="text-3xl font-black">
                {product.country} Apple ID
              </h2>


              <p className="mt-2 text-zinc-400">
                Choose quantity and add to your cart.
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




          {/* Price */}

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
              Unit Price
            </p>


            <h3
              className="
              mt-2
              text-3xl
              font-black
              text-lime-400
              "
            >
              {product.price.toFixed(2)} {product.currency}
            </h3>

          </div>




          {/* Quantity */}

          <div className="mt-8">

            <label className="mb-3 block text-sm text-zinc-400">
              Quantity
            </label>


            <input
              ref={inputRef}
              type="number"
              min={1}
              step={1}
              value={quantity}
              onFocus={(e) => e.target.select()}
              onChange={(e) => setQuantity(e.target.value)}
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




          {/* Total */}

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
              Total
            </p>


            <h3 className="mt-2 text-4xl font-black text-lime-400">
              {total} {product.currency}
            </h3>

          </div>




          {/* Trust */}

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

            Secure & instant delivery

          </div>




          {/* Buttons */}

          <div className="mt-8 flex gap-4">

            <button
              onClick={() => {
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
              Cancel
            </button>



            <button
              onClick={() => {
                onConfirm(qty);
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
              Add To Cart
            </button>

          </div>


        </div>

      </div>

    </div>
  );
}