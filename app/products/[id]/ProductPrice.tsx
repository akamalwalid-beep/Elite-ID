type Props = {
  price: number;
  currency: string;
};

export default function ProductPrice({
  price,
  currency,
}: Props) {
  return (
    <div
      className="
      relative
      overflow-hidden
      rounded-3xl
      border
      border-white/10
      bg-gradient-to-br
      from-lime-400/10
      via-white/[0.04]
      to-transparent
      p-7
      backdrop-blur-xl
      "
    >

      <div
        className="
        absolute
        -right-20
        -top-20
        h-48
        w-48
        rounded-full
        bg-lime-400/20
        blur-3xl
        "
      />


      <div className="relative z-10">

        <p className="text-sm font-semibold text-zinc-500">
          Starting price
        </p>


        <div className="mt-3 flex items-end gap-3">

          <h3
            className="
            text-5xl
            font-black
            text-lime-400
            "
          >
            ${price}
          </h3>


          <span
            className="
            mb-2
            text-sm
            font-bold
            text-zinc-400
            "
          >
            {currency}
          </span>

        </div>


      </div>

    </div>
  );
}