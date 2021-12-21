import { InjectionKey } from "vue";
import { createStore, Store, useStore as baseUseStore } from "vuex";
import { getters } from "./getters";
import { mutations } from "./mutations";
import { initState, State } from "./state";

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: initState,
  getters,
  mutations,
});

export const useStore = () => {
  return baseUseStore(key);
};
