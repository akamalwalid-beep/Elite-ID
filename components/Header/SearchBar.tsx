"use client";

import { Search, Sparkles, TrendingUp } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="group relative w-[580px]">

      {/* Glow */}

      <div className="absolute inset-0 rounded-3xl bg-lime-400/0 blur-2xl transition-all duration-500 group-hover:bg-lime-400/10 group-focus-within:bg-lime-400/20" />

      {/* Search */}

      <div
        className="
          relative
          rounded-3xl
          border
          border-zinc-800
          bg-[#101010]/90
          backdrop-blur-2xl
          transition-all
          duration-300
          group-focus-within:border-lime-400
          group-hover:border-zinc-700
          group-focus-within:shadow-[0_0_40px_rgba(132,255,0,.18)]
        "
      >

        <div className="flex h-16 items-center">

          <Search
            size={22}
            className="ml-6 text-zinc-500 transition group-focus-within:text-lime-400"
          />

          <input
            type="text"
            placeholder="Search Apple IDs..."
            className="
              h-full
              flex-1
              bg-transparent
              px-5
              text-white
              text-lg
              outline-none
              placeholder:text-zinc-500
            "
          />

          <kbd
            className="
              mr-5
              rounded-xl
              border
              border-zinc-700
              bg-black/30
              px-3
              py-1.5
              text-xs
              text-zinc-500
            "
          >
            ⌘ K
          </kbd>

        </div>

        {/* Suggestions */}

        <div
          className="
            absolute
            left-0
            right-0
            top-[72px]
            hidden
            rounded-3xl
            border
            border-zinc-800
            bg-[#101010]/95
            p-5
            backdrop-blur-2xl
            group-focus-within:block
            shadow-[0_20px_60px_rgba(0,0,0,.45)]
          "
        >

          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-lime-400">

            <TrendingUp size={16} />

            Popular Searches

          </div>

          <div className="space-y-2">

            <button className="flex w-full items-center justify-between rounded-2xl px-4 py-3 transition hover:bg-white/5">

              <div>

                <p className="font-semibold">
                  🇹🇷 Turkey Apple ID
                </p>

                <p className="text-sm text-zinc-500">
                  Premium Account
                </p>

              </div>

              <Sparkles
                size={18}
                className="text-lime-400"
              />

            </button>

            <button className="flex w-full items-center justify-between rounded-2xl px-4 py-3 transition hover:bg-white/5">

              <div>

                <p className="font-semibold">
                  🇺🇸 USA Apple ID
                </p>

                <p className="text-sm text-zinc-500">
                  Instant Delivery
                </p>

              </div>

              <Sparkles
                size={18}
                className="text-lime-400"
              />

            </button>

            <button className="flex w-full items-center justify-between rounded-2xl px-4 py-3 transition hover:bg-white/5">

              <div>

                <p className="font-semibold">
                  🇨🇳 China Apple ID
                </p>

                <p className="text-sm text-zinc-500">
                  Verified Account
                </p>

              </div>

              <Sparkles
                size={18}
                className="text-lime-400"
              />

            </button>

            <button className="flex w-full items-center justify-between rounded-2xl px-4 py-3 transition hover:bg-white/5">

              <div>

                <p className="font-semibold">
                  🇪🇬 Egypt Apple ID
                </p>

                <p className="text-sm text-zinc-500">
                  Ready To Use
                </p>

              </div>

              <Sparkles
                size={18}
                className="text-lime-400"
              />

            </button>

          </div>

          <div className="mt-5 border-t border-zinc-800 pt-4 text-center text-sm text-zinc-500">

            Press Enter to search...

          </div>

        </div>

      </div>

    </div>
  );
}