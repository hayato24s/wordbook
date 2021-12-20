import { Ports } from "~/adapter";
import { useFirebase } from "~/firebase";
import { useLocalStorage } from "~/localstorage";
import { useStore } from "~/store";

export const usePorts = (): Ports => ({
  firebase: useFirebase(),
  store: useStore(),
  localStorage: useLocalStorage(),
});
