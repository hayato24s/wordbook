import { GetterTree } from "vuex";
import { State } from "./state";

export const getters: GetterTree<State, State> = {
  user(state) {
    return state.user;
  },
  words(state) {
    return state.words;
  },
  filterForLearning(state) {
    return state.filterForLearning;
  },
  filterForListening(state) {
    return state.filterForListening;
  },
};
