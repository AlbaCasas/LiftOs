"use client";

import type { ReactNode } from "react";
import { Slot } from "radix-ui";
import { useFormContext, useFormState } from "react-hook-form";
import { useTranslations } from "next-intl";

import { FieldError } from "@/components/ui/field-error";
import { Label } from "@/components/ui/label";
import type { AthleteField as AthleteFieldName } from "../domain/athlete";

const messageFor = (
  key: string | undefined,
  t: ReturnType<typeof useTranslations<"Athletes">>,
) => {
  if (!key) return;
  if (key === "notPositive") return t("form.errors.notPositive");
  if (key === "weightClassMismatch") {
    return t("form.errors.weightClassMismatch");
  }
  return t("form.errors.required");
};

export const AthleteField = ({
  name,
  label,
  suffix,
  children,
}: {
  name: AthleteFieldName;
  label: string;
  suffix?: string;
  children: ReactNode;
}) => {
  const t = useTranslations("Athletes");
  const { control, getFieldState } = useFormContext();
  const formState = useFormState({ control, name });
  const { error } = getFieldState(name, formState);
  const message = messageFor(error?.message, t);
  const controlEl = (
    <Slot.Root
      id={name}
      aria-invalid={Boolean(message)}
      aria-describedby={message ? `${name}-error` : undefined}
    >
      {children}
    </Slot.Root>
  );

  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={name}>
        {label}
        <span className="text-destructive" aria-hidden="true">
          {" "}
          *
        </span>
      </Label>
      {suffix ? (
        <div className="relative [&_input]:pr-8">
          {controlEl}
          <span className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center text-xs text-muted-foreground">
            {suffix}
          </span>
        </div>
      ) : (
        controlEl
      )}
      {message ? <FieldError id={`${name}-error`}>{message}</FieldError> : null}
    </div>
  );
};
