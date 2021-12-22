import {
  createUser,
  getUser,
  getWords,
  getEvaluations,
  setEvaluations,
} from "./db";
import { getSoundUrl } from "./storage";
import {
  dealWithSignInResult,
  getUserId,
  observeAuthState,
  trySignIn,
} from "./auth";

export const useFirebase = () => {
  return {
    getUserId,
    observeAuthState,
    trySignIn,
    dealWithSignInResult,
    createUser,
    getUser,
    getWords,
    getEvaluations,
    setEvaluations,
    getSoundUrl,
  };
};

export type Firebase = ReturnType<typeof useFirebase>;
