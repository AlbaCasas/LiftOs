import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import "server-only";

import * as athleteSchema from "@/features/athletes/infrastructure/schema";
import * as authSchema from "@/features/auth/infrastructure/schema";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set");
}

export const db = drizzle(neon(databaseUrl), {
  schema: { ...athleteSchema, ...authSchema },
});
