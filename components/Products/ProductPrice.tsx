type Props = {
  price: number;
  currency: string;
};

export default function ProductPrice({
  price,
  currency,
}: Props) {
  const oldPrice = price * 1.25;
  const discount = Math.round(
    ((oldPrice - price) / oldPrice) * 100
  );

  return (
    <div className="relative z-10 mt-8">

      <div
        className="
          relative
          overflow-hidden
          rounded-3xl
          border
          border-zinc-800
          bg-gradient-to-b
          from-white/[0.05]
          to-black/40
          p-6
          backdrop-blur-xl
        "
      >

        {/* Shine */}

        <div
          className="
            absolute
            inset-0
            -translate-x-full
            bg-gradient-to-r
            from-transparent
            via-white/10
            to-transparent
            transition-transform
            duration-1000
            group-hover:translate-x-full
          "
        />

        {/* Discount */}

        <div className="absolute left-5 top-5 rounded-full bg-red-500/10 px-3 py-1 text-xs font-bold text-red-400">

          -{discount}%

        </div>

        <p className="text-center text-xs uppercase tracking-[0.3em] text-zinc-500">

          Starting From

        </p>

        <div className="mt-3 flex items-end justify-center gap-2">

          <span className="text-5xl font-black text-lime-400">

            {price.toFixed(2)}

          </span>

          <span className="mb-2 text-lg text-zinc-400">

            {currency}

          </span>

        </div>

        <div className="mt-3 text-center">

          <span className="text-lg text-zinc-600 line-through">

            {oldPrice.toFixed(2)} {currency}

          </span>

        </div>

      </div>

    </div>
  );
}