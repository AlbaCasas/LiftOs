"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import {
  filterExercises,
  searchExercises,
  type Exercise,
  type PatternFilter,
} from "../domain/exercise";
import { ExerciseCreateDialog } from "./exercise-create-dialog";
import { ExerciseSearch } from "./exercise-search";
import { ExercisesTable } from "./exercises-table";
import { PatternTabs } from "./pattern-tabs";

export const ExercisesLibrary = ({ exercises }: { exercises: Exercise[] }) => {
  const t = useTranslations("Exercises");
  const [patternFilter, setPatternFilter] = useState<PatternFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const patternExercises = filterExercises(exercises, patternFilter);
  const visibleExercises = searchExercises(patternExercises, searchQuery);
  const defaultPattern = patternFilter === "all" ? "squat" : patternFilter;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-baseline gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            {t("pageTitle")}
          </h1>
          <span className="text-sm text-muted-foreground">
            {exercises.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <ExerciseSearch
            exercises={patternExercises}
            query={searchQuery}
            onQueryChange={setSearchQuery}
          />
          <ExerciseCreateDialog defaultPattern={defaultPattern} />
        </div>
      </div>
      <PatternTabs value={patternFilter} onChange={setPatternFilter} />
      <ExercisesTable
        exercises={visibleExercises}
        showPattern={patternFilter === "all"}
        isSearch={searchQuery.trim().length > 0}
      />
    </div>
  );
};
