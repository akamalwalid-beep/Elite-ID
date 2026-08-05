"use client";

import { useCart } from "@/context/CartContext";

import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import EmptyCart from "@/components/cart/EmptyCart";

export default function CartPage() {
  const { cart } = useCart();

  if (cart.length === 0) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-[#090909] text-white">

        <div className="pointer-events-none absolute inset-0 overflow-hidden">

          <div
            className="
            absolute
            -left-40
            top-20
            h-[600px]
            w-[600px]
            rounded-full
            bg-lime-400/20
            blur-[150px]
            animate-[pulse_8s_ease-in-out_infinite]
            "
          />

          <div
            className="
            absolute
            right-[-150px]
            bottom-10
            h-[650px]
            w-[650px]
            rounded-full
            bg-emerald-400/15
            blur-[160px]
            animate-[pulse_10s_ease-in-out_infinite]
            "
          />

        </div>

        <div className="relative z-10">
          <EmptyCart />
        </div>

      </main>
    );
  }


  return (
    <main className="relative min-h-screen overflow-hidden bg-[#090909] py-20 text-white">


      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div
          className="
          absolute
          -left-52
          top-0
          h-[700px]
          w-[700px]
          rounded-full
          bg-lime-400/20
          blur-[150px]
          animate-[pulse_8s_ease-in-out_infinite]
          "
        />

        <div
          className="
          absolute
          right-[-200px]
          top-[20%]
          h-[750px]
          w-[750px]
          rounded-full
          bg-green-400/20
          blur-[170px]
          animate-[pulse_10s_ease-in-out_infinite]
          "
        />

      </div>


      <div className="relative z-10 mx-auto max-w-7xl px-6">

        <h1 className="mb-12 text-5xl font-bold">
          Shopping Cart
        </h1>


        <div className="grid gap-10 lg:grid-cols-3">


          <div className="space-y-6 lg:col-span-2">


            {cart.map((item) => (

              <CartItem
                key={item.id}
                id={item.id}
                title={item.title}
                image={item.image}
                country={item.country}
                price={item.price}
                quantity={item.quantity}
              />

            ))}


          </div>


          <CartSummary />


        </div>


      </div>


    </main>
  );
}