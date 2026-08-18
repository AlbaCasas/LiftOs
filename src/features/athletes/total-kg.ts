import type { Athlete } from "./type";

export const totalKg = (athlete: Athlete) =>
  athlete.squat1rm + athlete.bench1rm + athlete.deadlift1rm;
