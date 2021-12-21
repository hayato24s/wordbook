import { Ports } from "~/adapter";
import { EvaluationMap } from "~/firebase/types";

export const getEvaluations = async (
  { firebase, store }: Ports,
  userId: string
) => {
  let evals = store.getters.evaluations as EvaluationMap;
  if (!evals) {
    evals = await firebase.getEvaluations(userId);
    store.commit("setEvaluations", evals);
  }

  return evals;
};
