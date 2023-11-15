import Nav from 'react-bootstrap/Nav';
import "./footer.css"
import LogoCampus from "../../assets/img/LogoCampus.svg";

function Footer() {
  return (
    <Nav defaultActiveKey="/home">
      <img src={LogoCampus} alt="logoFooter" className='LogoFooter'/>
 
    </Nav>
  );
}

export default Footer;