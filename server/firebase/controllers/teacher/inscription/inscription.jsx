// controllers/workshopController.js
import { ref, get } from 'firebase/database';
import { db } from '../../../firebase';


export const fetchWorkshopDetails = async (workshopId) => {
  try {
    const workshopRef = ref(db, `workshops/${workshopId}`);
    const workshopSnapshot = await get(workshopRef);

    if (workshopSnapshot.exists()) {
      return workshopSnapshot.val();
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error al obtener taller:', error);
    throw error;
  }
};
