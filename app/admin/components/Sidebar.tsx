"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
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
    disabled: true,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
    disabled: true,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex min-h-screen w-72 shrink-0 flex-col border-r border-zinc-800 bg-[#0d0d0d] p-5">
      {/* BRAND */}
      <div className="mb-10 px-3">
        <Link
          href="/admin"
          className="inline-block text-3xl font-black tracking-tight text-lime-400 transition hover:text-lime-300"
        >
          Elite ID
        </Link>

        <p className="mt-1 text-xs text-zinc-600">
          Administration Panel
        </p>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 space-y-2">
        <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-600">
          Management
        </p>

        {items.map((item) => {
          const Icon = item.icon;

          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname === item.href ||
                pathname.startsWith(
                  `${item.href}/`
                );

          if (item.disabled) {
            return (
              <div
                key={item.title}
                className="flex cursor-not-allowed items-center gap-4 rounded-xl px-4 py-3 text-zinc-700"
                title="Coming soon"
              >
                <Icon size={20} />

                <span className="flex-1">
                  {item.title}
                </span>

                <span className="text-[10px] uppercase tracking-wide text-zinc-700">
                  Soon
                </span>
              </div>
            );
          }

          return (
            <Link
              key={item.title}
              href={item.href}
              className={`flex items-center gap-4 rounded-xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-lime-400/10 text-lime-400"
                  : "text-zinc-400 hover:bg-white/[0.03] hover:text-white"
              }`}
            >
              <Icon
                size={20}
                strokeWidth={isActive ? 2.5 : 2}
              />

              <span>{item.title}</span>

              {isActive && (
                <span className="ml-auto h-2 w-2 rounded-full bg-lime-400" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* FOOTER */}
      <div className="border-t border-zinc-800 pt-5">
        <div className="rounded-xl border border-zinc-800 bg-black p-4">
          <p className="text-xs text-zinc-600">
            Admin Panel
          </p>

          <p className="mt-1 text-sm font-semibold text-zinc-300">
            Elite ID
          </p>

          <p className="mt-1 text-xs text-zinc-700">
            Secure management system
          </p>
        </div>
      </div>
    </aside>
  );
}