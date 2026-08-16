import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Shortcut({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <kbd
      className={cn(
        "inline-flex h-5 items-center rounded border border-border bg-subtle px-1.5 font-sans text-[10px] text-muted",
        className,
      )}
    >
      {children}
    </kbd>
  );
}
