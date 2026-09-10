export const patterns = ["squat", "bench", "deadlift", "other"] as const;
export type Pattern = (typeof patterns)[number];

export type Exercise = {
  id: string;
  name: string;
  pattern: Pattern;
  isMeetLift: boolean;
};

export type ExerciseDraft = {
  id: string;
  name: string;
  pattern: Pattern;
  isMeetLift: "true" | "false";
};

export type NewExerciseDraft = {
  name: string;
  pattern: Pattern;
  isMeetLift: boolean;
};

export const emptyNewExerciseDraft: NewExerciseDraft = {
  name: "",
  pattern: "squat",
  isMeetLift: false,
};

export type PatternFilter = "all" | Pattern;

export const patternFilters = ["all", ...patterns] as const;

export const filterExercises = (
  exercises: Exercise[],
  patternFilter: PatternFilter,
) =>
  patternFilter === "all"
    ? exercises
    : exercises.filter((exercise) => exercise.pattern === patternFilter);

export const searchExercises = (exercises: Exercise[], query: string) => {
  const cleanedQuery = query.trim().toLowerCase();
  if (!cleanedQuery) {
    return exercises;
  }

  return exercises.filter((exercise) =>
    exercise.name.toLowerCase().includes(cleanedQuery),
  );
};
