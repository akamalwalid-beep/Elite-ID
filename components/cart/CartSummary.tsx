"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useCart } from "@/context/CartContext";

export default function CartSummary() {
  const { cart } = useCart();

  const total = useMemo(() => {
    return cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }, [cart]);

  return (
    <div className="sticky top-24 rounded-2xl border border-zinc-800 bg-[#111111] p-8">

      <h2 className="text-3xl font-bold">
        Order Summary
      </h2>

      <div className="mt-8 space-y-5">

        <div className="flex justify-between">
          <span>Items</span>
          <span>{cart.length}</span>
        </div>

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{total.toFixed(2)} USDT</span>
        </div>

        <div className="flex justify-between">
          <span>Fees</span>
          <span>0.00 USDT</span>
        </div>

        <div className="flex justify-between border-t border-zinc-700 pt-5 text-2xl font-bold">
          <span>Total</span>

          <span className="text-lime-400">
            {total.toFixed(2)} USDT
          </span>
        </div>

      </div>

      <Link
        href="/checkout"
        className={`mt-8 block w-full rounded-xl py-4 text-center text-lg font-bold transition ${
          cart.length === 0
            ? "pointer-events-none bg-zinc-700 text-zinc-400"
            : "bg-lime-400 text-black hover:scale-105"
        }`}
      >
        Continue to Checkout
      </Link>

    </div>
  );
}