import Image from "next/image";
import { Flame } from "lucide-react";
import { countryThemes } from "../../lib/countryThemes";

type Props = {
  country: string;
  featured: boolean;
  rating: number;
  views: number;
  image: string;
};

export default function ProductHeader({
  country,
  featured,
  rating,
  views,
  image,
}: Props) {
  const theme =
    countryThemes[country] ?? countryThemes.default;

  const isTrending = views >= 1000;
  const isTopRated = rating >= 4.8;

  return (
    <>
      <div
        className={`absolute inset-0 bg-gradient-to-br ${theme.gradient}`}
      />

      <div
        className={`absolute -right-20 -top-20 h-60 w-60 rounded-full ${theme.glow} blur-[120px] opacity-60`}
      />

      {/* Product Image */}

      <div className="relative z-20 flex justify-center pt-8">

        <div className="relative h-40 w-40">

          <Image
            src={image}
            alt={country}
            fill
            className="object-contain transition duration-500 group-hover:scale-110"
          />

        </div>

      </div>

      {/* Badges */}

      <div className="absolute right-5 top-5 z-30 flex flex-col gap-2">

        {featured && (
          <div className="rounded-full bg-lime-400/10 px-3 py-1 text-xs font-bold text-lime-400 border border-lime-400/30">
            <Flame size={13} className="inline mr-1" />
            Featured
          </div>
        )}

        {isTrending && (
          <div className="rounded-full bg-orange-500/10 px-3 py-1 text-xs font-bold text-orange-400">
            🔥 Trending
          </div>
        )}

        {isTopRated && (
          <div className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-bold text-yellow-400">
            ⭐ Top Rated
          </div>
        )}

      </div>

      {/* Title */}

      <div className="relative z-20 mt-5 text-center">

        <h2 className="text-3xl font-black">

          {theme.flag} {country.toUpperCase()}

        </h2>

        <p className={`mt-2 text-sm font-semibold tracking-[0.25em] uppercase ${theme.accent}`}>

          Premium Apple ID

        </p>

      </div>
    </>
  );
}