import { ref, onValue, set, get } from 'firebase/database';
import { db } from '../../../../server/firebase/firebase';

const getWorkshop = async (id, setWorkshop) => {
  const workshopRef = ref(db, `workshops/${id}`);

  onValue(workshopRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      setWorkshop({
        ...data,
        id,
      });
    } else {
      setWorkshop(null);
    }
  });
};

const associateStudent = async (workshop, studentId) => {
  const workshopRef = ref(db, `users/${studentId}/workshops/${workshop.id}`);
  await set(workshopRef, {
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
};

const disassociateStudent = async (workshop, studentId) => {
  const studentWorkshopRef = ref(db, `users/${studentId}/workshops/${workshop.id}`);
  await set(studentWorkshopRef, null);

  const globalWorkshopRef = ref(db, `workshops/${workshop.id}`);
  const globalWorkshopSnapshot = await get(globalWorkshopRef);
  const globalWorkshopData = globalWorkshopSnapshot.val();

  if (globalWorkshopData) {
    delete globalWorkshopData.students[studentId];
    await set(globalWorkshopRef, globalWorkshopData);
  }
};

const findStudentIdByEmail = async (email) => {
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

const AssociateStudentController = {
  getWorkshop,
  associateStudent,
  disassociateStudent,
  findStudentIdByEmail,
};

export default AssociateStudentController;
