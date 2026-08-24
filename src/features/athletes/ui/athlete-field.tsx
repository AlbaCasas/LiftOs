import type { ReactNode } from "react";

import { FieldError } from "@/components/ui/field-error";
import { Label } from "@/components/ui/label";
import type { AthleteField as AthleteFieldId } from "../domain/athlete";

export const athleteControlProps = (id: AthleteFieldId, error?: string) => ({
  id,
  "aria-invalid": Boolean(error),
  "aria-describedby": error ? `${id}-error` : undefined,
});

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
}) => (
  <div className="flex flex-col gap-1.5">
    <Label htmlFor={id}>
      {label}
      <span className="text-destructive" aria-hidden="true">
        {" "}
        *
      </span>
    </Label>
    {suffix ? (
      <div className="relative [&_input]:pr-8">
        {children}
        <span className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center text-xs text-muted-foreground">
          {suffix}
        </span>
      </div>
    ) : (
      children
    )}
    {error ? <FieldError id={`${id}-error`}>{error}</FieldError> : null}
  </div>
);
