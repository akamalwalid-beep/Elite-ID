import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#090909] text-white">

      <div className="w-full max-w-xl rounded-3xl border border-zinc-800 bg-[#111111] p-10 text-center">

        <div className="text-7xl">
          ✅
        </div>

        <h1 className="mt-6 text-5xl font-bold">
          Order Created
        </h1>

        <p className="mt-5 text-zinc-400">
          Your order has been received successfully.
        </p>

        <p className="mt-2 text-zinc-500">
          Please complete your payment using the selected method.
        </p>

        <Link
          href="/"
          className="mt-10 inline-block rounded-xl bg-lime-400 px-8 py-4 text-lg font-bold text-black transition hover:scale-105"
        >
          Back To Home
        </Link>

      </div>

    </main>
  );
}