import { Link, useNavigate } from 'react-router-dom';

function Navbar({ user, setUser, setIsAuthenticated }) {

  const navigate= useNavigate()

  function handleLogout() {
    fetch('/logout', {
      method: 'DELETE',
    }).then(() => {
      setIsAuthenticated(false)
      setUser(null)
      navigate('/singup-login')
    });
  }

  return (
    <div className="navbar-container">
      <div>
        <p className="welcome">Welcome, {user.name}!</p>
      </div>
      <div className="navbar-links">
      <Link exact to="/" className="navbar-link"> Home </Link>
        <Link exact to="/comments" className="navbar-link"> Your Thoughts? </Link>
        <button onClick={handleLogout} className="logout-button"> Logout </button>
      </div>
    </div>
  )
}

export default Navbar
