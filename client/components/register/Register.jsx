import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useAuth } from '../../context/authContext';
import { Link, useNavigate } from 'react-router-dom';
import { getDatabase, ref, set } from 'firebase/database';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Register.css"
const burgundyColor = '#CD222D';

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
      const { user: authUser } = await signup(user.email, user.password);

      const db = getDatabase();
      await set(ref(db, `users/${authUser.uid}`), {
        email: user.email,
        username: user.username,
        number: user.number,
        type: user.type,
      });

      // Display success message using react-toastify
      toast.success('Registro exitoso. ¡Bienvenido!', {
        autoClose: 2000,
        onClose: () => navigate('/login'), // Redirect to login page after the toast is closed
      });
    } catch (error) {
      console.log(error.code);
      if (error.code === 'auth/weak-password') {
        setError('La contraseña debe tener al menos 6 caracteres');
      }
      if (error.code === 'auth/email-already-in-use') {
        setError('El correo electrónico ya está en uso');
      }
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center register-form" style={{ height: '100%' }}>
      <div style={{ width: '19rem' }}>
      {error && <Alert variant="danger">{error}</Alert>}
        <Form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: burgundyColor,
            padding: '1.5rem',
            borderRadius: '10px',
            color: 'white',
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
            <Form.Label>Teléfono</Form.Label>
            <Form.Control type="text" placeholder="Número" name="number" onChange={handleChange} />
          </Form.Group>

          <p>
            ¿Ya tienes una cuenta? <Link to="/login">Iniciar Sesión</Link>
          </p>
          <div className='container-register'>
          <Button variant="light" type="submit" className='button-register'>
            Registrarme
          </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;
