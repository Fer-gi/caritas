import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

import dotenv from 'dotenv';
dotenv.config();
console.log('Dotenv loaded:', dotenv.config().parsed);

const admin = initializeApp({
  credential: applicationDefault(),
});

const db = getFirestore(admin);

export default db;
