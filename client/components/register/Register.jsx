import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/esm/Form';
import { useState } from 'react';
import { useAuth } from '../../context/authContext';
import { Link, useNavigate } from 'react-router-dom';
import { getDatabase, ref, set } from 'firebase/database';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Alert from '../alert/Alert';
import { getAuth, updateProfile } from "firebase/auth";
import "./Register.css"


export function Register() {
  const [user, setUser] = useState({
  email: '',
  password: '',
  username: '',
  number: '',
  type: 'student'
  });
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [error, setError] = useState();
  
  
  const handleChange = ({ target: { name, value } }) =>
  setUser({ ...user, [name]: value });
  
  
  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  try {
  // Call the signup function with email and password
  await signup(user.email, user.password);
  
  // Access the currently authenticated user
  const auth = getAuth();
  const authUser = auth.currentUser;
  
  // Update the user profile
  await updateProfile(authUser, {
  displayName: user.username,
  });
  
  // Access the database and set user data
  const db = getDatabase();
  await set(ref(db, `users/${authUser.uid}`), {
  email: user.email,
  username: user.username,
  number: user.number,
  type: user.type,
  });
  
  // Show success message and navigate
  toast.success('Registro exitoso. ¡Bienvenido!', {
  autoClose: 2000,
  onClose: () => navigate('/login'),
  });
  } catch (error) {
  console.error(error.code);
  if (error.code === 'auth/weak-password') {
  setError('La contraseña debe tener al menos 6 caracteres');
  } else if (error.code === 'auth/email-already-in-use') {
  setError('El correo electrónico ya está en uso');
  } else {
  setError('Error desconocido. Por favor, inténtelo de nuevo.');
  }
  }
  };
  return (
    <div className="d-flex justify-content-center" style={{ height: '70vh' }}>
      <div style={{ width: '19rem' }}>
      {error && <Alert variant="danger">{error}</Alert>}
        <Form className='registerForm'
          onSubmit={handleSubmit}
          style={{
            padding: '20px',
            borderRadius: '10px',
          }}
        >
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Nombre y Apellidos</Form.Label>
            <Form.Control type="text" placeholder="Nombre y Apellidos" name="username" onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control type="email" placeholder="Correo electrónico" name="email" onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" placeholder="Contraseña" name="password" onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicNumber">
            <Form.Label>Número de teléfono</Form.Label>
            <Form.Control type="text" placeholder="Número de teléfono" name="number" onChange={handleChange} />
          </Form.Group>
          <p>
            ¿Ya tienes una cuenta? <Link to="/login">Inicia Sesión</Link>
          </p>
          <Button variant="danger" type="submit">
            Registrarme
          </Button>
        </Form>
      </div>
    </div>
  );
}
export default Register;