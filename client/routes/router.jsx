import { createBrowserRouter } from "react-router-dom";
import Root from "./root";
import Login from "../components/login/Login";
import Alert from "../components/alert/Alert";
import WorkshopComponent from "../components/workshop/Workshop";

import Register from "../components/register/Register";
import { Home } from "../components/home/Home";
import { ProtectedRoute } from "../components/protectedroute/ProtectedRoutes";
import { StudentsComponent } from "../components/students/students";
import ChatBox from "../components/chat/ChatBox";
import StudentComponent from "../components/user/user";
import StudentHome from "../components/home/StudentHome";


const router = createBrowserRouter ([
    {
        path:"/",
        element: <Root/>,
        children: [
            
            {
                path:"/register",
                element: <Register/>
            },
            {
                path:"/login",
                element: <Login/>
            },
            {
                path:"/",
                element:<ProtectedRoute><Home/></ProtectedRoute> 
            },
            {
                path:"/alert",
                element: <Alert/>
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
                path: "/studentHome/:id",
                element: <StudentHome />
            }
            
        ]
    }
])
export default router;




