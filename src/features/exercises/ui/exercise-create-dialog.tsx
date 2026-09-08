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
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Pattern } from "../domain/exercise";
import { NewExerciseForm } from "./new-exercise-form";

export const ExerciseCreateDialog = ({
  defaultPattern,
}: {
  defaultPattern: Pattern;
}) => {
  const [open, setOpen] = useState(false);
  const t = useTranslations("Exercises");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{t("addExercise")}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("form.createTitle")}</DialogTitle>
          <DialogDescription className="sr-only">
            {t("form.description")}
          </DialogDescription>
        </DialogHeader>
        <NewExerciseForm
          key={open ? defaultPattern : "closed"}
          defaultPattern={defaultPattern}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};
