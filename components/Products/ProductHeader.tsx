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

      {/* Background */}

      <div
        className={`
        absolute
        inset-0
        bg-gradient-to-br
        ${theme.gradient}
        `}
      />


      {/* Glow */}

      <div
        className={`
        absolute
        -right-20
        -top-20
        h-60
        w-60
        rounded-full
        ${theme.glow}
        blur-[120px]
        opacity-60
        `}
      />



      {/* Image */}

      <div className="relative z-20 flex justify-center pt-8">

        <div className="relative h-40 w-40">

          <Image
            src={image}
            alt={country}
            fill
            className="
            object-contain
            drop-shadow-[0_20px_40px_rgba(0,0,0,.5)]
            transition-all
            duration-700
            group-hover:scale-105
            "
          />

        </div>

      </div>




      {/* Badges */}

      <div
        className="
        absolute
        right-5
        top-5
        z-30
        flex
        max-w-[120px]
        flex-col
        gap-2
        "
      >

        {featured && (

          <div
            className="
            rounded-full
            border
            border-lime-400/30
            bg-lime-400/10
            px-3
            py-1
            text-xs
            font-bold
            text-lime-400
            backdrop-blur-xl
            "
          >

            <Flame
              size={13}
              className="mr-1 inline"
            />

            Featured

          </div>

        )}



        {isTrending && (

          <div
            className="
            rounded-full
            border
            border-orange-400/20
            bg-orange-500/10
            px-3
            py-1
            text-xs
            font-bold
            text-orange-400
            "
          >
            🔥 Trending
          </div>

        )}



        {isTopRated && (

          <div
            className="
            rounded-full
            border
            border-yellow-400/20
            bg-yellow-500/10
            px-3
            py-1
            text-xs
            font-bold
            text-yellow-400
            "
          >
            ⭐ Top Rated
          </div>

        )}

      </div>




      {/* Title */}

      <div className="relative z-20 mt-5 text-center">

        <h2 className="text-3xl font-black">
          {country.toUpperCase()}
        </h2>


        <p
          className={`
          mt-2
          text-sm
          font-semibold
          uppercase
          tracking-[0.25em]
          ${theme.accent}
          `}
        >
          Premium Apple ID
        </p>


      </div>


    </>
  );
}