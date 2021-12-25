import {
  createUser,
  getUser,
  getWords,
  getEvaluations,
  setEvaluations,
} from "./db";
import { getSoundUrl } from "./storage";
import { getUserId, observeAuthState, trySignIn } from "./auth";

export const useFirebase = () => {
  return {
    getUserId,
    observeAuthState,
    trySignIn,
    createUser,
    getUser,
    getWords,
    getEvaluations,
    setEvaluations,
    getSoundUrl,
  };
};

export type Firebase = ReturnType<typeof useFirebase>;
