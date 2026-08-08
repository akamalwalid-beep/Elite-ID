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

  const productId = Number(id);

  if (!productId || Number.isNaN(productId)) {
    notFound();
  }


  // Get product first
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });


  // If product does not exist
  if (!product) {
    notFound();
  }



  // Increase views safely
  await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      views: {
        increment: 1,
      },
    },
  });



  const formattedProduct = {
    ...product,

    price: Number(product.price),

    description:
      product.description ?? "",
  };



  return (
    <main className="relative min-h-screen overflow-hidden bg-[#090909] text-white">


      {/* Animated Premium Background */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">


        <div
          className="
          absolute
          -left-48
          top-10
          h-[650px]
          w-[650px]
          rounded-full
          bg-lime-400/20
          blur-[150px]
          animate-[pulse_8s_ease-in-out_infinite]
          "
        />


        <div
          className="
          absolute
          right-[-200px]
          top-[20%]
          h-[750px]
          w-[750px]
          rounded-full
          bg-emerald-400/20
          blur-[170px]
          animate-[pulse_10s_ease-in-out_infinite]
          "
        />


        <div
          className="
          absolute
          bottom-[-250px]
          left-[35%]
          h-[600px]
          w-[600px]
          rounded-full
          bg-lime-300/15
          blur-[150px]
          animate-[pulse_9s_ease-in-out_infinite]
          "
        />


      </div>





      <div className="relative z-10">


        <section className="mx-auto max-w-[1700px] px-10 py-14">


          <div
            className="
            grid
            gap-12
            xl:grid-cols-[650px_1fr_420px]
            "
          >


            <ProductGallery
              product={formattedProduct}
            />



            <ProductInfo
              product={formattedProduct}
            />



            <BuyBox
              product={formattedProduct}
            />


          </div>


        </section>





        <ProductTabs
          product={formattedProduct}
        />





        <RelatedProducts
          currentId={formattedProduct.id}
        />



      </div>


    </main>
  );
}