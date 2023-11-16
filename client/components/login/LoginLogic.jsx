import { getUserByEmail } from "../../firebase/firebaseRead";
import { USER_TYPE } from "../../firebase/firebaseRead";

    
export async function handleLogin(user, login, navigate) { 
    try {
        await login(user.email, user.password);
        const userDataObject = await getUserByEmail(user.email);
      
        // Obtener las claves (IDs de usuarios) del objeto
        const userIds = Object.keys(userDataObject);
      
        // Iterar sobre las claves para encontrar el usuario correcto
        let userData;
        for (const userId of userIds) {
          const user = userDataObject[userId];
          // Comparar algún criterio, por ejemplo, la dirección de correo electrónico
          if (user.email === user.email) {
            userData = user;
            break;  // Romper el bucle cuando se encuentra el usuario
          }
        }
      
        console.log("User Data:", userData);
      
        if (userData) {
          switch (userData.type) {
            case USER_TYPE.teacher:
              navigate(/*`/teacherhome/${userData.id}`}*/);
              break;
            case USER_TYPE.student:
              navigate(`/studentHome/${userData.id}`);
              break;
            case USER_TYPE.admin:
              navigate("/adminhome");
              break;
            default:
              navigate("/register");
              break;
          }
        }
            
        } catch (error) {
            console.log(error)
            
        }
    }


