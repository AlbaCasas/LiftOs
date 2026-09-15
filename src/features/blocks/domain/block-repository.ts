import type { TrainingBlock } from "./block";

export type NewTrainingBlock = Omit<TrainingBlock, "athleteName">;

export interface BlockRepository {
  findAll(coachId: string): Promise<TrainingBlock[]>;
  findById(id: string, coachId: string): Promise<TrainingBlock | undefined>;
  create(block: NewTrainingBlock): Promise<NewTrainingBlock>;
}
