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
import { deleteExercise } from "../application/delete-exercise";
import { updateExercise } from "../application/update-exercise";
import type { Exercise, ExerciseDraft } from "../domain/exercise";
import { patterns } from "../domain/exercise";
import { exerciseDraftSchema } from "../domain/to-exercise";

export const ExerciseForm = ({
  exercise,
  onSuccess,
}: {
  exercise: Exercise;
  onSuccess: () => void;
}) => {
  const t = useTranslations("Exercises");
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<ExerciseDraft>({
    resolver: zodResolver(exerciseDraftSchema, undefined, { raw: true }),
    defaultValues: {
      id: exercise.id,
      name: exercise.name,
      pattern: exercise.pattern,
      isMeetLift: exercise.isMeetLift ? "true" : "false",
    },
  });

  const pattern = useWatch({ control, name: "pattern" });

  const onSubmit = handleSubmit((draft) => {
    startTransition(async () => {
      const result = await updateExercise(draft);
      if (result && !result.ok) {
        setError("root", { message: result.message ?? t("form.failed") });
        return;
      }
      onSuccess();
    });
  });

  const onDelete = () => {
    startTransition(async () => {
      const result = await deleteExercise(exercise.id);
      if (result && !result.ok) {
        setError("root", { message: result.message ?? t("form.failed") });
        return;
      }
      onSuccess();
    });
  };

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <input type="hidden" {...register("id")} />

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">
            {t("table.name")}
            <span className="text-destructive" aria-hidden="true">
              {" "}
              *
            </span>
          </Label>
          <Input id="name" {...register("name")} autoFocus />
          {errors.name?.message && (
            <FieldError id="name-error">{t("form.errors.required")}</FieldError>
          )}
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
                {t(`patternValue.${value}`)}
              </option>
            ))}
          </NativeSelect>
        </div>

        {pattern !== "other" && (
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="isMeetLift">{t("table.meetLift")}</Label>
            <NativeSelect id="isMeetLift" {...register("isMeetLift")}>
              <option value="false">{t("meetLiftValue.false")}</option>
              <option value="true">{t("meetLiftValue.true")}</option>
            </NativeSelect>
          </div>
        )}

        {errors.root?.message && (
          <FieldError className="text-sm">{errors.root.message}</FieldError>
        )}
      </div>

      <DialogFooter className="sm:justify-between">
        <Button
          type="button"
          variant="destructive"
          disabled={isPending}
          onClick={onDelete}
        >
          {isPending ? t("form.deleting") : t("form.delete")}
        </Button>
        <div className="flex gap-2">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              {t("form.cancel")}
            </Button>
          </DialogClose>
          <Button type="submit" disabled={isPending}>
            {isPending ? t("form.saving") : t("form.save")}
          </Button>
        </div>
      </DialogFooter>
    </form>
  );
};
