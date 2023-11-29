import { useState, useEffect } from "react";
import Card from "react-bootstrap/esm/Card";
import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getStudents,
  updateStudentType,
  deleteStudent,
} from "../../../firebase/controllers/admin/updateanddeletestudent/updateanddeletestudent";

function UpdateAndDeleteStudents() {
  const [students, setStudents] = useState([]);
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentsData = await getStudents();
        setStudents(studentsData);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const handleSelectChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleSaveClick = async (userId) => {
    if (!selectedType) {
      alert("Por favor, elija un tipo antes de guardar.");
      return;
    }

    const confirmation = window.confirm(
      `¿Estás seguro de que quieres actualizar a ${
        students.find((student) => student.id === userId).username
      } a ${selectedType}?`
    );

    if (confirmation) {
      try {
        await updateStudentType(userId, selectedType);
        setStudents((prevStudents) => {
          return prevStudents.map((student) =>
            student.id === userId ? { ...student, type: selectedType } : student
          );
        });
        console.log("Tipo de usuario actualizado exitosamente");
        toast.success(`Usuario actualizado a ${selectedType}`, {
          autoClose: 2000,
        });
      } catch (error) {
        console.error("Error actualizando el tipo de usuario", error);
      }
    }
  };

  const handleDeleteClick = async (userId) => {
    const confirmation = window.confirm(
      `¿Estás seguro de que quieres eliminar a ${
        students.find((student) => student.id === userId).username
      }?`
    );

    if (confirmation) {
      try {
        await deleteStudent(userId);
        setStudents((prevStudents) =>
          prevStudents.filter((student) => student.id !== userId)
        );
        console.log("Usuario eliminado exitosamente");
        toast.success("Usuario eliminado correctamente", {
          autoClose: 2000,
        });
      } catch (error) {
        console.error("Error eliminando el usuario", error);
      }
    }
  };

  return (
    <div>
      <h2 style={{ color: "#cd222c", textAlign: "center" }}>Alumnos</h2>
      {students.map((student) => (
        <Card key={student.id} style={{ margin: "10px" }}>
          <Card.Body>
            <div className="d-flex justify-content-between flex-wrap mb-2">
              <Card.Title>
                {" "}
                {student.username
                  ? student.username
                  : student.displayName
                  ? student.displayName
                  : null}
              </Card.Title>
              <Card.Title>{student.email}</Card.Title>
            </div>
            <Form.Select onChange={handleSelectChange}>
              <option value="student" selected={student.type === "student"}>
                Alumno
              </option>
              <option value="teacher" selected={student.type === "teacher"}>
                Profesor
              </option>
              <option value="admin" selected={student.type === "admin"}>
                Admin
              </option>
            </Form.Select>
            <Button
              variant="primary"
              onClick={() => handleSaveClick(student.id)}
            >
              Guardar
            </Button>
            <Button
              style={{ margin: "0.5rem" }}
              variant="danger"
              onClick={() => handleDeleteClick(student.id)}
            >
              Eliminar
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default UpdateAndDeleteStudents;
