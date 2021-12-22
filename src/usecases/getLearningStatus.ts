import { createLearningStatus } from "~/entities/learningStatus";
import { EvaluationMap, Word } from "~/firebase/types";

export const getLearningStatus = (words: Word[], evalMap: EvaluationMap) => {
  const learningStatus = createLearningStatus();
  words.forEach((word) => {
    const { id, chapter } = word;
    const evaluation = evalMap[id];
    learningStatus[chapter][evaluation]++;
  });
  return learningStatus;
};
