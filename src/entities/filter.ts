import { Chapter, Evaluation } from "~/firebase/types";
import { chapters } from "./chapter";
import { evaluations } from "./evaluation";

export type Filter = Record<Chapter, Record<Evaluation, boolean>>;

export const createFilter = () =>
  chapters.reduce<Filter>((obj1, chapter) => {
    obj1[chapter] = evaluations.reduce((obj2, evaluation) => {
      obj2[evaluation] = true;
      return obj2;
    }, {} as Record<Evaluation, boolean>);
    return obj1;
  }, {} as Filter);
