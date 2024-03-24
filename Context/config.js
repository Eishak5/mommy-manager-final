// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, setPersistence, browserLocalPersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvwZBxOrV_nYq09C4gF5gvGCkxu8jNRgE",
  authDomain: "mommy-manager.firebaseapp.com",
  projectId: "mommy-manager",
  storageBucket: "mommy-manager.appspot.com",
  messagingSenderId: "1079358787307",
  appId: "1:1079358787307:web:e5c04f68d0eefd53d838ae",
  measurementId: "G-P3QNYD1YDM"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
const db = getFirestore(app);
export { app, auth, db, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword };