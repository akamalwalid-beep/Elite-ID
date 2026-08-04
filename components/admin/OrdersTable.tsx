"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Order = {
  id: number;
  customerName: string;
  customerEmail: string;
  total: number;
  status: string;
  createdAt: Date | string;
  items: { id: number }[];
};

export default function OrdersTable({
  orders,
}: {
  orders: Order[];
}) {
  const [rows, setRows] = useState(orders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  async function updateStatus(id: number, status: string) {
    const res = await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    if (!res.ok) {
      alert("Failed to update status");
      return;
    }

    setRows((prev) =>
      prev.map((order) =>
        order.id === id
          ? {
              ...order,
              status,
            }
          : order
      )
    );
  }

  const filteredOrders = useMemo(() => {
    return rows.filter((order) => {
      const matchesSearch =
        order.customerName
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        order.customerEmail
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        String(order.id).includes(search);

      const matchesStatus =
        statusFilter === "All" ||
        order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [rows, search, statusFilter]);

  function getStatusColor(status: string) {
    switch (status) {
      case "Completed":
        return "bg-green-500/20 text-green-400 border border-green-500/20";

      case "Paid":
        return "bg-blue-500/20 text-blue-400 border border-blue-500/20";

      case "Cancelled":
        return "bg-red-500/20 text-red-400 border border-red-500/20";

      default:
        return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/20";
    }
  }

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by customer, email or Order ID..."
          className="w-full rounded-xl border border-zinc-800 bg-[#111111] px-4 py-3 text-white outline-none transition focus:border-lime-400 md:max-w-md"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-xl border border-zinc-800 bg-[#111111] px-4 py-3 text-white outline-none"
        >
          <option>All</option>
          <option>Pending</option>
          <option>Paid</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-[#090909]">
        <table className="w-full">
          <thead className="bg-[#111111]">
            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Items</th>
              <th className="p-4 text-left">Total</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="p-10 text-center text-zinc-500"
                >
                  No orders found.
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-t border-zinc-800 transition hover:bg-zinc-900/40"
                >
                  <td className="p-4 font-semibold">
                    #{order.id}
                  </td>

                  <td className="p-4">
                    {order.customerName}
                  </td>

                  <td className="p-4 text-zinc-400">
                    {order.customerEmail}
                  </td>

                  <td className="p-4">
                    {order.items.length}
                  </td>

                  <td className="p-4 font-bold text-lime-400">
                    {Number(order.total).toFixed(2)} USDT
                  </td>

                  <td className="p-4">
                    <div className="flex flex-col gap-2">
                      <span
                        className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>

                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateStatus(order.id, e.target.value)
                        }
                        className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white outline-none"
                      >
                        <option>Pending</option>
                        <option>Paid</option>
                        <option>Completed</option>
                        <option>Cancelled</option>
                      </select>
                    </div>
                  </td>

                  <td className="p-4 whitespace-nowrap text-zinc-400">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>

                  <td className="p-4 text-center">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="inline-flex rounded-lg bg-lime-400 px-4 py-2 font-semibold text-black transition hover:bg-lime-300"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}