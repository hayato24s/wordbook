// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDo_kDcXO4GbWj1kWKOiysvTMxUC_yBGww",
  authDomain: "wordbook-97332.firebaseapp.com",
  projectId: "wordbook-97332",
  storageBucket: "wordbook-97332.appspot.com",
  messagingSenderId: "644486422189",
  appId: "1:644486422189:web:5517d777d6e00dbef23024",
  measurementId: "G-GQKDTJ3TKG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore();
