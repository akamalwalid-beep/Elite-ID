"use client";

import Link from "next/link";
import { ShoppingCart, ArrowRight } from "lucide-react";

type Props = {
  id: number;
  inStock: boolean;
  onAddToCart: () => void;
};

export default function ProductActions({
  id,
  inStock,
  onAddToCart,
}: Props) {
  return (
    <div className="relative z-10 mt-8 flex gap-3">

      <button
        disabled={!inStock}
        onClick={onAddToCart}
        className="
          group
          relative
          flex-1
          overflow-hidden
          rounded-2xl
          bg-lime-400
          py-4
          font-bold
          text-black
          transition-all
          duration-300
          hover:scale-[1.03]
          hover:shadow-[0_0_35px_rgba(132,255,0,.45)]
          active:scale-95
          disabled:cursor-not-allowed
          disabled:bg-zinc-700
          disabled:text-zinc-400
        "
      >

        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition duration-1000 group-hover:translate-x-full" />

        <span className="relative flex items-center justify-center gap-2">

          <ShoppingCart size={20} />

          {inStock ? "Add To Cart" : "Unavailable"}

        </span>

      </button>

      <Link
        href={`/products/${id}`}
        className="
          group
          flex
          items-center
          justify-center
          gap-2
          rounded-2xl
          border
          border-zinc-700
          bg-white/[0.03]
          px-6
          transition-all
          duration-300
          hover:border-lime-400
          hover:bg-lime-400/10
        "
      >
        View

        <ArrowRight
          size={18}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />

      </Link>

    </div>
  );
}