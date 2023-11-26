import { Card, ListGroup } from 'react-bootstrap';
import { useNavigate} from 'react-router-dom';
import "./Myworkshop.css"
import { useMyWorkshops } from '../../../../server/firebase/controllers/student/myworkshops/myworkshops';

const Myworkshops = () => {
  const myWorkshops = useMyWorkshops();
  const navigate = useNavigate();

  return (
    <div >
      <h2 className='myWorkShopsTitle'>Mis Talleres</h2>
      <div className='p-3 d-flex flex-wrap'>
        {myWorkshops.map((workshop) => (
          <Card key={workshop.id} style={{ width: '18rem', margin: '10px' }}>
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
              <button
                className="btnchat"
                onClick={() => {
                  if (workshop.teacherId) {
                    console.log("TeacherId:", workshop.teacherId);
                    navigate(`chat/${workshop.teacherId}`);
                  } else {
                    console.error("TeacherId no está definido en este taller:", workshop);
                  }
                }}
              >
                CHAT
              </button>
            </ListGroup>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Myworkshops;
