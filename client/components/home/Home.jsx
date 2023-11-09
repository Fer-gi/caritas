import {  useAuth } from '../../context/authContext'
import Button from 'react-bootstrap/Button';

export function Home(){
  const {user, logout, loading} = useAuth()
  console.log(user)
  
  const handleLogout = async () => {

try {
  await logout()
} catch (error) {
  console.log(error)
} 
  }

  if (loading) return <h1>loading</h1>
  console.log(user)
  return ( 
    <div>
  
        <h1>Welcome {user.displayName || user.email}</h1>
      <Button onClick={handleLogout} variant="primary" type="submit">Logout</Button>
    </div>
  )
}
