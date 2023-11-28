import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ref as dbRef, update, push, set, onValue } from "firebase/database";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from "../../../../server/firebase/firebase";
import { useAuth } from "../../../context/authContext";
import workshopController from "../../../../server/firebase/controllers/admin/addworkshop/AddWorkshop.controller";
import "./addWorkshopForm.css";

const initialStateValues = {
  img: "",
  courseName: "",
  description: "",
  date: "", // Change to type="date"
  type: "",
  workshopType: "",
  time: "",
  orientation: "",
  teacherEmail: "", // Added missing field
};

const AddWorkshops = () => {
  const { id } = useParams();
  const [values, setValues] = useState(initialStateValues);
  const [image, setImage] = useState(null);
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (id) {
      setEditing(true);
      const getWorkshop = async () => {
        const workshopsRef = dbRef(db, `workshops/${id}`);
        onValue(workshopsRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setValues({ ...data, id });
          }
        });
      };
      getWorkshop();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const imgUrl = image
        ? await workshopController.handleImageUpload(image)
        : null;
      const teacherId = await workshopController.findTeacherIdByEmail(
        values.teacherEmail
      );

      if (!teacherId) {
        toast.error("Profesor no encontrado con el correo proporcionado.", {
          autoClose: 2000,
        });
        return;
      }

      const teacherUsername = await workshopController.findUsernameByEmail(
        values.teacherEmail
      );

      const workshopsObject = {
        ...values,
        img: imgUrl,
        teacher: {
          [teacherId]: {
            email: values.teacherEmail,
            userName: teacherUsername,
          },
        },
      };

      const { teacherEmail, ...workshopData } = workshopsObject;

      if (editing) {
        await update(dbRef(db, `workshops/${id}`), workshopData);
        toast.success("Taller actualizado correctamente", { autoClose: 2000 });
      } else {
        const newWorkshopRef = push(dbRef(db, "workshops"));
        await set(newWorkshopRef, workshopData);
        toast.success("Taller creado correctamente", { autoClose: 2000 });
      }

      setValues({ ...initialStateValues });
      setImage(null);
      navigate(`/adminHome/${user.uid}/workshops`);
    } catch (error) {
      console.error("Error al manejar el envío del formulario:", error);
      toast.error(
        "Error al procesar la solicitud. Por favor, inténtalo de nuevo.",
        { autoClose: 2000 }
      );
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });

    if (name === "img") {
      const file = e.target.files[0];
      setImage(file);
    }
  };

  const handleTipoChange = (selectedTipo) => {
    setValues({ ...values, type: selectedTipo });
  };

  const handleWorkshopTypeChange = (selectedWorkshopType) => {
    setValues({ ...values, workshopType: selectedWorkshopType });
  };

  const handleOrientationChange = (selectedOrientation) => {
    setValues({ ...values, orientation: selectedOrientation });
  };

  const burgundyColor = "white";

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "60vh", color: "white" }}
    >
      <Form
        style={{
          width: "18rem",
          padding: "15px",
          borderRadius: "10px",
          overflowY: "hidden",
          maxHeight: "150vh",
          backgroundColor: burgundyColor,
        }}
        onSubmit={handleSubmit}
        className="addWorkshopForm"
      >
        <Form.Group className="mb-3">
          <Form.Label htmlFor="img">Imagen</Form.Label>
          <Form.Control
            type="file"
            name="img"
            id="img"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="courseName">Nombre del curso</Form.Label>
          <Form.Control
            type="text"
            name="courseName"
            id="courseName"
            value={values.courseName}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Fecha del curso</Form.Label>
          <Form.Control
            name="date"
            value={values.date}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="orientation">Orientación</Form.Label>
          <Form.Select
            name="orientation"
            id="orientation"
            value={values.orientation}
            onChange={(e) => handleOrientationChange(e.target.value)}
            required
          >
            <option value="" disabled>
              Seleccionar orientación
            </option>
            <option value="Laboral">Orientación Laboral</option>
            <option value="Vocacional">Orientación Vocacional</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Presencial/Online</Form.Label>
          <Form.Select
            name="type"
            value={values.type}
            onChange={(e) => handleTipoChange(e.target.value)}
            required
          >
            <option value="" disabled>
              Seleccionar tipo
            </option>
            <option value="Presencial">Presencial</option>
            <option value="Online">Online</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="workshopType">Tipo de taller</Form.Label>
          <Form.Select
            name="workshopType"
            id="workshopType"
            value={values.workshopType}
            onChange={(e) => handleWorkshopTypeChange(e.target.value)}
            required
          >
            <option value="" disabled>
              Seleccionar tipo de taller
            </option>
            <option value="Obligatorio">Obligatorio</option>
            <option value="Opcional">Opcional</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="time">Hora</Form.Label>
          <Form.Control
            type="text"
            name="time"
            id="time"
            value={values.time}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="teacherEmail">Correo del Profesor</Form.Label>
          <Form.Control
            type="email"
            name="teacherEmail"
            id="teacherEmail"
            value={values.teacherEmail}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="danger" type="submit">
          Crear
        </Button>
      </Form>
    </div>
  );
};

export default AddWorkshops;
