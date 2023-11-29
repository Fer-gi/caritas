import { ref, onValue, remove, getDatabase, get } from "firebase/database";

export const getWorkshopsData = (setData) => {
  const workshopsRealtimeRef = ref(getDatabase(), "workshops");

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
    console.error("Error deleting workshop:", error);
    return false;
  }
};






export const deleteUserWorkshop = async (workshopId) => {
  const usersRealtimeRef = ref(getDatabase(), "users");

  try {
    const snapshot = await get(usersRealtimeRef);
    const usersData = snapshot.val();

    if (usersData) {
      Object.keys(usersData).forEach(async (userId) => {
        const userWorkshopsRef = ref(getDatabase(), `users/${userId}/workshops/${workshopId}`);

        try {
          await remove(userWorkshopsRef);
        } catch (error) {
          console.error(`Error deleting workshop reference from user ${userId}:`, error);
        }
      });

      return true;
    } else {
      console.log("No users found");
      return false;
    }
  } catch (error) {
    console.error("Error fetching users data:", error);
    return false;
  }
};
