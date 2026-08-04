import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/Products/ProductCard";

type Props = {
  currentId: number;
};

export default async function RelatedProducts({
  currentId,
}: Props) {
  const products = await prisma.product.findMany({
    where: {
      NOT: {
        id: currentId,
      },
    },
    orderBy: {
      featured: "desc",
    },
    take: 4,
  });

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto mt-24 max-w-[1700px] px-10 pb-20">
      <div className="mb-10 flex items-center justify-between">

        <h2 className="text-4xl font-black">
          Related Products
        </h2>

        <Link
          href="/products"
          className="text-lime-400 transition hover:text-lime-300"
        >
          View All →
        </Link>

      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            slug={product.slug}
            country={product.country}
            price={Number(product.price)}
            currency={product.currency}
            rating={product.rating}
            featured={product.featured}
            image={product.image}
            stock={product.stock}
            description={product.description ?? ""}
            views={product.views}
          />
        ))}

      </div>
    </section>
  );
}