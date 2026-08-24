import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

function FieldError({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      data-slot="field-error"
      role="alert"
      className={cn("text-xs text-destructive", className)}
      {...props}
    />
  );
}

export { FieldError };
