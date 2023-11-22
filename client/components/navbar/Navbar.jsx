import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./Navbar.css"
import LogoCaritas from "../../assets/img/LogoCaritas.svg";
import { useNavigate } from 'react-router-dom';

function Caritasnavbar() {

  const navigate = useNavigate()
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid className='nav'>
        <Navbar.Brand href="#home"><img src={LogoCaritas} alt="logo" className='LogoNav'/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate('news')} className='nav_text'>Noticias</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Caritasnavbar;