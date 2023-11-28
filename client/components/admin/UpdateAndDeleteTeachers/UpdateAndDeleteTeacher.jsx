import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getTeachers, updateTeacherType, deleteTeacher } from '../../../../server/firebase/controllers/admin/updateanddeleteteacher/updateanddeleteteacher';

function UpdateAndDeleteTeachers() {
  const [teachers, setTeachers] = useState([]);
  const [selectedType, setSelectedType] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teachersData = await getTeachers();
        setTeachers(teachersData);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  const handleSelectChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleSaveClick = async (userId) => {
    if (!selectedType) {
      alert('Por favor, elija un tipo antes de guardar.');
      return;
    }

    const confirmation = window.confirm(`¿Estás seguro de que quieres actualizar a ${teachers.find(teacher => teacher.id === userId).username} a ${selectedType}?`);

    if (confirmation) {
      try {
        await updateTeacherType(userId, selectedType);
        setTeachers((prevTeachers) => {
          return prevTeachers.map((teacher) =>
            teacher.id === userId ? { ...teacher, type: selectedType } : teacher
          );
        });
        console.log('Tipo de usuario actualizado exitosamente');
        toast.success(`Usuario actualizado a ${selectedType}`, {
          autoClose: 2000,
        });
      } catch (error) {
        console.error('Error actualizando el tipo de usuario', error);
      }
    }
  };

  const handleDeleteClick = async (userId) => {
    const confirmation = window.confirm(`¿Estás seguro de que quieres eliminar a ${teachers.find(teacher => teacher.id === userId).username}?`);

    if (confirmation) {
      try {
        await deleteTeacher(userId);
        setTeachers((prevTeachers) =>
          prevTeachers.filter((teacher) => teacher.id !== userId)
        );
        console.log('Usuario eliminado exitosamente');
        toast.success('Usuario eliminado correctamente', {
          autoClose: 2000,
        });
      } catch (error) {
        console.error('Error eliminando el usuario', error);
      }
    }
  };

  return (
    <div>
      <h2 style={{ color: '#cd222d', textAlign: 'center' }}>Profesores</h2>
      {teachers.map((teacher) => (
        <Card key={teacher.id} style={{ margin: '10px' }}>
          <Card.Body>
            <div className='d-flex justify-content-between flex-wrap mb-2'>
            <Card.Title> {teacher.username ? teacher.username : (teacher.displayName ? teacher.displayName : null)}</Card.Title>
              <Card.Title>{teacher.email}</Card.Title>
            </div>
            <Form.Select onChange={handleSelectChange}>
              <option value="student" selected={teacher.type === 'student'}>Alumno</option>
              <option value="teacher" selected={teacher.type === 'teacher'}>Profesor</option>
              <option value="admin" selected={teacher.type === 'admin'}>Admin</option>
            </Form.Select>
            <Button variant='primary' onClick={() => handleSaveClick(teacher.id)}>
              Guardar
            </Button>
            <Button style={{ margin: '0.5rem' }} variant='danger' onClick={() => handleDeleteClick(teacher.id)}>
              Eliminar
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default UpdateAndDeleteTeachers;
