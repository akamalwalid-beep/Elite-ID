import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#090909] p-10 text-white">
      <div className="mx-auto max-w-6xl">

        <h1 className="mb-8 text-5xl font-bold">
          Order #{order.id}
        </h1>

        <div className="grid gap-6 md:grid-cols-2">

          <div className="rounded-2xl border border-zinc-800 bg-[#111111] p-6">

            <h2 className="mb-6 text-2xl font-bold">
              Customer Information
            </h2>

            <div className="space-y-4">

              <div>
                <p className="text-zinc-500">Name</p>
                <p>{order.customerName}</p>
              </div>

              <div>
                <p className="text-zinc-500">Email</p>
                <p>{order.customerEmail}</p>
              </div>

              <div>
                <p className="text-zinc-500">Payment</p>
                <p>{order.paymentMethod}</p>
              </div>

              <div>
                <p className="text-zinc-500">Status</p>
                <p>{order.status}</p>
              </div>

              <div>
                <p className="text-zinc-500">Created</p>
                <p>
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-zinc-500">Total</p>
                <p className="text-2xl font-bold text-lime-400">
                  {Number(order.total).toFixed(2)} USDT
                </p>
              </div>

            </div>

          </div>

          <div className="rounded-2xl border border-zinc-800 bg-[#111111] p-6">

            <h2 className="mb-6 text-2xl font-bold">
              Ordered Products
            </h2>

            <div className="space-y-4">

              {order.items.map((item) => (

                <div
                  key={item.id}
                  className="rounded-xl border border-zinc-700 p-4"
                >

                  <h3 className="font-bold">
                    {item.product.title}
                  </h3>

                  <p className="mt-2 text-zinc-400">
                    Quantity: {item.quantity}
                  </p>

                  <p className="text-lime-400">
                    {Number(item.price).toFixed(2)} USDT
                  </p>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>
    </main>
  );
}