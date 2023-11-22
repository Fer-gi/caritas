import Button from 'react-bootstrap/Button';
import "./AdminHome.css";
import { useNavigate } from 'react-router-dom';
import admin from '../../../assets/img/admin.jpg'
import { getDatabase, ref, onValue } from 'firebase/database'; // Cambiado de 'firebase/storage'
import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/authContext';

function AdminHome() {
  const navigate = useNavigate();
  const { user, logout, loading } = useAuth();
  const [username, setUsername] = useState(null);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchUsername = async () => {
      if (user) {
        const db = getDatabase();
        const userRef = ref(db, `users/${user.uid}`);

        // Observador en tiempo real para obtener el nombre de usuario
        onValue(userRef, (snapshot) => {
          const userData = snapshot.val();
          if (userData && userData.username) {
            setUsername(userData.username);
          }
        });
      }
    };
    fetchUsername();
  }, [user]);

  if (loading) return <h1>loading</h1>;
  return (
    <div className='container menu'>
      <h4 className= "Titles">Bienvenid@ {username || user?.displayName || 'Usuario'}</h4>
        <img src={admin} alt="Avatar" className='avatar' />
        <div className="d-grid gap-2 btnsVL">
        <Button variant="danger" size="lg" className='btn_menuAdmin'>
        Noticias
        </Button>
        <Button variant="danger" size="lg" className='btn_menuAdmin'onClick={() => navigate('workshops')}>
        Talleres
        </Button>
        <Button variant="danger" size="lg" className='btn_menuAdmin' onClick={() => navigate('users')}>
        Usuarios
        </Button>
        <Button onClick={handleLogout} variant="primary" type="submit" className='logout'>Logout</Button>
        </div>
    </div>
  );
}

export default AdminHome;
