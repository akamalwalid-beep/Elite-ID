import { prisma } from "@/lib/prisma";
import OrdersTable from "@/components/admin/OrdersTable";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: {
      items: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedOrders = orders.map((order) => ({
    ...order,
    total: Number(order.total),
    createdAt: order.createdAt.toISOString(),
  }));

  return (
    <main className="min-h-screen bg-[#090909] p-10 text-white">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8 flex items-center justify-between">

          <div>

            <h1 className="text-5xl font-bold">
              Orders
            </h1>

            <p className="mt-2 text-zinc-400">
              Manage customer orders.
            </p>

          </div>

          <div className="rounded-xl border border-zinc-800 bg-[#111111] px-6 py-3">

            <span className="text-zinc-400">
              Total Orders
            </span>

            <p className="text-3xl font-bold text-lime-400">
              {formattedOrders.length}
            </p>

          </div>

        </div>

        <OrdersTable orders={formattedOrders} />

      </div>
    </main>
  );
}