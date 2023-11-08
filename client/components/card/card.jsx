import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import cardimg from '../../images/cardimg.jpg'
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import './card.css'

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
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="1">
        <Accordion.Header>Saber más</Accordion.Header>
        <Accordion.Body>
Todas las personas que inicien su actividad en la Institución, para adquirir una primera formación e información de qué es y qué hace Cáritas Madrid, el ser y el hacer del voluntariado en Cáritas Madrid, y analizar la realidad social actual. 
<a href="#">Más información</a>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
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