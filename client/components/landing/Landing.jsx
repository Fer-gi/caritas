import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const burgundyColor = '#800020';
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/welcome');
    }, 3000);

    // Clear the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{ backgroundColor: burgundyColor, color: 'white', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      Landing
    </div>
  );
};

export default Landing;
