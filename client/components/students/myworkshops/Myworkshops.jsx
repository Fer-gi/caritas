import { useEffect, useState } from 'react';
import { Card, Accordion, ListGroup } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import './Myworkshop.css'
import MyWorkshopsController from '../../../../server/controllers/student/myworkshop/Myworkshop';


const MyWorkshops = () => {
  const [myWorkshops, setMyWorkshops] = useState([]);
  const { teacherId, studentId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    MyWorkshopsController.fetchMyWorkshops(setMyWorkshops);
  }, [teacherId, studentId]);

  return (
    <div className='p-3 d-flex flex-wrap'>
      <h2>Mis Talleres</h2>
      {myWorkshops.map((workshop) => (
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
            <button
              className="btnchat"
              onClick={() => MyWorkshopsController.handleChatButtonClick(workshop, navigate)}
            >
              Iniciar Chat
            </button>
          </ListGroup>
        </Card>
      ))}
    </div>
  );
};

export default MyWorkshops;
