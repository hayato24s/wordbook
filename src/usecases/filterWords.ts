import { Filter } from "~/entities/filter";
import { EvaluationMap, Word } from "~/firebase/types";

export const filterWords = (
  words: Word[],
  evaluations: EvaluationMap,
  filter: Filter
) => {
  return words.filter(({ id, chapter }) => {
    const evaluation = evaluations[id];
    return filter[chapter][evaluation];
  });
};
