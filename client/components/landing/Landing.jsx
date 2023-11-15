import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoCampus from '../../assets/img/LogoCampus.svg'
const Landing = () => {
  const burgundyColor = '#800020';
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => { navigate('/welcome'); },
      3000); return () => clearTimeout(timer);
  }, [navigate]); return (<div style={{ backgroundColor: burgundyColor, color: 'white', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> <img src={LogoCampus} ></img> </div>);
}; export default Landing;