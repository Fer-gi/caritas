// workshops.jsx
import React, { useState, useEffect } from "react";
import { Card, Button, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./teacher_workshops.css";
import getWorkshopsData from "../../../firebase/controllers/teacher/workshops/workshops";

const StudentWorkshops = ({ userId }) => {
  const [workshops, setWorkshops] = useState([]);
  const navigate = useNavigate();

  const getWorkshops = async () => {
    try {
      const workshopsData = await getWorkshopsData(userId);
      console.log("Workshops data in component:", workshopsData);
      setWorkshops(workshopsData || []);
    } catch (error) {
      console.error("Error fetching workshops:", error.message);
      setWorkshops([]);
    }
  };

  useEffect(() => {
    getWorkshops();
  }, [userId]);

  return (
    <div
      className="card_workshops_teacher flex-wrap"
      data-testid="workshopStudent-component"
    >
      {workshops.map((workshop) => (
        <Card key={workshop.id} style={{ width: "18rem" }}>
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
              className="cardbtn mx-auto mt-3"
              variant="danger"
              onClick={() => navigate(`view/${workshop.id}`)}
            >
              Ver alumnos
            </Button>
            <Button
              className="cardbtn mx-auto mt-3"
              variant="danger"
              onClick={() => navigate(`${workshop.id}`)}
            >
              Asociar
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default StudentWorkshops;
