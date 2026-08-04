"use client";

import { useState } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">

      <button
        onClick={() => setOpen(!open)}
        className="
          flex
          h-12
          items-center
          gap-3
          rounded-2xl
          border
          border-zinc-800
          bg-white/[0.04]
          px-5
          text-sm
          font-semibold
          text-white
          backdrop-blur-xl
          transition-all
          duration-300
          hover:border-lime-400
          hover:bg-lime-400/10
          hover:shadow-[0_0_25px_rgba(132,255,0,.2)]
        "
      >
        <Globe
          size={18}
          className="text-lime-400"
        />

        English

        <ChevronDown
          size={16}
          className={`transition duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (

        <div
          className="
            absolute
            right-0
            mt-3
            w-56
            overflow-hidden
            rounded-2xl
            border
            border-zinc-800
            bg-[#111111]/95
            backdrop-blur-2xl
            shadow-[0_20px_60px_rgba(0,0,0,.45)]
          "
        >

          <button className="flex w-full items-center justify-between px-5 py-4 transition hover:bg-lime-400/10">

            <span>🇬🇧 English</span>

            <Check
              size={18}
              className="text-lime-400"
            />

          </button>

          <button className="flex w-full items-center px-5 py-4 transition hover:bg-lime-400/10">

            🇪🇬 العربية

          </button>

          <button className="flex w-full items-center px-5 py-4 transition hover:bg-lime-400/10">

            🇨🇳 中文

          </button>

        </div>

      )}

    </div>
  );
}