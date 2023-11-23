import { useEffect, useState } from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StudentInscriptionController from '../../../../server/controllers/student/inscription/inscription';
import "./StudentsInscription.css"

const StudentInscription = () => {
  const [associatedWorkshops, setAssociatedWorkshops] = useState([]);
  const navigate = useNavigate();
  const currentPath = window.location.pathname;

  useEffect(() => {
    StudentInscriptionController.fetchAssociatedWorkshops(currentPath, setAssociatedWorkshops);
  }, [currentPath]);

  const handleInscribeClick = async (workshopId) => {
    try {
      await StudentInscriptionController.handleInscribeClick(workshopId);

      // Show success message
      toast.success('Inscripción exitosa', {
        autoClose: 2000,
      });
    } catch (error) {
      console.error('Error al inscribirse al taller:', error);
      // Handle the error, e.g., show an error message to the user.
    }
  };

  return (
    <div className='p-3 d-flex flex-wrap'>
      <div className='btnMyWorkshopsContainer'>
        <button className='btnMyWorkshops' onClick={() => navigate(`myworkshops`)}>
          Mis talleres
        </button>
      </div>
      {associatedWorkshops.map((workshop) => (
        <Card key={workshop.id} style={{ width: '18rem', margin: '10px', marginTop:"3rem" }}>
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
              className='cardbtn'
              variant='danger'
              onClick={() => handleInscribeClick(workshop.id)}
            >
              Inscribirme
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default StudentInscription;
