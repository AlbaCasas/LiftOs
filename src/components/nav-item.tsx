import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

export function NavItem({
  href,
  active,
  collapsed,
  title,
  onClick,
  children,
}: {
  href: string;
  active?: boolean;
  collapsed?: boolean;
  title?: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      title={title}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex h-8 items-center gap-2 rounded-md px-2 text-sm font-medium transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        collapsed && "justify-center px-0",
        active ? "bg-subtle text-ink" : "text-muted hover:bg-subtle hover:text-ink",
      )}
    >
      {children}
    </Link>
  );
}
