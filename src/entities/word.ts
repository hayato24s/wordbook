import { Chapter, English } from "~/firebase/types";

export type DisplayedSentence = {
  char: string;
  isRed: boolean;
}[];

export type ChapterJa = "助走" | "加速" | "飛躍" | "頂点" | "重要" | "多義";

export const chapters: Chapter[] = [
  "Beginning",
  "Acceleration",
  "Leap",
  "Top",
  "Important",
  "Multiple",
];

export const chapterMap: Record<Chapter, ChapterJa> = {
  Beginning: "助走",
  Acceleration: "加速",
  Leap: "飛躍",
  Top: "頂点",
  Important: "重要",
  Multiple: "多義",
};

const hideAnswer = (value: string): string => {
  return value[0] + "-------";
};

export const englishToDisplay = (
  english: English,
  showAnswer: boolean
): DisplayedSentence => {
  return english.reduce((ret, { value, beginning, end, is_answer }, i) => {
    if (i !== 0) {
      ret.push({ char: " ", isRed: false });
    }
    if (beginning !== "") {
      beginning.split("").forEach((char) => ret.push({ char, isRed: false }));
    }
    [...(is_answer && !showAnswer ? hideAnswer(value) : value)].forEach(
      (char) => {
        ret.push({ char, isRed: is_answer });
      }
    );
    if (end !== "") {
      end.split("").forEach((char) => ret.push({ char, isRed: false }));
    }
    return ret;
  }, [] as DisplayedSentence);
};

export const japaneseToDislay = (ja: string): DisplayedSentence => {
  return ja.split("'").reduce((ret, part, i) => {
    part.split("").forEach((char) => ret.push({ char, isRed: i % 2 == 1 }));
    return ret;
  }, [] as DisplayedSentence);
};

export const formatSubNo = (sub_no: number): string => {
  if (sub_no === 1) return "1st";
  if (sub_no === 2) return "2nd";
  if (sub_no === 3) return "3rd";
  return `${sub_no}th`;
};
