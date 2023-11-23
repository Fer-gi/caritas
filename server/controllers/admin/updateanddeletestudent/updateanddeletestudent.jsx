import { getDatabase, ref, get, update, remove } from 'firebase/database';
import { toast } from 'react-toastify';

export const fetchStudents = async () => {
  try {
    const db = getDatabase();
    const usersRef = ref(db, 'users');
    const snapshot = await get(usersRef);

    if (snapshot.exists()) {
      const studentsData = snapshot.val();
      // Filter users with type "student"
      return Object.keys(studentsData)
        .filter((id) => studentsData[id].type === 'student')
        .map((id) => ({
          id,
          ...studentsData[id],
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

export const updateStudent = async (userId, selectedType, setStudents) => {
  try {
    const db = getDatabase();
    const userRef = ref(db, `users/${userId}`);

    // Actualizar el tipo de usuario en la base de datos
    await update(userRef, { type: selectedType });

    // Actualizar el estado local con la nueva información
    setStudents((prevStudents) => {
      return prevStudents.map((student) =>
        student.id === userId ? { ...student, type: selectedType } : student
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

export const deleteStudent = async (userId, setStudents) => {
  try {
    const db = getDatabase();
    const userRef = ref(db, `users/${userId}`);

    // Eliminar el usuario de la base de datos
    await remove(userRef);

    // Actualizar el estado local eliminando el usuario
    setStudents((prevStudents) =>
      prevStudents.filter((student) => student.id !== userId)
    );

    console.log('Usuario eliminado exitosamente');
    toast.success('Usuario eliminado correctamente', {
      autoClose: 2000,
    });
  } catch (error) {
    console.error('Error eliminando el usuario', error);
  }
};
