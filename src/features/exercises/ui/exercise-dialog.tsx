"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Exercise } from "../domain/exercise";
import { ExerciseForm } from "./exercise-form";

export const ExerciseDialog = ({
  exercise,
  open,
  onOpenChange,
}: {
  exercise: Exercise;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const t = useTranslations("Exercises");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
        onClick={() => onOpenChange(true)}
      >
        {t("edit")}
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("edit")}</DialogTitle>
          <DialogDescription>{t("form.description")}</DialogDescription>
        </DialogHeader>
        <ExerciseForm
          key={open ? exercise.id : "closed"}
          exercise={exercise}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};
