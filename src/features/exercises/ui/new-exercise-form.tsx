"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { FieldError } from "@/components/ui/field-error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";
import { createExercise } from "../application/create-exercise";
import {
  emptyNewExerciseDraft,
  patterns,
  type NewExerciseDraft,
} from "../domain/exercise";
import { newExerciseDraftSchema } from "../domain/to-new-exercise";

export const NewExerciseForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const t = useTranslations("Exercises");
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<NewExerciseDraft>({
    resolver: zodResolver(newExerciseDraftSchema, undefined, { raw: true }),
    defaultValues: emptyNewExerciseDraft,
  });

  const pattern = useWatch({ control, name: "pattern" });

  const onSubmit = handleSubmit((draft) => {
    startTransition(async () => {
      const result = await createExercise(draft);
      if (result && !result.ok) {
        setError("root", { message: result.message ?? t("form.failed") });
        return;
      }
      onSuccess();
    });
  });

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">
            {t("table.name")}
            <span className="text-destructive" aria-hidden="true">
              {" "}
              *
            </span>
          </Label>
          <Input
            id="name"
            {...register("name")}
            placeholder={t("form.namePlaceholder")}
            autoFocus
          />
          {errors.name?.message ? (
            <FieldError id="name-error">{t("form.errors.required")}</FieldError>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="pattern">
            {t("table.pattern")}
            <span className="text-destructive" aria-hidden="true">
              {" "}
              *
            </span>
          </Label>
          <NativeSelect id="pattern" {...register("pattern")}>
            {patterns.map((value) => (
              <option key={value} value={value}>
                {t(`patternShort.${value}`)}
              </option>
            ))}
          </NativeSelect>
        </div>

        {pattern !== "other" ? (
          <label htmlFor="isMeetLift" className="flex items-start gap-2">
            <input
              id="isMeetLift"
              type="checkbox"
              className="mt-1 size-4 rounded border border-input"
              {...register("isMeetLift")}
            />
            <span className="flex flex-col gap-0.5">
              <span className="font-medium">{t("table.meetLift")}</span>
              <span className="text-sm text-muted-foreground">
                {t("form.meetLiftHint")}
              </span>
            </span>
          </label>
        ) : null}

        {errors.root?.message ? (
          <FieldError className="text-sm">{errors.root.message}</FieldError>
        ) : null}
      </div>

      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="outline">
            {t("form.cancel")}
          </Button>
        </DialogClose>
        <Button type="submit" disabled={isPending}>
          {isPending ? t("form.creating") : t("form.create")}
        </Button>
      </DialogFooter>
    </form>
  );
};
