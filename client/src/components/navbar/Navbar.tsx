import './styles/style.scss'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography } from '@mui/material'
import { AccountCircleOutlined, ExitToApp } from '@mui/icons-material'

const Navbar = () => {
  const user = localStorage.getItem('user')

  const handleLogout = () => {
    localStorage.removeItem('user')
    location.reload()
  }

  return (
    <>
      <AppBar className="navbar_container">
        <Toolbar className='navbar'>
          <Typography variant='h1'>
            <Link to="/">Notes App</Link>
          </Typography>
          {user
            ? <Link to="/">
              <ExitToApp className="icon" onClick={() => handleLogout()}/>
            </Link>
            : <Link to="/userAuth" >
                <AccountCircleOutlined className="icon"/>
            </Link>
          }
        </Toolbar>
      </AppBar>
    </>
  )
}
export default Navbar
