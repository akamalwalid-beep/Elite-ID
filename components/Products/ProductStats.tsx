import { Eye, Package, Star, AlertTriangle } from "lucide-react";

type Props = {
  views: number;
  stock: number;
  rating: number;
};

export default function ProductStats({
  views,
  stock,
  rating,
}: Props) {
  const inStock = stock > 0;
  const lowStock = stock > 0 && stock <= 5;

  return (
    <div className="relative z-10 mt-7">

      {/* Views */}

      <div className="flex justify-center">

        <div className="flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/70 px-4 py-2 text-sm text-zinc-300 backdrop-blur-xl">

          <Eye size={16} className="text-lime-400" />

          {views.toLocaleString()} Views

        </div>

      </div>

      {/* Stock */}

      <div className="mt-5 flex justify-center">

        {inStock ? (

          <div
            className={`
              flex
              items-center
              gap-2
              rounded-full
              px-4
              py-2
              text-sm
              font-semibold
              ${
                lowStock
                  ? "bg-orange-500/10 text-orange-400"
                  : "bg-lime-400/10 text-lime-400"
              }
            `}
          >

            {lowStock ? (
              <AlertTriangle size={16} />
            ) : (
              <Package size={16} />
            )}

            {lowStock
              ? `Only ${stock} Left`
              : `${stock} In Stock`}

          </div>

        ) : (

          <div className="rounded-full bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-400">

            Out Of Stock

          </div>

        )}

      </div>

      {/* Rating */}

      <div className="mt-6 flex justify-center gap-1">

        {Array.from({ length: 5 }).map((_, index) => (

          <Star
            key={index}
            size={18}
            fill={
              index < Math.round(rating)
                ? "#facc15"
                : "transparent"
            }
            className="text-yellow-400"
          />

        ))}

      </div>

      <p className="mt-2 text-center text-sm text-zinc-500">

        {rating.toFixed(1)} / 5 Rating

      </p>

    </div>
  );
}