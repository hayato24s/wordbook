import { Chapter, EnglishSentence, Word } from "~/firebase/types";
import { zeroPadding } from "~/utils";
import { chapters } from "./chapter";

export type DisplaySentence = {
  char: string;
  isRed: boolean;
}[];

const hideAnswer = (value: string): string => {
  return value[0] + "-------";
};

export const englishSentenceToDisplay = (
  sentence: EnglishSentence,
  showAnswer: boolean
): DisplaySentence => {
  return sentence.reduce((ret, { initial, middle, end, is_red }, i) => {
    if (i !== 0) {
      ret.push({ char: " ", isRed: false });
    }
    if (initial !== "") {
      initial.split("").forEach((char) => ret.push({ char, isRed: false }));
    }
    [...(is_red && !showAnswer ? hideAnswer(middle) : middle)].forEach(
      (char) => {
        ret.push({ char, isRed: is_red });
      }
    );
    if (end !== "") {
      end.split("").forEach((char) => ret.push({ char, isRed: false }));
    }
    return ret;
  }, [] as DisplaySentence);
};

export const japaneseToDislay = (ja: string): DisplaySentence => {
  return ja.split("'").reduce((ret, part, i) => {
    part.split("").forEach((char) => ret.push({ char, isRed: i % 2 == 1 }));
    return ret;
  }, [] as DisplaySentence);
};

export const formatNo = (no: number, chapter: Chapter): string => {
  return zeroPadding(no, chapter === "Multiple" ? 2 : no < 1000 ? 3 : 4);
};

export const formatSubNo = (sub_no: number): string => {
  if (sub_no === 1) return "1st";
  if (sub_no === 2) return "2nd";
  if (sub_no === 3) return "3rd";
  return `${sub_no}th`;
};

/***
 * Word[] を昇順にソートするための比較関数
 */
export const compareWords = (a: Word, b: Word): number => {
  if (a.chapter !== b.chapter)
    return (
      chapters.findIndex((chapter) => chapter === a.chapter) -
      chapters.findIndex((chapter) => chapter === b.chapter)
    );
  else if (a.no !== b.no) return a.no - b.no;
  else return a.sub_no - b.sub_no;
};
