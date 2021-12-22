export type User = {
  uid: string;
  name: string;
  photoUrl: string;
  permission: boolean;
};

export type Chapter =
  | "Beginning"
  | "Acceleration"
  | "Leap"
  | "Top"
  | "Important"
  | "Multiple";

export type EnglishWord = {
  initial: string;
  middle: string;
  end: string;
  is_red: boolean;
};

export type EnglishSentence = EnglishWord[];

export type English = {
  subject: string;
  sentence: EnglishSentence;
};

export type Word = {
  id: string;
  no: number;
  sub_no: number;
  chapter: Chapter;
  english: English;
  japanese: string;
};

export type Evaluation = "Excellent" | "Good" | "Poor" | "NotLearned";

export type EvaluationMap = Record<string, Evaluation>;
