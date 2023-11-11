import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "note-taking-app-9c846.firebaseapp.com",
  projectId: "note-taking-app-9c846",
  storageBucket: "note-taking-app-9c846.appspot.com",
  messagingSenderId: "10108580641",
  appId: "1:10108580641:web:3230ef078d553dcad8c460",
  measurementId: "G-468FBY4HJS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
