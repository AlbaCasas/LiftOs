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
