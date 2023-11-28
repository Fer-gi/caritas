import { Card, ListGroup, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "./StudentsInscription.css";
import { useStudentInscription } from "../../../../server/firebase/controllers/student/incription/inscription";

const StudentInscription = () => {
  const navigate = useNavigate();
  const currentPath = window.location.pathname;
  const { associatedWorkshops, handleInscribeClick } =
    useStudentInscription(currentPath);

  return (
    <div>
      <div className="btnMyWorkshopsContainer">
        <button
          className="btnMyWorkshops"
          onClick={() => navigate(`myworkshops`)}
        >
          Ver mis talleres
        </button>
      </div>
      <section
        className="p-3 d-flex flex-wrap"
        style={{ justifyContent: "center" }}
      >
        {associatedWorkshops.map((workshop) => (
          <Card
            key={workshop.id}
            style={{ width: "18rem", margin: "10px", marginTop: "3rem" }}
          >
            <section className="dateimg">{workshop.date}</section>
            <Card.Img className="imgCard" variant="top" src={workshop.img} />

            <Card.Body>
              <Card.Title>{workshop.courseName}</Card.Title>
            </Card.Body>

            <ListGroup className="list-group-flush">
              <ListGroup.Item>{workshop.type}</ListGroup.Item>
              <ListGroup.Item>{workshop.workshopType}</ListGroup.Item>
              <ListGroup.Item>{workshop.time}</ListGroup.Item>
              <ListGroup.Item>{workshop.orientation}</ListGroup.Item>
            </ListGroup>

            <Card.Body className="btnsection">
              <Button
                className="cardbtn"
                variant="danger"
                onClick={() => handleInscribeClick(workshop.id)}
              >
                Inscribirme
              </Button>
            </Card.Body>
          </Card>
        ))}
      </section>
    </div>
  );
};

export default StudentInscription;
