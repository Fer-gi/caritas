import { ref, get } from 'firebase/database';
import { auth, db } from '../../../firebase/firebase';


const fetchMyWorkshops = async (setMyWorkshops) => {
  try {
    const currentUser = auth.currentUser;
    const userId = currentUser.uid;
    const userWorkshopsRef = ref(db, `users/${userId}/workshops`);
    const userWorkshopsSnapshot = await get(userWorkshopsRef);

    if (userWorkshopsSnapshot.exists()) {
      const workshopsData = userWorkshopsSnapshot.val();
      const workshopsArray = Object.keys(workshopsData).map((workshopId) => ({
        ...workshopsData[workshopId],
        id: workshopId,
      }));
      setMyWorkshops(workshopsArray);
    } else {
      setMyWorkshops([]);
    }
  } catch (error) {
    console.error('Error al obtener talleres del usuario:', error);
  }
};

const handleChatButtonClick = (workshop, navigate) => {
  if (workshop.teacherId) {
    console.log("TeacherId:", workshop.teacherId);
    navigate(`chat/${workshop.teacherId}`);
  } else {
    console.error("TeacherId no está definido en este taller:", workshop);
  }
};

const MyWorkshopsController = {
  fetchMyWorkshops,
  handleChatButtonClick,
};

export default MyWorkshopsController;
