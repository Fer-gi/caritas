import admin from '../../../assets/img/admin.gif';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/authContext';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AdminHomeController from '../../../../server/controllers/admin/adminHome/adminHome';
import './AdminHome.css'; // Se agrega el archivo de estilos

function AdminHome() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [username, setUsername] = useState(null);

  useEffect(() => {
    AdminHomeController.fetchUsername(user, setUsername); // Se utiliza el controlador
  }, [user]);

  if (loading) return <h1>Loading</h1>;
  return (
    <div className='container menu' >
      <h4 className="Titles">Bienvenid@ {username || user?.displayName || 'Usuario'}</h4>
      <img src={admin} alt="Avatar" className='avatar' />
      <div className="d-grid gap-2 btnsVL">
        <Button variant="danger" size="lg" className='btn_menuAdmin' onClick={() => navigate('news')}>
          Noticias
        </Button>
        <Button variant="danger" size="lg" className='btn_menuAdmin' onClick={() => navigate('workshops')}>
          Talleres
        </Button>
        <Button variant="danger" size="lg" className='btn_menuAdmin' onClick={() => navigate('students')}>
          Alumnos
        </Button>
        <Button variant="danger" size="lg" type="submit" className='btn_menuAdmin' onClick={() => navigate('teachers')}>
          Profesores
        </Button>
      </div>
    </div>
  );
}

export default AdminHome;
