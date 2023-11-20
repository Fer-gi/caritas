// En tu archivo StudentWorkshops.js
import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { Card, Accordion, Button, ListGroup } from 'react-bootstrap';
import { db } from '../../../../server/firebase/firebase';

const StudentWorkshops = () => {
  const [workshops, setWorkshops] = useState([]);
  const navigate = useNavigate();

  const getWorkshops = () => {
    const workshopsRealtimeRef = ref(db, 'workshops');

    onValue(workshopsRealtimeRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const workshopsArray = Object.keys(data).map((key) => ({
          ...data[key],
          id: key,
        }));
        setWorkshops(workshopsArray);
      } else {
        setWorkshops([]);
      }
    });
  };

  useEffect(() => {
    getWorkshops();
  }, []);

  return (
    <div className='p-3 d-flex'>
      {workshops.map((workshop) => (
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
          <Card.Body className='btnsection'>
            <Button
              className='cardbtn mx-auto mt-3'
              variant='danger'
              onClick={() => navigate(`${workshop.id}`)}>
              Asociar
            </Button>
          </Card.Body>
        </Card>
      ))}
      <div style={{ position: 'fixed', bottom: '10vh', right: '20px' }}></div>
    </div>
  );
};

export default StudentWorkshops;
