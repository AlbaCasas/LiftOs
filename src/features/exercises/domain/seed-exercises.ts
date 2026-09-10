import type { Exercise } from "./exercise";

export const seedExercises: Exercise[] = [
  {
    id: "back-squat",
    name: "Back Squat",
    pattern: "squat",
    isMeetLift: true,
  },
  {
    id: "front-squat",
    name: "Front Squat",
    pattern: "squat",
    isMeetLift: false,
  },
  {
    id: "pause-squat",
    name: "Pause Squat",
    pattern: "squat",
    isMeetLift: false,
  },
  {
    id: "box-squat",
    name: "Box Squat",
    pattern: "squat",
    isMeetLift: false,
  },
  {
    id: "bench-press",
    name: "Bench Press",
    pattern: "bench",
    isMeetLift: true,
  },
  {
    id: "close-grip-bench",
    name: "Close-Grip Bench",
    pattern: "bench",
    isMeetLift: false,
  },
  {
    id: "pause-bench",
    name: "Pause Bench",
    pattern: "bench",
    isMeetLift: false,
  },
  {
    id: "incline-bench",
    name: "Incline Bench",
    pattern: "bench",
    isMeetLift: false,
  },
  {
    id: "deadlift",
    name: "Deadlift",
    pattern: "deadlift",
    isMeetLift: true,
  },
  {
    id: "sumo-deadlift",
    name: "Sumo Deadlift",
    pattern: "deadlift",
    isMeetLift: false,
  },
  {
    id: "romanian-deadlift",
    name: "Romanian Deadlift",
    pattern: "deadlift",
    isMeetLift: false,
  },
  {
    id: "deficit-deadlift",
    name: "Deficit Deadlift",
    pattern: "deadlift",
    isMeetLift: false,
  },
  {
    id: "overhead-press",
    name: "Overhead Press",
    pattern: "other",
    isMeetLift: false,
  },
  {
    id: "barbell-row",
    name: "Barbell Row",
    pattern: "other",
    isMeetLift: false,
  },
];
