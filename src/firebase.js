// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC0wDmOHYpb1lccD6kQt3RzSopz6MSb0ds",
    authDomain: "shareme-9967f.firebaseapp.com",
    projectId: "shareme-9967f",
    storageBucket: "shareme-9967f.appspot.com",
    messagingSenderId: "446048175893",
    appId: "1:446048175893:web:d09780ca7c24dbeff7cb1c"
  };
// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth();
auth.languageCode = "en";
const googleAuthProvider = new GoogleAuthProvider();

export { app, auth, googleAuthProvider };