import { athletes } from "@/features/athletes/infrastructure/schema";
import { users } from "@/features/auth/infrastructure/schema";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const blocks = pgTable("blocks", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  coachId: text("coach_id")
    .references(() => users.id)
    .notNull(),
  athleteId: text("athlete_id")
    .references(() => athletes.id)
    .notNull(),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});
