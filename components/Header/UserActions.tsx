"use client";

import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import { useCart } from "../../context/CartContext";

export default function UserActions() {
  const { cartCount } = useCart();

  return (
    <div className="flex items-center gap-3">

      {/* Cart */}

      <Link
        href="/cart"
        className="
          group
          relative
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-2xl
          border
          border-zinc-800
          bg-white/[0.04]
          text-zinc-300
          backdrop-blur-xl
          transition-all
          duration-300
          hover:border-lime-400
          hover:bg-lime-400/10
          hover:text-lime-400
          hover:shadow-[0_0_25px_rgba(132,255,0,.25)]
        "
      >
        <ShoppingCart
          size={20}
          className="transition-transform duration-300 group-hover:scale-110"
        />

        {cartCount > 0 && (
          <span
            className="
              absolute
              -right-1
              -top-1
              flex
              h-6
              w-6
              items-center
              justify-center
              rounded-full
              bg-lime-400
              text-xs
              font-black
              text-black
              shadow-[0_0_20px_rgba(132,255,0,.7)]
            "
          >
            {cartCount}
          </span>
        )}
      </Link>

      {/* Login */}

      <button
        className="
          group
          flex
          items-center
          gap-3
          rounded-2xl
          bg-lime-400
          px-6
          py-3
          font-bold
          text-black
          transition-all
          duration-300
          hover:scale-105
          hover:shadow-[0_0_40px_rgba(132,255,0,.45)]
        "
      >
        <User
          size={20}
          className="transition-transform duration-300 group-hover:scale-110"
        />

        Login
      </button>

    </div>
  );
}