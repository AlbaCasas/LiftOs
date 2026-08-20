import { integer, pgTable, text } from "drizzle-orm/pg-core";

export const athletes = pgTable("athletes", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  gender: text("gender").notNull(),
  ageCategory: text("age_category").notNull(),
  weightClass: text("weight_class").notNull(),
  squat1rm: integer("squat_1rm").notNull(),
  bench1rm: integer("bench_1rm").notNull(),
  deadlift1rm: integer("deadlift_1rm").notNull(),
});
