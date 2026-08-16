import type { InputHTMLAttributes, ReactNode, Ref } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/cn";

export function SearchField({
  ref,
  shortcut,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  ref?: Ref<HTMLInputElement>;
  shortcut?: ReactNode;
}) {
  return (
    <label
      className={cn(
        "flex h-8 items-center rounded-lg border border-border bg-surface px-2.5 text-[13px] text-muted focus-within:border-border-strong",
        className,
      )}
    >
      <Search className="mr-2 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      <input
        ref={ref}
        type="search"
        className="h-full min-w-0 flex-1 bg-transparent text-ink outline-none placeholder:text-muted"
        {...props}
      />
      {shortcut}
    </label>
  );
}
