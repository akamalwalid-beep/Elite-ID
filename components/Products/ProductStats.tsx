import {
  Eye,
  Package,
  Star,
  AlertTriangle,
} from "lucide-react";

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
    <div className="relative z-10 mt-7 space-y-4">


      {/* Views */}

      <div
        className="
        flex
        items-center
        justify-center
        gap-3
        rounded-2xl
        border
        border-white/10
        bg-white/[0.04]
        px-5
        py-3
        text-sm
        text-zinc-300
        backdrop-blur-xl
        "
      >

        <Eye
          size={17}
          className="text-lime-400"
        />

        <span>
          {views.toLocaleString()} Views
        </span>

      </div>




      {/* Stock */}

      <div
        className={`
        flex
        items-center
        justify-center
        gap-3
        rounded-2xl
        border
        px-5
        py-3
        text-sm
        font-semibold
        backdrop-blur-xl

        ${
          !inStock
            ? "border-red-400/20 bg-red-500/10 text-red-400"
            : lowStock
            ? "border-orange-400/20 bg-orange-500/10 text-orange-400"
            : "border-lime-400/20 bg-lime-400/10 text-lime-400"
        }
        `}
      >

        {!inStock ? (
          <AlertTriangle size={17} />
        ) : lowStock ? (
          <AlertTriangle size={17} />
        ) : (
          <Package size={17} />
        )}


        <span>

          {!inStock
            ? "Out Of Stock"
            : lowStock
            ? `Only ${stock} Left`
            : `${stock} Available`}

        </span>

      </div>




      {/* Rating */}

      <div
        className="
        rounded-2xl
        border
        border-white/10
        bg-white/[0.04]
        px-5
        py-4
        backdrop-blur-xl
        "
      >

        <div className="flex justify-center gap-1">

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


        <p className="mt-2 text-center text-sm text-zinc-400">

          {rating.toFixed(1)} / 5 Rating

        </p>


      </div>


    </div>
  );
}