// controllers/studentListController.js
import { getDatabase, ref, get } from 'firebase/database';

export const fetchStudentList = async () => {
  const db = getDatabase();
  const usersRef = ref(db, 'users');

  try {
    const snapshot = await get(usersRef);
    if (snapshot.exists()) {
      const studentsData = snapshot.val();
      // Filter users with type "student"
      const studentArray = Object.keys(studentsData)
        .filter((id) => studentsData[id].type === 'student')
        .map((id) => ({
          id,
          ...studentsData[id],
        }));
      return studentArray;
    } else {
      console.log('No data available');
      return [];
    }
  } catch (error) {
    console.error('Error getting data', error);
    throw error;
  }
};