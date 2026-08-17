// D:\Elite-ID\frontend\app\admin\products\[id]\page.tsx

import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import EditProductForm from "@/components/admin/EditProductForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productId = Number(id);

  if (
    !Number.isInteger(productId) ||
    productId <= 0
  ) {
    notFound();
  }

  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    notFound();
  }

  const formattedProduct = {
    id: product.id,
    title: product.title,
    country: product.country,
    price: Number(product.price),
    stock: product.stock,
    image: product.image,
    description: product.description ?? "",
    featured: product.featured,
    topRated: product.topRated,
    bestSeller: product.bestSeller,
    rare: product.rare,
    features: product.features,
    rating: product.rating,
    currency: product.currency,
    workFileUrl: product.workFileUrl ?? null,
    workFileName: product.workFileName ?? null,
    workFileType: product.workFileType ?? null,
  };

  return (
    <main className="min-h-screen bg-black px-5 py-8 text-white md:px-8 md:py-10">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/admin/products"
          className="mb-5 inline-flex text-sm text-zinc-500 transition hover:text-white"
        >
          ← Back to Products
        </Link>

        <div className="mb-8">
          <p className="mb-2 text-sm font-medium text-lime-400">
            Elite ID Admin
          </p>

          <h1 className="text-3xl font-bold md:text-4xl">
            Edit Product
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Update product information, files and
            settings.
          </p>
        </div>

        <EditProductForm
          product={formattedProduct}
        />
      </div>
    </main>
  );
}