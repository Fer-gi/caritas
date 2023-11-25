// Workshops.js

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { BsTrash, BsPencil } from 'react-icons/bs';
import { FaPlus } from 'react-icons/fa';
import { Card, Button, ListGroup } from 'react-bootstrap';
import { getWorkshopsData, deleteWorkshop } from '../../../../server/firebase/controllers/admin/workshops/workshops';

const Workshops = () => {
  const [workshops, setWorkshops] = useState([]);
  const [currentWorkshopId, setCurrentWorkshopId] = useState('');
  const navigate = useNavigate();

  const handleCloseModal = () => {
    setCurrentWorkshopId('');
  };

  const onDeleteWorkshop = async (id) => {
    if (window.confirm('¿Quieres eliminar este taller?')) {
      try {
        const deleted = await deleteWorkshop(id);
        if (deleted) {
          toast('Workshop deleted successfully', {
            type: 'error',
            autoClose: 2000,
          });
          handleCloseModal();
        } else {
          // Handle deletion failure
        }
      } catch (error) {
        console.error('Error deleting workshop:', error);
      }
    }
  };

  useEffect(() => {
    getWorkshopsData(setWorkshops);
  }, []);

  return (
    <div className='p-3 d-flex flex-wrap'>
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
              <BsTrash className='button-edit-delete' style={{ width: '1.5rem', margin: '1rem' }} onClick={() => onDeleteWorkshop(workshop.id)} />
            </div>
            <div>
              <BsPencil className='button-edit-delete' style={{ width: '1.5rem', margin: '1rem' }} onClick={() => navigate(`addworkshops/${workshop.id}`)} />
            </div>
          </div>
        </Card>
      ))}
      <div style={{ position: 'fixed', bottom: '10vh', right: '20px' }}>
        <Button variant='danger' onClick={() => navigate('addworkshops')}>
          <FaPlus />
        </Button>
      </div>
    </div>
  );
};

export default Workshops;
