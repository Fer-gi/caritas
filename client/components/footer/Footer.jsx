import { Nav, Button } from 'react-bootstrap';
import { useAuth } from '../../context/authContext'; 
import "./Footer.css";
import LogoCampus from "../../assets/img/LogoCampus.svg";

function Footer() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='completefooter'>
    <Nav defaultActiveKey="/home" className='footer'>
      <img src={LogoCampus} alt="logoFooter" className='LogoFooter' />
      <Button onClick={handleLogout} variant="primary" type="submit" className='logout'>Logout</Button>

    </Nav>

    </div>
  );
}

export default Footer;
