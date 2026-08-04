export default function ProductGallery() {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-gradient-to-br from-[#1b1b1b] to-[#101010] p-10">

      <div className="flex h-[500px] items-center justify-center">

        <div className="flex h-52 w-52 items-center justify-center rounded-full border border-zinc-700 bg-[#181818] text-8xl shadow-[0_0_80px_rgba(163,230,53,.15)]">
          🍎
        </div>

      </div>

      <div className="mt-8 grid grid-cols-4 gap-4">

        <div className="h-24 rounded-2xl border border-lime-400 bg-[#181818]" />

        <div className="h-24 rounded-2xl border border-zinc-800 bg-[#181818]" />

        <div className="h-24 rounded-2xl border border-zinc-800 bg-[#181818]" />

        <div className="h-24 rounded-2xl border border-zinc-800 bg-[#181818]" />

      </div>

    </div>
  );
}