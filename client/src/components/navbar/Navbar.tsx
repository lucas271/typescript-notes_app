import { BiLogOut, BiLogIn } from 'react-icons/bi'
import './styles/style.scss'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const user = localStorage.getItem('user')

  const handleLogout = () => {
    localStorage.removeItem('user')
    location.reload()
  }
  return (
    <>
      <header className="navbar_container">
        <nav className="navbar">
          <h1>
            <Link to="/">Notes App</Link>{' '}
          </h1>
          {user
            ? (
            <Link to="/">
              <BiLogOut className="icon" onClick={() => handleLogout()}/>
            </Link>
              )
            : (
            <Link to="/userAuth" >
                <BiLogIn className="icon"/>
            </Link>

              )}
        </nav>
      </header>
    </>
  )
}

export default Navbar
