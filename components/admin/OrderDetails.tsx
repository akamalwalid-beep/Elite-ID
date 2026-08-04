"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";

type Product = {
  id: number;
  title: string;
  image: string;
  country: string;
  price: number;
};

type Item = {
  id: number;
  quantity: number;
  price: number;
  country: string;
  product: Product;
};

type Order = {
  id: number;
  customerName: string;
  customerEmail: string;
  paymentMethod: string;
  total: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  items: Item[];
};

export default function OrderDetails({
  order,
}: {
  order: Order;
}) {
  const [status, setStatus] = useState(order.status);

  async function saveStatus(value: string) {
    setStatus(value);

    await fetch(`/api/orders/${order.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: value,
      }),
    });
  }

  return (
    <div className="mx-auto max-w-7xl">

      <div className="mb-8 flex items-center justify-between">

        <div>

          <Link
            href="/admin/orders"
            className="mb-5 inline-flex items-center gap-2 text-zinc-400 transition hover:text-white"
          >
            <ArrowLeft size={18} />
            Back
          </Link>

          <h1 className="text-5xl font-bold">
            Order #{order.id}
          </h1>

          <p className="mt-2 text-zinc-500">
            {new Date(order.createdAt).toLocaleString()}
          </p>

        </div>

        <select
          value={status}
          onChange={(e) => saveStatus(e.target.value)}
          className="rounded-xl border border-zinc-700 bg-[#111111] px-5 py-3"
        >
          <option>Pending</option>
          <option>Paid</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>

      </div>

      <div className="grid gap-8 lg:grid-cols-3">

        <div className="rounded-3xl border border-zinc-800 bg-[#111111] p-8">

          <h2 className="text-2xl font-bold">
            Customer
          </h2>

          <div className="mt-6 space-y-5">

            <div>
              <p className="text-sm text-zinc-500">
                Full Name
              </p>

              <p className="mt-1 font-semibold">
                {order.customerName}
              </p>
            </div>

            <div>
              <p className="text-sm text-zinc-500">
                Email
              </p>

              <p className="mt-1 font-semibold">
                {order.customerEmail}
              </p>
            </div>

            <div>
              <p className="text-sm text-zinc-500">
                Payment
              </p>

              <p className="mt-1 font-semibold text-lime-400">
                {order.paymentMethod}
              </p>
            </div>

            <div>
              <p className="text-sm text-zinc-500">
                Total
              </p>

              <p className="mt-1 text-3xl font-bold text-lime-400">
                {order.total.toFixed(2)} USDT
              </p>
            </div>

          </div>

        </div>

        <div className="lg:col-span-2 rounded-3xl border border-zinc-800 bg-[#111111] p-8">

          <h2 className="mb-8 text-2xl font-bold">
            Ordered Products
          </h2>

          <div className="space-y-5">

            {order.items.map((item) => (

              <div
                key={item.id}
                className="flex items-center justify-between rounded-2xl border border-zinc-800 p-5"
              >

                <div className="flex items-center gap-5">

                  <Image
                    src={item.product.image}
                    alt={item.product.title}
                    width={70}
                    height={70}
                    className="rounded-xl object-cover"
                  />

                  <div>

                    <h3 className="font-bold">
                      {item.product.title}
                    </h3>

                    <p className="mt-1 text-zinc-500">
                      {item.country}
                    </p>

                    <p className="mt-2 text-sm text-zinc-400">
                      Qty: {item.quantity}
                    </p>

                  </div>

                </div>

                <div className="text-right">

                  <p className="font-bold text-lime-400">
                    {(item.price * item.quantity).toFixed(2)} USDT
                  </p>

                  <p className="mt-2 text-sm text-zinc-500">
                    {item.price.toFixed(2)} each
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}