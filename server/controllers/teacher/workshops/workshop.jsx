import { ref, onValue } from 'firebase/database';
import { db } from '../../../firebase/firebase';

const getWorkshops = (setWorkshops) => {
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

const StudentWorkshopsController = {
  getWorkshops,
};

export default StudentWorkshopsController;
