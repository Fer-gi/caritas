import { createBrowserRouter } from "react-router-dom";
import Root from "./root";
import Login from "../components/login/Login";
import Alert from "../components/alert/Alert";
import Register from "../components/register/Register";
import { Home } from "../components/home/Home";
import { ProtectedRoute } from "../components/protectedroute/ProtectedRoutes";
import AddActivities from "../components/addActivitiesForm/AddActivities";
import { db } from "../firebase/firebase";
import { collection, addDoc } from 'firebase/firestore';
import Activities from "../components/activities/Activities";
import { toast } from "react-toastify";
import WorkshopComponent from "../components/workshop/Workshop";
import { StudentsComponent } from "../components/students/students";
import ChatBox from "../components/chat/ChatBox";
import StudentComponent from "../components/user/user";

const addOrEditActivities = async (activitiesObject) => {
  try {
    const docRef = await addDoc(collection(db, 'activities'), activitiesObject);
    toast('Activities added successfully', {
        type: 'success' 
    });
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};



const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/home",
                element: <ProtectedRoute><Home /></ProtectedRoute>
            },
            {
                path: "/alert",
                element: <Alert />
            },
            {
                path: "/addactivities",
                element: <AddActivities addOrEditActivities={addOrEditActivities} />,
            },
            {
                path:"/",
                element:<ProtectedRoute><Home/></ProtectedRoute> 
            },
            {
                path: "/activities",
                element: <Activities />
            },
            {
                path: "/workshop/:id",
                element: <WorkshopComponent />,
            },
            {
                path: "/students/:teacherId",
                element: <StudentsComponent />,
            },
            {
                path: "/chat",
                element: <ChatBox />,
            },
            {
                path: "/student/:id",
                element: <StudentComponent />
            }
            
        ]
    }
]);
export default router;
