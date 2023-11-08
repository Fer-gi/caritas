import { createBrowserRouter } from "react-router-dom";
import Root from "./root";
import Caritascard from "../components/card/card";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/home",
        element: <Caritascard />,
      },
    ],
  },
]);
export default router;
