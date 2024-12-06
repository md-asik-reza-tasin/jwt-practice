// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjR8bWn14LRFz_TzLl9MoTBcZo-thbWUg",
  authDomain: "jwt-practice-1e2a3.firebaseapp.com",
  projectId: "jwt-practice-1e2a3",
  storageBucket: "jwt-practice-1e2a3.firebasestorage.app",
  messagingSenderId: "39374532700",
  appId: "1:39374532700:web:f885728a1b5a285eaef699",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
