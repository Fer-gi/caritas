import { createBrowserRouter } from "react-router-dom";
import Root from "./root";
import Login from "../components/login/Login";
import Alert from "../components/alert/Alert";
import Home from "../components/home/Home";
import Register from "../components/register/Register";

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
                path:"/home",
                element: <Home/>
            },
            {
                path:"/alert",
                element: <Alert/>
            },
        ]
    }
])
export default router;




