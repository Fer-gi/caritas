import { Nav } from 'react-bootstrap';
import "./Footer.css";
import LogoCampus from "../../assets/img/LogoCampus.svg";

function Footer() {
 
  return (
    <div className='completefooter'>
    <Nav defaultActiveKey="/home" className='footer'>
      <img src={LogoCampus} alt="logoFooter" className='LogoFooter' />
    </Nav>

    </div>
  );
}

export default Footer;
