import React from 'react';
import { Button } from 'react-bootstrap'; 
import avatar from '../../assets/img/avatar.jpeg';
import { useParams, Link} from 'react-router-dom';

function StudentHome() {
    const {id}  = useParams();
    return (
      <div className='container'>
        <img src={avatar} alt="Avatar" className='avatar' />
        <div className="d-grid gap-2">
            <Link to={"orientacion-vocacional"}>
          <Button variant="danger" size="lg" className='o-vocacional'>
            Orientación Vocacional      
          </Button>
          </Link>
          <Link to={"orientacion-laboral"}>
          <Button variant="danger" size="lg" className='o-laboral'>
            Orientación Laboral
          </Button>
          </Link>
        </div>
      </div>
    );
  }

export default StudentHome;
