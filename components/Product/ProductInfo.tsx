import { Product } from "@/types/product";
import ProductFeatures from "./ProductFeatures";

type Props = {
  product: Product;
};

export default function ProductInfo({ product }: Props) {
  return (
    <div className="space-y-8">

      <div>

        <span className="rounded-full border border-lime-400/30 bg-lime-400/10 px-4 py-2 text-sm font-semibold text-lime-400">
          Premium Apple ID
        </span>

        <h1 className="mt-6 text-5xl font-black">
          {product.title}
        </h1>

        <p className="mt-6 text-lg leading-8 text-zinc-400">
          {product.description || "Premium Apple ID ready for instant delivery."}
        </p>

      </div>

      <div className="flex items-center gap-6">

        <div className="text-5xl font-black text-lime-400">
          ${product.price}
        </div>

        <div className="text-zinc-500">
          {product.currency}
        </div>

      </div>

      <ProductFeatures />

    </div>
  );
}