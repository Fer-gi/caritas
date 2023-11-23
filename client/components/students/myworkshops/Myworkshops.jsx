import { useEffect, useState } from 'react';
import { ref, get } from 'firebase/database';
import { auth, db } from '../../../../server/firebase/firebase';
import { Card, Accordion, ListGroup } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { MdOutlineChat } from 'react-icons/md';
const Myworkshops = () => {
  const [myWorkshops, setMyWorkshops] = useState([]);
  const { teacherId, studentId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchMyWorkshops = async () => {
      try {
        const currentUser = auth.currentUser;
        const userId = currentUser.uid;
        const userWorkshopsRef = ref(db, `users/${userId}/workshops`);
        const userWorkshopsSnapshot = await get(userWorkshopsRef);

        if (userWorkshopsSnapshot.exists()) {
          const workshopsData = userWorkshopsSnapshot.val();
          const workshopsArray = [];

          for (const workshopId in workshopsData) {
            if (workshopsData.hasOwnProperty(workshopId)) {
              const workshop = workshopsData[workshopId];

              const teacherId = Object.keys(workshop.teacherId)[0]

              const tallerConTeacherId = {
                ...workshop,
                id: workshopId,
                teacherId: teacherId,
              };

              workshopsArray.push(tallerConTeacherId);
            }
          }

          setMyWorkshops(workshopsArray);
        } else {
          setMyWorkshops([]);
        }
      } catch (error) {
        console.error('Error al obtener talleres del usuario:', error);
      }
    };
    fetchMyWorkshops();
  }, [teacherId, studentId]);
  return (
    <div className='p-3 d-flex flex-wrap'> {/* Agregué la clase 'p-3 d-flex flex-wrap' para que coincida con el estilo del otro componente */}
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
              iniciar chat
            </button>
          </ListGroup>
        </Card>
      ))}
    </div>
  );
};
export default Myworkshops;