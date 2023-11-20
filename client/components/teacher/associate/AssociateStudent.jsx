/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ref, onValue, set, get } from 'firebase/database';
import { Card, Accordion, Button, ListGroup } from 'react-bootstrap';
import { db } from '../../../../server/firebase/firebase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AssociateStudent = () => {
  const { id } = useParams();
  const [workshop, setWorkshop] = useState(null);
  const [emailInput, setEmailInput] = useState('');

  const getWorkshop = () => {
    const workshopRef = ref(db, `workshops/${id}`);

    onValue(workshopRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setWorkshop({
          ...data,
          id,
        });
      } else {
        setWorkshop(null);
      }
    });
  };
  const associateStudent = async () => {
    try {
      if (!emailInput) {
        return;
      }
  
      const studentId = await findStudentIdByEmail(emailInput);
  
      if (!studentId) {
        return;
      }
      if (workshop) {
        const workshopRef = ref(db, `users/${studentId}/workshops/${id}`);
        set(workshopRef, {
          date: workshop.date,
          img: workshop.img,
          courseName: workshop.courseName,
          description: workshop.description,
          type: workshop.type,
          workshopType: workshop.workshopType,
          time: workshop.time,
          orientation: workshop.orientation,
        });
  
        setEmailInput('');
  
        toast.success('Estudiante asociado correctamente', {
          autoClose: 2000, 
         
        });
      }
    } catch (error) {
      console.error('Error al asociar estudiante:', error);
    }
  };
  
  const findStudentIdByEmail = async (email) => {
    const usersRef = ref(db, 'users');
    const snapshot = await get(usersRef);
  
    for (const userKey in snapshot.val()) {
      if (Object.prototype.hasOwnProperty.call(snapshot.val(), userKey)) {
        const userData = snapshot.val()[userKey];
        if (userData.email === email) {
          return userKey; 
        }
      }
    }
  
    return null;
  };
  
  useEffect(() => {
    getWorkshop();
  }, [id]);

  return (
    <div className='p-3 d-flex'>
      {workshop ? (
        <Card key={workshop.id} style={{ width: '18rem' }}>
          <section className='dateimg'>{workshop.date}</section>
          <Card.Img variant='top' src={workshop.img} />

          <Card.Body>
            <Card.Title>{workshop.courseName}</Card.Title>
            <Accordion defaultActiveKey='0'>
              <Accordion.Item eventKey='1'>
                <Accordion.Header>Saber más</Accordion.Header>
                <Accordion.Body>
                  {workshop.description} <a href='#'>Más información</a>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Card.Body>
          <ListGroup className='list-group-flush'>
            <ListGroup.Item>{workshop.type}</ListGroup.Item>
            <ListGroup.Item>{workshop.workshopType}</ListGroup.Item>
            <ListGroup.Item>{workshop.time}</ListGroup.Item>
            <ListGroup.Item>{workshop.orientation}</ListGroup.Item>
          </ListGroup>
          <ListGroup className='text-center'>
            <input
              type="email"
              placeholder="Ingrese el correo electrónico"
              className="form-control"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
            />
          </ListGroup>
          <Card.Body className='btnsection'>
            <Button
              className='cardbtn'
              variant='danger'
              onClick={associateStudent}
            >
              Asociar
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <p>Loading...</p>
      )}
      <div style={{ position: 'fixed', bottom: '10vh', right: '20px' }}>
      </div>
    </div>
  );
};

export default AssociateStudent;
