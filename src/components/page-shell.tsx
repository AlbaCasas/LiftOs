import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function PageShell({
  title,
  eyebrow,
  description,
  action,
  toolbar,
  children,
}: {
  title: ReactNode;
  eyebrow?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  toolbar?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="px-6 py-8 md:px-10">
      {eyebrow ? <div className="mb-2 text-[13px] text-muted">{eyebrow}</div> : null}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-xl font-semibold tracking-tight text-ink">{title}</h1>
          {description ? (
            <p className="mt-2 max-w-prose text-sm text-muted">{description}</p>
          ) : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
      {toolbar ? <div className="mt-6 flex flex-wrap items-center gap-2">{toolbar}</div> : null}
      {children ? <div className={cn(toolbar ? "mt-4" : "mt-6")}>{children}</div> : null}
    </div>
  );
}
