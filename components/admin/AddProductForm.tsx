"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProductForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [country, setCountry] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [featured, setFeatured] = useState(false);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  async function uploadImage(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      alert("Image upload failed.");
      return;
    }

    setImage(data.url);
  }

  async function saveProduct() {
    if (
      !title ||
      !slug ||
      !country ||
      !price ||
      !stock ||
      !image
    ) {
      alert("Please fill all required fields.");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        slug,
        country,
        price: Number(price),
        stock: Number(stock),
        image,
        description,
        featured,
      }),
    });

    setLoading(false);

    if (!res.ok) {
      alert("Failed to create product.");
      return;
    }

    router.push("/admin/products");
    router.refresh();
  }

  return (
    <div className="rounded-3xl border border-zinc-800 bg-[#111111] p-8">

      <div className="grid gap-6 md:grid-cols-2">

        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="rounded-xl border border-zinc-700 bg-black p-4"
        />

        <input
          placeholder="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="rounded-xl border border-zinc-700 bg-black p-4"
        />

        <input
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="rounded-xl border border-zinc-700 bg-black p-4"
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="rounded-xl border border-zinc-700 bg-black p-4"
        />

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="rounded-xl border border-zinc-700 bg-black p-4"
        />

        <label className="flex items-center gap-3 rounded-xl border border-zinc-700 p-4">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
          />
          Featured Product
        </label>

      </div>

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="mt-6 h-40 w-full rounded-xl border border-zinc-700 bg-black p-4"
      />

      <div className="mt-6">

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              uploadImage(e.target.files[0]);
            }
          }}
        />

        {image && (
          <p className="mt-3 text-lime-400">
            Image uploaded successfully.
          </p>
        )}

      </div>

      <button
        onClick={saveProduct}
        disabled={loading}
        className="mt-8 rounded-xl bg-lime-400 px-8 py-4 font-bold text-black"
      >
        {loading ? "Saving..." : "Create Product"}
      </button>

    </div>
  );
}