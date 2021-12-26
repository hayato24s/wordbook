import { GetterTree } from "vuex";
import { Filter } from "~/entities/filter";
import { User, Word } from "~/firebase/types";
import { State } from "./state";

export const getters: GetterTree<State, State> = {
  user(state): User | undefined {
    return state.user;
  },
  words(state): Word[] {
    return state.words;
  },
  filterForLearning(state): Filter {
    return state.filterForLearning;
  },
  filterForListening(state): Filter {
    return state.filterForListening;
  },
  soundUrl:
    (state) =>
    (id: string): string | undefined => {
      return state.soundUrls[id];
    },
  loading(state): boolean {
    return state.loading;
  },
};
