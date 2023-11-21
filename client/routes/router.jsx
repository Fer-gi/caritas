// router.jsx
import { createBrowserRouter } from "react-router-dom";
import Root from "./root";
import Login from "../components/login/Login";
import Alert from "../components/alert/Alert";
import Register from "../components/register/Register";
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
import AssociatedWorkshops from "../components/students/StudentInscription";
import StudentList from "../components/teacher/studenList/StudentList";
import StudentDetails from "../components/teacher/studentDetails/StudentDetails";
import StudentWorkshops from "../components/teacher/workshops/Workshops";
import AssociateStudent from "../components/teacher/associate/AssociateStudent";
import TeacherHome from "../components/home/TeacherHome";
import { ProtectedRoute } from "../components/protectedroute/ProtectedRoutes";





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
        path: "/alert",
        element: <Alert />,
      },
      {
        path: "/addworkshops",
        element: <ProtectedRoute><AddWorkshops addOrEditActivities={addOrEditWorkshops} /></ProtectedRoute>
    },
    {
      path: "/addworkshops/:id",
      element: <ProtectedRoute><AddWorkshops addOrEditActivities={addOrEditWorkshops} /></ProtectedRoute>
    },
      {
        path: "/",
        element: (
            <Landing />
        ),
      },
      {
        path: "/workshops",
        element: <Workshops />,
      },


      {
        path: "/studentHome/:id",
        element: <ProtectedRoute> <StudentHome /></ProtectedRoute>
      },
      {
        path: "/teacherHome/:id",
        element:<ProtectedRoute> <TeacherHome /></ProtectedRoute>
      },
      {
        path: "/adminHome/:id",
        element:<ProtectedRoute><AdminHome /></ProtectedRoute> 
      },

{
  path: '/studentHome/:id/orientacionvocacional',
  element: <AssociatedWorkshops />,
},
{
  path: '/studentHome/:id/orientacionlaboral',
  element: <AssociatedWorkshops />,
},


      {
        path: "/teacherHome/:id/students",
        element: <StudentList />,
      },

      {
        path: "/teacherHome/:id/students/:id",
        element: <StudentDetails />,
      },

      {
        path: "/teacherHome/:id/workshops",
        element: <StudentWorkshops />,
      },
      {
        path: "/teacherHome/:id/workshops/:id",
        element: <AssociateStudent/>,
      },

      {
        path: "/students/:teacherId",
        element: <StudentsComponent />,
      },
      {
        path: "/teacherHome/:id/students/:id/chat",
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
