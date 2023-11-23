import { Outlet } from 'react-router-dom'
import { AuthProvider } from '../context/authContext'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Caritasnavbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import '../index.css'

function Root() {
  return (
    <AuthProvider>
      <Caritasnavbar/>
      <Outlet />   
      <ToastContainer />
      <Footer/>
    </AuthProvider>
  )
}
export default Root