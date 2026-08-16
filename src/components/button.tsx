import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "icon";

export function Button({
  variant = "primary",
  className,
  children,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  children: ReactNode;
}) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex shrink-0 cursor-pointer items-center justify-center font-medium transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50",
        variant === "primary" &&
          "h-8 gap-1.5 rounded-lg bg-ink px-3 text-[13px] text-ink-fg hover:bg-ink-hover",
        variant === "ghost" &&
          "h-8 gap-1.5 rounded-lg px-2.5 text-[13px] text-secondary hover:bg-subtle hover:text-ink",
        variant === "icon" &&
          "h-7 w-7 rounded-md text-muted hover:bg-subtle hover:text-ink",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
