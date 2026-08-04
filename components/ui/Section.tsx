import { HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

type Props = HTMLAttributes<HTMLElement> & {
  container?: boolean;
  size?: "default" | "wide" | "full";
};

export default function Section({
  className,
  children,
  container = true,
  size = "wide",
  ...props
}: Props) {
  const sizes = {
    default: "max-w-7xl",
    wide: "max-w-[1700px]",
    full: "max-w-full",
  };

  return (
    <section
      className={cn(
        "relative overflow-hidden bg-[#090909] py-28 text-white",
        className
      )}
      {...props}
    >
      {container ? (
        <div className={cn("mx-auto px-10", sizes[size])}>
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  );
}