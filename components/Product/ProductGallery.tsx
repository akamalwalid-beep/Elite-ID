import Image from "next/image";

type Product = {
  image: string;
  title: string;
};

export default function ProductGallery({
  product,
}: {
  product: Product;
}) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-gradient-to-br from-[#1b1b1b] to-[#101010] p-10">

      <div className="flex h-[600px] items-center justify-center">

        <Image
          src={product.image}
          alt={product.title}
          width={420}
          height={420}
          priority
          className="object-contain drop-shadow-[0_0_40px_rgba(132,255,0,.25)]"
        />

      </div>

    </div>
  );
}