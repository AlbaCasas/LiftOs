import * as React from "react";

import { cn } from "@/lib/cn";

function Heading({ className, ...props }: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot="heading"
      className={cn(
        "font-heading text-2xl font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

export { Heading };
