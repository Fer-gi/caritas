import { ref, onValue, remove, getDatabase } from 'firebase/database';
import { toast } from 'react-toastify';
import { db } from '../../../../server/firebase/firebase';

export const fetchWorkshops = (setWorkshops) => {
  const workshopsRealtimeRef = ref(db, 'workshops');

  onValue(workshopsRealtimeRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const workshopsArray = Object.keys(data).map((key) => ({
        ...data[key],
        id: key,
      }));
      setWorkshops(workshopsArray);
    } else {
      setWorkshops([]);
    }
  });
};

export const deleteWorkshop = async (id, setWorkshops, handleCloseModal) => {
  if (window.confirm('¿Quieres eliminar este taller?')) {
    try {
      const database = getDatabase();
      const workshopsRealtimeRef = ref(database, `workshops/${id}`);
      await remove(workshopsRealtimeRef);

      toast('Workshop deleted successfully', {
        type: 'error',
        autoClose: 2000,
      });
      handleCloseModal();
    } catch (error) {
      console.error('Error deleting workshop:', error);
    }
  }
};
