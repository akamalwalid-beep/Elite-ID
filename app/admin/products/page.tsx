export const dynamic = "force-dynamic";

import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProductsTable from "@/components/admin/ProductsTable";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: {
      id: "desc",
    },
  });

  const formattedProducts = products.map((product) => ({
    id: product.id,
    title: product.title,
    country: product.country,
    price: Number(product.price),
    stock: product.stock,
    featured: product.featured,
    image: product.image,
    views: product.views,
  }));

  return (
    <main className="min-h-screen bg-[#090909] p-10 text-white">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8 flex items-center justify-between">

          <div>
            <h1 className="text-5xl font-bold">
              Products
            </h1>

            <p className="mt-2 text-zinc-400">
              Manage your products.
            </p>
          </div>

          <Link
            href="/admin/add"
            className="rounded-xl bg-lime-400 px-6 py-3 font-bold text-black transition hover:scale-105"
          >
            + Add Product
          </Link>

        </div>

        <ProductsTable products={formattedProducts} />

      </div>
    </main>
  );
}