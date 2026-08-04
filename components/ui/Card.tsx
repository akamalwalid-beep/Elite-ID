import { HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

type Props = HTMLAttributes<HTMLDivElement> & {
  hover?: boolean;
  glow?: boolean;
};

export default function Card({
  className,
  children,
  hover = true,
  glow = true,
  ...props
}: Props) {
  return (
    <div
      className={cn(
        `
          group
          relative
          overflow-hidden
          rounded-[30px]
          border
          border-zinc-800
          bg-gradient-to-b
          from-[#181818]
          via-[#101010]
          to-[#090909]
          backdrop-blur-xl
          transition-all
          duration-500
        `,
        hover &&
          `
          hover:-translate-y-2
          hover:border-lime-400/40
        `,
        glow &&
          `
          hover:shadow-[0_0_60px_rgba(132,255,0,.18)]
        `,
        className
      )}
      {...props}
    >
      {/* Glow */}

      {glow && (
        <div
          className="
            pointer-events-none
            absolute
            -left-24
            -top-24
            h-72
            w-72
            rounded-full
            bg-lime-400/10
            blur-[120px]
            opacity-0
            transition-all
            duration-700
            group-hover:opacity-100
          "
        />
      )}

      {/* Animated Border */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          rounded-[30px]
          opacity-0
          transition
          duration-500
          group-hover:opacity-100
        "
      >
        <div className="absolute inset-0 rounded-[30px] border border-white/10" />
      </div>

      {/* Shine */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          -translate-x-full
          bg-gradient-to-r
          from-transparent
          via-white/5
          to-transparent
          transition-transform
          duration-1000
          group-hover:translate-x-full
        "
      />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}