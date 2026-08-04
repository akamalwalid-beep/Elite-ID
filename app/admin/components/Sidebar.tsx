"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
} from "lucide-react";

const items = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "Customers",
    href: "/admin/customers",
    icon: Users,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  return (
    <aside className="w-72 border-r border-zinc-800 bg-[#0d0d0d] p-6">

      <h1 className="mb-10 text-3xl font-black text-lime-400">
        Elite ID
      </h1>

      <nav className="space-y-2">

        {items.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={item.href}
              className="flex items-center gap-4 rounded-xl px-4 py-3 text-zinc-300 transition hover:bg-lime-400/10 hover:text-lime-400"
            >
              <Icon size={20} />
              {item.title}
            </Link>
          );
        })}

      </nav>

    </aside>
  );
}