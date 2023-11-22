import { useEffect, useState } from 'react';
import light from '../../../assets/img/light.gif';
import { Link } from 'react-router-dom';
import "./StudentHome.css";
import { useAuth } from '../../../context/authContext';
import { getDatabase, ref, onValue } from 'firebase/database';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function StudentHome() {
  const { user, loading } = useAuth();
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

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
        <h4 className='Titles'>Bienvenid@ {username || user?.displayName || 'Usuario'}</h4>
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
          <Button variant="danger" size="lg" className='o-laboral btns' onClick={() => navigate('news')}>
            Noticias
          </Button>
        
      </div>
    </div>
  );
}

export default StudentHome;
