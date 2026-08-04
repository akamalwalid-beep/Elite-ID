"use client";

import { useRouter } from "next/navigation";

export default function Topbar() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/logout", {
      method: "POST",
    });

    router.push("/login");
    router.refresh();
  }

  return (
    <header className="flex h-20 items-center justify-between border-b border-zinc-800 bg-[#101010] px-8">

      <h2 className="text-2xl font-bold text-white">
        Admin Dashboard
      </h2>

      <div className="flex items-center gap-4">

        <div className="rounded-full bg-lime-400 px-5 py-2 font-bold text-black">
          Admin
        </div>

        <button
          onClick={logout}
          className="rounded-xl bg-red-600 px-5 py-2 font-semibold text-white transition hover:bg-red-500"
        >
          Logout
        </button>

      </div>

    </header>
  );
}