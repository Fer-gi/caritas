import { Nav } from 'react-bootstrap';
import "./Footer.css";
import LogoCampus from "../../assets/img/LogoCampus.svg";

function Footer() {
 
  return (
    <div className='completefooter' data-testid="complete-footer">
    <Nav defaultActiveKey="/home" className='footer'>
      <img src={LogoCampus} alt="logoFooter" className='LogoFooter' data-testid="logoFooter"/>
    </Nav>

    </div>
  );
}

export default Footer;
