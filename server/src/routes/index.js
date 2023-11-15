import db from "../firebase.js";
import { Router } from "express";
const router = Router()

router.get('/', async (req , res) => {
    const querySnapshot = await db.collection('orientaciónLaboral').get()
    console.log(querySnapshot.docs[0].data())
    res.send('hello')
})
console.log('Credentials loaded from:', process.env.GOOGLE_APPLICATION_CREDENTIALS);

export default router