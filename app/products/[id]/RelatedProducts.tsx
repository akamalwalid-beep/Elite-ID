import ProductCard from "@/components/Products/ProductCard";
import { prisma } from "@/lib/prisma";

type Props = {
  currentId: number;
};

export default async function RelatedProducts({
  currentId,
}: Props) {

  const currentProduct = await prisma.product.findUnique({
    where: {
      id: currentId,
    },
    select: {
      country: true,
    },
  });


  if (!currentProduct) {
    return null;
  }


  const products = await prisma.product.findMany({
    where: {
      AND: [
        {
          id: {
            not: currentId,
          },
        },
        {
          country: currentProduct.country,
        },
      ],
    },
    orderBy: [
      {
        featured: "desc",
      },
      {
        createdAt: "desc",
      },
    ],
    take: 4,
  });



  if (products.length === 0) {
    return null;
  }



  return (
    <section
      className="
      relative
      mx-auto
      mt-24
      max-w-[1700px]
      overflow-hidden
      px-10
      pb-24
      "
    >

      <div
        className="
        pointer-events-none
        absolute
        left-1/2
        top-0
        h-96
        w-96
        -translate-x-1/2
        rounded-full
        bg-lime-400/10
        blur-[120px]
        "
      />


      <div className="relative z-10">


        <div className="mb-12 text-center">


          <span
            className="
            rounded-full
            border
            border-lime-400/20
            bg-lime-400/10
            px-5
            py-2
            text-sm
            font-bold
            text-lime-400
            "
          >
            YOU MAY ALSO LIKE
          </span>


          <h2
            className="
            mt-6
            text-5xl
            font-black
            "
          >
            Related Products
          </h2>


          <p className="mt-3 text-zinc-400">
            More premium Apple IDs from the same country.
          </p>


        </div>



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
              image={product.image}
              stock={product.stock}
              description={product.description ?? ""}
              views={product.views}
            />

          ))}


        </div>


      </div>


    </section>
  );
}