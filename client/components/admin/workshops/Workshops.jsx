import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import 'react-toastify/dist/ReactToastify.css';
import { BsTrash, BsPencil } from 'react-icons/bs';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { deleteWorkshop, fetchWorkshops } from '../../../../server/controllers/admin/workshops/workshops';

const Workshops = () => {
  const [workshops, setWorkshops] = useState([]);
  const [currentWorkshopId, setCurrentWorkshopId] = useState('');
  const navigate = useNavigate();

  const handleCloseModal = () => {
    setCurrentWorkshopId('');
  };

  const onDeleteWorkshops = async (id) => {
    deleteWorkshop(id, setWorkshops, handleCloseModal);
  };

  useEffect(() => {
    fetchWorkshops(setWorkshops);
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
              <BsTrash className='button-edit-delete' style={{ width: '1.5rem', margin: '1rem' }} onClick={() => onDeleteWorkshops(workshop.id)} />
            </div>
            <div>
              <BsPencil className='button-edit-delete' style={{ width: '1.5rem', margin: '1rem' }} onClick={() => navigate(`/addworkshops/${workshop.id}`)} />
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
