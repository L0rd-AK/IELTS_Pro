import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = { 
  apiKey: "AIzaSyDcTBmL1CRXPGj9Ym5P1SWYdshcnpLiwCU", 
  authDomain: "ielts-pro-ca12f.firebaseapp.com", 
  projectId: "ielts-pro-ca12f", 
  storageBucket: "ielts-pro-ca12f.firebasestorage.app", 
  messagingSenderId: "775936084952", 
  appId: "1:775936084952:web:3e2cb67af7033d00a580ad" 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;