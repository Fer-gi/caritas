import React from 'react';
import { Button } from 'react-bootstrap'; 
import light from '../../assets/img/light.gif';
import { useParams, Link} from 'react-router-dom';
import "./StudentHome.css"

function StudentHome() {
    const {id}  = useParams();
    return (
      <div className='container menu'>
        <img src={light} alt="Avatar" className='avatar' />
        <div className="d-grid gap-2 btnsVL" >
            <Link to={"orientacion-vocacional"}>
          <Button variant="danger" size="lg" className='o-vocacional btns'>
            Orientación Vocacional      
          </Button>
          </Link>
          <Link to={"orientacion-laboral"}>
          <Button variant="danger" size="lg" className='o-laboral btns'>
            Orientación Laboral
          </Button>
          </Link>
        </div>
      </div>
    );
  }

export default StudentHome;
