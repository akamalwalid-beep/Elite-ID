export default function Topbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-zinc-800 bg-[#101010] px-8">

      <h2 className="text-2xl font-bold text-white">
        Admin Dashboard
      </h2>

      <div className="rounded-full bg-lime-400 px-5 py-2 font-bold text-black">
        Admin
      </div>

    </header>
  );
}