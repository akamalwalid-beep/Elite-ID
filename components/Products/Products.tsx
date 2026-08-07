export const dynamic = "force-dynamic";

import ProductCard from "./ProductCard";
import ProductsHeader from "./ProductsHeader";

import { prisma } from "../../lib/prisma";


export default async function Products() {


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






  const totalViews = products.reduce(

    (sum, product) => sum + product.views,

    0

  );





  const countries = new Set(

    products.map((p) => p.country)

  );







  return (

    <section
      className="
      relative
      overflow-hidden
      bg-[#090909]
      py-28
      text-white
      "
    >



      <div className="pointer-events-none absolute inset-0 overflow-hidden">


        <div
          className="
          absolute
          -left-52
          top-10
          h-[700px]
          w-[700px]
          rounded-full
          bg-lime-400/20
          blur-[140px]
          animate-[pulse_7s_ease-in-out_infinite]
          "
        />


        <div
          className="
          absolute
          right-[-200px]
          top-[15%]
          h-[800px]
          w-[800px]
          rounded-full
          bg-green-400/20
          blur-[160px]
          animate-[pulse_9s_ease-in-out_infinite]
          "
        />



        <div
          className="
          absolute
          bottom-[-250px]
          left-[35%]
          h-[650px]
          w-[650px]
          rounded-full
          bg-lime-300/15
          blur-[150px]
          animate-[pulse_8s_ease-in-out_infinite]
          "
        />



        <div
          className="
          absolute
          left-1/2
          top-1/2
          h-[500px]
          w-[500px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-emerald-400/10
          blur-[170px]
          animate-[pulse_11s_ease-in-out_infinite]
          "
        />


      </div>








      <div
        className="
        relative
        mx-auto
        max-w-[1700px]
        px-10
        "
      >





        <ProductsHeader

          count={products.length}

          countries={countries.size}

          views={totalViews.toLocaleString()}

        />









        <div
          className="
          mt-20
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



              features={product.features ?? []}



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