"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const router = useRouter();

  const { cart, clearCart } = useCart();

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("USDT");

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  async function placeOrder() {
    if (!customerName || !customerEmail) {
      alert("Please fill all fields.");
      return;
    }

    const response = await fetch("/api/orders", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        customerName,
        customerEmail,
        paymentMethod,

        items: cart.map((item) => ({
          productId: item.id,
          country: item.country,
          quantity: item.quantity,
          price: item.price,
        })),
      }),
    });

    if (!response.ok) {
      alert("Failed to create order.");
      return;
    }

    clearCart();

    router.push("/success");
  }

  return (
    <main className="min-h-screen bg-[#090909] py-20 text-white">

      <div className="mx-auto max-w-6xl grid gap-10 lg:grid-cols-2 px-6">

        <div className="rounded-2xl border border-zinc-800 bg-[#111111] p-8">

          <h1 className="text-4xl font-bold">
            Checkout
          </h1>

          <div className="mt-8 space-y-5">

            <input
              value={customerName}
              onChange={(e) =>
                setCustomerName(e.target.value)
              }
              placeholder="Full Name"
              className="w-full rounded-xl border border-zinc-700 bg-black p-4"
            />

            <input
              value={customerEmail}
              onChange={(e) =>
                setCustomerEmail(e.target.value)
              }
              placeholder="Email Address"
              className="w-full rounded-xl border border-zinc-700 bg-black p-4"
            />

            <select
              value={paymentMethod}
              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }
              className="w-full rounded-xl border border-zinc-700 bg-black p-4"
            >
              <option>USDT</option>
              <option>TRC20</option>
              <option>Binance Pay</option>
            </select>

          </div>

        </div>

        <div className="rounded-2xl border border-zinc-800 bg-[#111111] p-8">

          <h2 className="text-3xl font-bold">
            Order Summary
          </h2>

          <div className="mt-8 space-y-4">

            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between"
              >
                <span>
                  {item.country} × {item.quantity}
                </span>

                <span>
                  {(item.price * item.quantity).toFixed(2)} USDT
                </span>
              </div>
            ))}

          </div>

          <div className="mt-8 border-t border-zinc-700 pt-6 flex justify-between text-2xl font-bold">

            <span>Total</span>

            <span className="text-lime-400">
              {total.toFixed(2)} USDT
            </span>

          </div>

          <button
            onClick={placeOrder}
            className="mt-10 w-full rounded-xl bg-lime-400 py-4 text-xl font-bold text-black transition hover:scale-105"
          >
            Place Order
          </button>

        </div>

      </div>

    </main>
  );
}