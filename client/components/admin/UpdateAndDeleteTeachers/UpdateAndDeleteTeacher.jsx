import  { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'react-toastify/dist/ReactToastify.css';
import { deleteTeacher, fetchTeachers, updateTeacher } from '../../../../server/controllers/admin/updateanddeleteteacher/updateanddeletestudent';

function UpdateAndDeleteTeachers() {
  const [teachers, setTeachers] = useState([]);
  const [selectedType, setSelectedType] = useState('');

  useEffect(() => {
    const fetchTeachersData = async () => {
      const teachersData = await fetchTeachers();
      setTeachers(teachersData);
    };

    fetchTeachersData();
  }, []);

  const handleSelectChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleSaveClick = (userId) => {
    if (!selectedType) {
      alert('Por favor, elija un tipo antes de guardar.');
      return;
    }

    const confirmation = window.confirm(`¿Estás seguro de que quieres actualizar a ${teachers.find(teacher => teacher.id === userId).username} a ${selectedType}?`);

    if (confirmation) {
      updateTeacher(userId, selectedType, setTeachers);
    }
  };

  const handleDeleteClick = (userId) => {
    const confirmation = window.confirm(`¿Estás seguro de que quieres eliminar a ${teachers.find(teacher => teacher.id === userId).username}?`);

    if (confirmation) {
      deleteTeacher(userId, setTeachers);
    }
  };

  return (
    <div>
      <h2>Profesores</h2>
      {teachers.map((teacher) => (
        <Card key={teacher.id} style={{ margin: '10px' }}>
          <Card.Body>
            <div className='d-flex justify-content-between mb-2'>
              <Card.Title>{teacher.username}</Card.Title>
              <Card.Title>{teacher.email}</Card.Title>
            </div>
            <Form.Select onChange={handleSelectChange} value={teacher.type}>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </Form.Select>
            <Button variant="primary" onClick={() => handleSaveClick(teacher.id)}>
              Guardar
            </Button>
            <Button variant="danger" onClick={() => handleDeleteClick(teacher.id)}>
              Eliminar
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default UpdateAndDeleteTeachers;
