import {  useAuth } from "../../context/authContext"

const Home = () => {

  const {user} = useAuth()
  console.log(user)
  return (
    <div>Home</div>
  )
}

export default Home