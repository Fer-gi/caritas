// Import the functions you need from the SDKs you need
import {getAuth} from 'firebase/auth'
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAt958zpODEUqUWhGkev0DHibxWrmmVcEM",
  authDomain: "talleres-caritas.firebaseapp.com",
  projectId: "talleres-caritas",
  storageBucket: "talleres-caritas.appspot.com",
  messagingSenderId: "709308794574",
  appId: "1:709308794574:web:46aaaed7e5ae8ae286329f"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;