type AgeCategory = "sub-junior" | "junior" | "open" | "masters";

type FemaleWeightClass =
  | "-47"
  | "-52"
  | "-57"
  | "-63"
  | "-69"
  | "-76"
  | "-84"
  | "84+";
type MaleWeightClass =
  | "-59"
  | "-66"
  | "-74"
  | "-83"
  | "-93"
  | "-105"
  | "-120"
  | "120+";

type AthleteBase = {
  id: string;
  name: string;
  ageCategory: AgeCategory;
  squat1rm: number;
  bench1rm: number;
  deadlift1rm: number;
};

export type Athlete =
  | (AthleteBase & { gender: "female"; weightClass: FemaleWeightClass })
  | (AthleteBase & { gender: "male"; weightClass: MaleWeightClass });
