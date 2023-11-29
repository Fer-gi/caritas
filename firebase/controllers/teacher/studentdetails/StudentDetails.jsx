import { getDatabase, ref, get } from 'firebase/database';

export const fetchStudentDetails = async (studentId) => {
  const db = getDatabase();
  const usersRef = ref(db, 'users');

  try {
    const snapshot = await get(usersRef);
    if (snapshot.exists()) {
      const studentsData = snapshot.val();
      const selectedStudent = studentsData[studentId];

      if (selectedStudent) {
        return selectedStudent;
      } else {
        console.log('Student not found');
        return null;
      }
    } else {
      console.log('No data available');
      return null;
    }
  } catch (error) {
    console.error('Error getting data', error);
    throw error;
  }
};

