import { getDatabase, ref, set, update } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';

const db = getDatabase();

const TIPO_USER= {
    alumno: 0,
    orientador:1,
    administrador:2
}

export function crearAlumno(nombre, email, telefono) {
    const userId = uuidv4()
    crearUsuario(userId, nombre, email, telefono, TIPO_USER.alumno)
}

function crearOrientador(nombre, email, telefono) {
    const userId = uuidv4()
    crearUsuario(userId, nombre, email, telefono, TIPO_USER.orientador)
}

function crearAdministrador(nombre, email, telefono) {
    const userId = uuidv4()
    crearUsuario(userId, nombre, email, telefono, TIPO_USER.administrador)
}

function crearUsuario(userId, nombre, email, telefono, tipoUsuario){
    set(ref(db, 'usuarios/' + userId), {
        id: userId,
        nombre: nombre,
        email: email,
        telefono: telefono,
        tipo: tipoUsuario
    });
}

function asociarTallerConAlumnto(alumnoId, taller){
    set(ref(db, 'usuarios/' + alumnoId + '/talleres/' + taller.id), {
        id: taller.id,
        titulo: taller.titulo,
        horarios: taller.horarios,
        ubicacion: taller.ubicacion,
        fechaInicio: taller.fechaInicio,
        obligatorio: taller.obligatorio,
        inscripto: false // En este momento el orientador asocia el taller por lo que aun no estaria inscripto el alumno 
    });
}

function desasociarTallerConAlumno(idAlumno, idTaller){
    // Primero quito el taller asociado al alumno
    remove(ref(db, 'usuarios/' + idAlumno + '/talleres/' + idTaller))

    // Segundo quito el alumno de los inscriptos al taller (si no estaba inscripto no realizara nada)
    remove(ref(db, 'talleres/' + idTaller + '/inscriptos/' + idAlumno))
}

function asociarAlumnoConOrientador(alumno, idOrientador){
    set(ref(db, 'usuarios/' + idOrientador + '/alumnos/' + alumno.id), {
        id: alumno.id,
        nombre: alumno.nombre
    });
}

function inscripcionAlumnoATaller(alumno, idTaller){
    // Primero agrego el alumno a la lista de inscriptos en el taller para poder calcular luego las plazas libres
    set(ref(db, 'talleres/' + idTaller + '/inscriptos/' + alumno.id), {
       id:alumno.id,
       nombre: alumno.nombre,
       email: alumno.email,
       telefono: alumno.telefono 
    });

    // Segundo actualizo el taller del alumno para marcarlo como "inscripto"
    const updates = {};
    updates['/usuarios/' + alumno.id + '/talleres/' + idTaller + '/inscripto'] = true;

    update(ref(db), updates);
}

function desunscripcionAlumnoATaller(idAlumno, idTaller){
    // Primero quito el alumno inscripto del taller
    remove(ref(db, 'talleres/' + idTaller + '/inscriptos/' + idAlumno))

    // Segundo actualizo el taller del alumno para no marcarlo como "inscripto"
    const updates = {};
    updates['/usuarios/' + idAlumno + '/talleres/' + idTaller + '/inscripto'] = false;

    update(ref(db), updates);
}

const TIPO_TALLER= {
    vocacional: 0,
    laboral:1
}

export function crearTallerVocacional(titulo, descripcion, horarios, ubicacion, fechaInicio, plazas, obligatorio){
    const idTaller = uuidv4()
    crearTaller(idTaller, titulo, descripcion, horarios, ubicacion, fechaInicio, plazas, obligatorio, TIPO_TALLER.vocacional)
}

function crearTallerLaboral(titulo, descripcion, horarios, ubicacion, fechaInicio, plazas, obligatorio){
    const idTaller = uuidv4()
    crearTaller(idTaller, titulo, descripcion, horarios, ubicacion, fechaInicio, plazas, obligatorio, TIPO_TALLER.laboral)
}

function crearTaller(idTaller, titulo, descripcion, horarios, ubicacion, fechaInicio, plazas, obligatorio, tipo){
    set(ref(db, 'talleres/' + idTaller), {
        id:idTaller,
        titulo:titulo,
        descripcion:descripcion,
        horarios:horarios,
        ubicacion:ubicacion,
        fechaInicio:fechaInicio,
        plazas:plazas,
        obligatorio:obligatorio,
        tipo:tipo
     });
}

function enviarAlertaAlumno(idAlumno, asunto, mensaje){
    const idAlerta = uuidv4()
    set(ref(db, 'usuarios/' + idAlumno + '/alertas'), {
        id: idAlerta,
        asunto: asunto,
        mensaje: mensaje
    });
}

/**
 * @param adjuntoUrl Crear primero esta URL con Firestore
 */
function enviarAlertaOrientador(idOrientador, asunto, mensaje, adjuntoUrl){
    const idAlerta = uuidv4()
    set(ref(db, 'usuarios/' + idOrientador + '/alertas'), {
        id: idAlerta,
        asunto: asunto,
        mensaje: mensaje,
        adjunto: adjuntoUrl
    });
}