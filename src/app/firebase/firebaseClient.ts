// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBedVnT_WNxJGMaJX3fjP0pbNrU8tWMg1E",
  authDomain: "voltsq-942ab.firebaseapp.com",
  projectId: "voltsq-942ab",
  storageBucket: "voltsq-942ab.firebasestorage.app",
  messagingSenderId: "891629315027",
  appId: "1:891629315027:web:7e73e7239023c24c0c4526",
  measurementId: "G-LR8H3SN36N",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics =
  typeof window !== "undefined" ? getAnalytics(app) : null;
