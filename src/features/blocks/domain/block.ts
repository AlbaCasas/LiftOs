export type TrainingBlock = {
  id: string;
  name: string;
  coachId: string;
  athleteId: string;
  athleteName: string | null;
  updatedAt: Date;
};

export type BlockAthleteOption = {
  id: string;
  name: string;
};

export type NewBlockDraft = {
  name: string;
  athleteId: string;
};

export const emptyNewBlockDraft: NewBlockDraft = {
  name: "",
  athleteId: "",
};
