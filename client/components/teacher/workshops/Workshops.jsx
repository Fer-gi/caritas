import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, ListGroup } from 'react-bootstrap';
import "./teacher_workshops.css";
import StudentWorkshopsController from '../../../../server/controllers/teacher/workshops/workshop';

const StudentWorkshops = () => {
  const [workshops, setWorkshops] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    StudentWorkshopsController.getWorkshops(setWorkshops);
  }, []);

  return (
    <div className='card_workshops_teacher'>
      {workshops.map((workshop) => (
        <Card key={workshop.id} style={{ width: '18rem' }}>
          <section className='dateimg'>{workshop.date}</section>
          <Card.Img variant='top' src={workshop.img} />
          <Card.Body>
            <Card.Title>{workshop.courseName}</Card.Title>
          </Card.Body>
          <ListGroup className='list-group-flush'>
            <ListGroup.Item>{workshop.type}</ListGroup.Item>
            <ListGroup.Item>{workshop.workshopType}</ListGroup.Item>
            <ListGroup.Item>{workshop.time}</ListGroup.Item>
            <ListGroup.Item>{workshop.orientation}</ListGroup.Item>
          </ListGroup>
          <Card.Body className='btnsection'>
            <Button
              className='cardbtn mx-auto mt-3'
              variant='danger'
              onClick={() => navigate(`view/${workshop.id}`)}>
              Ver
            </Button>
            <Button
              className='cardbtn mx-auto mt-3'
              variant='danger'
              onClick={() => navigate(`${workshop.id}`)}>
              Asociar
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default StudentWorkshops;
