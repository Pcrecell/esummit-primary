import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Main Firebase config
const mainFirebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Secondary Firebase config
const joinFirebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_JOIN_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_JOIN_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_JOIN_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_JOIN_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_JOIN_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_JOIN_APP_ID,
};

// Initialize main app (default)
const mainApp = initializeApp(mainFirebaseConfig);

// Initialize secondary app with a name
const joinApp = initializeApp(joinFirebaseConfig, "joinApp");

// Export services from both apps
export const auth = getAuth(mainApp);
export const db = getFirestore(mainApp);
export const joinDb = getFirestore(joinApp); 

