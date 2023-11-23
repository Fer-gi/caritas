import { getDatabase, ref, get } from 'firebase/database';

const fetchStudentData = async (studentId, setStudent) => {
  const db = getDatabase();
  const usersRef = ref(db, 'users');

  try {
    const snapshot = await get(usersRef);
    if (snapshot.exists()) {
      const studentsData = snapshot.val();
      const selectedStudent = studentsData[studentId];

      if (selectedStudent) {
        setStudent(selectedStudent);
      } else {
        console.log('Student not found');
      }
    } else {
      console.log('No data available');
    }
  } catch (error) {
    console.error('Error getting data', error);
  }
};

const StudentDetailsController = {
  fetchStudentData,
};

export default StudentDetailsController;
