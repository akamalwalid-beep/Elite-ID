"use client";

import { useState } from "react";

export default function AddProductPage() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("USDT");
  const [rating, setRating] = useState("");
  const image = "/images/products/apple.png";
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("100");
  const [featured, setFeatured] = useState(false);

  async function addProduct(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        price: Number(price),
        currency,
        rating: Number(rating),
        image,
        description,
        stock: Number(stock),
        featured,
      }),
    });

    if (res.ok) {
      alert("✅ Product Added");

      setTitle("");
      setPrice("");
      setRating("");
      setDescription("");
      setStock("100");
      setFeatured(false);
    } else {
      alert("❌ Error");
    }
  }

  return (
    <main className="min-h-screen bg-[#090909] p-10 text-white">
      <div className="mx-auto max-w-3xl">

        <h1 className="mb-10 text-5xl font-bold">
          Add Product
        </h1>

        <form
          onSubmit={addProduct}
          className="space-y-5"
        >

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Product Name"
            className="w-full rounded-xl bg-zinc-900 p-4"
          />

          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            className="w-full rounded-xl bg-zinc-900 p-4"
          />

          <input
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full rounded-xl bg-zinc-900 p-4"
          />

          <input
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            placeholder="Rating"
            className="w-full rounded-xl bg-zinc-900 p-4"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="h-40 w-full rounded-xl bg-zinc-900 p-4"
          />

          <input
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="Stock"
            className="w-full rounded-xl bg-zinc-900 p-4"
          />

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
            />
            Featured Product
          </label>

          <button
            className="w-full rounded-xl bg-lime-400 py-4 text-xl font-bold text-black"
          >
            Add Product
          </button>

        </form>

      </div>
    </main>
  );
}