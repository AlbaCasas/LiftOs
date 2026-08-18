import { Athlete } from "./athlete";

export const totalKg = (athlete: Athlete) =>
  athlete.squat1rm + athlete.bench1rm + athlete.deadlift1rm;
