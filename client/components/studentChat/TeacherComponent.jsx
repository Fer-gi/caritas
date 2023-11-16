import React, { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import { getTeachersByStudent } from '../../firebase/firebaseRead';

export const TeachersComponent = () => {
  const [teachers, setTeachers] = useState(null);
  const { studentId } = useParams();

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const teachersDB = await getTeachersByStudent(studentId);
        setTeachers(teachersDB);
      } catch (error) {
        console.error('Error al obtener los profesores', error);
      }
    };

    fetchTeachers();
  }, [studentId]);

  if (!teachers) {
    return <div>Cargando profesores...</div>;
  }

  return (
    <div>
      <h2>Lista de Profesores</h2>
      <ul>
        {teachers.map((teacher) => (
          <li key={teacher.id}>
            {teacher.name}
            <Link to={`/chat/${studentId}/${teacher.id}`}>
              <button>Iniciar Chat</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
