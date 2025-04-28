import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDiwGOmBTPOzua7X0_MktHg5wuB5QuD8tk",
  authDomain: "ainterviewer-16412.firebaseapp.com",
  projectId: "ainterviewer-16412",
  storageBucket: "ainterviewer-16412.firebasestorage.app",
  messagingSenderId: "667244230897",
  appId: "1:667244230897:web:95c4fb2b7ef8bb9e3cd150",
  measurementId: "G-GNB3YJ7582",
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
