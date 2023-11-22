import { createBrowserRouter } from "react-router-dom";
import Root from "./root";
import Login from "../components/login/Login";
import Alert from "../components/alert/Alert";
import Register from "../components/register/Register";
import Landing from "../components/landing/Landing";
import Welcome from "../components/welcome/Welcome";
import ChatBox from "../components/chat/ChatBox";
import StudentList from "../components/teacher/studenList/StudentList";
import StudentDetails from "../components/teacher/studentDetails/StudentDetails";
import StudentWorkshops from "../components/teacher/workshops/Workshops";
import AssociateStudent from "../components/teacher/associate/AssociateStudent";
import { ProtectedRoute } from "../components/protectedroute/ProtectedRoutes";
import AddNews from "../components/news/AddNews";
import addOrEditNews from "../components/news/AddOrEditNews";
import News from "../components/news/News";
import StudentInscription from "../components/students/inscription/StudentInscription";
import MyWorkshops from "../components/students/myworkshops/Myworkshops";
import Workshops from "../components/admin/workshops/Workshops";
import AddWorkshops from "../components/admin/addWorkshopsForm/AddWorkshops";
import addOrEditWorkshops from "../components/admin/addWorkshopsForm/AddOrEditWorkshops";
import UpdateAndDeleteUser from "../components/admin/UpdateAndDeleteUser.jsx/UpdateAndDeleteUser";
import StudentHome from "../components/students/studenthome/StudentHome";
import TeacherHome from "../components/teacher/teacherhome/TeacherHome";
import AdminHome from "../components/admin/adminhome/AdminHome";
import Inscription from "../components/teacher/stuentInscription/Incriptions";
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
        element: <ProtectedRoute><AddWorkshops addOrEditWorkshops={addOrEditWorkshops} /></ProtectedRoute>
    },
    {
      path: "/addworkshops/:id",
      element: <ProtectedRoute><AddWorkshops addOrEditWorkshops={addOrEditWorkshops} /></ProtectedRoute>
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
      path: "/adminHome/:id/workshops",
      element: <Workshops/>
    },
    {
      path: "/adminHome/:id/users",
      element: <UpdateAndDeleteUser/>
    },
{
  path: '/studentHome/:id/orientacionvocacional',
  element: <StudentInscription />,
},
{
  path: '/studentHome/:id/orientacionvocacional/workshops',
  element: <MyWorkshops />,
},
{
  path: '/studentHome/:id/orientacionvocacional/myworkshops',
  element: <MyWorkshops />,
},
{
  path: '/studentHome/:id/orientacionlaboral',
  element: <StudentInscription />,
},
{
  path: '/studentHome/:id/orientacionlaboral/myworkshops',
  element: <MyWorkshops />,
},
      {
        path: "/teacherHome/:id/students",
        element: <StudentList />,
      },
      {
        path: "/teacherHome/:id/students/:id",
        element:
        <StudentDetails />
      },
      {
        path: "/teacherHome/:id/workshops",
        element: <StudentWorkshops />,
      },
      {
        path: "/teacherHome/:id/workshops/view/:id",
        element: <Inscription />,
      },
      {
        path: "/teacherHome/:id/workshops/:id",
        element: <AssociateStudent/>,
      },
      {
        path: "/teacherHome/:id/workshops/:id",
        element: <AssociateStudent/>,
      },
      {
        path: "/teacherHome/:id/students/:id/chat",
        element: <ChatBox />,
      },
      {
        path: "/welcome",
        element: <Welcome />,
      },
      {
        path: "/adminHome",
        element: <AdminHome />
      },
      {
        path: "adminHome/:id/news/addnews",
        element: <ProtectedRoute><AddNews addOrEditNews={addOrEditNews} /></ProtectedRoute>
      },
      {
        path: "adminHome/:id/news/addnews/:id",
        element: <ProtectedRoute><AddNews addOrEditNews={addOrEditNews} /></ProtectedRoute>
      },
      {
        path: "adminHome/:id/news",
        element: <News />
      },
      {
        path: "/studentHome/:id/news",
        element: <News />
      },
      {
        path: "teacherHome/:id/news",
        element: <News />
      }
    ],
  },
]);
export default router;