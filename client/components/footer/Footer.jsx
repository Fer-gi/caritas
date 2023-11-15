import Nav from 'react-bootstrap/Nav';
import "./Footer.css"
import LogoCampus from "../../assets/img/LogoCampus.svg";

function Footer() {
  return (
    <Nav defaultActiveKey="/home"className='footer'>
      <img src={LogoCampus} alt="logoFooter" className='LogoFooter'/>
 
    </Nav>
  );
}

export default Footer;