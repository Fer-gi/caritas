// getWorkshopsData.js
import { ref, onValue, get } from 'firebase/database';
import { auth, db } from '../../../firebase'; // Asegúrate de que la ruta sea correcta

const getWorkshopsData = async () => {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    console.error('No user is currently logged in.');
    return [];
  }

  const userId = currentUser.uid;
  const workshopsRealtimeRef = ref(db, `users/${userId}/workshops`);

  try {
    const snapshot = await get(workshopsRealtimeRef);

    console.log("Snapshot in getWorkshopsData:", snapshot.val());

    if (!snapshot.exists()) {
      console.warn(`No data found for user with ID: ${userId}`);
      return [];
    }

    const data = snapshot.val();
    const workshopsArray = Object.keys(data).map((key) => ({
      ...data[key],
      id: key,
    }));

    if (workshopsArray.length > 0) {
      return workshopsArray;
    } else {
      console.warn(`No workshops found for user with ID: ${userId}`);
      return [];
    }
  } catch (error) {
    console.error("Error fetching workshops:", error.message);
    throw error;
  }
};

export default getWorkshopsData;
