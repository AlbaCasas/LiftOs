"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Exercise } from "../domain/exercise";
import { ExerciseDeleteDialog } from "./exercise-delete-dialog";
import { ExerciseDialog } from "./exercise-dialog";

const EmptyLibrary = ({ isSearch }: { isSearch: boolean }) => {
  const t = useTranslations("Exercises");

  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed bg-card px-6 py-16 text-center">
      <p className="font-medium">
        {isSearch ? t("empty.searchTitle") : t("empty.title")}
      </p>
      <p className="mt-1 text-sm text-muted-foreground">
        {isSearch ? t("empty.searchDescription") : t("empty.description")}
      </p>
    </div>
  );
};

const ExerciseTableRow = ({
  exercise,
  showPattern,
}: {
  exercise: Exercise;
  showPattern: boolean;
}) => {
  const t = useTranslations("Exercises");
  const [editOpen, setEditOpen] = useState(false);

  return (
    <TableRow className="group relative isolate">
      <TableCell className="py-3 pl-4 font-medium">
        <button
          type="button"
          className="bg-transparent p-0 text-left font-medium after:absolute after:inset-0 after:z-0"
          onClick={() => setEditOpen(true)}
        >
          {exercise.name}
        </button>
      </TableCell>
      {showPattern && (
        <TableCell className="py-3 text-muted-foreground">
          {t(`patternShort.${exercise.pattern}`)}
        </TableCell>
      )}
      <TableCell className="py-3">
        {exercise.isMeetLift && exercise.pattern !== "other" && (
          <Badge variant="outline">{t("table.meetLift")}</Badge>
        )}
      </TableCell>
      <TableCell className="relative z-10 py-3 pr-4 text-right">
        <div className="flex justify-end gap-1">
          <ExerciseDialog
            exercise={exercise}
            open={editOpen}
            onOpenChange={setEditOpen}
          />
          <ExerciseDeleteDialog exercise={exercise} />
        </div>
      </TableCell>
    </TableRow>
  );
};

export const ExercisesTable = ({
  exercises,
  showPattern = true,
  isSearch = false,
}: {
  exercises: Exercise[];
  showPattern?: boolean;
  isSearch?: boolean;
}) => {
  const t = useTranslations("Exercises");

  if (exercises.length === 0) return <EmptyLibrary isSearch={isSearch} />;

  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="pl-4 text-muted-foreground">
              {t("table.name")}
            </TableHead>
            {showPattern && (
              <TableHead className="text-muted-foreground">
                {t("table.pattern")}
              </TableHead>
            )}
            <TableHead className="text-muted-foreground">
              {t("table.meetLift")}
            </TableHead>
            <TableHead className="pr-4">
              <span className="sr-only">{t("edit")}</span>
              <span className="sr-only">{t("delete")}</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {exercises.map((exercise) => (
            <ExerciseTableRow
              key={exercise.id}
              exercise={exercise}
              showPattern={showPattern}
            />
          ))}
        </TableBody>
      </Table>
      <p className="border-t px-4 py-2.5 text-xs text-muted-foreground">
        {t("table.count", { count: exercises.length })}
      </p>
    </div>
  );
};
