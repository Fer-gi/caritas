import { getDatabase, ref, child, get, equalTo, query, orderByChild } from "firebase/database";

const db = getDatabase();

export async function getWorkshops(){
  try {
    const snapshot = await get(child(ref(db), `Workshops/`));

    if (snapshot.exists()) {
        return snapshot.val();
    } else {
        console.log(`No se han encontrado los Workshops`);
    }
} catch (error) {
    console.error(error);
    throw error;
}
}

export async function getWorkshop(idWorkshop) {
  try {
      const snapshot = await get(child(ref(db), `workshops/${idWorkshop}`));

      if (snapshot.exists()) {
        // Si tiene students registrados, calculo las plazas disponibles
          if (snapshot.hasChild("registereds")){
            const remainingStock = snapshot.val().stock - snapshot.val().registereds.length
            console.log(remainingStock)
            snapshot.val().remainingStock = remainingStock
          }
          return snapshot.val();
      } else {
          console.log(`No se ha encontrado el Workshop con id ${idWorkshop}`);
          throw new Error(`No se ha encontrado el Workshop con id ${idWorkshop}`);
      }
  } catch (error) {
      console.error(error);
      throw error;
  }
}

export const USER_TYPE= {
    student: 0,
    teacher:1,
    admin:2
}

export async function getStudents(){
  try {
    const refStudents = query(ref(db, `users`), orderByChild('type'), equalTo(USER_TYPE.student));
    const snapshot = await get(refStudents)
    return snapshot.val()
  } catch (error) {
    console.log(error)
  }
}

export async function getStudentsByTeacher (teacherId){
try{
  const refStudents = await get (child(ref(db),`users/${teacherId}/students`))
  if (refStudents.exists()) {
    return refStudents.val();
} else {
    console.log(`No se han encontrado los estudiantes`);
}

  }catch (error) {
    console.log(error)
  }
}

export async function getWorkshopByStudent (studentId){
  try{
    const refWorkshop = query(ref(db, `users/${studentId}/workshops`), orderByChild(`registered`), equalTo(false));
    const snapshot = await get(refWorkshop)
    if (snapshot.exists()) {
      return snapshot.val();
  } else {
      console.log(`No se han encontrado los talleres`);
  }
   }catch (error) {
    console.log(error)
  }
}

export async function getWorkshopByStudentRegistered (studentId){
  try{
    const refWorkshop = query(ref(db, `users/${studentId}/workshops`), orderByChild(`registered`), equalTo(true));
    const snapshot = await get(refWorkshop)
    if (snapshot.exists()) {
      return snapshot.val();
  } else {
      console.log(`No se han encontrado los talleres`);
  }
   }catch (error) {
    console.log(error)
  }
}

export async function getTeachers(){
  try {
    const refTeacher = query(ref(db, `users`), orderByChild('type'), equalTo(USER_TYPE.teacher));
    const snapshot = await get(refTeacher)
    return snapshot.val()
  } catch (error) {
    console.log(error)
  }
}


export async function getUserByEmail(email){
  try {
    const refEmail = query(ref(db, `users`), orderByChild('email'), equalTo(email));
    const snapshot = await get(refEmail)
    return snapshot.val()
  } catch (error) {
    console.log(error)
  }
}

export async function getUser(idUser) {
  try {
      const snapshot = await get(child(ref(db), `users/${idUser}`));

      if (snapshot.exists()) {
  
          return snapshot.val();
      } else {
          console.log(`No se ha encontrado el usuario con id ${idUser}`);
      }
  } catch (error) {
      console.error(error);
      throw error;
  }
}

export async function getTeachersByStudent(studentId) {
  try {
    const snapshot = await get(child(ref(db), `users/${studentId}/teacher`));

    if (snapshot.exists()) {
      const teacherId = snapshot.val();
      const teacherSnapshot = await get(child(ref(db), `users/${teacherId}`));

      if (teacherSnapshot.exists()) {
        return teacherSnapshot.val();
      } else {
        console.log(`No se ha encontrado el orientador con id ${teacherId}`);
      }
    } else {
      console.log(`No se ha encontrado el orientador del student con id ${studentId}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}