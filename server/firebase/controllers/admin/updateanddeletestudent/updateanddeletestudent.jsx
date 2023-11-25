// studentController.js

import { getDatabase, ref, get, update, remove } from 'firebase/database';

export const getStudents = async () => {
  const db = getDatabase();
  const usersRef = ref(db, 'users');

  try {
    const snapshot = await get(usersRef);
    if (snapshot.exists()) {
      const studentsData = snapshot.val();
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

export const updateStudentType = async (userId, newType) => {
  const db = getDatabase();
  const userRef = ref(db, `users/${userId}`);

  try {
    await update(userRef, { type: newType });
    console.log('Tipo de usuario actualizado exitosamente');
  } catch (error) {
    console.error('Error updating user type', error);
    throw error;
  }
};

export const deleteStudent = async (userId) => {
  const db = getDatabase();
  const userRef = ref(db, `users/${userId}`);

  try {
    await remove(userRef);
    console.log('Usuario eliminado exitosamente');
  } catch (error) {
    console.error('Error deleting user', error);
    throw error;
  }
};
