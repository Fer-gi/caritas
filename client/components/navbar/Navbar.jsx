import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import LogoCaritas from "../../assets/img/LogoCaritas.svg";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../../context/authContext';
import "./Navbar.css";
import Exit from "../../assets/img/exit-icon.png"


function Caritasnavbar() {
  const { logout } = useAuth();
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  }
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const handleLogoClick = () => {
    if (user) {
      const userType = user.type;
      const userId = user.uid;
      if (userType === 'student') {
        navigate(`/studentHome/${userId}`);
      } else if (userType === 'teacher') {
        navigate(`/teacherHome/${userId}`);
      } else if (userType === 'admin') {
        navigate(`/adminHome/${userId}`);
      } else {
        console.log("Unknown user type:", userType);
        // Manejar otros tipos de usuarios si es necesario
      }
    } else {
      console.log("No authenticated user");
      // Manejar el caso cuando no hay un usuario autenticado
    }
};
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
    <Container fluid className="nav">
      <Navbar.Brand onClick={handleLogoClick}>
        <img src={LogoCaritas} alt="logo" className="LogoNav" data-testid="logo"/>
      </Navbar.Brand>
      <Col xs="auto">
        <Button onClick={handleLogout} variant="#CD2222" type="submit" className="logout">
          <img className='exit-icon' src={Exit} alt="exit" />
        </Button>
      </Col>
    </Container>
  </Navbar>
  );
}
export default Caritasnavbar;