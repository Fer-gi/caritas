import  { useEffect, useState } from 'react';
import { ref, get } from 'firebase/database';
import { auth, db } from '../../../server/firebase/firebase';
import { Card, ListGroup, Button,Accordion } from 'react-bootstrap';
import { BsTrash, BsPencil } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const AssociatedWorkshops = () => {
  const [associatedWorkshops, setAssociatedWorkshops] = useState([]);
  const currentPath = window.location.pathname;

  useEffect(() => {
    const fetchAssociatedWorkshops = async () => {
      try {
        const currentUser = auth.currentUser;
        const userId = currentUser.uid;
        const userWorkshopsRef = ref(db, `users/${userId}/workshops`);
        const userWorkshopsSnapshot = await get(userWorkshopsRef);

        if (userWorkshopsSnapshot.exists()) {
          const associatedWorkshopIds = Object.keys(userWorkshopsSnapshot.val());
          const workshopsPromises = associatedWorkshopIds.map(async (workshopId) => {
            const workshopRef = ref(db, `workshops/${workshopId}`);
            const workshopSnapshot = await get(workshopRef);
            return workshopSnapshot.val();
          });

          const workshops = await Promise.all(workshopsPromises);

          // Filtrar talleres según la orientación
          const filteredWorkshops = workshops.filter((workshop) => {
            if (currentPath.includes("orientacionlaboral")) {
              return workshop.orientation === "Laboral";
            } else if (currentPath.includes("orientacionvocacional")) {
              return workshop.orientation === "Vocacional";
            }
            return true; // Si la orientación no está especificada, mostrar todos los talleres
          });

          setAssociatedWorkshops(filteredWorkshops);
        } else {
          setAssociatedWorkshops([]);
        }
      } catch (error) {
        console.error('Error al obtener talleres asociados:', error);
      }
    };

    fetchAssociatedWorkshops();
  }, [currentPath]); 

  const handleInscribeClick = (workshopId) => {
    // Lógica para la inscripción al taller
    console.log('Inscribirse al taller con ID:', workshopId);
  };





  return (
    <div className='p-3 d-flex flex-wrap'>
      {associatedWorkshops.map((workshop) => (
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

export default AssociatedWorkshops;