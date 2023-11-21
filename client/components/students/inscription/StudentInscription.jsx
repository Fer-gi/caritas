import { useEffect, useState } from 'react';
import { ref, get, update } from 'firebase/database';
import { auth, db } from '../../../../server/firebase/firebase';
import { Card, Accordion, ListGroup, Button } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StudentInscription = () => {
  const [associatedWorkshops, setAssociatedWorkshops] = useState([]);
  const navigate = useNavigate();
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
            return { ...workshopSnapshot.val(), id: workshopId };
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

  const handleInscribeClick = async (workshopId) => {
    try {
      const currentUser = auth.currentUser;
      const userId = currentUser.uid;
  
      // Actualizar la lista de estudiantes en el taller y cambiar el estado de inscription a true
      const workshopRef = ref(db, `workshops/${workshopId}`);
      await update(workshopRef, {
        [`students/${userId}`]: {
          email: currentUser.email,
        },
        inscription: true, // Agregar esta línea para establecer el estado de inscripción a true
      });
  
      // Actualizar la lista de talleres en el usuario y cambiar el estado de inscription a true
      const userWorkshopsRef = ref(db, `users/${userId}/workshops`);
      await update(userWorkshopsRef, {
        [`${workshopId}/inscription`]: true,
      });
  
      // Mostrar mensaje de éxito con react-toastify
      toast.success('Inscripción exitosa', {
        autoClose: 2000,
      });
    } catch (error) {
      console.error('Error al inscribirse al taller:', error);
      // Puedes manejar el error de alguna manera, como mostrar un mensaje de error al usuario.
    }
  };
  

  return (
    <div className='p-3 d-flex flex-wrap'>
      {associatedWorkshops.map((workshop) => (
        <Card key={workshop.id} style={{ width: '18rem', margin: '10px' }}>
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
  <ListGroup.Item>Estado de inscripción: {workshop.inscription ? 'Inscrito' : 'No inscrito'}</ListGroup.Item>
</ListGroup>

          <Card.Body className='btnsection'>
            <Button
              className='cardbtn'
              variant='danger'
              onClick={() => handleInscribeClick(workshop.id)}
            >
              Inscribirse
            </Button>
          </Card.Body>
        </Card>
      ))}

      <div style={{ position: 'fixed', bottom: '10vh', right: '20px' }}>
      <Button variant='danger' onClick={() => navigate('/addworkshops')}>
          <FaPlus />
        </Button>
      </div>
    </div>
  );
};

export default StudentInscription;
