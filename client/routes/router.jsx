// router.jsx
import { createBrowserRouter } from "react-router-dom";
import Root from "./root";
import Login from "../components/login/Login";
import Alert from "../components/alert/Alert";
import Register from "../components/register/Register";
import { Home } from "../components/home/Home";
import { ProtectedRoute } from "../components/protectedroute/ProtectedRoutes";
import AddActivities from "../components/addActivitiesForm/AddActivities";
import { db } from "../firebase/firebase";
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import Activities from "../components/activities/Activities";
import { toast } from "react-toastify";
import WorkshopComponent from "../components/workshop/Workshop";
import { StudentsComponent } from "../components/students/students";
import ChatBox from "../components/chat/ChatBox";
import StudentComponent from "../components/user/user";
import Landing from "../components/landing/Landing";
import Welcome from "../components/welcome/Welcome";

const addOrEditActivities = async (activitiesObject, editing) => {
  try {
    if (editing) {
      const activitiesRef = doc(db, 'activities', activitiesObject.id);
      await updateDoc(activitiesRef, activitiesObject);
      toast('Activities updated successfully', {
        type: 'success' 
      });
    } else {
      const docRef = await addDoc(collection(db, 'activities'), activitiesObject);
      toast('Activities added successfully', {
        type: 'success' 
      });
    }
  } catch (e) {
    console.error('Error adding/editing document: ', e);
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
            },
            {
                path: "/addactivities/:id",
                element: <AddActivities addOrEditActivities={addOrEditActivities} />,
              },
              {
                path: "/landing",
                element: <Landing />
            },
            {
              path: "/welcome",
              element: <Welcome />
          }
        ]
    }
]);
export default router;
