import { cloneElement, isValidElement, type ReactNode } from "react";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/cn";
import type { AthleteField as AthleteFieldId } from "../domain/athlete";

type ControlProps = {
  id?: string;
  className?: string;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
};

export const AthleteField = ({
  id,
  label,
  error,
  suffix,
  children,
}: {
  id: AthleteFieldId;
  label: string;
  error?: string;
  suffix?: string;
  children: ReactNode;
}) => {
  const describedBy = error ? `${id}-error` : undefined;
  const control = isValidElement<ControlProps>(children)
    ? cloneElement(children, {
        id,
        className: cn(suffix && "pr-8", children.props.className),
        "aria-invalid": Boolean(error),
        "aria-describedby": describedBy,
      })
    : children;

  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>
        {label}
        <span className="text-destructive" aria-hidden="true">
          {" "}
          *
        </span>
      </Label>
      {suffix ? (
        <div className="relative">
          {control}
          <span className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center text-xs text-muted-foreground">
            {suffix}
          </span>
        </div>
      ) : (
        control
      )}
      {error ? (
        <p id={`${id}-error`} className="text-xs text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
};
