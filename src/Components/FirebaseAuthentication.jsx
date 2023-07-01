// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQERAjbIqubIvHDcoR0vlRNYby6AOtGd4",
  authDomain: "junction-plus.firebaseapp.com",
  projectId: "junction-plus",
  storageBucket: "junction-plus.appspot.com",
  messagingSenderId: "471538213075",
  appId: "1:471538213075:web:e7f27b4aa4781318ce7426",
  measurementId: "G-L1GT148Z90"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
 const auth = getAuth();

 export default auth