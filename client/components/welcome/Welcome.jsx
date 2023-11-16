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
    <>
      <div className='welcome-text'>
      <div>BIENVENIDOS</div>
      </div>
      <div className="welcome-image">
      <img src={WelcomeCaritas} alt="Welcome to Caritas" className='img' />
      <button className="arrow-button" onClick={handleButtonClick}>
    <FaArrowRight />
      </button>
      </div>
      <div className='welcome-text'>
      <div>Construyamos tu futuro!</div>
      </div>
    </>
      );
      };

  export default Welcome;