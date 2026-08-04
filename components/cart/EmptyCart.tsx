import Link from "next/link";

export default function EmptyCart() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">

      <h2 className="text-5xl font-bold">
        Your Cart is Empty
      </h2>

      <p className="mt-4 text-zinc-400">
        Looks like you haven't added any Apple IDs yet.
      </p>

      <Link
        href="/"
        className="mt-10 rounded-xl bg-lime-400 px-8 py-4 text-lg font-bold text-black transition hover:scale-105"
      >
        Continue Shopping
      </Link>

    </div>
  );
}