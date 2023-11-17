import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import ReactDOM from 'react-dom/client'
import '../server/firebase/firebase'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
  <RouterProvider router = {router}/>
  </>
  

)
