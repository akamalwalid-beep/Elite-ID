"use client";

import { InputHTMLAttributes } from "react";
import { Search } from "lucide-react";
import { cn } from "../../lib/utils";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  icon?: boolean;
  error?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

export default function Input({
  icon = false,
  error = false,
  leftIcon,
  rightIcon,
  className,
  ...props
}: Props) {
  return (
    <div className="group relative">

      {/* Glow */}

      <div
        className={cn(
          `
            absolute
            inset-0
            rounded-3xl
            blur-2xl
            transition-all
            duration-500
          `,
          error
            ? "bg-red-500/15"
            : "bg-lime-400/0 group-focus-within:bg-lime-400/15"
        )}
      />

      <div
        className={cn(
          `
            relative
            flex
            h-14
            items-center
            rounded-3xl
            border
            bg-[#101010]/90
            backdrop-blur-xl
            transition-all
            duration-300
          `,
          error
            ? "border-red-500"
            : `
              border-zinc-800
              group-hover:border-zinc-700
              group-focus-within:border-lime-400
              group-focus-within:shadow-[0_0_35px_rgba(132,255,0,.18)]
            `
        )}
      >
        {(icon || leftIcon) && (
          <div className="ml-5 flex items-center text-zinc-500 transition group-focus-within:text-lime-400">
            {leftIcon ?? <Search size={20} />}
          </div>
        )}

        <input
          className={cn(
            `
              h-full
              w-full
              bg-transparent
              px-5
              text-white
              outline-none
              placeholder:text-zinc-500
            `,
            className
          )}
          {...props}
        />

        {rightIcon && (
          <div className="mr-5 flex items-center text-zinc-400">
            {rightIcon}
          </div>
        )}
      </div>

    </div>
  );
}