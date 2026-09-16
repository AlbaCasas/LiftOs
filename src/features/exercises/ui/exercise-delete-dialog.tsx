"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { FieldError } from "@/components/ui/field-error";
import { deleteExercise } from "../application/delete-exercise";
import type { Exercise } from "../domain/exercise";

export const ExerciseDeleteDialog = ({ exercise }: { exercise: Exercise }) => {
  const t = useTranslations("Exercises");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string>();
  const [isPending, startTransition] = useTransition();

  const onConfirm = () => {
    startTransition(async () => {
      const result = await deleteExercise(exercise.id);
      if (result && !result.ok) {
        setError(result.message ?? t("form.failed"));
        return;
      }
      setOpen(false);
    });
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) {
          setError(undefined);
        }
      }}
    >
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
        >
          {t("delete")}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("form.confirmDeleteTitle")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("form.confirmDeleteDescription")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        {error ? <FieldError>{error}</FieldError> : null}
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>
            {t("form.cancel")}
          </AlertDialogCancel>
          <Button
            type="button"
            variant="destructive"
            disabled={isPending}
            onClick={onConfirm}
          >
            {isPending ? t("form.deleting") : t("form.delete")}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
