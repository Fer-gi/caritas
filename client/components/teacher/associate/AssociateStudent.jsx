/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button, ListGroup } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from 'react-bootstrap/Spinner';
import { associateStudent, disassociateStudent, getWorkshop, findStudentIdByEmail } from '../../../../server/firebase/controllers/teacher/associate/associate';

const AssociateStudent = () => {
  const { id } = useParams();
  const [workshop, setWorkshop] = useState(null);
  const [emailInput, setEmailInput] = useState('');

  useEffect(() => {
    getWorkshop(id, setWorkshop);
  }, [id]);

  return (
    <div className='p-3 d-flex'>
      {workshop ? (
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
          <ListGroup className='text-center'>
            <input
              type='email'
              placeholder='Ingrese el correo electrónico'
              className='form-control'
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
            />
          </ListGroup>
          <Card.Body className='btnsection'>
            <Button
              className='cardbtn'
              variant='danger'
              onClick={() => disassociateStudent(emailInput, id, setWorkshop, setEmailInput)}
            >
              desasociar
            </Button>
            <Button
              className='cardbtn'
              variant='danger'
              onClick={() => associateStudent(emailInput, id, setWorkshop, setEmailInput)}
            >
              Asociar
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Spinner animation='border' variant='danger' style={{ display:'block', position:'fixed', top:'200px', left:'50%'}} />
      )}
    </div>
  );
};

export default AssociateStudent;
