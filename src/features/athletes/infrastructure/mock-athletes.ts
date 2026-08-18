import type { Athlete } from "@/features/athletes/domain/athlete";

export const mockAthletes: Athlete[] = [
  {
    id: "1",
    name: "Marta Ruiz",
    gender: "female",
    ageCategory: "junior",
    weightClass: "-52",
    squat1rm: 150,
    bench1rm: 100,
    deadlift1rm: 120,
  },
  {
    id: "2",
    name: "Juan Pérez",
    gender: "male",
    ageCategory: "junior",
    weightClass: "-59",
    squat1rm: 180,
    bench1rm: 120,
    deadlift1rm: 150,
  },
  {
    id: "3",
    name: "Ana López",
    gender: "female",
    ageCategory: "junior",
    weightClass: "-63",
    squat1rm: 130,
    bench1rm: 90,
    deadlift1rm: 110,
  },
];
