import { and, desc, eq } from "drizzle-orm";

import { athletes } from "@/features/athletes/infrastructure/schema";
import { db } from "@/lib/db";
import type { TrainingBlock } from "../domain/block";
import type { BlockRepository } from "../domain/block-repository";
import { blocks } from "./schema";

const toTrainingBlock = (row: {
  id: string;
  name: string;
  coachId: string;
  athleteId: string;
  athleteName: string | null;
  updatedAt: Date;
}): TrainingBlock => row;

export const blockRepository: BlockRepository = {
  async findAll(coachId) {
    const rows = await db
      .select({
        id: blocks.id,
        name: blocks.name,
        coachId: blocks.coachId,
        athleteId: blocks.athleteId,
        athleteName: athletes.name,
        updatedAt: blocks.updatedAt,
      })
      .from(blocks)
      .leftJoin(athletes, eq(blocks.athleteId, athletes.id))
      .where(eq(blocks.coachId, coachId))
      .orderBy(desc(blocks.updatedAt));

    return rows.map(toTrainingBlock);
  },
  async findById(id, coachId) {
    const [row] = await db
      .select({
        id: blocks.id,
        name: blocks.name,
        coachId: blocks.coachId,
        athleteId: blocks.athleteId,
        athleteName: athletes.name,
        updatedAt: blocks.updatedAt,
      })
      .from(blocks)
      .leftJoin(athletes, eq(blocks.athleteId, athletes.id))
      .where(and(eq(blocks.id, id), eq(blocks.coachId, coachId)));

    return row ? toTrainingBlock(row) : undefined;
  },
  async create(block) {
    await db.insert(blocks).values({
      id: block.id,
      name: block.name,
      coachId: block.coachId,
      athleteId: block.athleteId,
      updatedAt: block.updatedAt,
    });
    return block;
  },
};
