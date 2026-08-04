import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

import ProductGallery from "@/components/Product/ProductGallery";
import ProductInfo from "@/components/Product/ProductInfo";
import BuyBox from "@/components/Product/BuyBox";
import ProductTabs from "@/components/Product/ProductTabs";
import RelatedProducts from "@/components/Product/RelatedProducts";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({ params }: Props) {
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
    ...product,
    price: Number(product.price),
    description: product.description ?? "",
  };

  return (
    <main className="min-h-screen bg-[#090909] text-white">

      <section className="mx-auto max-w-[1700px] px-10 py-14">

        <div className="grid gap-12 xl:grid-cols-[650px_1fr_420px]">

          <ProductGallery product={formattedProduct} />

          <ProductInfo product={formattedProduct} />

          <BuyBox product={formattedProduct} />

        </div>

      </section>


      <ProductTabs product={formattedProduct} />


      <RelatedProducts currentId={formattedProduct.id} />

    </main>
  );
}