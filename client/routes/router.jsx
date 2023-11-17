// router.jsx
import { createBrowserRouter } from "react-router-dom";
import Root from "./root";
import Login from "../components/login/Login";
import Alert from "../components/alert/Alert";
import Register from "../components/register/Register";
import { Home } from "../components/home/Home";
import { ProtectedRoute } from "../components/protectedroute/ProtectedRoutes";
import WorkshopComponent from "../components/workshop/Workshop";
import { StudentsComponent } from "../components/students/Students";
import StudentComponent from "../components/user/User";
import Landing from "../components/landing/Landing";
import Caritascard from "../components/card/Card";
import Welcome from "../components/welcome/Welcome";
import StudentHome from "../components/home/StudentHome"
import ChatBox from "../components/chat/ChatBox";
import AdminHome from "../components/home/AdminHome";
import AddWorkshops from "../components/addWorkshopsForm/AddWorkshops";
import addOrEditWorkshops from "../components/addWorkshopsForm/AddOrEditWorkshops";
import Workshops from "../components/workshops/Workshops";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/alert",
        element: <Alert />,
      },
      {
        path: "/addworkshops",
        element: <AddWorkshops addOrEditActivities={addOrEditWorkshops} />,
    },
    {
      path: "/addworkshops/:id",
      element: <AddWorkshops addOrEditActivities={addOrEditWorkshops} />,
    },
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Landing />
          </ProtectedRoute>
        ),
      },
      {
        path: "/workshops",
        element: <Workshops />,
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
        path: "/chat/:studentId/:teacherId",
        element: <ChatBox />,
      },
      {
        path: "/student/:id",
        element: <StudentComponent />,
      },
      {
        path: "/welcome",
        element: <Welcome />,
      },
      {
        path: "/studentHome/:id",
        element: <StudentHome />,
      },
      {
        path: "/card",
        element: <Caritascard />,
      },
      {
        path: "/adminhome",
        element: <AdminHome />
      }
    ],
  },
]);
export default router;
