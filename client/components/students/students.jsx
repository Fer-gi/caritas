import React, { useEffect, useState } from 'react';
import {useParams } from "react-router-dom";
import {  getStudentsByTeacher } from '../../firebase/firebaseRead';


export const StudentsComponent = () =>{
    const [ students, setStudents] = useState(null);
    const {teacherId} = useParams ();


    useEffect(() => {
        const fetchStudent = async () => {
            try {
            const studentDB = await getStudentsByTeacher(teacherId);
                setStudents(studentDB)

        } catch (error){
            console.error(' error al obtener los alumnos',error);
        }
        
    };

    fetchStudent();
}, [teacherId]);

if (!students) {
    return <div>Cargando alumnos...</div>;
  }

  return (
    <div>
      <h2>Lista de Estudiantes</h2>
      <ul>
        {students.map((student) => (
          <li key={student.id}>{student.name}<button>Ver</button></li>
        ))}
      </ul>
      
    </div>
  );
};

