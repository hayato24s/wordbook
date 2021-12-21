import { Ports } from "~/adapter";
import { useFirebase } from "~/firebase";
import { Word } from "~/firebase/types";

export const getWords = async ({ firebase, store }: Ports) => {
  let words = store.getters.words as Word[];

  if (words.length === 0) {
    words = await firebase.getWords();
    store.commit("setWords", words);
  }

  return words;
};
