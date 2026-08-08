"use client";

import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="group flex h-[72px] w-[120px] items-center justify-center overflow-hidden"
    >
      <Image
        src="/images/new-logo1.png"
        alt="Elite ID"
        width={120}
        height={80}
        priority
        className="
          h-auto
          w-[120px]
          object-contain
          transition-all
          duration-300
          group-hover:scale-105
        "
      />
    </Link>
  );
}