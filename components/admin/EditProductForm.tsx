"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Product = {
  id: number;
  title: string;
  price: number;
  stock: number;
  image: string;
  description: string;
  featured: boolean;
  rating: number;
  currency: string;
};

export default function EditProductForm({
  product,
}: {
  product: Product;
}) {
  const router = useRouter();

  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [stock, setStock] = useState(product.stock);
  const [description, setDescription] = useState(product.description);
  const [featured, setFeatured] = useState(product.featured);
  const [loading, setLoading] = useState(false);

  async function saveProduct() {
    setLoading(true);

    const res = await fetch(`/api/products/${product.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        price: Number(price),
        stock: Number(stock),
        image: "/images/products/apple.png",
        description,
        featured,
        rating: product.rating,
        currency: product.currency,
      }),
    });

    setLoading(false);

    if (!res.ok) {
      alert("Failed to update product.");
      return;
    }

    alert("✅ Product Updated");

    router.push("/admin/products");
    router.refresh();
  }

  return (
    <div className="space-y-6 rounded-2xl border border-zinc-800 bg-[#111111] p-8">

      <div>
        <label className="mb-2 block text-sm text-zinc-400">
          Product Name
        </label>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-xl border border-zinc-700 bg-black p-3"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-zinc-400">
          Price (USDT)
        </label>

        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full rounded-xl border border-zinc-700 bg-black p-3"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-zinc-400">
          Stock
        </label>

        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(Number(e.target.value))}
          className="w-full rounded-xl border border-zinc-700 bg-black p-3"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-zinc-400">
          Description
        </label>

        <textarea
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-xl border border-zinc-700 bg-black p-3"
        />
      </div>

      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={featured}
          onChange={(e) => setFeatured(e.target.checked)}
        />

        <span>Featured Product</span>
      </label>

      <button
        onClick={saveProduct}
        disabled={loading}
        className="w-full rounded-xl bg-lime-400 py-4 text-lg font-bold text-black transition hover:scale-105 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>

    </div>
  );
}