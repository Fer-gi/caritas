import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ref as dbRef, update, push, set, onValue} from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../../server/firebase/firebase';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialStateValues = {
  img: '',
  courseName: '',
  description: '',
  date: '',
  type: '',
  workshopType: '',
  time: '',
  orientation: '',
};

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const imgUrl = image ? await handleImageUpload(image) : null;
      const workshopsObject = { ...values, img: imgUrl };

      if (editing) {
        await update(dbRef(db, `workshops/${id}`), workshopsObject);
        toast.success('Actividad actualizada correctamente', { autoClose: 2000 });
      } else {
        const newWorkshopRef = push(dbRef(db, 'workshops'));
        await set(newWorkshopRef, workshopsObject);
        toast.success('Actividad creada correctamente', { autoClose: 2000 });
      }

      setValues({ ...initialStateValues });
      setImage(null);
      navigate('/workshops');
    } catch (error) {
      console.error('Error al manejar el envío del formulario:', error);
      toast.error('Error al procesar la solicitud. Por favor, inténtalo de nuevo.', { autoClose: 2000 });
    }
  };

  const handleImageUpload = async (file) => {
    const storageReference = storageRef(storage, `images/${file.name}`);
  
    await uploadBytes(storageReference, file);
  
    const imgUrl = await getDownloadURL(storageReference);
  
    return imgUrl;
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });

    if (name === 'img') {
      const file = e.target.files[0];
      setImage(file);
    }
  };

  const handleTipoChange = (selectedTipo) => {
    console.log('Selected Tipo:', selectedTipo);
    setValues({ ...values, type: selectedTipo });
  };
  
  const handleWorkshopTypeChange = (selectedWorkshopType) => {
    console.log('Selected WorkshopType:', selectedWorkshopType);
    setValues({ ...values, workshopType: selectedWorkshopType });
  };
  
  const handleOrientationChange = (selectedOrientation) => {
    console.log('Selected Orientation:', selectedOrientation);
    setValues({ ...values, orientation: selectedOrientation });
  };
  
  const burgundyColor = '#800020';

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '60vh', color: 'white' }}>
<Form style={{ width: '400px', padding: '15px', borderRadius: '5px', overflowY: 'hidden', maxHeight: '150vh', backgroundColor: burgundyColor }} onSubmit={handleSubmit}>
<Form.Group className="mb-3">
<Form.Label >Imagen</Form.Label>
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
        <Button variant="light" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddWorkshops;
