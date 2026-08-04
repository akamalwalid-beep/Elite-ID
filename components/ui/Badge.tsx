import { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/utils";

type Variant =
  | "featured"
  | "trending"
  | "rating"
  | "success"
  | "danger"
  | "info"
  | "secondary";

type Size =
  | "sm"
  | "md";

type Props = HTMLAttributes<HTMLDivElement> & {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
};

export default function Badge({
  variant = "featured",
  size = "md",
  icon,
  className,
  children,
  ...props
}: Props) {
  const variants = {
    featured:
      "border border-lime-400/30 bg-lime-400/10 text-lime-400",

    trending:
      "bg-orange-500/10 text-orange-400",

    rating:
      "bg-yellow-500/10 text-yellow-400",

    success:
      "bg-emerald-500/10 text-emerald-400",

    danger:
      "bg-red-500/10 text-red-400",

    info:
      "bg-sky-500/10 text-sky-400",

    secondary:
      "bg-zinc-800 text-zinc-300",
  };

  const sizes = {
    sm: "px-2 py-1 text-[11px]",
    md: "px-3 py-1 text-xs",
  };

  return (
    <div
      className={cn(
        `
          inline-flex
          items-center
          gap-2
          rounded-full
          font-bold
          backdrop-blur-xl
          transition-all
          duration-300
        `,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {icon}

      {children}
    </div>
  );
}