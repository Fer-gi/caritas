import { db } from "../../firebase/firebase";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

const addOrEditActivities = async (activitiesObject, editing) => {
  try {
    if (editing) {
      const activitiesRef = doc(db, 'activities', activitiesObject.id);
      await updateDoc(activitiesRef, activitiesObject);
      toast('Activities updated successfully', {
        type: 'success' 
      });
    } else {
      await addDoc(collection(db, 'activities'), activitiesObject);
      toast('Activities added successfully', {
        type: 'success' 
      });
    }
  } catch (e) {
    console.error('Error adding/editing document: ', e);
  }
};

export default addOrEditActivities;