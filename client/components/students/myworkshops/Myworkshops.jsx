import { useEffect, useState } from 'react';
import { ref, get } from 'firebase/database';
import { auth, db } from '../../../../server/firebase/firebase';
import { Card, Accordion, ListGroup } from 'react-bootstrap';

const Myworkshops = () => {
  const [myWorkshops, setMyWorkshops] = useState([]);

  useEffect(() => {
    const fetchMyWorkshops = async () => {
      try {
        const currentUser = auth.currentUser;
        const userId = currentUser.uid;
        const userWorkshopsRef = ref(db, `users/${userId}/workshops`);
        const userWorkshopsSnapshot = await get(userWorkshopsRef);

        if (userWorkshopsSnapshot.exists()) {
          const workshopsData = userWorkshopsSnapshot.val();
          const workshopsArray = Object.keys(workshopsData).map((workshopId) => ({
            ...workshopsData[workshopId],
            id: workshopId,
          }));

          // Filtrar solo los talleres en los que el usuario está inscrito
          const myWorkshopsArray = workshopsArray.filter((workshop) => workshop.inscription === true);

          setMyWorkshops(myWorkshopsArray);
        } else {
          setMyWorkshops([]);
        }
      } catch (error) {
        console.error('Error al obtener talleres del usuario:', error);
      }
    };

    fetchMyWorkshops();
  }, []);

  if (myWorkshops.length === 0) {
    return null; // No hay inscripciones, no renderizar nada
  }

  return (
    <div className='p-3 d-flex flex-wrap'>
      <h2>My Workshops</h2>
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
          </ListGroup>
        </Card>
      ))}
    </div>
  );
};

export default Myworkshops;
