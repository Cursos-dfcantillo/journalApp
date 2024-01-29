// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCafxtuANuAkMNrry2QKPkU8DJQKEB5e_Q",
  authDomain: "react-store-ebfd9.firebaseapp.com",
  projectId: "react-store-ebfd9",
  storageBucket: "react-store-ebfd9.appspot.com",
  messagingSenderId: "560556333707",
  appId: "1:560556333707:web:593348f0a2bf32c135128e"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);// inicialización de la aplicación 

export const FirebaseAuth = getAuth(FirebaseApp); //Funcionalidades de la autenticación

export const FirebaseDB= getFirestore(FirebaseApp);//Configuración de la base de datos