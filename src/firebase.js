import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBSS96lXFNnDp_8jo_PbTqc_bwEBVzHf5M",
  authDomain: "crop-setu.firebaseapp.com",
  projectId: "crop-setu",
  storageBucket: "crop-setu.firebasestorage.app",
  messagingSenderId: "968562768618",
  appId: "1:968562768618:web:b2e3ff6e7fedc280967593",
  measurementId: "G-M8ER1415RL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth & Firestore instances
export const auth = getAuth(app);
export const db = getFirestore(app);