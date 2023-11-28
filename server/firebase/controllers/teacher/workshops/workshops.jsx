import { ref, onValue } from 'firebase/database';
import { db } from '../../../firebase';


export const getWorkshopsData = () => {
  const workshopsRealtimeRef = ref(db, 'workshops');

  return new Promise((resolve, reject) => {
    onValue(workshopsRealtimeRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const workshopsArray = Object.keys(data).map((key) => ({
          ...data[key],
          id: key,
        }));
        resolve(workshopsArray);
      } else {
        resolve([]);
      }
    }, (error) => {
      reject(error);
    });
  });
};
