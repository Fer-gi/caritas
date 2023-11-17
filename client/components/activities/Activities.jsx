import { useState, useEffect } from 'react';
import { ref, onValue, remove, getDatabase, set, push } from 'firebase/database';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase/firebase';
import { BsTrash, BsPencil } from 'react-icons/bs';
import { FaPlus } from 'react-icons/fa';
import { Card, Accordion, Button, Modal, Form } from 'react-bootstrap';
import { useAuth } from '../../context/authContext';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentActivityId, setCurrentActivityId] = useState('');
  const { user } = useAuth(); 
  const navigate = useNavigate();

  const handleShowModal = (activityId) => {
    setCurrentActivityId(activityId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setCurrentActivityId('');
    setShowModal(false);
  };

  const handleInscribeClick = (activityId) => {
    handleShowModal(activityId);
  };
const handleInscriptionSubmit = () => {
  const applicationData = {
    studentName: name,
    gmail: email,
  };

  const database = getDatabase();
  const activitiesRef = ref(database, `activities/${currentActivityId}/students`);

  const userId = user ? user.uid : '';

  if (userId) {
    const newStudentRef = push(activitiesRef);
    
    set(newStudentRef, {
      studentName: name,
      gmail: email,
    });

    toast('Inscription submitted successfully', {
      type: 'success',
      autoClose: 2000,
    });

    handleCloseModal();
  } else {
    toast('Error: User not authenticated', {
      type: 'error',
      autoClose: 2000,
    });
  }
};

// ... (rest of the code remains the same)

  const onDeleteActivities = async (id) => {
    if (window.confirm('Are you sure you want to delete this activity?')) {
      try {
        const database = getDatabase();
        const activitiesRealtimeRef = ref(database, `activities/${id}`);
        await remove(activitiesRealtimeRef);

        toast('Activity deleted successfully', {
          type: 'error',
          autoClose: 2000,
        });
        handleCloseModal();
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

  return (
    <div className='p-3 d-flex'>
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
          <Card.Body className='btnsection'>
            <Button
              className='cardbtn'
              variant='danger'
              onClick={() => handleInscribeClick(activity.id)}
            >
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
        <Button variant='danger' onClick={() => navigate('/addactivities')}>
          <FaPlus />
        </Button>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Inscripción</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3' controlId='formName'>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type='text'
                placeholder='Ingresa tu nombre'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formEmail'>
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type='email'
                placeholder='Ingresa tu correo electrónico'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant='primary' onClick={handleInscriptionSubmit}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Activities;
