import { useState, useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import { ref as dbRef, update, push, set, onValue } from "firebase/database";
import {ref as storageRef,uploadBytes,getDownloadURL} from "firebase/storage";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddNews.css"
import { db, storage } from "../../../server/firebase/firebase";

const initialStateValues = {
  title: "",
  img: "",
  description: "",
};

const AddNews = () => {
  const { id } = useParams();
  const [values, setValues] = useState(initialStateValues);
  const [image, setImage] = useState(null);
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setEditing(true);
      const getNew = async () => {
        const newsRef = dbRef(db, `news/${id}`);
        onValue(newsRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setValues({ ...data, id });
          }
        });
      };
      getNew();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const imgUrl = image ? await handleImageUpload(image) : null;
      const newsObject = { ...values, img: imgUrl };

      if (editing) {
        await update(dbRef(db, `news/${id}`), newsObject);
        toast.success("Noticia actualizada correctamente", {
          autoClose: 2000,
        });
      } else {
        const newNewRef = push(dbRef(db, "news"));
        await set(newNewRef, newsObject);
        toast.success("Noticia creada correctamente", { autoClose: 2000 });
      }

      setValues({ ...initialStateValues });
      setImage(null);
      navigate(`/adminHome/${id}/news`);
    } catch (error) {
      console.error("Error al manejar el envío del formulario:", error);
      toast.error(
        "Error al procesar la solicitud. Por favor, inténtalo de nuevo.",
        { autoClose: 2000 }
      );
    }
  };

  const handleImageUpload = async (file) => {
    const storageReference = storageRef(storage, `images/${file.name}`);

    await uploadBytes(storageReference, file);

    const imgUrl = await getDownloadURL(storageReference);

    return imgUrl;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });

    if (name === "img") {
      const file = e.target.files[0];
      setImage(file);
    }
  };

  const newsColor = "white";

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "60vh", color: "white" }}
    >
      <Form className="newsForm"
        style={{
          width: "18rem",
          padding: "15px",
          borderRadius: "10px",
          overflowY: "hidden",
          maxHeight: "150vh",
          backgroundColor: newsColor,
          color: "#cd222c",
        }}
        onSubmit={handleSubmit}
      >
        <Form.Group className="mb-3">
          <Form.Label>Imagen</Form.Label>
          <Form.Control type="file" name="img" onChange={handleInputChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Título de la noticia</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={values.title}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Descripción de la noticia</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={values.description}
            onChange={handleInputChange}
          />
        </Form.Group>
        <div className="saveNew">
        <Button variant="light" type="submit" className="buttonSave" >
          Guardar
        </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddNews;
