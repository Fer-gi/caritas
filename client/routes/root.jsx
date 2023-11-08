import { Outlet } from 'react-router-dom'
import Caritasnavbar from '../components/navbar/navbar'
import Footer from '../components/footer/footer'

function Root() {
  return (
    <div>
     <Caritasnavbar />
      <Outlet/>
      <Footer />
   
    </div>
  )
}
export default Root