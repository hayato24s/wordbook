import { Ports } from "~/adapter";
import { EvaluationMap } from "~/firebase/types";

export const updateEvaluations = async (
  { firebase, store }: Ports,
  userId: string,
  changes: EvaluationMap
) => {
  await firebase.setEvaluations(userId, changes);
  store.commit("updateEvaluations", changes);
};
