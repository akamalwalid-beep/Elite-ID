"use client";

import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="
        group
        relative
        flex
        items-center
        transition-all
        duration-500
      "
    >
      {/* Glow */}

      <div
        className="
          absolute
          inset-0
          rounded-full
          bg-lime-400/0
          blur-2xl
          transition-all
          duration-500
          group-hover:bg-lime-400/15
        "
      />

      {/* Logo */}

      <Image
        src="/images/logo.png"
        alt="Elite ID"
        width={220}
        height={70}
        priority
        className="
          relative
          z-10
          h-auto
          w-[210px]
          transition-all
          duration-500
          group-hover:scale-105
          group-hover:drop-shadow-[0_0_35px_rgba(132,255,0,.65)]
        "
      />
    </Link>
  );
}