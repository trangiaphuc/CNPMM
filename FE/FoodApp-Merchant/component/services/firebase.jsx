// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzCPwv8lCZ78XONsWXu8wR67z-OvzmAcc",
  authDomain: "foodapp-26170.firebaseapp.com",
  projectId: "foodapp-26170",
  storageBucket: "foodapp-26170.appspot.com",
  messagingSenderId: "389594430241",
  appId: "1:389594430241:web:334d6ba742b02d83c91c60",
  measurementId: "G-PXKVDB94SJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
