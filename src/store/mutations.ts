import { MutationTree } from "vuex";
import { Filter } from "~/entities/filter";
import { EvaluationMap, User, Word } from "~/firebase/types";
import { State } from "./state";

export const mutations: MutationTree<State> = {
  setUser(state, user: User | undefined) {
    state.user = user;
  },
  setWords(state, words: Word[]) {
    state.words = words;
  },
  setEvaluations(state, evals: EvaluationMap) {
    state.evaluations = evals;
  },
  updateEvaluations(state, changes: EvaluationMap) {
    state.evaluations = { ...state.evaluations, ...changes };
  },
  setFilterForLearning(state, filter: Filter) {
    state.filterForLearning = filter;
  },
  setFilterForListening(state, filter: Filter) {
    state.filterForListening = filter;
  },
};
