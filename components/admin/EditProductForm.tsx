// D:\Elite-ID\frontend\components\admin\EditProductForm.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Product = {
  id: number;
  title: string;
  country: string;
  price: number;
  stock: number;
  image: string;
  description: string;
  featured: boolean;
  topRated: boolean;
  bestSeller: boolean;
  rare: boolean;
  features: string[];
  rating: number;
  currency: string;
  workFileUrl: string | null;
  workFileName: string | null;
  workFileType: string | null;
};

export default function EditProductForm({
  product,
}: {
  product: Product;
}) {
  const router = useRouter();

  const [form, setForm] = useState<Product>({
    ...product,
    features: Array.isArray(product.features)
      ? product.features
      : [],
  });

  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] =
    useState(false);
  const [uploadingWorkFile, setUploadingWorkFile] =
    useState(false);

  const featureList = [
    "App Store",
    "iCloud 5GB",
    "2FA",
    "Mailbox",
  ];

  function updateField<K extends keyof Product>(
    key: K,
    value: Product[K]
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function toggleFeature(item: string) {
    setForm((prev) => ({
      ...prev,
      features: prev.features.includes(item)
        ? prev.features.filter(
            (feature) => feature !== item
          )
        : [...prev.features, item],
    }));
  }

  async function uploadImage(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      e.target.value = "";
      return;
    }

    setUploadingImage(true);

    try {
      const data = new FormData();
      data.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        alert(
          result.message ||
            "Failed to upload image."
        );
        return;
      }

      updateField("image", result.url);
    } catch (error) {
      console.error(
        "IMAGE UPLOAD ERROR:",
        error
      );

      alert("Failed to upload image.");
    } finally {
      setUploadingImage(false);
      e.target.value = "";
    }
  }

  async function uploadWorkFile(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    const fileName =
      file.name.toLowerCase();

    const allowed =
      fileName.endsWith(".csv") ||
      fileName.endsWith(".xls") ||
      fileName.endsWith(".xlsx");

    if (!allowed) {
      alert(
        "Only CSV, XLS, and XLSX files are allowed."
      );

      e.target.value = "";
      return;
    }

    setUploadingWorkFile(true);

    try {
      const data = new FormData();
      data.append("file", file);

      const response = await fetch(
        "/api/upload/work",
        {
          method: "POST",
          body: data,
        }
      );

      const result = await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        alert(
          result.message ||
            "Failed to upload work file."
        );
        return;
      }

      setForm((prev) => ({
        ...prev,
        workFileUrl: result.url,
        workFileName:
          result.fileName || file.name,
        workFileType:
          result.fileType || file.type,
      }));
    } catch (error) {
      console.error(
        "WORK FILE UPLOAD ERROR:",
        error
      );

      alert(
        "Failed to upload work file."
      );
    } finally {
      setUploadingWorkFile(false);
      e.target.value = "";
    }
  }

  async function saveProduct() {
    const title = form.title.trim();
    const country = form.country.trim();
    const price = Number(form.price);
    const stock = Number(form.stock);
    const rating = Number(form.rating);

    if (!title) {
      alert("Product title is required.");
      return;
    }

    if (!country) {
      alert("Country is required.");
      return;
    }

    if (!form.image) {
      alert("Product image is required.");
      return;
    }

    if (
      !Number.isFinite(price) ||
      price < 0
    ) {
      alert("Please enter a valid price.");
      return;
    }

    if (
      !Number.isInteger(stock) ||
      stock < 0
    ) {
      alert("Please enter a valid stock.");
      return;
    }

    if (
      !Number.isFinite(rating) ||
      rating < 0 ||
      rating > 5
    ) {
      alert(
        "Rating must be between 0 and 5."
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `/api/products/${product.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            country,
            price,
            stock,
            rating,
            currency:
              form.currency.trim() || "USDT",
            image: form.image,
            description:
              form.description.trim(),
            featured: Boolean(form.featured),
            topRated: Boolean(form.topRated),
            bestSeller: Boolean(
              form.bestSeller
            ),
            rare: Boolean(form.rare),
            features: form.features,
            workFileUrl:
              form.workFileUrl || null,
            workFileName:
              form.workFileName || null,
            workFileType:
              form.workFileType || null,
          }),
        }
      );

      const result = await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        alert(
          result.message ||
            "Failed to update product."
        );
        return;
      }

      alert("Product updated successfully.");

      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      console.error(
        "UPDATE PRODUCT ERROR:",
        error
      );

      alert(
        "Failed to update product."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6 rounded-2xl border border-zinc-800 bg-zinc-950 p-5 md:p-8">
      {/* Basic Information */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold">
          Product Information
        </h2>

        <input
          value={form.title}
          onChange={(e) =>
            updateField(
              "title",
              e.target.value
            )
          }
          placeholder="Product Name"
          className="w-full rounded-xl border border-zinc-700 bg-black p-3 outline-none transition focus:border-lime-400"
        />

        <input
          value={form.country}
          onChange={(e) =>
            updateField(
              "country",
              e.target.value
            )
          }
          placeholder="Country"
          className="w-full rounded-xl border border-zinc-700 bg-black p-3 outline-none transition focus:border-lime-400"
        />

        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            onChange={(e) =>
              updateField(
                "price",
                Number(e.target.value)
              )
            }
            placeholder="Price"
            className="w-full rounded-xl border border-zinc-700 bg-black p-3 outline-none transition focus:border-lime-400"
          />

          <input
            type="number"
            min="0"
            step="1"
            value={form.stock}
            onChange={(e) =>
              updateField(
                "stock",
                Number(e.target.value)
              )
            }
            placeholder="Stock"
            className="w-full rounded-xl border border-zinc-700 bg-black p-3 outline-none transition focus:border-lime-400"
          />

          <input
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={form.rating}
            onChange={(e) =>
              updateField(
                "rating",
                Number(e.target.value)
              )
            }
            placeholder="Rating"
            className="w-full rounded-xl border border-zinc-700 bg-black p-3 outline-none transition focus:border-lime-400"
          />

          <input
            value={form.currency}
            onChange={(e) =>
              updateField(
                "currency",
                e.target.value
              )
            }
            placeholder="Currency"
            className="w-full rounded-xl border border-zinc-700 bg-black p-3 outline-none transition focus:border-lime-400"
          />
        </div>
      </div>

      {/* IMAGE */}
      <div className="space-y-4 rounded-xl border border-zinc-800 p-5">
        <div>
          <h3 className="font-bold">
            Product Image
          </h3>

          <p className="mt-1 text-sm text-zinc-500">
            Upload a new product image.
          </p>
        </div>

        {form.image ? (
          <div className="overflow-hidden rounded-xl border border-zinc-700 bg-black">
            <Image
              src={form.image}
              alt="Product preview"
              width={320}
              height={320}
              unoptimized
              className="h-64 w-full object-contain"
            />
          </div>
        ) : (
          <div className="flex h-64 items-center justify-center rounded-xl border border-zinc-800 bg-black text-sm text-zinc-600">
            No image
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={uploadImage}
          disabled={
            uploadingImage ||
            loading ||
            uploadingWorkFile
          }
          className="w-full rounded-xl border border-zinc-700 bg-black p-3"
        />

        {uploadingImage && (
          <p className="text-sm text-lime-400">
            Uploading image...
          </p>
        )}
      </div>

      {/* DESCRIPTION */}
      <div className="space-y-3">
        <h3 className="font-bold">
          Description
        </h3>

        <textarea
          rows={6}
          value={form.description}
          onChange={(e) =>
            updateField(
              "description",
              e.target.value
            )
          }
          placeholder="Description"
          className="w-full resize-y rounded-xl border border-zinc-700 bg-black p-3 outline-none transition focus:border-lime-400"
        />
      </div>

      {/* FEATURES */}
      <div className="space-y-3">
        <h3 className="font-bold">
          Product Features
        </h3>

        {featureList.map((item) => (
          <label
            key={item}
            className="flex cursor-pointer items-center gap-3 rounded-xl border border-zinc-700 bg-black p-3 transition hover:border-zinc-500"
          >
            <input
              type="checkbox"
              checked={form.features.includes(
                item
              )}
              onChange={() =>
                toggleFeature(item)
              }
              className="h-4 w-4 accent-lime-400"
            />

            <span>{item}</span>
          </label>
        ))}
      </div>

      {/* BADGES */}
      <div className="space-y-3">
        <h3 className="font-bold">
          Badges
        </h3>

        {[
          ["featured", "Featured"],
          ["topRated", "Top Rated"],
          ["bestSeller", "Best Seller"],
          ["rare", "Rare"],
        ].map(([key, label]) => (
          <label
            key={key}
            className="flex cursor-pointer items-center gap-3 rounded-xl border border-zinc-700 bg-black p-3 transition hover:border-zinc-500"
          >
            <input
              type="checkbox"
              checked={Boolean(
                form[
                  key as keyof Product
                ]
              )}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  [key]:
                    e.target.checked,
                }))
              }
              className="h-4 w-4 accent-lime-400"
            />

            <span>{label}</span>
          </label>
        ))}
      </div>

      {/* WORK FILE */}
      <div className="space-y-4 rounded-xl border border-zinc-700 p-5">
        <div>
          <h3 className="font-bold">
            Product Work File
          </h3>

          <p className="mt-1 text-sm text-zinc-500">
            Upload CSV, XLS, or XLSX.
          </p>
        </div>

        {form.workFileName && (
          <div className="rounded-xl border border-lime-400/20 bg-lime-400/5 p-4">
            <p className="font-semibold text-lime-400">
              Current Work File
            </p>

            <p className="mt-1 break-all text-sm text-zinc-300">
              {form.workFileName}
            </p>

            {form.workFileUrl && (
              <a
                href={form.workFileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm font-semibold text-lime-400 hover:underline"
              >
                Open File →
              </a>
            )}
          </div>
        )}

        <input
          type="file"
          accept=".csv,.xls,.xlsx"
          onChange={uploadWorkFile}
          disabled={
            uploadingWorkFile ||
            loading ||
            uploadingImage
          }
          className="w-full rounded-xl border border-zinc-700 bg-black p-3"
        />

        {uploadingWorkFile && (
          <p className="text-sm text-lime-400">
            Uploading work file...
          </p>
        )}
      </div>

      {/* SAVE */}
      <button
        type="button"
        onClick={saveProduct}
        disabled={
          loading ||
          uploadingImage ||
          uploadingWorkFile
        }
        className="w-full rounded-xl bg-lime-400 py-4 font-bold text-black transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading
          ? "Saving..."
          : "Save Changes"}
      </button>
    </div>
  );
}