// D:\Elite-ID\frontend\app\admin\products\page.tsx

import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: [
      {
        featured: "desc",
      },
      {
        createdAt: "desc",
      },
    ],
  });

  const totalProducts = products.length;

  const featuredProducts = products.filter(
    (product) => product.featured
  ).length;

  const totalStock = products.reduce(
    (total, product) => total + product.stock,
    0
  );

  const totalStockValue = products.reduce(
    (total, product) =>
      total +
      Number(product.price) * product.stock,
    0
  );

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">
        {/* HEADER */}
        <header className="mb-8">
          <Link
            href="/admin"
            className="mb-5 inline-flex items-center text-sm text-zinc-500 transition hover:text-white"
          >
            ← Back to Dashboard
          </Link>

          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-2 text-sm font-medium text-lime-400">
                Elite ID Admin
              </p>

              <h1 className="text-3xl font-bold md:text-4xl">
                Products
              </h1>

              <p className="mt-2 text-sm text-zinc-500">
                Manage products, inventory, pricing and
                visibility.
              </p>
            </div>

            <Link
              href="/admin/products/new"
              className="inline-flex items-center justify-center rounded-xl bg-lime-500 px-6 py-3 font-semibold text-black transition hover:bg-lime-400"
            >
              + Add Product
            </Link>
          </div>
        </header>

        {/* STATS */}
        <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Products"
            value={totalProducts}
          />

          <StatCard
            title="Featured Products"
            value={featuredProducts}
          />

          <StatCard
            title="Total Stock"
            value={totalStock}
          />

          <StatCard
            title="Stock Value"
            value={`${totalStockValue.toFixed(2)} USDT`}
          />
        </section>

        {/* PRODUCTS */}
        <section className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
          <div className="flex flex-col gap-4 border-b border-zinc-800 px-5 py-5 sm:flex-row sm:items-center sm:justify-between md:px-6">
            <div>
              <h2 className="font-semibold">
                All Products
              </h2>

              <p className="mt-1 text-xs text-zinc-600">
                {totalProducts}{" "}
                {totalProducts === 1
                  ? "product"
                  : "products"}{" "}
                in store
              </p>
            </div>

            <Link
              href="/admin/products/new"
              className="inline-flex items-center justify-center rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-lime-500 hover:bg-lime-500/10 hover:text-lime-400"
            >
              Create Product
            </Link>
          </div>

          {products.length === 0 ? (
            <EmptyProducts />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1050px]">
                <thead>
                  <tr className="border-b border-zinc-800 text-left text-xs uppercase tracking-wide text-zinc-600">
                    <th className="px-6 py-4">
                      Product
                    </th>

                    <th className="px-6 py-4">
                      Country
                    </th>

                    <th className="px-6 py-4">
                      Price
                    </th>

                    <th className="px-6 py-4">
                      Stock
                    </th>

                    <th className="px-6 py-4">
                      Views
                    </th>

                    <th className="px-6 py-4">
                      Badges
                    </th>

                    <th className="px-6 py-4 text-right">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((product) => {
                    const stockStatus =
                      getStockStatus(product.stock);

                    return (
                      <tr
                        key={product.id}
                        className="border-b border-zinc-900 transition hover:bg-white/[0.02] last:border-0"
                      >
                        {/* PRODUCT */}
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-4">
                            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-zinc-800 bg-black">
                              {product.image ? (
                                <img
                                  src={product.image}
                                  alt={product.title}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center text-xs text-zinc-700">
                                  No image
                                </div>
                              )}
                            </div>

                            <div className="min-w-0">
                              <p className="truncate font-semibold text-white">
                                {product.title}
                              </p>

                              <p className="mt-1 text-xs text-zinc-600">
                                ID #{product.id}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* COUNTRY */}
                        <td className="px-6 py-5">
                          <span className="rounded-lg border border-zinc-800 bg-black px-3 py-1.5 text-sm text-zinc-300">
                            {product.country}
                          </span>
                        </td>

                        {/* PRICE */}
                        <td className="px-6 py-5">
                          <p className="font-semibold text-white">
                            {Number(
                              product.price
                            ).toFixed(2)}
                          </p>

                          <p className="mt-1 text-xs text-zinc-600">
                            {product.currency}
                          </p>
                        </td>

                        {/* STOCK */}
                        <td className="px-6 py-5">
                          <span
                            className={`rounded-full px-3 py-1.5 text-xs font-medium ${stockStatus.className}`}
                          >
                            {stockStatus.label}
                          </span>
                        </td>

                        {/* VIEWS */}
                        <td className="px-6 py-5 text-sm text-zinc-400">
                          {product.views}
                        </td>

                        {/* BADGES */}
                        <td className="px-6 py-5">
                          <div className="flex max-w-[240px] flex-wrap gap-2">
                            {product.featured && (
                              <Badge
                                label="Featured"
                                className="bg-yellow-500/10 text-yellow-400"
                              />
                            )}

                            {product.topRated && (
                              <Badge
                                label="Top Rated"
                                className="bg-green-500/10 text-green-400"
                              />
                            )}

                            {product.bestSeller && (
                              <Badge
                                label="Best Seller"
                                className="bg-blue-500/10 text-blue-400"
                              />
                            )}

                            {product.rare && (
                              <Badge
                                label="Rare"
                                className="bg-purple-500/10 text-purple-400"
                              />
                            )}

                            {!product.featured &&
                              !product.topRated &&
                              !product.bestSeller &&
                              !product.rare && (
                                <span className="text-xs text-zinc-700">
                                  Normal
                                </span>
                              )}
                          </div>
                        </td>

                        {/* ACTION */}
                        <td className="px-6 py-5 text-right">
                          <Link
                            href={`/admin/products/${product.id}`}
                            className="inline-flex rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-lime-500 hover:bg-lime-500/10 hover:text-lime-400"
                          >
                            Edit
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
      <p className="text-sm text-zinc-500">
        {title}
      </p>

      <p className="mt-2 text-3xl font-bold">
        {value}
      </p>
    </div>
  );
}

function Badge({
  label,
  className,
}: {
  label: string;
  className: string;
}) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs ${className}`}
    >
      {label}
    </span>
  );
}

function getStockStatus(stock: number) {
  if (stock <= 0) {
    return {
      label: "Out of stock",
      className:
        "bg-red-500/10 text-red-400",
    };
  }

  if (stock <= 5) {
    return {
      label: `${stock} left`,
      className:
        "bg-yellow-500/10 text-yellow-400",
    };
  }

  return {
    label: `${stock} available`,
    className:
      "bg-green-500/10 text-green-400",
  };
}