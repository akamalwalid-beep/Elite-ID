// D:\Elite-ID\frontend\app\admin\page.tsx

import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const [
    totalProducts,
    totalOrders,
    pendingOrders,
    featuredProducts,
    revenue,
    latestOrders,
  ] = await Promise.all([
    prisma.product.count(),

    prisma.order.count(),

    prisma.order.count({
      where: {
        status: "Pending",
      },
    }),

    prisma.product.count({
      where: {
        featured: true,
      },
    }),

    prisma.order.aggregate({
      _sum: {
        total: true,
      },
    }),

    prisma.order.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    }),
  ]);

  const totalRevenue = Number(
    revenue._sum.total ?? 0
  );

  return (
    <main className="min-h-screen bg-black px-5 py-8 text-white md:px-8 md:py-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="mb-2 text-sm font-medium text-lime-400">
              Elite ID Admin
            </p>

            <h1 className="text-3xl font-bold md:text-4xl">
              Admin Dashboard
            </h1>

            <p className="mt-2 text-sm text-zinc-500">
              Manage your store from one place.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/products"
              className="rounded-xl border border-zinc-800 px-5 py-3 text-sm font-semibold text-zinc-300 transition hover:border-zinc-600 hover:text-white"
            >
              Products
            </Link>

            <Link
              href="/admin/products/new"
              className="rounded-xl bg-lime-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-lime-400"
            >
              + Add Product
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <DashboardCard
            title="Products"
            value={totalProducts}
          />

          <DashboardCard
            title="Orders"
            value={totalOrders}
          />

          <DashboardCard
            title="Revenue"
            value={`${totalRevenue.toFixed(2)} USDT`}
          />

          <DashboardCard
            title="Pending Orders"
            value={pendingOrders}
          />
        </div>

        {/* Quick Actions */}
        <section className="mt-8 grid gap-4 md:grid-cols-3">
          <QuickAction
            href="/admin/products"
            title="Manage Products"
            description="View, edit and manage all products."
          />

          <QuickAction
            href="/admin/products/new"
            title="Create Product"
            description="Add a new product to your store."
          />

          <QuickAction
            href="/admin/orders"
            title="Manage Orders"
            description="Review customer orders and statuses."
          />
        </section>

        {/* Latest Orders */}
        <section className="mt-8 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
          <div className="flex flex-col gap-3 border-b border-zinc-800 px-5 py-5 sm:flex-row sm:items-center sm:justify-between md:px-6">
            <div>
              <h2 className="text-lg font-semibold">
                Latest Orders
              </h2>

              <p className="mt-1 text-xs text-zinc-600">
                The five most recent orders.
              </p>
            </div>

            <div className="text-sm text-zinc-500">
              Featured Products:{" "}
              <span className="font-semibold text-zinc-300">
                {featuredProducts}
              </span>
            </div>
          </div>

          {latestOrders.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <p className="text-zinc-400">
                No orders yet.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="border-b border-zinc-800 text-left text-xs uppercase tracking-wide text-zinc-600">
                    <th className="px-6 py-4">
                      Customer
                    </th>

                    <th className="px-6 py-4">
                      Email
                    </th>

                    <th className="px-6 py-4">
                      Total
                    </th>

                    <th className="px-6 py-4">
                      Status
                    </th>

                    <th className="px-6 py-4 text-right">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {latestOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-zinc-900 transition hover:bg-white/[0.02] last:border-0"
                    >
                      <td className="px-6 py-5">
                        <p className="font-medium">
                          {order.customerName ||
                            "Unknown"}
                        </p>

                        <p className="mt-1 text-xs text-zinc-600">
                          Order #{order.id}
                        </p>
                      </td>

                      <td className="px-6 py-5 text-sm text-zinc-400">
                        {order.customerEmail ||
                          "No email"}
                      </td>

                      <td className="px-6 py-5 font-semibold text-lime-400">
                        {Number(order.total).toFixed(
                          2
                        )}{" "}
                        USDT
                      </td>

                      <td className="px-6 py-5">
                        <OrderStatus
                          status={order.status}
                        />
                      </td>

                      <td className="px-6 py-5 text-right">
                        <Link
                          href={`/admin/orders/${order.id}`}
                          className="inline-flex rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-lime-500 hover:bg-lime-500/10 hover:text-lime-400"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function DashboardCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
      <p className="text-sm text-zinc-500">
        {title}
      </p>

      <p className="mt-3 text-3xl font-bold">
        {value}
      </p>
    </div>
  );
}

function QuickAction({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-zinc-800 bg-zinc-950 p-5 transition hover:border-zinc-600"
    >
      <p className="font-semibold transition group-hover:text-lime-400">
        {title}
      </p>

      <p className="mt-2 text-sm leading-6 text-zinc-500">
        {description}
      </p>

      <p className="mt-4 text-sm text-zinc-700 transition group-hover:text-lime-500">
        Open →
      </p>
    </Link>
  );
}

function OrderStatus({
  status,
}: {
  status: string;
}) {
  const normalized = status.toLowerCase();

  let className =
    "bg-yellow-500/10 text-yellow-400";

  if (
    normalized === "completed" ||
    normalized === "complete" ||
    normalized === "paid"
  ) {
    className =
      "bg-green-500/10 text-green-400";
  }

  if (
    normalized === "cancelled" ||
    normalized === "canceled" ||
    normalized === "failed"
  ) {
    className =
      "bg-red-500/10 text-red-400";
  }

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${className}`}
    >
      {status}
    </span>
  );
}