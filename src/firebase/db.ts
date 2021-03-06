import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  writeBatch,
} from "firebase/firestore";
import { firebaseApp } from "./app";
import {
  evaluationsConverter,
  userConverter,
  wordConverter,
} from "./converter";
import { EvaluationMap, User, Word } from "./types";

const db = getFirestore(firebaseApp);

export const createUser = async (user: User) => {
  const userRef = doc(db, "users", user.uid).withConverter(userConverter);
  return setDoc(userRef, user);
};

export const getUser = async (userId: string) => {
  const userRef = doc(db, "users", userId).withConverter(userConverter);
  const docSnap = await getDoc(userRef);
  if (!docSnap.exists()) throw new Error("Not Found");
  return docSnap.data();
};

export const getWords = async () => {
  return getDocs(collection(db, "words").withConverter(wordConverter)).then(
    (querySnapshot) => querySnapshot.docs.map((doc) => doc.data())
  );
};

export const getEvaluations = async (userId: string) => {
  const evalRef = doc(db, "evaluations", userId).withConverter(
    evaluationsConverter
  );
  const docSnap = await getDoc(evalRef);
  if (!docSnap.exists()) throw new Error("Not Found");
  return docSnap.data();
};

export const setEvaluations = async (
  userId: string,
  changes: EvaluationMap
) => {
  const evalRef = doc(db, "evaluations", userId).withConverter(
    evaluationsConverter
  );
  setDoc(evalRef, changes, { merge: true });
};

export const batchSetWords = async (words: Omit<Word, "id">[]) => {
  console.log("start batch");
  const batch = writeBatch(db);
  words.forEach((data) => {
    const newWordRef = doc(collection(db, "words")).withConverter(
      wordConverter
    );
    const newWord = {
      id: newWordRef.id,
      ...data,
    };
    console.log(newWord);
    batch.set(newWordRef, newWord);
  });
  await batch.commit();
  console.log("fihished batch");
};
