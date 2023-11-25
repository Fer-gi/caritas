import { useEffect, useState } from 'react';
import { ref, get } from 'firebase/database';
import { auth, db } from '../../../firebase';


export const useMyWorkshops = () => {
  const [myWorkshops, setMyWorkshops] = useState([]);

  useEffect(() => {
    const fetchMyWorkshops = async () => {
      try {
        const currentUser = auth.currentUser;
        const userId = currentUser.uid;
        const userWorkshopsRef = ref(db, `users/${userId}/workshops`);
        const userWorkshopsSnapshot = await get(userWorkshopsRef);

        if (userWorkshopsSnapshot.exists()) {
          const workshopsData = userWorkshopsSnapshot.val();
          const workshopsArray = [];

          for (const workshopId in workshopsData) {
            if (workshopsData.hasOwnProperty(workshopId)) {
              const workshop = workshopsData[workshopId];

              const teacherId = Object.keys(workshop.teacherId)[0];

              const tallerConTeacherId = {
                ...workshop,
                id: workshopId,
                teacherId: teacherId,
              };

              workshopsArray.push(tallerConTeacherId);
            }
          }

          setMyWorkshops(workshopsArray);
        } else {
          setMyWorkshops([]);
        }
      } catch (error) {
        console.error('Error al obtener talleres del usuario:', error);
      }
    };
    fetchMyWorkshops();
  }, []);

  return myWorkshops;
};
