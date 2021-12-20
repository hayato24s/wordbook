import { Store } from "vuex";
import { Firebase } from "~/firebase";
import { LocalStorage } from "~/localstorage";
import { State } from "~/store/state";

export type Ports = {
  firebase: Firebase;
  store: Store<State>;
  localStorage: LocalStorage;
};
