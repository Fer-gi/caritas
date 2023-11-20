// Import the functions you need from the SDKs you need
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database'; // Import getDatabase for Realtime Database


const firebaseConfig = {
apiKey: import.meta.env.VITE_REACT_APP_APIKEY,
authDomain: import.meta.env.VITE_REACT_APP_AUTHDOMAIN,
projectId: import.meta.env.VITE_REACT_APP_PROJECTID,
storageBucket: import.meta.env.VITE_REACT_APP_STORAGEBUCKET,
messagingSenderId: import.meta.env.VITE_REACT_APP_MESSAGINGSENDERID,
appId: import.meta.env.VITE_REACT_APP_APPID
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app)
export const storage = getStorage(app);
<<<<<<< HEAD:server/firebase/firebase.jsx
export default app;

=======
export default app;
>>>>>>> firebase:client/firebase/firebase.jsx
