// Import the functions you need from the SDKs you need
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDceXIz32dXNQLnXcz-RZU2S02SRJ7T2Zo",
  authDomain: "code-journal-76576.firebaseapp.com",
  projectId: "code-journal-76576",
  storageBucket: "code-journal-76576.appspot.com",
  messagingSenderId: "1045261940513",
  appId: "1:1045261940513:web:18c8a3bde74cad39cf7060"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app)