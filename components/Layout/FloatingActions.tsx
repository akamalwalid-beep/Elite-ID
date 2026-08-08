"use client";

import Link from "next/link";
import { MessageCircle, ShoppingCart } from "lucide-react";

import { useCart } from "@/context/CartContext";

export default function FloatingActions() {
  const { cartCount } = useCart();

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3">

      {/* Cart */}
      <Link
        href="/cart"
        aria-label="Shopping Cart"
        className="
          relative
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-full
          border
          border-white/10
          bg-[#111111]
          text-white
          shadow-[0_0_30px_rgba(0,0,0,.45)]
          backdrop-blur-xl
          transition-all
          duration-300
          hover:scale-110
          hover:border-lime-400
          hover:text-lime-400
          hover:shadow-[0_0_35px_rgba(132,255,0,.3)]
        "
      >
        <ShoppingCart size={30} />

        {cartCount > 0 && (
          <span
            className="
              absolute
              -right-1
              -top-1
              flex
              h-6
              min-w-6
              items-center
              justify-center
              rounded-full
              bg-lime-400
              px-1
              text-xs
              font-black
              text-black
            "
          >
            {cartCount}
          </span>
        )}
      </Link>

      {/* Telegram Support */}
      <a
        href="https://t.me/xtigerx1"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Telegram Support"
        className="
          flex
          h-14
          items-center
          gap-3
          rounded-full
          border
          border-lime-400/30
          bg-[#111111]
          px-5
          text-lime-400
          shadow-[0_0_30px_rgba(132,255,0,.2)]
          backdrop-blur-xl
          transition-all
          duration-300
          hover:scale-105
          hover:bg-lime-400
          hover:text-black
          hover:shadow-[0_0_40px_rgba(132,255,0,.4)]
        "
      >
        <MessageCircle size={24} />

        <span className="text-sm font-bold">
          Support
        </span>
      </a>

    </div>
  );
}