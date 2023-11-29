import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import { useAuth } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../alert/Alert";
import { toast } from "react-toastify";
import { auth, db } from "../../firebase/firebase";
import { get, ref, child } from "firebase/database";
import google from "../../assets/img/google.png";
import "./Login.css";

export function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { loginWithGoogle, resetPassword, login } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const userCredential = await login(user.email, user.password);

      const authenticatedUser = userCredential ? userCredential.user : null;

      if (authenticatedUser) {
        const userId = authenticatedUser.uid;

        const userSnapshot = await get(child(ref(db), `users/${userId}`));

        if (userSnapshot.exists()) {
          const userType = userSnapshot.val().type;

          console.log("User Type:", userType);

          if (["student", "teacher", "admin"].includes(userType)) {
            console.log(`Navigating to ${userType} Home`);
            navigate(`/${userType}Home/${userId}`);
          } else {
            console.error("Unknown user type");
            setError(
              "Tipo de usuario desconocido. Por favor, inténtelo de nuevo."
            );
          }
        } else {
          console.error("User data not found");
          setError(
            "Datos de usuario no encontrados. Por favor, inténtelo de nuevo."
          );
        }

        toast.success("Inicio de sesión exitoso. ¡Bienvenido de nuevo!", {
          autoClose: 2000,
        });
      } else {
        console.error("Authentication failed or user not found");
        setError(
          "Inicio de sesión fallido. Por favor, verifique sus credenciales e inténtelo de nuevo."
        );
      }
    } catch (error) {
      console.error("Firebase Error Object:", error);

      if (error.code === "auth/too-many-requests") {
        setError("Demasiados intentos. Inténtelo de nuevo más tarde.");
      } else if (error.code === "auth/invalid-login-credentials") {
        setError("Correo o contraseña incorrecta. Verifique sus credenciales.");
      } else if (error.code === "auth/invalid-email") {
        setError(
          "Correo electrónico inválido. Verifique su dirección de correo."
        );
      } else {
        setError(`Error: ${error.message || "desconocido"}`);
      }
    }
  };

  const handleGoogleSignin = async () => {
    try {
      await loginWithGoogle();

      const userId = auth.currentUser.uid;
      const userSnapshot = await get(child(ref(db), `users/${userId}`));

      if (userSnapshot.exists()) {
        const userType = userSnapshot.val().type;

        console.log("User Type:", userType);

        if (userType === "student") {
          console.log("Navigating to Student Home");
          navigate(`/studentHome/${userId}`);
        } else if (userType === "teacher") {
          console.log("Navigating to Teacher Home");
          navigate(`/teacherHome/${userId}`);
        } else if (userType === "admin") {
          console.log("Navigating to Admin Home");
          navigate(`/adminHome/${userId}`);
        }
      } else {
        console.error("User data not found");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleResetPassword = async () => {
    if (!user.email) return setError("Por favor ingresa tu correo electrónico");
    try {
      await resetPassword(user.email);
      setError(
        "Se ha enviado un mensaje a tu correo electrónico para cambiar la contraseña"
      );
    } catch (error) {
      setError(error.message);
    }
  };

  const burgundyColor = "#FFF";

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100%" }}
    >
      <div className="form" style={{ width: "19rem" }}>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: burgundyColor,
            padding: "20px",
            borderRadius: "10px",
            color: "red",
          }}
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="Correo electrónico"
              name="email"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Contraseña"
              name="password"
              onChange={handleChange}
            />
          </Form.Group>

          <div className="d-flex justify-content-between mb-3">
            <p>
              ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
            </p>
            <a href="#!" onClick={handleResetPassword}>
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <div className="buttons-login">
            <Button variant="light" type="submit" className="button-login">
              Iniciar sesión
            </Button>
            <Button
              onClick={handleGoogleSignin}
              variant="light"
              type="button"
              className="button-google"
            >
              <img src={google} alt="google" className="google" />
              Iniciar sesión con Google
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
