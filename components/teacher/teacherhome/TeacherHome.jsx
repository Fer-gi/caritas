import { Button } from "react-bootstrap";
import teacherImage from "../../../assets/img/teacherimg.gif";
import { Link } from "react-router-dom";
import "../../students/studenthome/StudentHome.css";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/authContext";
import { getUsername } from "../../../firebase/controllers/teacher/studenthome/StudentHome";
import Spinner from "react-bootstrap/esm/Spinner";

function TeacherHome() {
  const { user, loading } = useAuth();
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const fetchUsername = async () => {
      if (user) {
        try {
          const fetchedUsername = await getUsername(user.uid);
          setUsername(fetchedUsername);
        } catch (error) {
          console.error("Error fetching username:", error.message);
        }
      }
    };

    fetchUsername();
  }, [user]);

  if (loading)
    return (
      <Spinner
        animation="border"
        variant="danger"
        style={{
          display: "block",
          position: "fixed",
          top: "200px",
          left: "50%",
        }}
      />
    );

  return (
    <div style={{ marginTop: "8rem" }} className="container menu teacherHome">
      <div>
        <h4 className="Titles">
          Bienvenid@ {username || user?.displayName || "Usuario"}
        </h4>
      </div>
      <img src={teacherImage} alt="Avatar" className="avatar" />
      <div className="d-grid gap-2 btnsVL">
        <Link to={"students"}>
          <Button variant="danger" size="lg" className="o-vocacional btns">
            Alumnos
          </Button>
        </Link>
        <Link to={"workshops"}>
          <Button variant="danger" size="lg" className="o-laboral btns">
            Talleres
          </Button>
        </Link>
        <Link to={"news"}>
          <Button variant="danger" size="lg" className="o-laboral btns">
            Noticias
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default TeacherHome;
