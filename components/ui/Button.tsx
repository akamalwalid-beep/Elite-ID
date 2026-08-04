"use client";

import { ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "../../lib/utils";

type Variant =
  | "primary"
  | "outline"
  | "ghost"
  | "danger";

type Size =
  | "sm"
  | "md"
  | "lg";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
};

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  className,
  children,
  disabled,
  ...props
}: Props) {
  const variants = {
    primary: `
      bg-lime-400
      text-black
      hover:scale-[1.03]
      hover:shadow-[0_0_35px_rgba(132,255,0,.45)]
      active:scale-95
    `,

    outline: `
      border
      border-zinc-700
      bg-white/[0.03]
      text-white
      hover:border-lime-400
      hover:bg-lime-400/10
    `,

    ghost: `
      bg-transparent
      text-zinc-300
      hover:bg-white/5
    `,

    danger: `
      bg-red-500
      text-white
      hover:bg-red-600
    `,
  };

  const sizes = {
    sm: `
      px-4
      py-2
      text-sm
    `,

    md: `
      px-6
      py-4
      text-base
    `,

    lg: `
      px-8
      py-5
      text-lg
    `,
  };

  return (
    <button
      disabled={disabled || loading}
      className={cn(
        `
          group
          relative
          inline-flex
          items-center
          justify-center
          overflow-hidden
          rounded-2xl
          font-bold
          transition-all
          duration-300
          disabled:pointer-events-none
          disabled:opacity-50
        `,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {/* Shine */}

      <span
        className="
          absolute
          inset-0
          -translate-x-full
          bg-gradient-to-r
          from-transparent
          via-white/20
          to-transparent
          transition-transform
          duration-1000
          group-hover:translate-x-full
        "
      />

      <span className="relative z-10 flex items-center justify-center gap-2">
        {loading ? (
          <>
            <Loader2
              size={18}
              className="animate-spin"
            />
            Loading...
          </>
        ) : (
          children
        )}
      </span>
    </button>
  );
}