import { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/utils";

type Props = HTMLAttributes<HTMLDivElement> & {
  title?: string;
  value?: ReactNode;
  icon?: ReactNode;
};

export default function StatCard({
  className,
  title,
  value,
  icon,
  children,
  ...props
}: Props) {
  return (
    <div
      className={cn(
        `
          group
          relative
          overflow-hidden
          rounded-3xl
          border
          border-zinc-800
          bg-white/[0.03]
          p-7
          text-center
          backdrop-blur-xl
          transition-all
          duration-300
          hover:-translate-y-1
          hover:border-lime-400/40
          hover:shadow-[0_0_40px_rgba(132,255,0,.12)]
        `,
        className
      )}
      {...props}
    >
      {/* Glow */}

      <div
        className="
          pointer-events-none
          absolute
          -top-20
          left-1/2
          h-40
          w-40
          -translate-x-1/2
          rounded-full
          bg-lime-400/10
          blur-[80px]
          opacity-0
          transition
          duration-500
          group-hover:opacity-100
        "
      />

      <div className="relative z-10">

        {icon && (
          <div className="mb-5 flex justify-center text-lime-400">
            {icon}
          </div>
        )}

        {title && (
          <p className="text-sm uppercase tracking-widest text-zinc-500">
            {title}
          </p>
        )}

        {value && (
          <h2 className="mt-3 text-4xl font-black text-white">
            {value}
          </h2>
        )}

        {children}

      </div>
    </div>
  );
}