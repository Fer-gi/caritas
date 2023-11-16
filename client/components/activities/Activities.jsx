import { useState, useEffect } from 'react';
import { ref, onValue, remove, getDatabase } from 'firebase/database';
import { Card, Accordion, ListGroup, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase/firebase';
import { BsTrash, BsPencil } from 'react-icons/bs';
import { FaPlus } from 'react-icons/fa';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  const onDeleteActivities = async (id) => {
    if (window.confirm("Are you sure you want to delete this activity?")) {
      try {
        const database = getDatabase();
        const activitiesRealtimeRef = ref(database, `activities/${id}`);
        await remove(activitiesRealtimeRef);

        toast('Activity deleted successfully', {
          type: 'error',
          autoClose: 2000,
        });
      } catch (error) {
        console.error('Error deleting activity:', error);
      }
    }
  };

  const getActivities = () => {
    const activitiesRealtimeRef = ref(db, 'activities');

    onValue(activitiesRealtimeRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const activitiesArray = Object.keys(data).map((key) => ({
          ...data[key],
          id: key,
        }));
        setActivities(activitiesArray);
      } else {
        setActivities([]);
      }
    });
  };

  useEffect(() => {
    getActivities();
  }, []);

  const handleButtonClick = () => {
    navigate('/addactivities');
  };

  return (
    <div>
      {activities.map((activity) => (
        <Card key={activity.id} style={{ width: '18rem' }}>
          <section className='dateimg'>{activity.date}</section>
          <Card.Img variant='top' src={activity.img} />

          <Card.Body>
            <Card.Title>{activity.courseName}</Card.Title>
            <Accordion defaultActiveKey='0'>
              <Accordion.Item eventKey='1'>
                <Accordion.Header>Saber más</Accordion.Header>
                <Accordion.Body>
                  {activity.description} <a href='#'>Más información</a>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Card.Body>

          <ListGroup className='list-group-flush'>
            <ListGroup.Item>{activity.type}</ListGroup.Item>
            <ListGroup.Item>{activity.workshopType}</ListGroup.Item>
            <ListGroup.Item>{activity.time}</ListGroup.Item>
          </ListGroup>

          <Card.Body className='btnsection'>
            <Button className='cardbtn' variant='danger' onClick={() => onDeleteActivities(activity.id)}>
              Inscribirme
            </Button>
          </Card.Body>
          <div className='d-flex justify-content-between mt-3'>
            <div>
              <BsTrash className='text-black mr-2' onClick={() => onDeleteActivities(activity.id)} />
            </div>
            <div>
              <BsPencil className='text-black' onClick={() => navigate(`/addactivities/${activity.id}`)} />
            </div>
          </div>
        </Card>
      ))}
      <div style={{ position: 'fixed', bottom: '10vh', right: '20px' }}>
        <Button variant='danger' onClick={handleButtonClick}>
          <FaPlus />
        </Button>
      </div>
    </div>
  );
};

export default Activities;
