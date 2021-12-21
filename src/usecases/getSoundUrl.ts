import { Ports } from "~/adapter";
import { Word } from "~/firebase/types";

export const getSoundUrl = (
  { firebase }: Ports,
  data: Pick<Word, "no" | "sub_no" | "chapter">
) => {
  return firebase.getSoundUrl(data);
};
