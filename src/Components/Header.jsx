
import Navbar from './Navbar';

import "../styles.css"

export default function Header({ user, setUser, setIsAuthenticated }) {


  return (
    <div className="header-background">
      <h1 className="header">Go Productive</h1>
      <Navbar user={user} setUser={setUser} setIsAuthenticated={setIsAuthenticated}/>
    </div>
  )
}