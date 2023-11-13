// AddActivities.js
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const initialStateValues = {
  img: '',
  name: '',
  description: '',
  date: '',
};

const AddActivities = (props) => {
  const [values, setValues] = React.useState(initialStateValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addOrEditActivities(values);
    setValues({ ...initialStateValues });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  

  const burgundyColor = '#800020'; 

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
      <Form style={{ width: '300px', padding: '20px', backgroundColor: burgundyColor, borderRadius: '10px', color: 'white' }} onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Imagen</Form.Label>
          <Form.Control type="file" name="img" value={values.img} onChange={handleInputChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Nombre del curso</Form.Label>
          <Form.Control type="text" name="name" value={values.name} onChange={handleInputChange} />
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
