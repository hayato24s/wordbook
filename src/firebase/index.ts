import {
  batchSetWords,
  createUser,
  getUser,
  getWords,
  getEvaluations,
  setEvaluations,
} from "./db";
import { getSoundUrl } from "./storage";
import { getUserId, observeAuthState, trySignIn, trySignOut } from "./auth";

export const useFirebase = () => {
  return {
    batchSetWords,
    getUserId,
    observeAuthState,
    trySignIn,
    trySignOut,
    createUser,
    getUser,
    getWords,
    getEvaluations,
    setEvaluations,
    getSoundUrl,
  };
};

export type Firebase = ReturnType<typeof useFirebase>;
