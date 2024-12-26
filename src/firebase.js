// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOT3bjjeCuS_eGuVhk3m52yau2Jzxzw4I",
  authDomain: "caloriecounter-d96c3.firebaseapp.com",
  databaseURL: "https://caloriecounter-d96c3-default-rtdb.firebaseio.com/",
  projectId: "caloriecounter-d96c3",
  storageBucket: "caloriecounter-d96c3.firebasestorage.app",
  messagingSenderId: "1019984621992",
  appId: "1:1019984621992:web:ba076f7963cb6fe1132d9d",
  measurementId: "G-CSTFJFDEM9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
