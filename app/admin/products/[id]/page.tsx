import { prisma } from "@/lib/prisma";
import EditProductForm from "@/components/admin/EditProductForm";
import { notFound } from "next/navigation";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!product) {
    notFound();
  }

  const formattedProduct = {
    id: product.id,
    title: product.title,
    price: Number(product.price),
    stock: product.stock,
    image: product.image,
    description: product.description ?? "",
    featured: product.featured,
    rating: product.rating,
    currency: product.currency,
  };

  return (
    <main className="min-h-screen bg-[#090909] p-10 text-white">
      <div className="mx-auto max-w-3xl">

        <h1 className="mb-8 text-5xl font-bold">
          Edit Product
        </h1>

        <EditProductForm product={formattedProduct} />

      </div>
    </main>
  );
}