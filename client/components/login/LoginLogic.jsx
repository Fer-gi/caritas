import { getUserByEmail } from "../../firebase/firebaseRead";
import {useNavigate} from 'react-router-dom';
import { USER_TYPE } from "../../firebase/firebaseRead";





    
export async function handleLogin(user, login, navigate) { 
     try {    await login(user.email, user.password);
            const userData= await getUserByEmail (user.email)
            if (userData){
                switch (userData.type) {
                    case USER_TYPE.teacher:
                        navigate(/*teacherhome/:id*/)
                    break;
                    case USER_TYPE.student:
                        navigate("/studentHome/:id")
                    break;
                    case USER_TYPE.admin:
                        navigate ("/adminhome")
                    break;

                    default:
                        navigate("/register")
                        break;
                }
            }

            
        } catch (error) {
            console.log(error)
            
        }
    }


