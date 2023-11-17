/* eslint-disable no-unused-vars */
import { db } from "../../../server/firebase/firebase";
import { toast } from "react-toastify";
import {addDoc, collection, updateDoc, doc } from "firebase/firestore"

const addOrEditActivities = async (activitiesObject, editing) => {
  try {
    if (editing) {
      const activitiesRef = doc(db, 'activities', activitiesObject.id);
      await updateDoc(activitiesRef, activitiesObject);
      toast('Activities updated successfully', {
        type: 'success' 
      });
    } else {
      const docRef = await addDoc(collection(db, 'activities'), activitiesObject);
      toast('Activities added successfully', {
        type: 'success' 
      });
    }
  } catch (e) {
    console.error('Error adding/editing document: ', e);
  }
};

export default addOrEditActivities;