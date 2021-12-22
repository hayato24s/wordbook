import {
  DocumentData,
  FirestoreDataConverter,
  serverTimestamp,
} from "firebase/firestore";
import {
  evaluationMapTypeGuard,
  userTypeGuard,
  wordTypeGuard,
} from "./typeGuards";
import { EvaluationMap, User, Word } from "./types";

export const userConverter: FirestoreDataConverter<User> = {
  toFirestore: (user: User): DocumentData => {
    return {
      ...user,
      created: serverTimestamp(),
    };
  },
  fromFirestore: (snapshot, options): User => {
    const user = snapshot.data(options);
    if (!userTypeGuard(user)) throw new Error("Invalid Value");
    return user;
  },
};

export const wordConverter: FirestoreDataConverter<Word> = {
  toFirestore: (word: Word): DocumentData => word,
  fromFirestore: (snapshot, options): Word => {
    const word = snapshot.data(options);
    if (!wordTypeGuard(word)) throw new Error("Invalid Value");
    return word;
  },
};

export const evaluationsConverter: FirestoreDataConverter<EvaluationMap> = {
  toFirestore: (evals: EvaluationMap): DocumentData => {
    return evals;
  },
  fromFirestore: (snapshot, options): EvaluationMap => {
    const evals = snapshot.data(options);
    if (!evaluationMapTypeGuard(evals)) throw new Error("Invalid Value");
    return evals;
  },
};
