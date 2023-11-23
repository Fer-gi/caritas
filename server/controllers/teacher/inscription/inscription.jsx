import { ref, get } from 'firebase/database';
import { db } from '../../../firebase/firebase';


const fetchWorkshop = async (workshopId, setWorkshop) => {
  try {
    const workshopRef = ref(db, `workshops/${workshopId}`);
    const workshopSnapshot = await get(workshopRef);
    if (workshopSnapshot.exists()) {
      setWorkshop(workshopSnapshot.val());
    } else {
      setWorkshop(null);
    }
  } catch (error) {
    console.error('Error al obtener taller:', error);
  }
};

const InscriptionController = {
  fetchWorkshop,
};

export default InscriptionController;
