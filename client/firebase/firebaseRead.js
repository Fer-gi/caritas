import { getDatabase, ref, child, get, equalTo } from "firebase/database";

const db = getDatabase();

async function getTalleres(){
    onValue(ref(db, "talleres"), (snapshot) => {
        return snapshot
      }, {
        onlyOnce: true
      });
}

export async function getTaller(idTaller) {
  try {
      const snapshot = await get(child(ref(db), `talleres/${idTaller}`));

      if (snapshot.exists()) {
          // Calculo la cantidad de plazas y se la agrego al objeto
          // TODO: Probar esto!!!!
          //snapshot.val().plazasDisponibles = snapshot.val().plazas - snapshot.val().inscriptos.length
          console.log(snapshot.val().plazas - snapshot.val().inscriptos.length)
          return snapshot.val();
      } else {
          console.log(`No se ha encontrado el taller con id ${idTaller}`);
          throw new Error(`No se ha encontrado el taller con id ${idTaller}`);
      }
  } catch (error) {
      console.error(error);
      throw error;
  }
}

const TIPO_USER= {
    alumno: 0,
    orientador:1,
    administrador:2
}

async function getAlumnos(){
    const refAlumnos = query(ref(db, 'users'), equalTo('tipo', TIPO_USER.alumno));
    onValue(ref(db, refAlumnos), (snapshot) => {
        return snapshot
      }, {
        onlyOnce: true
      });
}

async function getOrientadores(){
    const refOrientadores = query(ref(db, 'usuarios'), equalTo('tipo', TIPO_USER.orientador));
    onValue(ref(db, refOrientadores), (snapshot) => {
        return snapshot
      }, {
        onlyOnce: true
      });
}

async function getUsuarioPorEmail(email){
    const refUsuario = query(ref(db, 'usuarios'), equalTo('email', email));
    onValue(ref(db, refUsuario), (snapshot) => {
        return snapshot
      }, {
        onlyOnce: true
      });
}
async function getUsuario(idUsuario){
    get(child(ref(db), `usuarios/${idUsuario}`)).then((snapshot) => {
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

