import { Product } from "@/types/product";
import ProductFeatures from "./ProductFeatures";

type Props = {
  product: Product;
};

export default function ProductInfo({ product }: Props) {
  return (
    <div className="space-y-10">

      <div>

        <span className="
          inline-flex
          rounded-full
          border
          border-lime-400/30
          bg-lime-400/10
          px-5
          py-2
          text-sm
          font-semibold
          text-lime-400
          backdrop-blur-xl
        ">
          Premium Apple ID
        </span>


        <h1 className="mt-7 text-5xl font-black tracking-tight">
          {product.title}
        </h1>


        <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-400">
          {product.description ||
            "Premium Apple ID ready for instant delivery."}
        </p>


      </div>



      <div
        className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-white/[0.04]
        p-8
        backdrop-blur-xl
        "
      >

        <div
          className="
          absolute
          -right-20
          -top-20
          h-52
          w-52
          rounded-full
          bg-lime-400/20
          blur-3xl
          "
        />


        <p className="relative text-sm text-zinc-500">
          Starting price
        </p>


        <div className="relative mt-3 flex items-end gap-4">

          <div className="text-6xl font-black text-lime-400">
            ${product.price}
          </div>


          <div className="mb-2 text-zinc-400">
            {product.currency}
          </div>

        </div>


      </div>



      <ProductFeatures />

    </div>
  );
}