import { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import { getStudentsByTeacher } from '../../../server/firebase/firebaseRead';

export const StudentsComponent = () => {
  const [students, setStudents] = useState(null);
  const { teacherId } = useParams();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const studentDB = await getStudentsByTeacher(teacherId);
        setStudents(studentDB);
      } catch (error) {
        console.error('Error al obtener los alumnos', error);
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
          <li key={student.id}>
            {student.name}
            {student.telephone}
            {student.email}
            <Link to={`/chat/${student.id}/${teacherId}`}>
              <button>Iniciar Chat</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
