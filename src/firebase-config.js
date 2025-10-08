// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// IMPORTANT: All values must be set in .env file
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Validate that all required environment variables are present
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  const errorMessage = 
    '❌ Missing Firebase configuration!\n\n' +
    'Local Development:\n' +
    '  - Create a .env file in the project root\n' +
    '  - Copy variables from env.example.txt\n' +
    '  - Add your Firebase credentials\n\n' +
    'Vercel/Production:\n' +
    '  - Go to Project Settings → Environment Variables\n' +
    '  - Add all VITE_FIREBASE_* variables\n' +
    '  - Redeploy the project\n\n' +
    'See SECURITY.md for detailed instructions.';
  
  console.error(errorMessage);
  throw new Error('Missing Firebase configuration. Check console for details.');
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
export const db = getFirestore(app);