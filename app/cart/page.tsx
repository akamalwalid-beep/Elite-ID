"use client";

import { useCart } from "@/context/CartContext";

import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import EmptyCart from "@/components/cart/EmptyCart";

export default function CartPage() {
  const { cart } = useCart();

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-[#090909] text-white">
        <EmptyCart />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#090909] py-20 text-white">

      <div className="mx-auto max-w-7xl px-6">

        <h1 className="mb-12 text-5xl font-bold">
          Shopping Cart
        </h1>

        <div className="grid gap-10 lg:grid-cols-3">

          <div className="space-y-6 lg:col-span-2">

            {cart.map((item) => (
              <CartItem
                key={item.id}
                id={item.id}
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