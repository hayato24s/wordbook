import { Chapter, Evaluation } from "~/firebase/types";
import { chapters } from "./chapter";
import { evaluations } from "./evaluation";

export type LearningStatus = Record<Chapter, Record<Evaluation, number>>;

export const createLearningStatus = (initialValue = 0) =>
  chapters.reduce<LearningStatus>((obj1, chapter) => {
    obj1[chapter] = evaluations.reduce((obj2, evaluation) => {
      obj2[evaluation] = initialValue;
      return obj2;
    }, {} as Record<Evaluation, number>);
    return obj1;
  }, {} as LearningStatus);
