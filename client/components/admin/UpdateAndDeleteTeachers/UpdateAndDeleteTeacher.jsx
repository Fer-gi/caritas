import { useState, useEffect } from 'react';
import { getDatabase, ref, get, update, remove } from 'firebase/database';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UpdateAndDeleteTeachers() {
  const [students, setStudents] = useState([]);
  const [selectedType, setSelectedType] = useState('');

  useEffect(() => {
    const db = getDatabase();
    const usersRef = ref(db, 'users');
  
    get(usersRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const studentsData = snapshot.val();
          // Filter users with type "student"
          const studentArray = Object.keys(studentsData)
            .filter((id) => studentsData[id].type === 'teacher')
            .map((id) => ({
              id,
              ...studentsData[id],
            }));
          setStudents(studentArray);
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error('Error getting data', error);
      });
  }, []);
  








  
  const handleSelectChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleSaveClick = (userId) => {
    if (!selectedType) {
      alert('Por favor, elija un tipo antes de guardar.');
      return;
    }

    const confirmation = window.confirm(`¿Estás seguro de que quieres actualizar a ${students.find(student => student.id === userId).username} a ${selectedType}?`);

    if (confirmation) {
      const db = getDatabase();
      const userRef = ref(db, `users/${userId}`);

      // Actualizar el tipo de usuario en la base de datos
      update(userRef, { type: selectedType })
        .then(() => {
          // Actualizar el estado local con la nueva información
          setStudents((prevStudents) => {
            return prevStudents.map((student) =>
              student.id === userId ? { ...student, type: selectedType } : student
            );
          });
          console.log('Tipo de usuario actualizado exitosamente');
          toast.success(`Usuario actualizado a ${selectedType}`, {
            autoClose: 2000,
          });
        })
        .catch((error) => {
          console.error('Error actualizando el tipo de usuario', error);
        });
    }
  };

  const handleDeleteClick = (userId) => {
    const confirmation = window.confirm(`¿Estás seguro de que quieres eliminar a ${students.find(student => student.id === userId).username}?`);

    if (confirmation) {
      const db = getDatabase();
      const userRef = ref(db, `users/${userId}`);

      // Eliminar el usuario de la base de datos
      remove(userRef)
        .then(() => {
          // Actualizar el estado local eliminando el usuario
          setStudents((prevStudents) =>
            prevStudents.filter((student) => student.id !== userId)
          );
          console.log('Usuario eliminado exitosamente');
          toast.success('Usuario eliminado correctamente', {
            autoClose: 2000,
          });
        })
        .catch((error) => {
          console.error('Error eliminando el usuario', error);
        });
    }
  };

  return (
    <div>
      <h2>Alumnos</h2>
      {students.map((student) => (
        <Card key={student.id} style={{ margin: '10px' }}>
          <Card.Body>
            <div className='d-flex justify-content-between mb-2'>
              <Card.Title>{student.username}</Card.Title>
              <Card.Title>{student.email}</Card.Title>
            </div>
            <Form.Select onChange={handleSelectChange}>
              <option value="student" selected={student.type === 'student'}>Student</option>
              <option value="teacher" selected={student.type === 'teacher'}>Teacher</option>
              <option value="admin" selected={student.type === 'admin'}>Admin</option>
            </Form.Select>
            <Button variant="primary" onClick={() => handleSaveClick(student.id)}>
              Guardar
            </Button>
            <Button variant="danger" onClick={() => handleDeleteClick(student.id)}>
              Eliminar
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default UpdateAndDeleteTeachers;
