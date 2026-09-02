import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { users } from "./schema";

export const postgresCoachRepository = {
  async findByEmail(email: string) {
    const [row] = await db.select().from(users).where(eq(users.email, email));
    return row;
  },
  async create(coach: typeof users.$inferInsert) {
    await db.insert(users).values(coach);
    return coach;
  },
};
