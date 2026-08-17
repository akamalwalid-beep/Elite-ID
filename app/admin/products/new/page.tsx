// D:\Elite-ID\frontend\app\admin\products\new\page.tsx

"use client";

import {
  ChangeEvent,
  FormEvent,
  useState,
} from "react";
import { useRouter } from "next/navigation";

const FEATURE_OPTIONS = [
  "App Store",
  "iCloud 5GB",
  "2FA",
  "Mailbox",
];

const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
const MAX_WORK_FILE_SIZE = 25 * 1024 * 1024;

export default function NewProductPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [country, setCountry] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [currency, setCurrency] = useState("USDT");
  const [description, setDescription] = useState("");

  const [imageUrl, setImageUrl] = useState("");
  const [workFileUrl, setWorkFileUrl] = useState("");
  const [workFileName, setWorkFileName] = useState("");
  const [workFileType, setWorkFileType] = useState("");

  const [features, setFeatures] = useState<string[]>([]);

  const [featured, setFeatured] = useState(false);
  const [topRated, setTopRated] = useState(false);
  const [bestSeller, setBestSeller] = useState(false);
  const [rare, setRare] = useState(false);

  const [uploadingImage, setUploadingImage] =
    useState(false);
  const [uploadingWork, setUploadingWork] =
    useState(false);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function toggleFeature(feature: string) {
    setFeatures((current) =>
      current.includes(feature)
        ? current.filter((item) => item !== feature)
        : [...current, feature]
    );
  }

  async function uploadImage(file: File) {
    setError("");
    setMessage("");

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setError("Image size must be 10MB or less.");
      return;
    }

    setUploadingImage(true);

    try {
      const formData = new FormData();

      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data?.success || !data?.url) {
        throw new Error(
          data?.message ||
            "Image upload failed."
        );
      }

      setImageUrl(data.url);

      setMessage(
        "Image uploaded successfully."
      );
    } catch (err: any) {
      console.error(
        "IMAGE UPLOAD ERROR:",
        err
      );

      setImageUrl("");

      setError(
        err?.message ||
          "Image upload failed."
      );
    } finally {
      setUploadingImage(false);
    }
  }

  async function uploadWorkFile(file: File) {
    setError("");
    setMessage("");

    const extension =
      file.name
        .toLowerCase()
        .split(".")
        .pop() || "";

    const allowed = [
      "csv",
      "xls",
      "xlsx",
    ];

    if (!allowed.includes(extension)) {
      setError(
        "Only CSV, XLS, and XLSX files are allowed."
      );
      return;
    }

    if (file.size > MAX_WORK_FILE_SIZE) {
      setError(
        "Work file size must be 25MB or less."
      );
      return;
    }

    setUploadingWork(true);

    try {
      const formData = new FormData();

      formData.append("file", file);

      const response = await fetch(
        "/api/upload/work",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok || !data?.success || !data?.url) {
        throw new Error(
          data?.message ||
            "Work file upload failed."
        );
      }

      setWorkFileUrl(data.url);
      setWorkFileName(
        data.fileName || file.name
      );
      setWorkFileType(
        data.fileType || extension
      );

      setMessage(
        "Work file uploaded successfully."
      );
    } catch (err: any) {
      console.error(
        "WORK FILE UPLOAD ERROR:",
        err
      );

      setWorkFileUrl("");
      setWorkFileName("");
      setWorkFileType("");

      setError(
        err?.message ||
          "Work file upload failed."
      );
    } finally {
      setUploadingWork(false);
    }
  }

  function handleImageChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target.files?.[0];

    event.target.value = "";

    if (!file) {
      return;
    }

    void uploadImage(file);
  }

  function handleWorkFileChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target.files?.[0];

    event.target.value = "";

    if (!file) {
      return;
    }

    void uploadWorkFile(file);
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setMessage("");

    if (!title.trim()) {
      setError(
        "Product title is required."
      );
      return;
    }

    if (!country.trim()) {
      setError("Country is required.");
      return;
    }

    const numericPrice = Number(price);
    const numericStock = Number(stock);

    if (
      price.trim() === "" ||
      !Number.isFinite(numericPrice) ||
      numericPrice < 0
    ) {
      setError("Enter a valid price.");
      return;
    }

    if (
      stock.trim() === "" ||
      !Number.isInteger(numericStock) ||
      numericStock < 0
    ) {
      setError("Enter a valid stock.");
      return;
    }

    if (!imageUrl) {
      setError(
        "Please upload the product image first."
      );
      return;
    }

    if (
      uploadingImage ||
      uploadingWork
    ) {
      setError(
        "Please wait until all uploads finish."
      );
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(
        "/api/products",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            title: title.trim(),
            country: country.trim(),
            price: numericPrice,
            stock: numericStock,
            currency:
              currency.trim() || "USDT",
            image: imageUrl,
            description:
              description.trim(),
            features,
            featured,
            topRated,
            bestSeller,
            rare,
            workFileUrl:
              workFileUrl || null,
            workFileName:
              workFileName || null,
            workFileType:
              workFileType || null,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Failed to create product."
        );
      }

      const product =
        data?.product || data;

      if (!product?.id) {
        throw new Error(
          "Product was created but no product ID was returned."
        );
      }

      router.push("/admin/products");
      router.refresh();
    } catch (err: any) {
      console.error(
        "CREATE PRODUCT ERROR:",
        err
      );

      setError(
        err?.message ||
          "Failed to create product."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-black px-4 py-8 text-white md:px-8 md:py-10">
      <div className="mx-auto max-w-5xl">

        <div className="mb-8">
          <button
            type="button"
            onClick={() =>
              router.push(
                "/admin/products"
              )
            }
            className="mb-5 text-sm text-zinc-500 transition hover:text-white"
          >
            ← Back to Products
          </button>

          <p className="mb-2 text-sm font-medium text-lime-400">
            Elite ID Admin
          </p>

          <h1 className="text-3xl font-bold md:text-4xl">
            Add Product
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Create a new product for Elite ID.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-900 bg-red-950/40 px-5 py-4 text-sm text-red-300">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-6 rounded-xl border border-green-900 bg-green-950/40 px-5 py-4 text-sm text-green-300">
            {message}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 md:p-7">
            <h2 className="mb-6 text-lg font-semibold">
              Basic Information
            </h2>

            <div className="grid gap-5 md:grid-cols-2">

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm text-zinc-400">
                  Product Name
                </label>

                <input
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  placeholder="Apple ID Premium"
                  disabled={saving}
                  className="w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-white outline-none transition placeholder:text-zinc-700 focus:border-lime-500 disabled:opacity-50"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-400">
                  Country
                </label>

                <input
                  value={country}
                  onChange={(e) =>
                    setCountry(e.target.value)
                  }
                  placeholder="USA"
                  disabled={saving}
                  className="w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-white outline-none transition placeholder:text-zinc-700 focus:border-lime-500 disabled:opacity-50"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-400">
                  Currency
                </label>

                <input
                  value={currency}
                  onChange={(e) =>
                    setCurrency(e.target.value)
                  }
                  placeholder="USDT"
                  disabled={saving}
                  className="w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-white outline-none transition placeholder:text-zinc-700 focus:border-lime-500 disabled:opacity-50"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-400">
                  Price
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={price}
                  onChange={(e) =>
                    setPrice(e.target.value)
                  }
                  placeholder="5.00"
                  disabled={saving}
                  className="w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-white outline-none transition placeholder:text-zinc-700 focus:border-lime-500 disabled:opacity-50"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-400">
                  Stock
                </label>

                <input
                  type="number"
                  min="0"
                  step="1"
                  value={stock}
                  onChange={(e) =>
                    setStock(e.target.value)
                  }
                  placeholder="10"
                  disabled={saving}
                  className="w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-white outline-none transition placeholder:text-zinc-700 focus:border-lime-500 disabled:opacity-50"
                />
              </div>

            </div>
          </section>

          <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 md:p-7">
            <h2 className="mb-2 text-lg font-semibold">
              Product Image
            </h2>

            <p className="mb-5 text-sm text-zinc-500">
              Upload the main image of the product.
              Maximum size: 10MB.
            </p>

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleImageChange}
              disabled={
                uploadingImage ||
                uploadingWork ||
                saving
              }
              className="block w-full cursor-pointer rounded-xl border border-zinc-800 bg-black px-4 py-4 text-sm text-zinc-300 file:mr-4 file:rounded-lg file:border-0 file:bg-lime-500 file:px-4 file:py-2 file:font-semibold file:text-black disabled:cursor-not-allowed disabled:opacity-50"
            />

            {uploadingImage && (
              <div className="mt-4 rounded-xl border border-yellow-900 bg-yellow-950/20 px-4 py-3">
                <p className="text-sm text-yellow-400">
                  Uploading image...
                </p>
              </div>
            )}

            {imageUrl &&
              !uploadingImage && (
                <div className="mt-5">
                  <div className="h-56 w-56 overflow-hidden rounded-xl border border-zinc-800 bg-black">
                    <img
                      src={imageUrl}
                      alt="Product preview"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <p className="mt-3 break-all text-xs text-zinc-600">
                    {imageUrl}
                  </p>
                </div>
              )}
          </section>

          <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 md:p-7">
            <h2 className="mb-2 text-lg font-semibold">
              Description
            </h2>

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              rows={7}
              placeholder="Product description..."
              disabled={saving}
              className="w-full resize-y rounded-xl border border-zinc-800 bg-black px-4 py-3 text-white outline-none transition placeholder:text-zinc-700 focus:border-lime-500 disabled:opacity-50"
            />
          </section>

          <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 md:p-7">
            <h2 className="mb-2 text-lg font-semibold">
              Product Features
            </h2>

            <p className="mb-5 text-sm text-zinc-500">
              Select the features included with this product.
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              {FEATURE_OPTIONS.map(
                (feature) => {
                  const selected =
                    features.includes(feature);

                  return (
                    <label
                      key={feature}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-4 transition ${
                        selected
                          ? "border-lime-500 bg-lime-500/10"
                          : "border-zinc-800 bg-black hover:border-zinc-600"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selected}
                        disabled={saving}
                        onChange={() =>
                          toggleFeature(
                            feature
                          )
                        }
                        className="h-4 w-4 accent-lime-500"
                      />

                      <span className="text-sm">
                        {feature}
                      </span>
                    </label>
                  );
                }
              )}
            </div>
          </section>

          <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 md:p-7">
            <h2 className="mb-2 text-lg font-semibold">
              Badges
            </h2>

            <p className="mb-5 text-sm text-zinc-500">
              Choose the badges shown for this product.
            </p>

            <div className="grid gap-3 sm:grid-cols-2">

              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-zinc-800 bg-black px-4 py-4">
                <input
                  type="checkbox"
                  checked={featured}
                  disabled={saving}
                  onChange={(e) =>
                    setFeatured(
                      e.target.checked
                    )
                  }
                  className="h-4 w-4 accent-lime-500"
                />

                <span className="text-sm">
                  Featured
                </span>
              </label>

              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-zinc-800 bg-black px-4 py-4">
                <input
                  type="checkbox"
                  checked={topRated}
                  disabled={saving}
                  onChange={(e) =>
                    setTopRated(
                      e.target.checked
                    )
                  }
                  className="h-4 w-4 accent-lime-500"
                />

                <span className="text-sm">
                  Top Rated
                </span>
              </label>

              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-zinc-800 bg-black px-4 py-4">
                <input
                  type="checkbox"
                  checked={bestSeller}
                  disabled={saving}
                  onChange={(e) =>
                    setBestSeller(
                      e.target.checked
                    )
                  }
                  className="h-4 w-4 accent-lime-500"
                />

                <span className="text-sm">
                  Best Seller
                </span>
              </label>

              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-zinc-800 bg-black px-4 py-4">
                <input
                  type="checkbox"
                  checked={rare}
                  disabled={saving}
                  onChange={(e) =>
                    setRare(
                      e.target.checked
                    )
                  }
                  className="h-4 w-4 accent-lime-500"
                />

                <span className="text-sm">
                  Rare
                </span>
              </label>

            </div>
          </section>

          <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 md:p-7">
            <h2 className="mb-2 text-lg font-semibold">
              Product Work File
            </h2>

            <p className="mb-5 text-sm text-zinc-500">
              Upload the product file.
              CSV, XLS, and XLSX are allowed.
              Maximum size: 25MB.
            </p>

            <input
              type="file"
              accept=".csv,.xls,.xlsx"
              onChange={handleWorkFileChange}
              disabled={
                uploadingWork ||
                uploadingImage ||
                saving
              }
              className="block w-full cursor-pointer rounded-xl border border-zinc-800 bg-black px-4 py-4 text-sm text-zinc-300 file:mr-4 file:rounded-lg file:border-0 file:bg-lime-500 file:px-4 file:py-2 file:font-semibold file:text-black disabled:cursor-not-allowed disabled:opacity-50"
            />

            {uploadingWork && (
              <div className="mt-4 rounded-xl border border-yellow-900 bg-yellow-950/20 px-4 py-3">
                <p className="text-sm text-yellow-400">
                  Uploading work file...
                </p>
              </div>
            )}

            {workFileUrl &&
              !uploadingWork && (
                <div className="mt-4 rounded-xl border border-green-900 bg-green-950/30 p-4">
                  <p className="text-sm text-green-400">
                    Work file uploaded successfully.
                  </p>

                  <p className="mt-1 break-all text-xs text-zinc-500">
                    {workFileName}
                  </p>

                  <p className="mt-1 text-xs text-zinc-600">
                    Type:{" "}
                    {workFileType.toUpperCase()}
                  </p>

                  <a
                    href={workFileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-sm font-semibold text-lime-400 hover:underline"
                  >
                    Open File →
                  </a>
                </div>
              )}
          </section>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() =>
                router.push(
                  "/admin/products"
                )
              }
              disabled={saving}
              className="rounded-xl border border-zinc-800 px-6 py-3 font-semibold text-zinc-300 transition hover:border-zinc-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                saving ||
                uploadingImage ||
                uploadingWork
              }
              className="rounded-xl bg-lime-500 px-8 py-3 font-semibold text-black transition hover:bg-lime-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving
                ? "Creating..."
                : uploadingImage ||
                    uploadingWork
                  ? "Uploading..."
                  : "Create Product"}
            </button>
          </div>

        </form>
      </div>
    </main>
  );
}