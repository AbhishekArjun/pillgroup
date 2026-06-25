import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD1LW8QDc-0sslH8wIHfMBs5HYh23neo68",
  authDomain: "pill-343f0.firebaseapp.com",
  projectId: "pill-343f0",
  storageBucket: "pill-343f0.firebasestorage.app",
  messagingSenderId: "230852687594",
  appId: "1:230852687594:web:f54734a37ba3aeeae68993",
  measurementId: "G-4QEDEKDLZP"
};

const requiredKeys = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
const missingKeys = requiredKeys.filter(key => !(key in firebaseConfig));
if (missingKeys.length) {
  const errMsg = `Firebase configuration missing keys: ${missingKeys.join(', ')}`;
  console.error(errMsg);
  throw new Error(errMsg);
}

let app;
try {
  app = initializeApp(firebaseConfig);
} catch (initErr) {
  console.error('Failed to initialize Firebase app:', initErr);
  throw initErr;
}

// Initialize Firebase services
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
