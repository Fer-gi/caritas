import { getDatabase, ref, get } from 'firebase/database';

const fetchStudentsData = (setStudents) => {
  const db = getDatabase();
  const usersRef = ref(db, 'users');
  
  get(usersRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const studentsData = snapshot.val();
        // Filter users with type "student"
        const studentArray = Object.keys(studentsData)
          .filter((id) => studentsData[id].type === 'student')
          .map((id) => ({
            id,
            ...studentsData[id],
          }));
        setStudents(studentArray);
      } else {
        console.log('No data available');
      }
    })
    .catch((error) => {
      console.error('Error getting data', error);
    });
};

const StudentListController = {
  fetchStudentsData,
};

export default StudentListController;
