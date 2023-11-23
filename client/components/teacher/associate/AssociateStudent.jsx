/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button, ListGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AssociateStudentController from '../../../../server/controllers/teacher/associate/associate';

const AssociateStudent = () => {
  const { id } = useParams();
  const [workshop, setWorkshop] = useState(null);
  const [emailInput, setEmailInput] = useState('');

  useEffect(() => {
    AssociateStudentController.getWorkshop(id, setWorkshop);
  }, [id]);

  const associateStudent = async () => {
    try {
      if (!emailInput) {
        return;
      }

      const studentId = await AssociateStudentController.findStudentIdByEmail(emailInput);

      if (!studentId) {
        return;
      }
      if (workshop) {
        await AssociateStudentController.associateStudent(workshop, studentId);

        setEmailInput('');

        toast.success('Estudiante asociado correctamente', {
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error('Error al asociar estudiante:', error);
    }
  };

  const disassociateStudent = async () => {
    try {
      if (!emailInput) {
        return;
      }

      const studentId = await AssociateStudentController.findStudentIdByEmail(emailInput);

      if (!studentId) {
        return;
      }

      if (workshop) {
        await AssociateStudentController.disassociateStudent(workshop, studentId);

        setEmailInput('');

        toast.success('Estudiante desasociado correctamente', {
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error('Error al desasociar estudiante:', error);
    }
  };

  return (
    <div className='p-3 d-flex'>
      {workshop ? (
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
          <ListGroup className='text-center'>
            <input
              type="email"
              placeholder="Ingrese el correo electrónico"
              className="form-control"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
            />
          </ListGroup>
          <Card.Body className='btnsection'>
            <Button
              className='cardbtn'
              variant='danger'
              onClick={disassociateStudent}
            >
              Desasociar
            </Button>
            <Button
              className='cardbtn'
              variant='danger'
              onClick={associateStudent}
            >
              Asociar
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AssociateStudent;
