import WelcomeCaritas from '../../assets/img/CARITAS-VOLUNTARIADO-1024x576.jpg';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';
import arrow from '../../assets/img/arrowbtn.webp'

const Welcome = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/login');
  };

  return (
    <div className='content'>
      <div className='welcome-text'>
        <div>BIENVENID@</div>
      </div>
      <div className="welcome-image">
        <img src={WelcomeCaritas} alt="Welcome to Caritas" className='img' />
        
      </div>
      <div className='welcome-text'>
        <div>Construyamos tu futuro!</div>
      </div>
      <button className="arrow-button" onClick={handleButtonClick}>
  <img src={arrow} alt="arrow" className='arrow' />
</button>

    </div>
  );
};

export default Welcome;
