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
        // Si tiene alumnos registrados, calculo las plazas disponibles
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

const USER_TYPE= {
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



//PREGUNTAR A PABLO SOBRE GET USUARIO 

/*
Usuarios por Users
Orientador por Teacher
Plazas por Stock
Inscripto por Registered
Talleres por Workshop
Estudiantes por Students
Administrador por Admin
TIPO_USUARIO por USER_TYPE
cambiar type por type en bd

*/



  export async function getUsuario(idUsuario){
    await get(child(ref(db), `users/${idUsuario}`)).then((snapshot) => {
    if (snapshot.exists()) {
        console.log(snapshot.val());
        return snapshot.val()
    } else {
        console.log(`No se ha encontrado al usuario con id ${idUsuario}`);
    }
    }).catch((error) => {
    console.error(error);
    });
}


