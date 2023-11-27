import adminpc from '../../../assets/img/adminpc.gif'
import { getDatabase, ref, onValue, } from 'firebase/database'; // Cambiado de 'firebase/storage'
import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/authContext';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AdminHomeController from '../../../../server/firebase/controllers/admin/adminhome/AdminHome';
import "./AdminHome.css"
import Spinner from 'react-bootstrap/Spinner';


function AdminHome() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [username, setUsername] = useState(null);

  useEffect(() => {
    AdminHomeController.fetchUsername(user, setUsername); 
  }, [user]);

  if (loading) return <Spinner animation="border" variant="danger" style={{ display:'block', position:'fixed', top:'200px', left:'50%'}} />;
  return (
    <div className='container menu' >
      <h4 className= "Titles">Bienvenid@ {username || user?.displayName || 'Usuario'}</h4>
        <img src={adminpc} alt="Avatar" className='avatar' />
        <div className="d-grid gap-2 btnsVL">
        <Button variant="danger" size="lg" className='btn_menuAdmin'onClick={() => navigate('news')}>
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