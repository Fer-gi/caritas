import { Outlet } from 'react-router-dom'
import { AuthProvider } from '../context/authContext'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Root() {
  return (
    <AuthProvider>
      <Outlet/>   
      <ToastContainer />
    </AuthProvider>
  )
}
export default Root