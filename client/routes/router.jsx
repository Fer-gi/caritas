import { createBrowserRouter } from "react-router-dom";
import Root from "./root";
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
import StudentHome from "../components/students/studenthome/StudentHome";
import TeacherHome from "../components/teacher/teacherhome/TeacherHome";
import AdminHome from "../components/admin/adminhome/AdminHome";
import Inscription from "../components/teacher/stuentInscription/Incriptions";
import UpdateAndDeleteStudents from "../components/admin/UpdateAndDeleteStudents/UpdateAndDeleteStudents";
import UpdateAndDeleteTeachers from "../components/admin/UpdateAndDeleteTeachers/UpdateAndDeleteTeacher";
import NewsBlogs from "../components/news/NewsViewsTeacherAndStudents";
import { Login } from "../components/login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [


      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/welcome",
        element: <Welcome />,
      },
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


      //ADMIN
      {
        path: "/adminHome/:id/workshops/addworkshops",
        element: (
          <ProtectedRoute>
            <AddWorkshops addOrEditWorkshops={addOrEditWorkshops} />
          </ProtectedRoute>
        ),
      },
      {
        path: "/adminHome/:id/workshops/addworkshops/:worshopId",
        element: (
          <ProtectedRoute>
            <AddWorkshops addOrEditWorkshops={addOrEditWorkshops} />
          </ProtectedRoute>
        ),
      },


      {
        path: "/adminHome/:id/workshops",
        element: (
          <ProtectedRoute>
            <Workshops />
          </ProtectedRoute>
        ),
      },
      {
        path: "/adminHome/:id",
        element: (
          <ProtectedRoute>
            <AdminHome />
          </ProtectedRoute>
        ),
      },
      {
        path: "/adminHome/:id/workshops",
        element: (
          <ProtectedRoute>
            <Workshops />
          </ProtectedRoute>
        ),
      },
      {
        path: "/adminHome/:id/students",
        element: (
          <ProtectedRoute>
            <UpdateAndDeleteStudents />
          </ProtectedRoute>
        ),
      },
      {
        path: "/adminHome/:id/teachers",
        element: (
          <ProtectedRoute>
            <UpdateAndDeleteTeachers />
          </ProtectedRoute>
        ),
      },
      {
        path: "adminHome/:id/news/addnews",
        element: (
          <ProtectedRoute>
            <AddNews addOrEditNews={addOrEditNews} />
          </ProtectedRoute>
        ),
      },
      {
        path: "adminHome/:id/news/addnews/:newId",
        element: (
          <ProtectedRoute>
            <AddNews addOrEditNews={addOrEditNews} />
          </ProtectedRoute>
        ),
      },
      {
        path: "adminHome/:id/news",
        element: (
          <ProtectedRoute>
            <News />
          </ProtectedRoute>
        ),
      },
      //STUDENT
      {
        path: "/studentHome/:id",
        element: (
          <ProtectedRoute>
            {" "}
            <StudentHome />
          </ProtectedRoute>
        ),
      },

      {
        path: "/studentHome/:id/orientacionvocacional",
        element: (
          <ProtectedRoute>
            <StudentInscription />
          </ProtectedRoute>
        ),
      },
      {
        path: "/studentHome/:id/orientacionvocacional/workshops",
        element: (
          <ProtectedRoute>
            <MyWorkshops />,
          </ProtectedRoute>
        ),
      },
      {
        path: "/studentHome/:id/orientacionvocacional/myworkshops",
        element: (
          <ProtectedRoute>
            <MyWorkshops />,
          </ProtectedRoute>
        ),
      },
      {
        path: "/studentHome/:id/orientacionlaboral/myworkshops",
        element: (
          <ProtectedRoute>
            <MyWorkshops />
          </ProtectedRoute>
        ),
      },
      {
        path: "/studentHome/:studentId/orientacionlaboral/myworkshops/chat/:teacherId",
        element: (
          <ProtectedRoute>
            <ChatBox />
          </ProtectedRoute>
        ),
      },
      {
        path: "/studentHome/:studentId/orientacionvocacional/myworkshops/chat/:teacherId",
        element: (
          <ProtectedRoute>
            <ChatBox />
          </ProtectedRoute>
        ),
      },
      {
        path: "/studentHome/:id/orientacionlaboral",
        element: (
          <ProtectedRoute>
            <StudentInscription />
          </ProtectedRoute>
        ),
      },
      {
        path: "/studentHome/:id/news",
        element: (
          <ProtectedRoute>
            <NewsBlogs />
          </ProtectedRoute>
        ),
      },
      //TEACHER

      {
        path: "/teacherHome/:teacherId/students",
        element: (
          <ProtectedRoute>
            <StudentList />
          </ProtectedRoute>
        ),
      },
      {
        path: "/teacherHome/:id",
        element: (
          <ProtectedRoute>
            {" "}
            <TeacherHome />
          </ProtectedRoute>
        ),
      },

      {
        path: "/teacherHome/:teacherId/students/:studentId",
        element: (
          <ProtectedRoute>
            <StudentDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/teacherHome/:id/workshops",
        element: (
          <ProtectedRoute>
            <StudentWorkshops />
          </ProtectedRoute>
        ),
      },
      {
        path: "/teacherHome/:id/workshops/view/:id",
        element: (
          <ProtectedRoute>
            <Inscription />,
          </ProtectedRoute>
        ),
      },
      {
        path: "/teacherHome/:id/workshops/:id",
        element: (
          <ProtectedRoute>
            <AssociateStudent />
          </ProtectedRoute>
        ),
      },
      {
        path: "/teacherHome/:id/workshops/:id",
        element: (
          <ProtectedRoute>
            <AssociateStudent />
          </ProtectedRoute>
        ),
      },
      {
        path: "/teacherHome/:teacherId/students/:studentId/chat",
        element: (
          <ProtectedRoute>
            <ChatBox />,
          </ProtectedRoute>
        ),
      },

      {
        path: "teacherHome/:id/news",
        element: (
          <ProtectedRoute>
            <NewsBlogs />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
export default router;
