import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./navbar.css"
import LogoCaritas from "../../assets/img/LogoCaritas.svg";

function Caritasnavbar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid className='nav'>
        <Navbar.Brand href="#home"><img src={LogoCaritas} alt="logo" className='LogoNav'/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#menu">Menú</Nav.Link>
            <Nav.Link href="#talleres">Talleres</Nav.Link>
            <Nav.Link href="#noticias">Noticias</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Caritasnavbar;