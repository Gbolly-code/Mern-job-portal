// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// Using environment variables for security (fallback to defaults for development)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDd5dxECFB_ryMgpz9oHi73__fzQ6n-W7E",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "jobportal-b4655.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "jobportal-b4655",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "jobportal-b4655.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "996771434213",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:996771434213:web:df6e5f9430dd86383f4e0c",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-39TB37XN8Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
export const db = getFirestore(app);