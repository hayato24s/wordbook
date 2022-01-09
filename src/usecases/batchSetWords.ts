import { Ports } from "~/adapter";
import { wordWithoutIdTypeGuard } from "~/firebase/typeGuards";
import { Chapter, Word } from "~/firebase/types";

export const batchSetWords = async (
  { firebase }: Ports,
  json: Omit<Word, "id">[]
): Promise<void> => {
  firebase.batchSetWords(json);
};

export const jsonsToWords = (...jsons: any[][]): Omit<Word, "id">[] => {
  return jsons.reduce((acc, json) => {
    const words = json.map((data) => {
      const word = {
        ...data,
        no: Number(data.no),
        sub_no: Number(data.sub_no),
        chapter: data.chapter as Chapter,
      };
      if (!wordWithoutIdTypeGuard(word)) throw new Error("Invalid Value");
      return word;
    });
    acc = acc.concat(words);
    return acc;
  }, [] as Omit<Word, "id">[]);
};
