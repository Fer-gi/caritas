// workshopController.js

import { ref, onValue, remove, getDatabase } from 'firebase/database';

export const getWorkshopsData = (setData) => {
  const workshopsRealtimeRef = ref(getDatabase(), 'workshops');

  onValue(workshopsRealtimeRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const workshopsArray = Object.keys(data).map((key) => ({
        ...data[key],
        id: key,
      }));
      setData(workshopsArray);
    } else {
      setData([]);
    }
  });
};

export const deleteWorkshop = async (id) => {
  const workshopsRealtimeRef = ref(getDatabase(), `workshops/${id}`);
  try {
    await remove(workshopsRealtimeRef);
    return true;
  } catch (error) {
    console.error('Error deleting workshop:', error);
    return false;
  }
};
