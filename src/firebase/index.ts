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

// export const batchSetWords = async () => {
//   console.log(json);
//   const batch = writeBatch(db);
//   json.forEach((data) => {
//     const newWord = {
//       ...data,
//       no: Number(data.no),
//       sub_no: Number(data.sub_no),
//     };
//     console.log(newWord);
//     const newWordRef = doc(collection(db, "words"));
//     batch.set(newWordRef, newWord);
//   });
//   await batch.commit();
//   console.log("fihished batch");
// };
