import { Ports } from "~/adapter";
import { EvaluationMap } from "~/firebase/types";
import { getWords } from "./getWords";
import { updateEvaluations } from "./updateEvaluations";

export const createEvaluations = async (ports: Ports, userId: string) => {
  const words = await getWords(ports);
  const evals = words.reduce((evals, word) => {
    evals[word.id] = "NotLearned";
    return evals;
  }, {} as EvaluationMap);
  await updateEvaluations(ports, userId, evals);
};
