export const ageCategories = [
  "sub-junior",
  "junior",
  "open",
  "masters",
] as const;
export type AgeCategory = (typeof ageCategories)[number];

export const genders = ["female", "male"] as const;
export type Gender = (typeof genders)[number];

export const femaleWeightClasses = [
  "-47",
  "-52",
  "-57",
  "-63",
  "-69",
  "-76",
  "-84",
  "84+",
] as const;
export type FemaleWeightClass = (typeof femaleWeightClasses)[number];

export const maleWeightClasses = [
  "-59",
  "-66",
  "-74",
  "-83",
  "-93",
  "-105",
  "-120",
  "120+",
] as const;
export type MaleWeightClass = (typeof maleWeightClasses)[number];

export type AthleteField =
  | "name"
  | "gender"
  | "ageCategory"
  | "weightClass"
  | "squat1rm"
  | "bench1rm"
  | "deadlift1rm";

type AthleteStats = {
  name: string;
  ageCategory: AgeCategory;
  squat1rm: number;
  bench1rm: number;
  deadlift1rm: number;
};

type AthleteClass =
  | { gender: "female"; weightClass: FemaleWeightClass }
  | { gender: "male"; weightClass: MaleWeightClass };

export type NewAthlete = AthleteStats & AthleteClass;
export type Athlete = NewAthlete & { id: string; coachId: string };

export type NewAthleteDraft = {
  name: string;
  gender: string;
  ageCategory: string;
  weightClass: string;
  squat1rm: number;
  bench1rm: number;
  deadlift1rm: number;
};

export const emptyAthleteDraft: NewAthleteDraft = {
  name: "",
  gender: "",
  ageCategory: "",
  weightClass: "",
  squat1rm: Number.NaN,
  bench1rm: Number.NaN,
  deadlift1rm: Number.NaN,
};

export const weightClassesFor = (gender: Gender) =>
  gender === "female" ? femaleWeightClasses : maleWeightClasses;

const includes = (list: readonly string[], value: string) =>
  list.includes(value);

export const isGender = (value: string): value is Gender =>
  includes(genders, value);

export const isAgeCategory = (value: string): value is AgeCategory =>
  includes(ageCategories, value);

export const isFemaleWeightClass = (value: string): value is FemaleWeightClass =>
  includes(femaleWeightClasses, value);

export const isMaleWeightClass = (value: string): value is MaleWeightClass =>
  includes(maleWeightClasses, value);

export const isWeightClassFor = (gender: Gender, value: string) =>
  gender === "female"
    ? isFemaleWeightClass(value)
    : isMaleWeightClass(value);
