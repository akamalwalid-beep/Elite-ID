"use client";

import { MessageCircle, ShoppingCart } from "lucide-react";
import Link from "next/link";

import { useCart } from "@/context/CartContext";

const TELEGRAM_URL = "https://t.me/xtigerx1";

export default function SupportButton() {
  const { cartCount } = useCart();

  return (
    <>
      {/* Floating Support */}
      <a
        href={TELEGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Telegram Support"
        className="
          fixed
          bottom-6
          right-6
          z-[60]
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-full
          border
          border-lime-400/40
          bg-[#111111]
          text-lime-400
          shadow-[0_0_30px_rgba(132,255,0,.25)]
          transition-all
          duration-300
          hover:scale-110
          hover:bg-lime-400
          hover:text-black
          hover:shadow-[0_0_40px_rgba(132,255,0,.45)]
        "
      >
        <MessageCircle size={25} />
      </a>

      {/* Global Cart */}
      <Link
        href="/cart"
        aria-label="Shopping Cart"
        className="
          fixed
          bottom-6
          left-6
          z-[60]
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-full
          border
          border-white/10
          bg-[#111111]
          text-white
          shadow-[0_0_25px_rgba(0,0,0,.35)]
          backdrop-blur-xl
          transition-all
          duration-300
          hover:scale-110
          hover:border-lime-400
          hover:text-lime-400
        "
      >
        <ShoppingCart size={23} />

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
    </>
  );
}