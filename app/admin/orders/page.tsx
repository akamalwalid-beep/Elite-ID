// D:\Elite-ID\frontend\app\admin\orders\page.tsx

import Link from "next/link";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

type AdminOrder = Prisma.OrderGetPayload<{
  include: {
    items: {
      include: {
        product: true;
      };
    };
  };
}>;

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) =>
      order.status?.toLowerCase() === "pending"
  ).length;

  const completedOrders = orders.filter(
    (order) => {
      const status =
        order.status?.toLowerCase();

      return (
        status === "completed" ||
        status === "complete" ||
        status === "paid" ||
        status === "success"
      );
    }
  ).length;

  const totalRevenue = orders.reduce(
    (total, order) =>
      total + Number(order.total),
    0
  );

  return (
    <main className="min-h-screen bg-black px-5 py-8 text-white md:px-8 md:py-10">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <header className="mb-8">
          <Link
            href="/admin"
            className="mb-5 inline-flex items-center text-sm text-zinc-500 transition hover:text-white"
          >
            ← Back to Dashboard
          </Link>

          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-2 text-sm font-medium text-lime-400">
                Elite ID Admin
              </p>

              <h1 className="text-3xl font-bold md:text-4xl">
                Orders
              </h1>

              <p className="mt-2 text-sm text-zinc-500">
                Manage customer orders and payment
                information.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-950 px-5 py-4">
              <p className="text-xs text-zinc-600">
                Total Orders
              </p>

              <p className="mt-1 text-2xl font-bold">
                {totalOrders}
              </p>
            </div>
          </div>
        </header>

        {/* STATS */}
        <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Orders"
            value={totalOrders}
          />

          <StatCard
            title="Pending"
            value={pendingOrders}
          />

          <StatCard
            title="Completed"
            value={completedOrders}
          />

          <StatCard
            title="Revenue"
            value={`${totalRevenue.toFixed(2)} USDT`}
          />
        </section>

        {/* ORDERS */}
        {orders.length === 0 ? (
          <EmptyOrders />
        ) : (
          <section className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
            <div className="border-b border-zinc-800 px-5 py-5 md:px-6">
              <h2 className="font-semibold">
                All Orders
              </h2>

              <p className="mt-1 text-xs text-zinc-600">
                Latest orders appear first.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[1050px]">
                <thead>
                  <tr className="border-b border-zinc-800 text-left text-xs uppercase tracking-wide text-zinc-600">
                    <th className="px-6 py-4">
                      Order
                    </th>

                    <th className="px-6 py-4">
                      Customer
                    </th>

                    <th className="px-6 py-4">
                      Payment
                    </th>

                    <th className="px-6 py-4">
                      Items
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
                  {orders.map((order) => (
                    <OrderRow
                      key={order.id}
                      order={order}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function OrderRow({
  order,
}: {
  order: AdminOrder;
}) {
  const customerName =
    order.customerName?.trim() ||
    "Customer";

  const customerEmail =
    order.customerEmail?.trim() ||
    "No email";

  const status =
    order.status?.toLowerCase() ||
    "pending";

  return (
    <tr className="border-b border-zinc-900 transition hover:bg-white/[0.02] last:border-0">

      {/* ORDER */}
      <td className="px-6 py-5">
        <p className="font-semibold">
          #{order.id}
        </p>

        <p className="mt-1 text-xs text-zinc-600">
          {new Date(
            order.createdAt
          ).toLocaleDateString()}
        </p>
      </td>

      {/* CUSTOMER */}
      <td className="px-6 py-5">
        <p className="font-medium">
          {customerName}
        </p>

        <p className="mt-1 max-w-[220px] truncate text-xs text-zinc-600">
          {customerEmail}
        </p>
      </td>

      {/* PAYMENT */}
      <td className="px-6 py-5">
        <span className="rounded-lg border border-zinc-800 bg-black px-3 py-1.5 text-xs font-medium text-zinc-300">
          {order.paymentMethod}
        </span>
      </td>

      {/* ITEMS */}
      <td className="px-6 py-5">
        <span className="text-sm text-zinc-300">
          {order.items.length}{" "}
          {order.items.length === 1
            ? "item"
            : "items"}
        </span>
      </td>

      {/* TOTAL */}
      <td className="px-6 py-5">
        <p className="font-semibold text-lime-400">
          {Number(order.total).toFixed(2)} USDT
        </p>
      </td>

      {/* STATUS */}
      <td className="px-6 py-5">
        <StatusBadge
          status={status}
          originalStatus={order.status}
        />
      </td>

      {/* ACTION */}
      <td className="px-6 py-5 text-right">
        <Link
          href={`/admin/orders/${order.id}`}
          className="inline-flex rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-lime-500 hover:bg-lime-500/10 hover:text-lime-400"
        >
          View
        </Link>
      </td>
    </tr>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
      <p className="text-sm text-zinc-500">
        {title}
      </p>

      <p className="mt-2 text-3xl font-bold">
        {value}
      </p>
    </div>
  );
}

function StatusBadge({
  status,
  originalStatus,
}: {
  status: string;
  originalStatus: string;
}) {
  let className =
    "border-yellow-500/20 bg-yellow-500/10 text-yellow-400";

  if (
    status === "completed" ||
    status === "complete" ||
    status === "paid" ||
    status === "success"
  ) {
    className =
      "border-green-500/20 bg-green-500/10 text-green-400";
  }

  if (
    status === "cancelled" ||
    status === "canceled" ||
    status === "failed" ||
    status === "rejected"
  ) {
    className =
      "border-red-500/20 bg-red-500/10 text-red-400";
  }

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-medium capitalize ${className}`}
    >
      {originalStatus}
    </span>
  );
}

function EmptyOrders() {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-950 px-6 py-20 text-center">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-800 bg-black text-2xl">
        🧾
      </div>

      <h2 className="text-lg font-semibold">
        No orders yet
      </h2>

      <p className="mt-2 text-sm text-zinc-500">
        Customer orders will appear here when
        they are created.
      </p>
    </section>
  );
}