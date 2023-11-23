import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MdOutlineChat } from 'react-icons/md';
import { Card, Accordion, ListGroup, Button } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import './StudentDetails.css';
import StudentDetailsController from '../../../../server/controllers/teacher/studentdetails/StudentDetail';

function StudentDetails() {
  const { teacherId, studentId } = useParams();
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    StudentDetailsController.fetchStudentData(studentId, setStudent);
  }, [teacherId, studentId]);

  if (!student) {
    return <div>Cargando...</div>;
  }

  const { workshops } = student;

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
        
        <h3>Taller del Estudiante</h3>
        {workshops &&
          Object.values(workshops).map((workshop) => (
            <Card key={workshop.id} style={{ width: '18rem', margin: '10px' }}>
              <section className='dateimg'>{workshop.date}</section>
              <Card.Img variant='top' src={workshop.img} />
              <Card.Body>
                <Card.Title>{workshop.courseName}</Card.Title>
                <Accordion defaultActiveKey='0'>
                  <Accordion.Item eventKey='1'>
                    <Accordion.Header>Saber más</Accordion.Header>
                    <Accordion.Body>
                      {workshop.description}{' '}
                      <a href='#'>Más información</a>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Card.Body>
              <ListGroup className='list-group-flush'>
                <ListGroup.Item>{workshop.type}</ListGroup.Item>
                <ListGroup.Item>{workshop.workshopType}</ListGroup.Item>
                <ListGroup.Item>{workshop.time}</ListGroup.Item>
                <ListGroup.Item>{workshop.orientation}</ListGroup.Item>
                <ListGroup.Item>
                  Estado de inscripción: {workshop.inscription ? 'Inscrito' : 'No inscrito'}
                </ListGroup.Item>
              </ListGroup>
            </Card>
          ))}
      </div>
      <div style={{ position: 'fixed', bottom: '10vh', right: '20px' }}>
        <Button variant='danger' onClick={() => navigate('/addworkshops')}>
          <FaPlus />
        </Button>
      </div>
      <button className="button_chat" onClick={() => navigate(`chat`)}>
        <MdOutlineChat />
      </button>
    </>
  );
}

export default StudentDetails;
