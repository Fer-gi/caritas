import { useState, useEffect } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import { getDatabase, ref, get } from 'firebase/database';
import { MdOutlineChat } from "react-icons/md";
import './StudentDetails.css'

function StudentDetails () {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const db = getDatabase();
    const usersRef = ref(db, 'users');

    get(usersRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const studentsData = snapshot.val();
          const selectedStudent = studentsData[id];

          if (selectedStudent) {
            setStudent(selectedStudent);
          } else {
            console.log('Student not found');
          }
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error('Error getting data', error);
      });
  }, [id]);

  if (!student) {
    return <div>Cargando...</div>;
  }

  return (
    <>
    <div className="text-center mx-auto">
      <h2>Detalles del Estudiante</h2>
      <div className="mb-2">
        <strong>Nombre de usuario:</strong> {student.username}
      </div>
      <div className="mb-2">
        <strong>Correo electrónico:</strong> {student.email}
      </div>
      <div className="mb-2">
        <strong>Número:</strong> {student.number}
      </div>
    </div>
    <button className='button_chat' onClick={() => navigate(`chat`)}>
        <MdOutlineChat />
      </button>
    </>
  );
  }  

export default StudentDetails;
