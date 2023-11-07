import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAt958zpODEUqUWhGkev0DHibxWrmmVcEM",
  authDomain: "talleres-caritas.firebaseapp.com",
  projectId: "talleres-caritas",
  storageBucket: "talleres-caritas.appspot.com",
  messagingSenderId: "709308794574",
  appId: "1:709308794574:web:46aaaed7e5ae8ae286329f"
};


const app = initializeApp(firebaseConfig);

export default app;