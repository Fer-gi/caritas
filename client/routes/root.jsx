import { Outlet } from 'react-router-dom'
import { AuthProvider } from '../context/authContext'

function Root() {
  return (
    <AuthProvider>
      <Outlet/>
   
    </AuthProvider>
  )
}
export default Root