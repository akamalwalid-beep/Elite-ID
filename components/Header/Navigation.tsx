"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Products",
    href: "/products",
  },
  {
    title: "How To Buy",
    href: "/how-to-buy",
  },
  {
    title: "Support",
    href: "/support",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:flex items-center gap-3">

      {links.map((link) => {

        const active = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`
              relative
              overflow-hidden
              rounded-xl
              px-5
              py-3
              text-sm
              font-semibold
              transition-all
              duration-300

              ${
                active
                  ? "bg-lime-400 text-black shadow-[0_0_30px_rgba(132,255,0,.45)]"
                  : "text-zinc-300 hover:text-white hover:bg-white/5"
              }
            `}
          >
            {link.title}

            {!active && (
              <span
                className="
                  absolute
                  left-1/2
                  bottom-1
                  h-[2px]
                  w-0
                  -translate-x-1/2
                  rounded-full
                  bg-lime-400
                  transition-all
                  duration-300
                  group-hover:w-3/4
                "
              />
            )}
          </Link>
        );
      })}

    </nav>
  );
}