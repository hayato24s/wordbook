import { chapters } from "~/entities/chapter";
import { evaluations } from "~/entities/evaluation";
import { checkObjectHasProperty, checkType } from "~/utils";
import {
  Chapter,
  English,
  EnglishSentence,
  EnglishWord,
  Evaluation,
  EvaluationMap,
  User,
  Word,
} from "./types";

export const userTypeGuard = (user: any): user is User => {
  if (
    !checkObjectHasProperty<User>(user, [
      "uid",
      "name",
      "photoUrl",
      "permission",
    ])
  )
    return false;

  if (!checkType(user.uid, "string")) return false;
  if (!checkType(user.name, "string")) return false;
  if (!checkType(user.photoUrl, "string")) return false;
  if (!checkType(user.permission, "boolean")) return false;

  return true;
};

export const chapterTypeGuard = (chapter: any): chapter is Chapter => {
  return chapters.includes(chapter);
};

export const englishWordTypeGuard = (
  englishWord: any
): englishWord is EnglishWord => {
  if (
    !checkObjectHasProperty<EnglishWord>(englishWord, [
      "initial",
      "middle",
      "end",
      "is_red",
    ])
  )
    return false;

  if (!checkType(englishWord.initial, "string")) return false;
  if (!checkType(englishWord.middle, "string")) return false;
  if (!checkType(englishWord.end, "string")) return false;
  if (!checkType(englishWord.is_red, "boolean")) return false;

  return true;
};

export const englishSentenceTypeGuard = (
  sentence: any
): sentence is EnglishSentence => {
  return sentence.every((word: any) => englishWordTypeGuard(word));
};

export const englishTypeGuard = (english: any): english is English => {
  if (!checkObjectHasProperty<English>(english, ["subject", "sentence"]))
    return false;

  if (!checkType(english.subject, "string")) return false;
  if (!englishSentenceTypeGuard(english.sentence)) return false;

  return true;
};

export const wordTypeGuard = (word: any): word is Word => {
  if (
    !checkObjectHasProperty<Word>(word, [
      "id",
      "no",
      "sub_no",
      "chapter",
      "english",
      "japanese",
    ])
  )
    return false;

  if (!checkType(word.id, "string")) return false;
  if (!checkType(word.no, "number")) return false;
  if (!checkType(word.sub_no, "number")) return false;
  if (!checkType(word.japanese, "string")) return false;

  if (!chapterTypeGuard(word.chapter)) return false;
  if (!englishTypeGuard(word.english)) return false;

  return true;
};

export const evaluationTypeGuard = (
  evaluation: any
): evaluation is Evaluation => {
  return evaluations.includes(evaluation);
};

export const evaluationMapTypeGuard = (
  evalMap: any
): evalMap is EvaluationMap => {
  return Object.values(evalMap).every((evaluation: any) =>
    evaluationTypeGuard(evaluation)
  );
};
