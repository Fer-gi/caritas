import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useAuth } from '../../context/authContext';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '../alert/Alert';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleLogin } from './LoginLogic';

export function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const { login, loginWithGoogle, resetPassword } = useAuth();
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) =>
    setUser({ ...user, [name]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await handleLogin(user, login, navigate);
      
      toast.success('Inicio de sesión exitoso. ¡Bienvenido de nuevo!', {
        autoClose: 2000,
      });
    } catch (error) {
      console.log(error.code);
      if (error.code === 'auth/too-many-requests') {
        setError('Contraseña incorrecta');
      }
      if (error.code === 'auth/invalid-login-credentials') {
        setError('Correo no registrado');
      }
      if (error.code === 'auth/invalid-email') {
        setError('Correo inválido');
      }
    }
  };

  const handleGoogleSignin = async () => {
    try {
      await loginWithGoogle();
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleResetPassword = async () => {
    if (!user.email) return setError('Por favor ingresa tu correo electrónico');
    try {
      await resetPassword(user.email);
      setError('Se ha enviado un mensaje a tu correo electrónico para cambiar la contraseña');
    } catch (error) {
      setError(error.message);
    }
  };

  const burgundyColor = '#CD222D';
  return (
    <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
      <div style={{ width: '300px' }}>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit} style={{ backgroundColor: burgundyColor, padding: '20px', borderRadius: '10px', color: 'white' }}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control type="email" placeholder="Correo electrónico" name="email" onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" placeholder="Contraseña" name="password" onChange={handleChange} />
          </Form.Group>

          <div className="d-flex justify-content-between mb-3">
            <p>
              ¿No tienes una cuenta? <Link to="/register">Register</Link>
            </p>
            <a href="#!" onClick={handleResetPassword}>
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <Button variant="light" type="submit">
            Iniciar sesión
          </Button>
          <Button onClick={handleGoogleSignin} variant="light" type="button">
            Iniciar sesión con Google
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Login;
