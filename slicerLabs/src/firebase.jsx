// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCa70F2S4iOCeKwqBXoBOlDJ7wg2EdAdS8",
    authDomain: "slicerlabs-c10ea.firebaseapp.com",
    projectId: "slicerlabs-c10ea",
    storageBucket: "slicerlabs-c10ea.appspot.com",
    messagingSenderId: "1089428165235",
    appId: "1:1089428165235:web:21711be07841abd26dd006"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth= getAuth(app)
export const Googleprovider = new GoogleAuthProvider(app);
export const db = getDatabase(app);