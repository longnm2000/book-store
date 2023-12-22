// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiCVzXURlAt_bEp5LZvnO0pKTYHYk0O1k",
  authDomain: "upload-file-51381.firebaseapp.com",
  projectId: "upload-file-51381",
  storageBucket: "upload-file-51381.appspot.com",
  messagingSenderId: "377845018114",
  appId: "1:377845018114:web:b21024462a103fdcb5411b",
  measurementId: "G-F0P923SB60",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
