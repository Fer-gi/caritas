import { useState, useEffect } from 'react';
import { ref, onValue, remove, getDatabase} from 'firebase/database';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { BsTrash, BsPencil } from 'react-icons/bs';
import { FaPlus } from 'react-icons/fa';
import { Card, Button, ListGroup } from 'react-bootstrap';
import { db } from '../../../../server/firebase/firebase';

const Workshops = () => {
  const [workshops, setWorkshops] = useState([]);
  const [currentWorkshopId, setCurrentWorkshopId] = useState('');
  const navigate = useNavigate();

  const handleShowModal = (workshopId) => {
    setCurrentWorkshopId(workshopId);
  };

  const handleCloseModal = () => {
    setCurrentWorkshopId('');
  };

 

  const onDeleteWorkshops = async (id) => {
    if (window.confirm('¿Quieres eliminar este taller?')) {
      try {
        const database = getDatabase();
        const workshopsRealtimeRef = ref(database, `workshops/${id}`);
        await remove(workshopsRealtimeRef);

        toast('Workshop deleted successfully', {
          type: 'error',
          autoClose: 2000,
        });
        handleCloseModal();
      } catch (error) {
        console.error('Error deleting workshop:', error);
      }
    }
  };

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
          </Card.Body>
           <ListGroup className='list-group-flush'>
            <ListGroup.Item>{workshop.type}</ListGroup.Item>
            <ListGroup.Item>{workshop.workshopType}</ListGroup.Item>
            <ListGroup.Item>{workshop.time}</ListGroup.Item>
            <ListGroup.Item>{workshop.orientation}</ListGroup.Item>
          </ListGroup>
          <Card.Body className='btnsection'>
          </Card.Body>
          <div className='d-flex justify-content-center mt-3'>
            <div>
              <BsTrash className='button-edit-delete' style={{ width: '1.5rem', margin:"1rem" }} onClick={() => onDeleteWorkshops(workshop.id)} />
            </div>
            <div>
              <BsPencil className='button-edit-delete'style={{ width: '1.5rem',margin: "1rem" }} onClick={() => navigate(`/addworkshops/${workshop.id}`)} />
            </div>
          </div>
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

export default Workshops;
