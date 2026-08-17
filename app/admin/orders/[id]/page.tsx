// D:\Elite-ID\frontend\app\admin\orders\[id]\page.tsx

import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function OrderDetailsPage({
  params,
}: Props) {
  const { id } = await params;
  const orderId = Number(id);

  if (
    !Number.isInteger(orderId) ||
    orderId <= 0
  ) {
    notFound();
  }

  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      items: true,
    },
  });

  if (!order) {
    notFound();
  }

  const total = Number(order.total);

  return (
    <main className="min-h-screen bg-black px-5 py-8 text-white md:px-8 md:py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/admin/orders"
            className="inline-flex items-center rounded-xl border border-zinc-800 bg-zinc-950 px-5 py-3 text-sm font-semibold text-zinc-300 transition hover:border-zinc-600 hover:text-white"
          >
            ← Back to Orders
          </Link>

          <Link
            href="/admin"
            className="text-sm text-zinc-500 transition hover:text-white"
          >
            Admin Dashboard
          </Link>
        </div>

        <div className="mb-8">
          <p className="mb-2 text-sm font-medium text-lime-400">
            Elite ID Admin
          </p>

          <h1 className="text-3xl font-bold md:text-4xl">
            Order #{order.id}
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Order details and purchased products.
          </p>
        </div>

        <div className="space-y-6">
          {/* CUSTOMER + PAYMENT */}
          <section className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-600">
                Customer
              </p>

              <h2 className="mt-3 text-xl font-bold">
                {order.customerName}
              </h2>

              <p className="mt-2 break-all text-sm text-zinc-500">
                {order.customerEmail}
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-600">
                Payment
              </p>

              <p className="mt-3 font-semibold text-lime-400">
                {order.paymentMethod}
              </p>

              <p className="mt-3 text-3xl font-black">
                {total.toFixed(2)} USDT
              </p>
            </div>
          </section>

          {/* PRODUCTS */}
          <section className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
            <div className="border-b border-zinc-800 px-6 py-5">
              <h2 className="text-xl font-bold">
                Products
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                {order.items.length}{" "}
                {order.items.length === 1
                  ? "item"
                  : "items"}{" "}
                in this order.
              </p>
            </div>

            {order.items.length === 0 ? (
              <div className="px-6 py-12 text-center text-sm text-zinc-600">
                No products found in this order.
              </div>
            ) : (
              <div className="divide-y divide-zinc-900">
                {order.items.map((item) => {
                  const itemPrice = Number(
                    item.price
                  );

                  const itemTotal =
                    itemPrice * item.quantity;

                  return (
                    <div
                      key={item.id}
                      className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <p className="font-semibold">
                          {item.country}
                        </p>

                        <p className="mt-1 text-sm text-zinc-500">
                          Quantity:{" "}
                          {item.quantity}
                        </p>
                      </div>

                      <div className="sm:text-right">
                        <p className="font-semibold text-lime-400">
                          {itemPrice.toFixed(2)} USDT
                        </p>

                        <p className="mt-1 text-sm text-zinc-500">
                          Total:{" "}
                          {itemTotal.toFixed(2)}{" "}
                          USDT
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="flex items-center justify-between border-t border-zinc-800 px-6 py-5">
              <span className="font-semibold text-zinc-400">
                Order Total
              </span>

              <span className="text-xl font-black text-lime-400">
                {total.toFixed(2)} USDT
              </span>
            </div>
          </section>

          {/* STATUS */}
          <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-600">
              Order Status
            </p>

            <div className="mt-4">
              <StatusBadge status={order.status} />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const normalizedStatus =
    status.toLowerCase();

  let className =
    "bg-yellow-500/10 text-yellow-400";

  if (
    normalizedStatus === "completed" ||
    normalizedStatus === "complete" ||
    normalizedStatus === "paid" ||
    normalizedStatus === "success"
  ) {
    className =
      "bg-green-500/10 text-green-400";
  }

  if (
    normalizedStatus === "cancelled" ||
    normalizedStatus === "canceled" ||
    normalizedStatus === "failed" ||
    normalizedStatus === "rejected"
  ) {
    className =
      "bg-red-500/10 text-red-400";
  }

  return (
    <span
      className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${className}`}
    >
      {status}
    </span>
  );
}