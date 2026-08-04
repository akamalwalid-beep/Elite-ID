"use client";

import { useCart } from "@/context/CartContext";

type BuyBoxProps = {
  product: {
    id: number;
    title: string;
    price: number;
    image: string;
  };
};

export default function BuyBox({
  product,
}: BuyBoxProps) {
  const { addToCart } = useCart();

  return (
    <div className="rounded-3xl border border-zinc-800 bg-[#111111] p-8">

      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">
          Buy Now
        </h2>

        <span className="rounded-full bg-lime-400/20 px-4 py-2 text-sm font-bold text-lime-400">
          In Stock
        </span>
      </div>

      <div className="mt-10">
        <p className="text-zinc-500">
          Price
        </p>

        <h3 className="mt-2 text-5xl font-extrabold text-lime-400">
          ${product.price}
          <span className="ml-3 text-sm text-zinc-400">
            USDT
          </span>
        </h3>
      </div>

      <div className="mt-10">

        <label className="mb-3 block text-zinc-400">
          Payment Method
        </label>

        <select className="w-full rounded-xl border border-zinc-700 bg-[#181818] p-4">
          <option>USDT (TRC20)</option>
          <option>TRX</option>
          <option>Binance Pay</option>
        </select>

      </div>

      <button
        onClick={() =>
          addToCart({
            id: product.id,
            title: product.title,
            slug: "",
            country: product.title,
            price: product.price,
            currency: "USDT",
            rating: 0,
            image: product.image,
            stock: 1,
            description: "",
            views: 0,
            featured: false,
          })
        }
        className="mt-10 w-full rounded-xl bg-lime-400 py-5 text-xl font-bold text-black transition hover:scale-105"
      >
        🛒 Add To Cart
      </button>

      <div className="mt-10 space-y-4 border-t border-zinc-800 pt-8">

        <div className="flex justify-between">
          <span className="text-zinc-500">
            Delivery
          </span>
          <span>Instant</span>
        </div>

        <div className="flex justify-between">
          <span className="text-zinc-500">
            Warranty
          </span>
          <span>Lifetime</span>
        </div>

        <div className="flex justify-between">
          <span className="text-zinc-500">
            Support
          </span>
          <span>24 / 7</span>
        </div>

      </div>

    </div>
  );
}