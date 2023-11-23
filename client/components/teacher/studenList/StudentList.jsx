import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import "./StudentList.css";
import StudentListController from '../../../../server/controllers/teacher/studentlist/StudentList';

function StudentList() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const { teacherId, studentId } = useParams();

  useEffect(() => {
    StudentListController.fetchStudentsData(setStudents);
  }, [teacherId, studentId]);
  
  return (
    <div>
      <h2>Alumnos</h2>
      {students.map((student) => (
        <Card key={student.id} style={{ margin: '10px' }}>
          <Card.Body>
            <Card.Title>{student.username}</Card.Title>
            <Button
              className='buttonStudent'
              variant="danger"
              onClick={() => navigate(`${student.id}`)}
            >
              Ver
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default StudentList;
