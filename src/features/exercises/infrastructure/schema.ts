import { boolean, pgTable, text } from "drizzle-orm/pg-core";

export const exercises = pgTable("exercises", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  pattern: text("pattern").notNull(),
  isMeetLift: boolean("is_meet_lift").notNull(),
});
