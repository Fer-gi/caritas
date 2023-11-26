import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoCampus from '../../assets/img/LogoCampus.svg';
import './Landing.css'
const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/welcome');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="landing-container bg-cd222d text-white d-flex justify-content-center align-items-center" style={{ height: '80vh' }} data-testid="welcome-page">
      <img src={LogoCampus} className="img-fluid" alt="Logo" data-testid="logo"/>
    </div>
  );
};

export default Landing;
