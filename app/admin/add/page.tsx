"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AddProductPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [country, setCountry] = useState("USA");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("100");
  const [rating, setRating] = useState("5");
  const [currency, setCurrency] = useState("USDT");

  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const [features, setFeatures] = useState<string[]>([]);

  const [featured, setFeatured] = useState(false);
  const [topRated, setTopRated] = useState(false);
  const [bestSeller, setBestSeller] = useState(false);
  const [rare, setRare] = useState(false);

  const [workFileUrl, setWorkFileUrl] = useState("");
  const [workFileName, setWorkFileName] = useState("");
  const [workFileType, setWorkFileType] = useState("");

  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingWorkFile, setUploadingWorkFile] = useState(false);
  const [loading, setLoading] = useState(false);

  const featureList = [
    "AppStore",
    "iCloud 5GB",
    "2FA",
    "Mailbox",
  ];

  function toggleFeature(item: string) {
    setFeatures((prev) =>
      prev.includes(item)
        ? prev.filter((x) => x !== item)
        : [...prev, item]
    );
  }

  async function uploadImage(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    setUploadingImage(true);

    try {
      const data = new FormData();

      data.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || "Image upload failed.");
        return;
      }

      setImage(result.url);
    } catch (error) {
      console.error(error);
      alert("Image upload failed.");
    } finally {
      setUploadingImage(false);
    }
  }

  async function uploadWorkFile(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    const fileName = file.name.toLowerCase();

    if (
      !fileName.endsWith(".xlsx") &&
      !fileName.endsWith(".csv")
    ) {
      alert("Only XLSX and CSV files are allowed.");
      e.target.value = "";
      return;
    }

    setUploadingWorkFile(true);

    try {
      const data = new FormData();

      data.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || "File upload failed.");
        return;
      }

      setWorkFileUrl(result.url);
      setWorkFileName(result.fileName);
      setWorkFileType(result.fileType);
    } catch (error) {
      console.error(error);
      alert("Work file upload failed.");
    } finally {
      setUploadingWorkFile(false);
    }
  }

  async function addProduct(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!title.trim()) {
      alert("Product name is required.");
      return;
    }

    if (!image) {
      alert("Please upload a product image.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          country,
          price: Number(price),
          currency,
          rating: Number(rating),
          stock: Number(stock),
          image,
          description,

          features,

          featured,
          topRated,
          bestSeller,
          rare,

          workFileUrl: workFileUrl || null,
          workFileName: workFileName || null,
          workFileType: workFileType || null,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(
          result.message ||
            "Failed to create product."
        );
        return;
      }

      alert("✅ Product Added");

      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to create product.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#090909] p-10 text-white">
      <div className="mx-auto max-w-4xl">

        <h1 className="mb-8 text-5xl font-bold">
          Add Product
        </h1>

        <form
          onSubmit={addProduct}
          className="
            space-y-6
            rounded-2xl
            border
            border-zinc-800
            bg-[#111111]
            p-8
          "
        >

          {/* PRODUCT NAME */}

          <input
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            placeholder="Product Name"
            className="
              w-full
              rounded-xl
              border
              border-zinc-700
              bg-black
              p-3
              text-white
              outline-none
              focus:border-lime-400
            "
          />

          {/* COUNTRY */}

          <input
            value={country}
            onChange={(e) =>
              setCountry(e.target.value)
            }
            placeholder="Country"
            className="
              w-full
              rounded-xl
              border
              border-zinc-700
              bg-black
              p-3
              text-white
              outline-none
              focus:border-lime-400
            "
          />

          {/* PRICE */}

          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
            placeholder="Price"
            className="
              w-full
              rounded-xl
              border
              border-zinc-700
              bg-black
              p-3
              text-white
              outline-none
              focus:border-lime-400
            "
          />

          {/* STOCK */}

          <input
            type="number"
            value={stock}
            onChange={(e) =>
              setStock(e.target.value)
            }
            placeholder="Stock"
            className="
              w-full
              rounded-xl
              border
              border-zinc-700
              bg-black
              p-3
              text-white
              outline-none
              focus:border-lime-400
            "
          />

          {/* RATING */}

          <input
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={rating}
            onChange={(e) =>
              setRating(e.target.value)
            }
            placeholder="Rating"
            className="
              w-full
              rounded-xl
              border
              border-zinc-700
              bg-black
              p-3
              text-white
              outline-none
              focus:border-lime-400
            "
          />

          {/* CURRENCY */}

          <input
            value={currency}
            onChange={(e) =>
              setCurrency(e.target.value)
            }
            placeholder="Currency"
            className="
              w-full
              rounded-xl
              border
              border-zinc-700
              bg-black
              p-3
              text-white
              outline-none
              focus:border-lime-400
            "
          />

          {/* PRODUCT IMAGE */}

          <div className="space-y-4">

            <label className="block font-bold">
              Product Image
            </label>

            {image && (
              <Image
                src={image}
                alt="Product preview"
                width={120}
                height={120}
                className="
                  rounded-xl
                  border
                  border-zinc-700
                  object-cover
                "
              />
            )}

            <input
              type="file"
              accept="image/*"
              onChange={uploadImage}
              disabled={uploadingImage}
              className="
                w-full
                rounded-xl
                border
                border-zinc-700
                bg-black
                p-3
              "
            />

            {uploadingImage && (
              <p className="text-lime-400">
                Uploading image...
              </p>
            )}

          </div>

          {/* DESCRIPTION */}

          <textarea
            rows={5}
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            placeholder="Description"
            className="
              w-full
              rounded-xl
              border
              border-zinc-700
              bg-black
              p-3
              text-white
              outline-none
              focus:border-lime-400
            "
          />

          {/* FEATURES */}

          <div className="space-y-3">

            <h3 className="font-bold">
              Product Features
            </h3>

            {featureList.map((item) => (
              <label
                key={item}
                className="flex items-center gap-3"
              >
                <input
                  type="checkbox"
                  checked={features.includes(item)}
                  onChange={() =>
                    toggleFeature(item)
                  }
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

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) =>
                  setFeatured(e.target.checked)
                }
              />

              <span>Featured</span>
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={topRated}
                onChange={(e) =>
                  setTopRated(e.target.checked)
                }
              />

              <span>Top Rated</span>
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={bestSeller}
                onChange={(e) =>
                  setBestSeller(e.target.checked)
                }
              />

              <span>Best Seller</span>
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={rare}
                onChange={(e) =>
                  setRare(e.target.checked)
                }
              />

              <span>Rare</span>
            </label>

          </div>

          {/* WORK FILE */}

          <div className="space-y-4">

            <div>
              <h3 className="font-bold">
                Product Work File
              </h3>

              <p className="mt-1 text-sm text-zinc-500">
                Upload the XLSX or CSV file containing
                the product work.
              </p>
            </div>

            <input
              type="file"
              accept=".xlsx,.csv"
              onChange={uploadWorkFile}
              disabled={uploadingWorkFile}
              className="
                w-full
                rounded-xl
                border
                border-zinc-700
                bg-black
                p-3
              "
            />

            {uploadingWorkFile && (
              <p className="text-lime-400">
                Uploading work file...
              </p>
            )}

            {workFileName && (
              <div
                className="
                  rounded-xl
                  border
                  border-lime-400/20
                  bg-lime-400/5
                  p-4
                "
              >
                <p className="font-semibold text-lime-400">
                  File uploaded
                </p>

                <p className="mt-1 text-sm text-zinc-300">
                  {workFileName}
                </p>
              </div>
            )}

          </div>

          {/* SUBMIT */}

          <button
            type="submit"
            disabled={
              loading ||
              uploadingImage ||
              uploadingWorkFile
            }
            className="
              w-full
              rounded-xl
              bg-lime-400
              py-4
              font-bold
              text-black
              transition
              hover:bg-lime-300
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {loading
              ? "Adding Product..."
              : "Add Product"}
          </button>

        </form>
      </div>
    </main>
  );
}