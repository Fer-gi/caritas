// AddWorkshops.js
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';
import { ref as dbRef, onValue } from 'firebase/database';
import { db } from '../../../../server/firebase/firebase';
import { handleSubmit, initialStateValues } from '../../../../server/controllers/admin/addworkshops/AddWorkshops';


const AddWorkshops = () => {
  const { id } = useParams();
  const [values, setValues] = useState(initialStateValues);
  const [image, setImage] = useState(null);
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setEditing(true);
      const getWorkshop = async () => {
        const workshopsRef = dbRef(db, `workshops/${id}`);
        onValue(workshopsRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setValues({ ...data, id });
          }
        });
      };
      getWorkshop();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });

    if (name === 'img') {
      const file = e.target.files[0];
      setImage(file);
    }
  };

  const handleTipoChange = (selectedTipo) => {
    setValues({ ...values, type: selectedTipo });
  };

  const handleWorkshopTypeChange = (selectedWorkshopType) => {
    setValues({ ...values, workshopType: selectedWorkshopType });
  };

  const handleOrientationChange = (selectedOrientation) => {
    setValues({ ...values, orientation: selectedOrientation });
  };

  const burgundyColor = '#CD222D';

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '60vh', color: 'white' }}>
      <Form style={{ width: '400px', padding: '15px', borderRadius: '5px', overflowY: 'hidden', maxHeight: '150vh', backgroundColor: burgundyColor }} onSubmit={(e) => handleSubmit(e, values, image, id, setValues, setImage, setEditing, navigate)}>
        <Form.Group className="mb-3">
          <Form.Label>Imagen</Form.Label>
          <Form.Control type="file" name="img" onChange={handleInputChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Nombre del curso</Form.Label>
          <Form.Control type="text" name="courseName" value={values.courseName} onChange={handleInputChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Descripción del curso</Form.Label>
          <Form.Control as="textarea" rows={3} name="description" value={values.description} onChange={handleInputChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Fecha del curso</Form.Label>
          <Form.Control name="date" value={values.date} onChange={handleInputChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Orientación</Form.Label>
          <Form.Select name="orientation" value={values.orientation} onChange={(e) => handleOrientationChange(e.target.value)} required>
            <option value="" disabled>Seleccionar orientación</option>
            <option value="Laboral">Orientación Laboral</option>
            <option value="Vocacional">Orientación Vocacional</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Tipo</Form.Label>
          <Form.Select name="type" value={values.type} onChange={(e) => handleTipoChange(e.target.value)} required>
            <option value="" disabled>Seleccionar tipo</option>
            <option value="Presencial">Presencial</option>
            <option value="Online">Online</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Tipo de taller</Form.Label>
          <Form.Select name="workshopType" value={values.workshopType} onChange={(e) => handleWorkshopTypeChange(e.target.value)} required>
            <option value="" disabled>Seleccionar tipo de taller</option>
            <option value="Obligatorio">Obligatorio</option>
            <option value="Opcional">Opcional</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Hora</Form.Label>
          <Form.Control type="text" name="time" value={values.time} onChange={handleInputChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Correo del Profesor</Form.Label>
          <Form.Control type="email" name="teacherEmail" value={values.teacherEmail} onChange={handleInputChange} />
        </Form.Group>
        <Button variant="light" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddWorkshops;
