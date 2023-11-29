import { useEffect, useState } from "react";
import { ref, get, update } from "firebase/database";
import { toast } from "react-toastify";
import { auth, db } from "../../../firebase";

export const useStudentInscription = (currentPath) => {
  const [associatedWorkshops, setAssociatedWorkshops] = useState([]);

  useEffect(() => {
    const fetchAssociatedWorkshops = async () => {
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
            const associatedWorkshopIds = Object.keys(
              userWorkshopsSnapshot.val()
            );
            const workshopsPromises = associatedWorkshopIds.map(
              async (workshopId) => {
                const workshopRef = ref(db, `workshops/${workshopId}`);
                const workshopSnapshot = await get(workshopRef);
                return { ...workshopSnapshot.val(), id: workshopId, userName };
              }
            );

            const workshops = await Promise.all(workshopsPromises);


            const filteredWorkshops = workshops.filter((workshop) => {
              if (currentPath.includes("orientacionlaboral")) {
                return workshop.orientation === "Laboral";
              } else if (currentPath.includes("orientacionvocacional")) {
                return workshop.orientation === "Vocacional";
              }
              return true; 
            });

            setAssociatedWorkshops(filteredWorkshops);
          } else {
            setAssociatedWorkshops([]);
          }
        }
      } catch (error) {
        console.error("Error fetching associated workshops:", error);
      }
    };

    fetchAssociatedWorkshops();
  }, [currentPath]);

  const handleInscribeClick = async (workshopId) => {
    try {
      const currentUser = auth.currentUser;
      const userId = currentUser.uid;

      const userRef = ref(db, `users/${userId}`);
      const userSnapshot = await get(userRef);
      const userName = userSnapshot.val().username;

      const workshopRef = ref(db, `workshops/${workshopId}`);
      await update(workshopRef, {
        [`students/${userId}`]: {
          email: currentUser.email,
          userName: userName,
        },
        inscription: true,
      });

      const userWorkshopsRef = ref(db, `users/${userId}/workshops`);
      await update(userWorkshopsRef, {
        [`${workshopId}/inscription`]: true,
      });

      toast.success("Inscripción exitosa", {
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Error enrolling in workshop:", error);
    }
  };

  return { associatedWorkshops, handleInscribeClick };
};
