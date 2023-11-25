import { ref, onValue, set, get } from 'firebase/database';
import { toast } from 'react-toastify';
import { db } from '../../../firebase';

export const getWorkshop = (id, setWorkshop) => {
  const workshopRef = ref(db, `workshops/${id}`);

  onValue(workshopRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      setWorkshop({
        ...data,
        id,
        teacherId: Object.keys(data.teacher)[0],
      });
    } else {
      setWorkshop(null);
    }
  });
};

export const associateStudent = async (emailInput, id, setWorkshop, setEmailInput) => {
  try {
    if (!emailInput) {
      return;
    }

    const studentId = await findStudentIdByEmail(emailInput);

    if (!studentId) {
      return;
    }
    const workshop = await getWorkshopData(id);

    if (workshop) {
      const workshopRef = ref(db, `users/${studentId}/workshops/${id}`);
      set(workshopRef, {
        date: workshop.date,
        img: workshop.img,
        courseName: workshop.courseName,
        description: workshop.description,
        type: workshop.type,
        workshopType: workshop.workshopType,
        time: workshop.time,
        orientation: workshop.orientation,
        teacherId: workshop.teacher,
      });

      setEmailInput('');

      toast.success('Estudiante asociado correctamente', {
        autoClose: 2000,
      });

      getWorkshop(id, setWorkshop); // Update the workshop after association
    }
  } catch (error) {
    console.error('Error al asociar estudiante:', error);
  }
};

export const disassociateStudent = async (emailInput, id, setWorkshop, setEmailInput) => {
  try {
    if (!emailInput) {
      return;
    }

    const studentId = await findStudentIdByEmail(emailInput);

    if (!studentId) {
      return;
    }

    const workshop = await getWorkshopData(id);

    if (workshop) {
      const studentWorkshopRef = ref(db, `users/${studentId}/workshops/${id}`);
      set(studentWorkshopRef, null);

      const globalWorkshopRef = ref(db, `workshops/${id}`);
      const globalWorkshopSnapshot = await get(globalWorkshopRef);
      const globalWorkshopData = globalWorkshopSnapshot.val();

      if (globalWorkshopData) {
        delete globalWorkshopData.students[studentId];
        set(globalWorkshopRef, globalWorkshopData);
      }
      setEmailInput('');

      toast.success('Estudiante desasociado correctamente', {
        autoClose: 2000,
      });

      getWorkshop(id, setWorkshop); // Update the workshop after disassociation
    }
  } catch (error) {
    console.error('Error al desasociar estudiante:', error);
  }
};

export const findStudentIdByEmail = async (email) => {
  const usersRef = ref(db, 'users');
  const snapshot = await get(usersRef);

  for (const userKey in snapshot.val()) {
    if (Object.prototype.hasOwnProperty.call(snapshot.val(), userKey)) {
      const userData = snapshot.val()[userKey];
      if (userData.email === email) {
        return userKey;
      }
    }
  }

  return null;
};

export const getWorkshopData = async (id) => {
  const workshopRef = ref(db, `workshops/${id}`);
  const workshopSnapshot = await get(workshopRef);
  return workshopSnapshot.val();
};
