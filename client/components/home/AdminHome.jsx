import Button from 'react-bootstrap/Button';
import "./AdminHome.css";
import { useNavigate } from 'react-router-dom';

function AdminHome() {
  const navigate = useNavigate()
  return (
    <div className="d-grid gap-2">
      <Button variant="danger" size="lg">
        Noticias
      </Button>
      <Button variant="danger" size="lg">
        Talleres
      </Button>
      <Button variant="danger" size="lg" onClick={()=>navigate('/createorientator')}>
        Usuarios
      </Button>
    </div>
  );
}

export default AdminHome;