import { getDatabase, ref, get, update, remove } from 'firebase/database';
import { toast } from 'react-toastify';

export const fetchTeachers = async () => {
  try {
    const db = getDatabase();
    const usersRef = ref(db, 'users');
    const snapshot = await get(usersRef);

    if (snapshot.exists()) {
      const teachersData = snapshot.val();
      // Filter users with type "teacher"
      return Object.keys(teachersData)
        .filter((id) => teachersData[id].type === 'teacher')
        .map((id) => ({
          id,
          ...teachersData[id],
        }));
    } else {
      console.log('No data available');
      return [];
    }
  } catch (error) {
    console.error('Error getting data', error);
    return [];
  }
};

export const updateTeacher = async (userId, selectedType, setTeachers) => {
  try {
    const db = getDatabase();
    const userRef = ref(db, `users/${userId}`);

    // Actualizar el tipo de usuario en la base de datos
    await update(userRef, { type: selectedType });

    // Actualizar el estado local con la nueva información
    setTeachers((prevTeachers) => {
      return prevTeachers.map((teacher) =>
        teacher.id === userId ? { ...teacher, type: selectedType } : teacher
      );
    });

    console.log('Tipo de usuario actualizado exitosamente');
    toast.success(`Usuario actualizado a ${selectedType}`, {
      autoClose: 2000,
    });
  } catch (error) {
    console.error('Error actualizando el tipo de usuario', error);
  }
};

export const deleteTeacher = async (userId, setTeachers) => {
  try {
    const db = getDatabase();
    const userRef = ref(db, `users/${userId}`);

    // Eliminar el usuario de la base de datos
    await remove(userRef);

    // Actualizar el estado local eliminando el usuario
    setTeachers((prevTeachers) =>
      prevTeachers.filter((teacher) => teacher.id !== userId)
    );

    console.log('Usuario eliminado exitosamente');
    toast.success('Usuario eliminado correctamente', {
      autoClose: 2000,
    });
  } catch (error) {
    console.error('Error eliminando el usuario', error);
  }
};
