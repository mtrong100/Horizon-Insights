import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBNiQswN0bb83LXmrcxB6akBQ3MEW1JSgY",
  authDomain: "money-blogging-b127b.firebaseapp.com",
  projectId: "money-blogging-b127b",
  storageBucket: "money-blogging-b127b.appspot.com",
  messagingSenderId: "189108176756",
  appId: "1:189108176756:web:b0cbd0102b715a08880e21",
  measurementId: "G-6MLXW405SR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
