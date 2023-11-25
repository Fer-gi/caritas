// src/components/teachers/TeacherHome.js
import { Button } from 'react-bootstrap';
import teacherImage from '../../../assets/img/Sonia.png';
import { Link } from 'react-router-dom';
import '../../students/studenthome/StudentHome.css';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/authContext';
import { getUsername } from '../../../../server/firebase/controllers/teacher/studenthome/StudentHome';

function TeacherHome() {
  const { user, loading } = useAuth();
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const fetchUsername = async () => {
      if (user) {
        try {
          const fetchedUsername = await getUsername(user.uid);
          setUsername(fetchedUsername);
        } catch (error) {
          console.error('Error fetching username:', error.message);
        }
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
    </div>
  );
}

export default TeacherHome;
