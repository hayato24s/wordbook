import { createFilter, Filter } from "~/entities/filter";
import { User, Word, EvaluationMap } from "~/firebase/types";

export interface State {
  user: User | undefined;
  words: Word[];
  evaluations: EvaluationMap | undefined;
  filterForLearning: Filter;
  filterForListening: Filter;
  soundUrls: Record<string, string>;
}

export const initState: State = {
  user: undefined,
  words: [],
  evaluations: undefined,
  filterForLearning: createFilter(),
  filterForListening: createFilter(),
  soundUrls: {},
};
