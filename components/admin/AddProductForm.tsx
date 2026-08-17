"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProductForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [country, setCountry] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [rating, setRating] = useState("5");
  const [currency, setCurrency] = useState("USDT");
  const [description, setDescription] = useState("");

  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");

  const [workFileUrl, setWorkFileUrl] = useState("");
  const [workFileName, setWorkFileName] = useState("");
  const [workFileType, setWorkFileType] = useState("");

  const [featured, setFeatured] = useState(false);
  const [topRated, setTopRated] = useState(false);
  const [bestSeller, setBestSeller] = useState(false);
  const [rare, setRare] = useState(false);

  const [features, setFeatures] = useState<string[]>([]);

  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingWorkFile, setUploadingWorkFile] = useState(false);
  const [loading, setLoading] = useState(false);

  const availableFeatures = [
    "App Store",
    "iCloud 5GB",
    "2FA",
    "Mailbox",
  ];

  function toggleFeature(feature: string) {
    setFeatures((current) => {
      if (current.includes(feature)) {
        return current.filter((item) => item !== feature);
      }

      return [...current, feature];
    });
  }

  async function uploadImage(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      event.target.value = "";
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

      const result = await response.json();

      if (!response.ok) {
        alert(
          result.message ||
            "Failed to upload image."
        );
        event.target.value = "";
        return;
      }

      setImage(result.url);
      setImageName(file.name);
    } catch (error) {
      console.error(
        "IMAGE UPLOAD ERROR:",
        error
      );

      alert("Failed to upload image.");
      event.target.value = "";
    } finally {
      setUploadingImage(false);
    }
  }

  async function uploadWorkFile(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    const lowerName = file.name.toLowerCase();

    const isCsv = lowerName.endsWith(".csv");
    const isXls = lowerName.endsWith(".xls");
    const isXlsx = lowerName.endsWith(".xlsx");

    if (!isCsv && !isXls && !isXlsx) {
      alert(
        "Only CSV, XLS, and XLSX files are allowed."
      );

      event.target.value = "";
      return;
    }

    setUploadingWorkFile(true);

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

      const result = await response.json();

      if (!response.ok) {
        alert(
          result.message ||
            "Failed to upload work file."
        );

        event.target.value = "";
        return;
      }

      setWorkFileUrl(result.url);

      setWorkFileName(
        result.fileName || file.name
      );

      setWorkFileType(
        result.fileType || file.type
      );
    } catch (error) {
      console.error(
        "WORK FILE UPLOAD ERROR:",
        error
      );

      alert(
        "Failed to upload work file."
      );

      event.target.value = "";
    } finally {
      setUploadingWorkFile(false);
    }
  }

  async function saveProduct() {
    if (
      !title.trim() ||
      !country.trim() ||
      !price ||
      !stock
    ) {
      alert(
        "Please fill all required fields."
      );
      return;
    }

    if (!image) {
      alert(
        "Please upload a product image."
      );
      return;
    }

    if (!workFileUrl) {
      alert(
        "Please upload the product work file."
      );
      return;
    }

    setLoading(true);

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
            price: Number(price),
            stock: Number(stock),
            rating: Number(rating) || 5,
            currency: currency || "USDT",
            image,
            description,
            featured,
            topRated,
            bestSeller,
            rare,
            features,
            workFileUrl,
            workFileName,
            workFileType,
          }),
        }
      );

      const result =
        await response.json();

      if (!response.ok) {
        alert(
          result.message ||
            "Failed to create product."
        );
        return;
      }

      alert("✅ Product Added");

      router.push(
        "/admin/products"
      );

      router.refresh();
    } catch (error) {
      console.error(
        "CREATE PRODUCT ERROR:",
        error
      );

      alert(
        "Failed to create product."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="
        rounded-3xl
        border
        border-zinc-800
        bg-[#111111]
        p-8
      "
    >
      <div className="grid gap-6 md:grid-cols-2">
        <input
          placeholder="Product Name"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="
            rounded-xl
            border
            border-zinc-700
            bg-black
            p-4
            outline-none
            focus:border-lime-400
          "
        />

        <input
          placeholder="Country"
          value={country}
          onChange={(e) =>
            setCountry(e.target.value)
          }
          className="
            rounded-xl
            border
            border-zinc-700
            bg-black
            p-4
            outline-none
            focus:border-lime-400
          "
        />

        <input
          type="number"
          step="0.01"
          placeholder="Price"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
          className="
            rounded-xl
            border
            border-zinc-700
            bg-black
            p-4
            outline-none
            focus:border-lime-400
          "
        />

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) =>
            setStock(e.target.value)
          }
          className="
            rounded-xl
            border
            border-zinc-700
            bg-black
            p-4
            outline-none
            focus:border-lime-400
          "
        />

        <input
          type="number"
          min="0"
          max="5"
          step="0.1"
          placeholder="Rating"
          value={rating}
          onChange={(e) =>
            setRating(e.target.value)
          }
          className="
            rounded-xl
            border
            border-zinc-700
            bg-black
            p-4
            outline-none
            focus:border-lime-400
          "
        />

        <input
          placeholder="Currency"
          value={currency}
          onChange={(e) =>
            setCurrency(e.target.value)
          }
          className="
            rounded-xl
            border
            border-zinc-700
            bg-black
            p-4
            outline-none
            focus:border-lime-400
          "
        />
      </div>

      <div
        className="
          mt-6
          rounded-xl
          border
          border-zinc-700
          p-5
        "
      >
        <h3 className="mb-2 font-bold">
          Product Image
        </h3>

        <p className="mb-4 text-sm text-zinc-500">
          Upload the main image for this
          product.
        </p>

        {image && (
          <div className="mb-4">
            <img
              src={image}
              alt="Product preview"
              className="
                h-32
                w-32
                rounded-xl
                border
                border-zinc-700
                object-cover
              "
            />

            {imageName && (
              <p className="mt-2 text-sm text-zinc-400">
                {imageName}
              </p>
            )}
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
          <p className="mt-3 text-lime-400">
            Uploading image...
          </p>
        )}
      </div>

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
        className="
          mt-6
          h-40
          w-full
          rounded-xl
          border
          border-zinc-700
          bg-black
          p-4
          outline-none
          focus:border-lime-400
        "
      />

      <div
        className="
          mt-6
          rounded-xl
          border
          border-zinc-700
          p-5
        "
      >
        <h3 className="mb-4 font-bold">
          Product Features
        </h3>

        <div className="grid gap-3 md:grid-cols-2">
          {availableFeatures.map(
            (feature) => (
              <label
                key={feature}
                className="
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  border
                  border-zinc-700
                  p-3
                "
              >
                <input
                  type="checkbox"
                  checked={features.includes(
                    feature
                  )}
                  onChange={() =>
                    toggleFeature(
                      feature
                    )
                  }
                />

                {feature}
              </label>
            )
          )}
        </div>
      </div>

      <div
        className="
          mt-6
          rounded-xl
          border
          border-zinc-700
          p-5
        "
      >
        <h3 className="mb-4 font-bold">
          Badges
        </h3>

        <div className="grid gap-3 md:grid-cols-2">
          <label className="flex items-center gap-3 rounded-xl border border-zinc-700 p-3">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) =>
                setFeatured(
                  e.target.checked
                )
              }
            />
            Featured
          </label>

          <label className="flex items-center gap-3 rounded-xl border border-zinc-700 p-3">
            <input
              type="checkbox"
              checked={topRated}
              onChange={(e) =>
                setTopRated(
                  e.target.checked
                )
              }
            />
            Top Rated
          </label>

          <label className="flex items-center gap-3 rounded-xl border border-zinc-700 p-3">
            <input
              type="checkbox"
              checked={bestSeller}
              onChange={(e) =>
                setBestSeller(
                  e.target.checked
                )
              }
            />
            Best Seller
          </label>

          <label className="flex items-center gap-3 rounded-xl border border-zinc-700 p-3">
            <input
              type="checkbox"
              checked={rare}
              onChange={(e) =>
                setRare(
                  e.target.checked
                )
              }
            />
            Rare
          </label>
        </div>
      </div>

      <div
        className="
          mt-6
          rounded-xl
          border
          border-zinc-700
          p-5
        "
      >
        <h3 className="mb-2 font-bold">
          Product Work File
        </h3>

        <p className="mb-4 text-sm text-zinc-500">
          Upload the product work file.
          Only CSV, XLS, and XLSX are
          allowed.
        </p>

        <input
          type="file"
          accept=".csv,.xls,.xlsx"
          onChange={uploadWorkFile}
          disabled={
            uploadingWorkFile ||
            loading ||
            uploadingImage
          }
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
          <p className="mt-3 text-lime-400">
            Uploading work file...
          </p>
        )}

        {workFileName && (
          <div
            className="
              mt-4
              rounded-xl
              border
              border-lime-400/20
              bg-lime-400/5
              p-4
            "
          >
            <p className="font-semibold text-lime-400">
              Work file uploaded
            </p>

            <p className="mt-1 text-sm text-zinc-300">
              {workFileName}
            </p>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={saveProduct}
        disabled={
          loading ||
          uploadingImage ||
          uploadingWorkFile
        }
        className="
          mt-8
          w-full
          rounded-xl
          bg-lime-400
          px-8
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
          ? "Creating Product..."
          : "Create Product"}
      </button>
    </div>
  );
}