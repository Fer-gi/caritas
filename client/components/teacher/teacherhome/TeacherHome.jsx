import { Button } from 'react-bootstrap';
import teacherImage from '../../../assets/img/Sonia.png';
import { Link } from 'react-router-dom';
import '../../students/studenthome/StudentHome.css';
import { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useAuth } from '../../../context/authContext';

function TeacherHome() {
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
        <h4 className='Titles'>Bienvenid@ {username || user?.displayName || 'Usuario'}</h4>
      </div>
      <img src={teacherImage} alt="Avatar" className='avatar' />
      <div className="d-grid gap-2 btnsVL">
        <Link to={"students"}>
          <Button variant="danger" size="lg" className='o-vocacional btns'>
            Alumnos      
          </Button>
        </Link>
        <Link to={"workshops"}>
          <Button variant="danger" size="lg" className='o-laboral btns'>
            Talleres
          </Button>
        </Link>
      </div>
      <Button onClick={handleLogout} variant="primary" type="submit" className='logout'>Logout</Button>
    </div>
  );
}

export default TeacherHome;
