import Nav from 'react-bootstrap/Nav';
import "./footer.css"

function Footer() {
  return (
    <Nav defaultActiveKey="/home" as="ul">
      <Nav.Item as="li">
        <Nav.Link href="/home">Instagram</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link eventKey="link-1">Facebook</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link eventKey="link-2">X</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default Footer;