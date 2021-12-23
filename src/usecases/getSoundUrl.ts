import { Ports } from "~/adapter";
import { getWords } from "./getWords";

export const getSoundUrl = async (
  ports: Ports,
  id: string
): Promise<string> => {
  const { store, firebase } = ports;
  let storedUrl = store.getters.soundUrl(id) as string | undefined;

  if (!storedUrl) {
    const word = await getWords(ports).then((words) =>
      words.find((word) => word.id === id)
    );
    if (!word) return "";
    storedUrl = await firebase.getSoundUrl({
      no: word.no,
      sub_no: word.sub_no,
      chapter: word.chapter,
    });
    store.commit("saveSoundUrl", { id, url: storedUrl });
  }

  return storedUrl;
};
