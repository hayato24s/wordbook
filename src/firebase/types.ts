export type English = {
  value: string;
  beginning: string;
  end: string;
  is_answer: boolean;
}[];

export type Chapter =
  | "Beginning"
  | "Acceleration"
  | "Leap"
  | "Top"
  | "Important"
  | "Multiple";

export type Word = {
  id: string;
  no: number;
  sub_no: number;
  chapter: Chapter;
  english: English;
  japanese: string;
};

export type Evaluation = "Excellent" | "Good" | "Poor" | "NotLearned";
