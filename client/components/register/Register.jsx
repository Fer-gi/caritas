import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useAuth } from '../../context/authContext';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '../alert/Alert';

export function Register() {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate()
  const {signup} = useAuth()
  const [error, setError] = useState()

  const handleChange = ({target: {name, value}}) => 
    setUser({...user, [name]: value})


  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await signup(user.email, user.password)
      navigate('/')
      
    } catch (error) {
      console.log(error.code);
      if (error.code === "auth/weak-password"){
        setError('La contreseña debe tener al menos 6 caracteres');
      }
      if (error.code === "auth/email-already-in-use"){
        setError('El correo electrónico ya esta en uso');
      }
     
    }
    
  }

  return (
    <div>
      {error && <Alert message={error} />}
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Correo electrónico</Form.Label>
        <Form.Control type="email" placeholder="Correo electrónico" name='email' onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control type="password" placeholder="Contraseña" name='password' onChange={handleChange} />
      </Form.Group>
      
      <p>¿Ya tienes una cuenta? <Link to='/login'>Login</Link></p>
      <Button variant="primary" type="submit">
        Registrarme
      </Button>
    </Form>
    </div>
  );
}

export default Register