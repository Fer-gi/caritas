import WelcomeCaritas from '../../assets/img/CARITAS-VOLUNTARIADO-1024x576.jpg';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';

const Welcome = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/Register');
  };

  return (
    <div className='content'>
      <div className='welcome-text'>
        <div>BIENVENIDOS</div>
      </div>
      <div className="welcome-image">
        <img src={WelcomeCaritas} alt="Welcome to Caritas" className='img' />
        
      </div>
      <div className='welcome-text'>
        <div>Construyamos tu futuro!</div>
      </div>
      <div className="arrow-button-container">
          <button className="arrow-button" onClick={handleButtonClick}>
            <FaArrowRight />
          </button>
        </div>
    </div>
  );
};

export default Welcome;
