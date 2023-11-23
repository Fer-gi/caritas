import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'react-toastify/dist/ReactToastify.css';
import { deleteStudent, fetchStudents, updateStudent } from '../../../../server/controllers/admin/updateanddeletestudent/updateanddeletestudent';

function UpdateAndDeleteStudents() {
  const [students, setStudents] = useState([]);
  const [selectedType, setSelectedType] = useState('');

  useEffect(() => {
    const fetchStudentsData = async () => {
      const studentsData = await fetchStudents();
      setStudents(studentsData);
    };

    fetchStudentsData();
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
      updateStudent(userId, selectedType, setStudents);
    }
  };

  const handleDeleteClick = (userId) => {
    const confirmation = window.confirm(`¿Estás seguro de que quieres eliminar a ${students.find(student => student.id === userId).username}?`);

    if (confirmation) {
      deleteStudent(userId, setStudents);
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
            <Form.Select onChange={handleSelectChange} value={student.type}>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
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

export default UpdateAndDeleteStudents;
