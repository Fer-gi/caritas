import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./navbar.css"

function Caritasnavbar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container className='nav'>
        <Navbar.Brand href="#home">CARITAS</Navbar.Brand>
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