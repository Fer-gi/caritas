// StudentList.jsx

import { useState, useEffect } from 'react';
import { getDatabase, ref, get } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function StudentList() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const usersRef = ref(db, 'users');

    get(usersRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const studentsData = snapshot.val();
          const studentArray = Object.keys(studentsData).map((id) => ({
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
