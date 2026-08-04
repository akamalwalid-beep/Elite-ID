"use client";

import { Product } from "@/types/product";
import { ShieldCheck, Truck, RefreshCcw } from "lucide-react";

type Props = {
  product: Product;
};

export default function ProductTabs({ product }: Props) {
  return (
    <section className="mx-auto mt-20 max-w-[1700px] px-10">
      <div className="rounded-3xl border border-zinc-800 bg-[#111111] p-10">

        <h2 className="mb-8 text-3xl font-bold">
          Product Details
        </h2>

        <div className="grid gap-8 lg:grid-cols-2">

          <div>
            <h3 className="mb-4 text-xl font-semibold">
              Description
            </h3>

            <p className="leading-8 text-zinc-400">
              {product.description || "No description available."}
            </p>
          </div>

          <div className="space-y-6">

            <Feature
              icon={<ShieldCheck size={22} />}
              title="Secure Account"
              text="All Apple IDs are verified before delivery."
            />

            <Feature
              icon={<Truck size={22} />}
              title="Instant Delivery"
              text="Receive your account immediately after payment."
            />

            <Feature
              icon={<RefreshCcw size={22} />}
              title="Replacement Guarantee"
              text="Replacement available if there is any issue."
            />

          </div>

        </div>

      </div>
    </section>
  );
}

function Feature({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-4 rounded-2xl border border-zinc-800 bg-[#181818] p-5">

      <div className="text-lime-400">
        {icon}
      </div>

      <div>

        <h4 className="font-bold">
          {title}
        </h4>

        <p className="mt-2 text-sm text-zinc-400">
          {text}
        </p>

      </div>

    </div>
  );
}