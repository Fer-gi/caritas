import { getDatabase, ref, set, update } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';

const db = getDatabase();

const USER_TYPE= {
    student: 0,
    teacher:1,
    admin:2
}

export function createStudent(name, email, telephone) {
    const userId = uuidv4()
    createUser(userId, name, email, telephone, USER_TYPE.student)
}

export function createTeacher(name, email, telephone) {
    const userId = uuidv4()
    createUser(userId, name, email, telephone, USER_TYPE.teacher)
}

export function createAdmin(name, email, telephone) {
    const userId = uuidv4()
    createUser(userId, name, email, telephone, USER_TYPE.admin)
}

export function createUser(userId, name, email, telephone, typeUser){
    set(ref(db, 'users/' + userId), {
        id: userId,
        name: name,
        email: email,
        telephone: telephone,
        tipo: typeUser
    });
}

export function AssociateWorkshopWithStudent(studentId, workshop){
    set(ref(db, 'users/' + studentId + '/workshops/' + workshop.id), {
        id: workshop.id,
        title: workshop.title,
        schedules: workshop.schedules,
        ubication: workshop.ubication,
        startDate: workshop.startDate,
        mandatory: workshop.mandatory,
        registered: false // En este momento el orientador asocia el workshop por lo que aun no estaria registered el student 
    });
}

export function disassociateWorkshopWithStudent(idStudent, idWorkshop){
    // Primero quito el workshop asociado al student
    remove(ref(db, 'users/' + idStudent + '/workshops/' + idWorkshop))

    // Segundo quito el student de los registereds al workshop (si no estaba registered no realizara nada)
    remove(ref(db, 'workshops/' + idWorkshop + '/registereds/' + idStudent))
}

export function associateStudentWithTeacher(student, idTeacher){
    set(ref(db, 'users/' + idTeacher + '/students/' + student.id), {
        id: student.id,
        name: student.name
    });
}

export function registrationStudentWorkshop(student, idWorkshop){
    // Primero agrego el student a la lista de registereds en el workshop para poder calcular luego las stock libres
    set(ref(db, 'workshops/' + idWorkshop + '/registereds/' + student.id), {
       id:student.id,
       name: student.name,
       email: student.email,
       telephone: student.telephone 
    });

    // Segundo actualizo el workshop del student para marcarlo como "registered"
    const updates = {};
    updates['/users/' + student.id + '/workshops/' + idWorkshop + '/registered'] = true;

    update(ref(db), updates);
}

export function unsubscriptionStudentAworkshop(idstudent, idWorkshop){
    // Primero quito el student registered del workshop
    remove(ref(db, 'workshops/' + idWorkshop + '/registereds/' + idstudent))

    // Segundo actualizo el workshop del student para no marcarlo como "registered"
    const updates = {};
    updates['/users/' + idstudent + '/workshops/' + idWorkshop + '/registered'] = false;

    update(ref(db), updates);
}

const TYPE_workshop= {
    vocational: 0,
    labor:1
}

export function createVocationalWorkshop(title, description, schedules, ubication, startDate, stock, mandatory){
    const idWorkshop = uuidv4()
    createVocationalWorkshop(idWorkshop, title, description, schedules, ubication, startDate, stock, mandatory, TYPE_workshop.vocational)
}

export function createLaborWorkshop(title, description, schedules, ubication, startDate, stock, mandatory){
    const idWorkshop = uuidv4()
    createLaborWorkshop(idWorkshop, title, description, schedules, ubication, startDate, stock, mandatory, TYPE_workshop.labor)
}

export function crearWorkshop(idWorkshop, title, description, schedules, ubication, startDate, stock, mandatory, type){
    set(ref(db, 'workshops/' + idWorkshop), {
        id:idWorkshop,
        title:title,
        description:description,
        schedules:schedules,
        ubication:ubication,
        startDate:startDate,
        stock:stock,
        mandatory:mandatory,
        type:type
     });
}

export function sendStudentAlert(idstudent, subject, message){
    const idAlert = uuidv4()
    set(ref(db, 'users/' + idstudent + '/alerts'), {
        id: idAlert,
        subject: subject,
        message: message
    });
}

/**
 * @param attachUrl Crear primero esta URL con Firestore
 */
export function sendTeacherAlert(idTeacher, subject, message, attachUrl){
    const idAlert = uuidv4()
    set(ref(db, 'users/' + idTeacher + '/alerts'), {
        id: idAlert,
        subject: subject,
        message: message,
        attach: attachUrl
    });
}