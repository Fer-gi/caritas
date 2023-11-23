import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../../context/authContext';
import teacherImage from '../../../assets/img/Sonia.png';
import '../../students/studenthome/StudentHome.css';
import TeacherHomeController from '../../../../server/controllers/teacher/teacherhome/TeacherHome';

function TeacherHome() {
  const { user, loading } = useAuth();
  const [username, setUsername] = useState(null);

  useEffect(() => {
    TeacherHomeController.fetchUsername(user, setUsername);
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
