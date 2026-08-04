"use client";

import { useCart } from "@/context/CartContext";

type CartItemProps = {
  id: number;
  country: string;
  price: number;
  quantity: number;
};

export default function CartItem({
  id,
  country,
  price,
  quantity,
}: CartItemProps) {
  const {
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  return (
    <div className="rounded-2xl border border-zinc-800 bg-[#111111] p-6">

      <div className="flex items-center justify-between">

        <div>
          <h2 className="text-2xl font-bold">
            Apple ID
          </h2>

          <p className="mt-2 text-zinc-400">
            {country}
          </p>

          <p className="mt-3 text-3xl font-bold text-lime-400">
            {price.toFixed(2)} USDT
          </p>
        </div>

        <button
          onClick={() => removeFromCart(id)}
          className="rounded-lg bg-red-500 px-4 py-2 font-bold transition hover:bg-red-600"
        >
          Remove
        </button>

      </div>

      <div className="mt-8 flex items-center gap-4">

        <button
          onClick={() => decreaseQuantity(id)}
          className="h-10 w-10 rounded-lg bg-zinc-800 text-xl"
        >
          −
        </button>

        <span className="text-2xl font-bold">
          {quantity}
        </span>

        <button
          onClick={() => increaseQuantity(id)}
          className="h-10 w-10 rounded-lg bg-lime-400 font-bold text-black"
        >
          +
        </button>

      </div>

    </div>
  );
}