export type AthleteStatus = "on-track" | "flagged";
export type Trend = "up" | "down" | "flat";

export type Athlete = {
  id: string;
  name: string;
  weightClass: string;
  status: AthleteStatus;
  squatKg: number | null;
  benchKg: number | null;
  deadliftKg: number | null;
  lastActiveDays: number;
  trend: Trend;
};

export function totalKg(athlete: Pick<Athlete, "squatKg" | "benchKg" | "deadliftKg">) {
  if (
    athlete.squatKg === null ||
    athlete.benchKg === null ||
    athlete.deadliftKg === null
  ) {
    return null;
  }

  return athlete.squatKg + athlete.benchKg + athlete.deadliftKg;
}

const seedAthletes: Athlete[] = [
  {
    id: "marcus-chen",
    name: "Marcus Chen",
    weightClass: "93kg",
    status: "on-track",
    squatKg: 282,
    benchKg: 181,
    deadliftKg: 301,
    lastActiveDays: 3,
    trend: "down",
  },
  {
    id: "sarah-okonkwo",
    name: "Sarah Okonkwo",
    weightClass: "76kg",
    status: "flagged",
    squatKg: 177,
    benchKg: 90,
    deadliftKg: 206,
    lastActiveDays: 4,
    trend: "up",
  },
  {
    id: "james-whitfield",
    name: "James Whitfield",
    weightClass: "105kg",
    status: "flagged",
    squatKg: 188,
    benchKg: 159,
    deadliftKg: 224,
    lastActiveDays: 4,
    trend: "up",
  },
  {
    id: "elena-vasquez",
    name: "Elena Vasquez",
    weightClass: "57kg",
    status: "on-track",
    squatKg: 136,
    benchKg: 71,
    deadliftKg: 165,
    lastActiveDays: 5,
    trend: "up",
  },
  {
    id: "tom-andersson",
    name: "Tom Andersson",
    weightClass: "83kg",
    status: "on-track",
    squatKg: 173,
    benchKg: 114,
    deadliftKg: 191,
    lastActiveDays: 3,
    trend: "flat",
  },
];

export const athletes = seedAthletes;

export function getAthlete(id: string) {
  return athletes.find((athlete) => athlete.id === id);
}

export function weightClasses() {
  return [
    ...new Set(
      athletes.map((athlete) => athlete.weightClass).filter(Boolean),
    ),
  ].sort((a, b) => Number.parseInt(a, 10) - Number.parseInt(b, 10));
}
