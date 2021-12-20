import { Chapter } from "~/firebase/types";

export type ChapterJa = "助走" | "加速" | "飛躍" | "頂点" | "重要語" | "多義語";

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
  Important: "重要語",
  Multiple: "多義語",
};
