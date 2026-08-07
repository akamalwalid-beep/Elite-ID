import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/Products/ProductCard";
import RelatedTitle from "./RelatedTitle";

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

    <section
      className="
      mx-auto
      mt-24
      max-w-[1700px]
      px-10
      pb-20
      "
    >


      <RelatedTitle />



      <div
        className="
        grid
        gap-8
        md:grid-cols-2
        xl:grid-cols-4
        "
      >


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

            topRated={product.topRated}

            bestSeller={product.bestSeller}

            rare={product.rare}

            features={product.features}

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