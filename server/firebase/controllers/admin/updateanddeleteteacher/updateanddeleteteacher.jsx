// teacherController.js

import { getDatabase, ref, get, update, remove } from 'firebase/database';

export const getTeachers = async () => {
  const db = getDatabase();
  const usersRef = ref(db, 'users');

  try {
    const snapshot = await get(usersRef);
    if (snapshot.exists()) {
      const teachersData = snapshot.val();
      const teacherArray = Object.keys(teachersData)
        .filter((id) => teachersData[id].type === 'teacher')
        .map((id) => ({
          id,
          ...teachersData[id],
        }));
      return teacherArray;
    } else {
      console.log('No data available');
      return [];
    }
  } catch (error) {
    console.error('Error getting data', error);
    throw error;
  }
};

export const updateTeacherType = async (userId, newType) => {
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

export const deleteTeacher = async (userId) => {
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
