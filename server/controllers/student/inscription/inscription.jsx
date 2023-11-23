import { ref, get, update } from 'firebase/database';
import { auth, db } from '../../../../server/firebase/firebase';

const fetchAssociatedWorkshops = async (currentPath, setAssociatedWorkshops) => {
  try {
    const currentUser = auth.currentUser;
    const userId = currentUser.uid;
    const userRef = ref(db, `users/${userId}`);
    const userSnapshot = await get(userRef);

    if (userSnapshot.exists()) {
      const userName = userSnapshot.val().username;

      const userWorkshopsRef = ref(db, `users/${userId}/workshops`);
      const userWorkshopsSnapshot = await get(userWorkshopsRef);

      if (userWorkshopsSnapshot.exists()) {
        const associatedWorkshopIds = Object.keys(userWorkshopsSnapshot.val());
        const workshopsPromises = associatedWorkshopIds.map(async (workshopId) => {
          const workshopRef = ref(db, `workshops/${workshopId}`);
          const workshopSnapshot = await get(workshopRef);
          return { ...workshopSnapshot.val(), id: workshopId, userName };
        });

        const workshops = await Promise.all(workshopsPromises);

        // Filtrar talleres según la orientación
        const filteredWorkshops = workshops.filter((workshop) => {
          if (currentPath.includes("orientacionlaboral")) {
            return workshop.orientation === "Laboral";
          } else if (currentPath.includes("orientacionvocacional")) {
            return workshop.orientation === "Vocacional";
          }
          return true; // Si la orientación no está especificada, mostrar todos los talleres
        });

        setAssociatedWorkshops(filteredWorkshops);
      } else {
        setAssociatedWorkshops([]);
      }
    }
  } catch (error) {
    console.error('Error al obtener talleres asociados:', error);
  }
};

const handleInscribeClick = async (workshopId) => {
  const currentUser = auth.currentUser;
  const userId = currentUser.uid;

  // Get the username from the user data
  const userRef = ref(db, `users/${userId}`);
  const userSnapshot = await get(userRef);
  const userName = userSnapshot.val().username;

  // Update the workshop data with student information
  const workshopRef = ref(db, `workshops/${workshopId}`);
  await update(workshopRef, {
    [`students/${userId}`]: {
      email: currentUser.email,
      userName: userName,
    },
    inscription: true,
  });

  // Update the user's workshops with the workshop inscription status
  const userWorkshopsRef = ref(db, `users/${userId}/workshops`);
  await update(userWorkshopsRef, {
    [`${workshopId}/inscription`]: true,
  });
};

const StudentInscriptionController = {
  fetchAssociatedWorkshops,
  handleInscribeClick,
};

export default StudentInscriptionController;
