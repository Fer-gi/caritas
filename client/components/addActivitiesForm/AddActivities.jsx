// addActivities.jsx
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { doc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';  // Updated imports
import { db, storage } from '../../firebase/firebase';
import { useNavigate, useParams } from 'react-router-dom';


const initialStateValues = {
  img: '',
  courseName: '',
  description: '',
  date: '',
};

const AddActivities = (props) => {
  const { id } = useParams();
  const [values, setValues] = useState(initialStateValues);
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      setEditing(true);
      const getActivity = async () => {
        const activitiesRef = doc(db, 'activities', id);
        const docSnap = await getDoc(activitiesRef);
        if (docSnap.exists()) {
          setValues({ ...docSnap.data(), id });
        }
      };
      getActivity();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imgUrl = values.img; 
      if (values.img instanceof File) {
        const fileRef = ref(storage, `images/${values.img.name}`); 
        await uploadBytes(fileRef, values.img);
        imgUrl = await getDownloadURL(fileRef);
      }

      const activitiesObject = { ...values, img: imgUrl };
      props.addOrEditActivities(activitiesObject, editing);
      setValues({ ...initialStateValues });
      navigate('/activities');
    } catch (error) {
      console.error('Error handling file upload:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    // Handle file input separately
    if (type === 'file') {
      setValues({ ...values, [name]: e.target.files[0] });
    } else {
      setValues({ ...values, [name]: value });
    }
  };

  const burgundyColor = '#800020';

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
      <Form style={{ width: '300px', padding: '20px', backgroundColor: burgundyColor, borderRadius: '10px', color: 'white' }} onSubmit={handleSubmit}>
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
          <Form.Control type="date" name="date" value={values.date} onChange={handleInputChange} />
        </Form.Group>
        <Button variant="light" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddActivities;
