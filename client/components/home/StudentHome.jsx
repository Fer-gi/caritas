import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import light from '../../assets/img/light.gif';
import { Link } from 'react-router-dom';
import "./StudentHome.css";
import { useAuth } from '../../context/authContext';
import { getDatabase, ref, onValue } from 'firebase/database';

function StudentHome() {
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
      <div>
        <h4>Bienvenido {username || user?.displayName || 'Usuario'}</h4>
      </div>
      <img src={light} alt="Avatar" className='avatar' />
      <div className="d-grid gap-2 btnsVL">
        <Link to={"orientacionvocacional"}>
          <Button variant="danger" size="lg" className='o-vocacional btns'>
            Orientación Vocacional
          </Button>
        </Link>
        <Link to={"orientacionlaboral"}>
          <Button variant="danger" size="lg" className='o-laboral btns'>
            Orientación Laboral
          </Button>
        </Link>
      </div>
      <Button onClick={handleLogout} variant="primary" type="submit" className='logout'>Logout</Button>
    </div>
  );
}

export default StudentHome;
