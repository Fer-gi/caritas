import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import cardimg from '../../assets/img/cardimg.jpg'
import Button from 'react-bootstrap/Button';
import './Card.css'

function Caritascard() {
  return (
    <Card style={{ width: '18rem' }}>
      <section className='dateimg'>
        
    <h3 className='carddate'>4</h3>
    <p className='cardmonthyear'>Diciembre</p>
    <p className='cardmonthyear'>2023</p>
    </section>
      <Card.Img variant="top" src={cardimg} />
      
      <Card.Body>
        <Card.Title>Formación Institucional</Card.Title>

      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Presencial</ListGroup.Item>
        <ListGroup.Item>Taller obligatorio</ListGroup.Item>
        <ListGroup.Item>De 10:00h a 12:30h</ListGroup.Item>
      </ListGroup>
      <Card.Body className='btnsection'>
      <Button className= "cardbtn" variant="danger">Inscribirme</Button>
      </Card.Body>
    </Card>
  );
}

export default Caritascard;